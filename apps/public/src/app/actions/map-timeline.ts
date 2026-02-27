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
  postcode: string | null;
  region: string | null;
  /** Provider that produced this check (e.g. "omni-fiber"). Null for unchecked addresses. */
  provider: string | null;
  serviceabilityType: string | null;
  serviceable: boolean | null;
  salesType: string | null;
  status: string | null;
  cstatus: string | null;
  isPreSale: number | null;
  salesStatus: string | null;
  matchType: string | null;
  checkedAt: Date | null;
  apiCreateDate: Date | null;
  apiUpdateDate: Date | null;
}

/**
 * Get timeline of checks for a selection.
 * Returns unique dates when service status changed (grouped by day).
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
      a.postcode,
      a.region,
      lc.provider,
      lc."serviceabilityType",
      lc.serviceable,
      lc."salesType",
      lc.status,
      lc.cstatus,
      lc."isPreSale",
      lc."salesStatus",
      lc."matchType",
      lc."effectiveDate" as "checkedAt",
      lc."apiCreateDate",
      lc."apiUpdateDate"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas
      ON a.id = atas."A" AND atas."B" = ${selectionId}
    LEFT JOIN LATERAL (
      SELECT DISTINCT ON (sc.provider)
        sc.provider,
        sc."serviceabilityType",
        sc.serviceable,
        sc."salesType",
        sc.status,
        sc.cstatus,
        sc."isPreSale",
        sc."salesStatus",
        sc."matchType",
        sc."apiCreateDate",
        sc."apiUpdateDate",
        COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt") as "effectiveDate"
      FROM serviceability_checks sc
      WHERE sc."addressId" = a.id
        AND COALESCE(sc."apiUpdateDate", sc."apiCreateDate", sc."checkedAt") <= ${asOfDate}
        AND (sc.error IS NULL OR sc.error = '')
      ORDER BY sc.provider, sc."checkedAt" DESC
    ) lc ON true
  `;

  return addresses;
}

/**
 * Get all addresses for a selection with their current (latest) serviceability status,
 * returning one row per (address, provider) so all providers are visible on the map.
 * Fetches only the fields needed for map rendering — excludes the large `properties`
 * JSON blob and all other unused address columns that Prisma would otherwise load.
 */
export async function getAddressesForMap(selectionId: string): Promise<AddressAtTime[]> {
  return prisma.$queryRaw<AddressAtTime[]>`
    SELECT
      a.id,
      a.longitude,
      a.latitude,
      a."addressString",
      a.city,
      a.postcode,
      a.region,
      lc.provider,
      lc."serviceabilityType",
      lc.serviceable,
      lc."salesType",
      lc.status,
      lc.cstatus,
      lc."isPreSale",
      lc."salesStatus",
      lc."matchType",
      lc."checkedAt",
      lc."apiCreateDate",
      lc."apiUpdateDate"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas
      ON a.id = atas."A" AND atas."B" = ${selectionId}
    LEFT JOIN LATERAL (
      SELECT DISTINCT ON (sc.provider)
        sc.provider,
        sc."serviceabilityType",
        sc.serviceable,
        sc."salesType",
        sc.status,
        sc.cstatus,
        sc."isPreSale",
        sc."salesStatus",
        sc."matchType",
        sc."checkedAt",
        sc."apiCreateDate",
        sc."apiUpdateDate"
      FROM serviceability_checks sc
      WHERE sc."addressId" = a.id
        AND (sc.error IS NULL OR sc.error = '')
      ORDER BY sc.provider, sc."checkedAt" DESC
    ) lc ON true
  `;
}

export interface RunSummary {
  id: string;
  name: string;
  status: string;
  recheckType: string;
  totalAddresses: number;
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  startedAt: Date | null;
  completedAt: Date | null;
  lastCheckAt: Date | null;
}

/**
 * Get all batch runs (jobs) for a selection, newest first.
 */
export async function getRunsForSelection(selectionId: string): Promise<RunSummary[]> {
  const jobs = await prisma.batchJob.findMany({
    where: { selectionId },
    orderBy: { completedAt: 'desc' },
    select: {
      id: true,
      name: true,
      status: true,
      recheckType: true,
      totalAddresses: true,
      checkedCount: true,
      serviceableCount: true,
      preorderCount: true,
      noServiceCount: true,
      startedAt: true,
      completedAt: true,
      lastCheckAt: true,
    },
  });
  return jobs;
}

/**
 * Get snapshot statistics at a specific point in time.
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
