'use server';

import { prisma } from '@/lib/db';

/**
 * Get all selections with address counts and serviceability stats.
 */
export async function getSelections() {
  const selections = await prisma.addressSelection.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { addresses: true },
      },
    },
  });

  const selectionStatsRows = await prisma.$queryRaw<{
    selectionId: string;
    checkedCount: bigint;
    serviceableCount: bigint;
    preorderCount: bigint;
    noServiceCount: bigint;
    errorCount: bigint;
  }[]>`
    WITH latest_checks AS (
      SELECT DISTINCT ON ("addressId")
        "addressId",
        "serviceabilityType",
        error
      FROM serviceability_checks
      ORDER BY "addressId", "checkedAt" DESC
    )
    SELECT
      atas."B" as "selectionId",
      COUNT(DISTINCT CASE WHEN lc."addressId" IS NOT NULL THEN a.id END) as "checkedCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'serviceable' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "serviceableCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'preorder' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "preorderCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'none' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "noServiceCount",
      COUNT(DISTINCT CASE WHEN lc.error IS NOT NULL AND lc.error != '' THEN a.id END) as "errorCount"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A"
    LEFT JOIN latest_checks lc ON a.id = lc."addressId"
    GROUP BY atas."B"
  `;

  const statsMap = new Map(
    selectionStatsRows.map((row) => [row.selectionId, row])
  );

  return selections.map((selection) => {
    const stats = statsMap.get(selection.id);
    const checkedCount = Number(stats?.checkedCount || 0);
    const totalAddresses = selection._count.addresses;

    return {
      ...selection,
      checkedCount,
      serviceableCount: Number(stats?.serviceableCount || 0),
      preorderCount: Number(stats?.preorderCount || 0),
      noServiceCount: Number(stats?.noServiceCount || 0),
      errorCount: Number(stats?.errorCount || 0),
      uncheckedCount: totalAddresses - checkedCount,
    };
  });
}

/**
 * Get addresses for a selection with pagination and filtering.
 */
export async function getSelectionAddresses(
  selectionId: string,
  page: number = 1,
  pageSize: number = 50,
  filter?: 'all' | 'serviceable' | 'not-serviceable' | 'unchecked'
) {
  const skip = (page - 1) * pageSize;

  if (filter === 'unchecked') {
    const where = {
      selections: { some: { id: selectionId } },
      checks: { none: {} },
    };

    const [addresses, total] = await Promise.all([
      prisma.address.findMany({
        where,
        include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
        orderBy: { addressString: 'asc' },
        skip,
        take: pageSize,
      }),
      prisma.address.count({ where }),
    ]);

    return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  if (filter === 'serviceable' || filter === 'not-serviceable') {
    const isServiceable = filter === 'serviceable';

    const [countResult] = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM addresses a
      INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A" AND atas."B" = ${selectionId}
      INNER JOIN LATERAL (
        SELECT serviceable
        FROM serviceability_checks sc
        WHERE sc."addressId" = a.id
        ORDER BY sc."checkedAt" DESC
        LIMIT 1
      ) lc ON true
      WHERE lc.serviceable = ${isServiceable}
    `;
    const total = Number(countResult?.count || 0);

    const pageRows = await prisma.$queryRaw<{ id: string }[]>`
      SELECT a.id
      FROM addresses a
      INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A" AND atas."B" = ${selectionId}
      INNER JOIN LATERAL (
        SELECT serviceable
        FROM serviceability_checks sc
        WHERE sc."addressId" = a.id
        ORDER BY sc."checkedAt" DESC
        LIMIT 1
      ) lc ON true
      WHERE lc.serviceable = ${isServiceable}
      ORDER BY a."addressString" ASC
      LIMIT ${pageSize} OFFSET ${skip}
    `;

    const addresses = pageRows.length > 0
      ? await prisma.address.findMany({
          where: { id: { in: pageRows.map((r) => r.id) } },
          include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
          orderBy: { addressString: 'asc' },
        })
      : [];

    return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  const where = {
    selections: { some: { id: selectionId } },
  };

  const [addresses, total] = await Promise.all([
    prisma.address.findMany({
      where,
      include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
      orderBy: { addressString: 'asc' },
      skip,
      take: pageSize,
    }),
    prisma.address.count({ where }),
  ]);

  return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}
