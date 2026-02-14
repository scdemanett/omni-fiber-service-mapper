'use server';

import { prisma } from '@/lib/db';

export interface TimelineSnapshot {
  date: Date;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  uncheckedCount: number;
}

export interface AddressAtTime {
  id: string;
  longitude: number;
  latitude: number;
  addressString: string;
  city: string | null;
  serviceabilityType: string | null;
  serviceable: boolean | null;
  salesType: string | null;
  status: string | null;
  cstatus: string | null;
  checkedAt: Date | null;
}

/**
 * Get timeline of checks for a selection.
 * Returns unique dates when service status changed (grouped by day).
 * Uses API updateDate from matchedAddress (when status changed), not when we checked.
 *
 * Fully pushed to PostgreSQL - no in-memory grouping.
 */
export async function getCheckTimeline(selectionId: string): Promise<Date[]> {
  const rows = await prisma.$queryRaw<{ check_date: Date }[]>`
    SELECT DISTINCT
      DATE(COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt")) as check_date
    FROM serviceability_checks sc
    INNER JOIN "_AddressToAddressSelection" atas
      ON sc."addressId" = atas."A" AND atas."B" = ${selectionId}
    ORDER BY check_date ASC
  `;

  console.log(`Timeline for selection ${selectionId}: Found ${rows.length} unique days`);
  return rows.map((r) => r.check_date);
}

/**
 * Get addresses with their status at a specific point in time.
 * Filters by when Omni Fiber changed service status (API updateDate), not when we checked.
 *
 * Uses a PostgreSQL LATERAL JOIN so only the relevant check per address is fetched,
 * instead of loading all addresses with all their checks into memory.
 */
export async function getAddressesAtTime(
  selectionId: string,
  asOfDate: Date
): Promise<AddressAtTime[]> {
  const addresses = await prisma.$queryRaw<AddressAtTime[]>`
    SELECT
      a.id,
      a.longitude,
      a.latitude,
      a."addressString",
      a.city,
      lc."serviceabilityType",
      lc.serviceable,
      lc."salesType",
      lc.status,
      lc.cstatus,
      lc."effectiveDate" as "checkedAt"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas
      ON a.id = atas."A" AND atas."B" = ${selectionId}
    LEFT JOIN LATERAL (
      SELECT
        sc."serviceabilityType",
        sc.serviceable,
        sc."salesType",
        sc.status,
        sc.cstatus,
        COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt") as "effectiveDate"
      FROM serviceability_checks sc
      WHERE sc."addressId" = a.id
        AND COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt") <= ${asOfDate}
        AND (sc.error IS NULL OR sc.error = '')
      ORDER BY sc."checkedAt" DESC
      LIMIT 1
    ) lc ON true
  `;

  return addresses;
}

/**
 * Get snapshot statistics at a specific point in time.
 * Fully pushed to PostgreSQL with a single aggregation query.
 */
export async function getSnapshotStats(
  selectionId: string,
  asOfDate: Date
): Promise<TimelineSnapshot> {
  const [stats] = await prisma.$queryRaw<[{
    serviceableCount: bigint;
    preorderCount: bigint;
    noServiceCount: bigint;
    uncheckedCount: bigint;
  }]>`
    SELECT
      COUNT(*) FILTER (WHERE lc."serviceabilityType" = 'serviceable') as "serviceableCount",
      COUNT(*) FILTER (WHERE lc."serviceabilityType" = 'preorder') as "preorderCount",
      COUNT(*) FILTER (WHERE lc."serviceabilityType" = 'none') as "noServiceCount",
      COUNT(*) FILTER (WHERE lc."serviceabilityType" IS NULL) as "uncheckedCount"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas
      ON a.id = atas."A" AND atas."B" = ${selectionId}
    LEFT JOIN LATERAL (
      SELECT sc."serviceabilityType"
      FROM serviceability_checks sc
      WHERE sc."addressId" = a.id
        AND COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt") <= ${asOfDate}
        AND (sc.error IS NULL OR sc.error = '')
      ORDER BY sc."checkedAt" DESC
      LIMIT 1
    ) lc ON true
  `;

  return {
    date: asOfDate,
    serviceableCount: Number(stats?.serviceableCount || 0),
    preorderCount: Number(stats?.preorderCount || 0),
    noServiceCount: Number(stats?.noServiceCount || 0),
    uncheckedCount: Number(stats?.uncheckedCount || 0),
  };
}
