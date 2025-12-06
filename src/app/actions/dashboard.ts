'use server';

import { prisma } from '@/lib/db';

export interface DashboardStats {
  sources: {
    id: string;
    name: string;
    fileName: string;
    uploadedAt: Date;
    _count: { addresses: number };
  }[];
  selections: {
    id: string;
    name: string;
    _count: { addresses: number };
    checkedCount: number;
    serviceableCount: number;
    preorderCount: number;
    noServiceCount: number;
    uncheckedCount: number;
  }[];
  totalAddresses: number;
  totalChecks: number;
  totalCheckedAddresses: number;
  serviceableChecks: number;
  preorderChecks: number;
  noServiceChecks: number;
  recentJobs: {
    id: string;
    name: string;
    status: string;
    totalAddresses: number;
    checkedCount: number;
    serviceableCount: number;
    preorderCount: number;
    noServiceCount: number;
    createdAt: Date;
    selectionId: string | null;
  }[];
  hasActiveJobs: boolean;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [sources, selections, totalAddresses, totalChecks, recentJobs] = await Promise.all([
      prisma.geoJSONSource.findMany({
        orderBy: { uploadedAt: 'desc' },
        take: 5,
        include: { _count: { select: { addresses: true } } },
      }),
      prisma.addressSelection.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { addresses: true } } },
      }),
      prisma.address.count(),
      prisma.serviceabilityCheck.count(),
      prisma.batchJob.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

  // Get serviceability stats by counting unique addresses with their latest check
  // For large datasets, we need to be more efficient and avoid loading all addresses at once
  // Use raw queries for better performance with large datasets
  // Note: SQLite COUNT returns BigInt, so we need to convert to number
  const serviceableChecks = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(DISTINCT a.id) as count
    FROM addresses a
    INNER JOIN (
      SELECT addressId, MAX(checkedAt) as maxDate
      FROM serviceability_checks
      GROUP BY addressId
    ) latest ON a.id = latest.addressId
    INNER JOIN serviceability_checks sc ON sc.addressId = latest.addressId AND sc.checkedAt = latest.maxDate
    WHERE sc.serviceabilityType = 'serviceable' AND (sc.error IS NULL OR sc.error = '')
  `.then(result => Number(result[0]?.count || 0));

  const preorderChecks = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(DISTINCT a.id) as count
    FROM addresses a
    INNER JOIN (
      SELECT addressId, MAX(checkedAt) as maxDate
      FROM serviceability_checks
      GROUP BY addressId
    ) latest ON a.id = latest.addressId
    INNER JOIN serviceability_checks sc ON sc.addressId = latest.addressId AND sc.checkedAt = latest.maxDate
    WHERE sc.serviceabilityType = 'preorder' AND (sc.error IS NULL OR sc.error = '')
  `.then(result => Number(result[0]?.count || 0));

  const noServiceChecks = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(DISTINCT a.id) as count
    FROM addresses a
    INNER JOIN (
      SELECT addressId, MAX(checkedAt) as maxDate
      FROM serviceability_checks
      GROUP BY addressId
    ) latest ON a.id = latest.addressId
    INNER JOIN serviceability_checks sc ON sc.addressId = latest.addressId AND sc.checkedAt = latest.maxDate
    WHERE sc.serviceabilityType = 'none' AND (sc.error IS NULL OR sc.error = '')
  `.then(result => Number(result[0]?.count || 0));
  
  // Count unique addresses that have been checked (for accurate percentages)
  const totalCheckedAddresses = await prisma.$queryRaw<[{ count: bigint }]>`
    SELECT COUNT(DISTINCT addressId) as count
    FROM serviceability_checks
    WHERE error IS NULL OR error = ''
  `.then(result => Number(result[0]?.count || 0));

  // Check for active jobs
  const activeJobCount = await prisma.batchJob.count({
    where: { status: { in: ['running', 'pending'] } },
  });

  // Get stats per selection with error handling
  // Use optimized queries for large datasets
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      try {
        const selectionId = selection.id;
        
        // Use raw queries for better performance with large selections
        // Convert BigInt to number for JavaScript arithmetic
        const checkedCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const serviceableCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'serviceable'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const preorderCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'preorder'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const noServiceCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'none'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const totalAddresses = selection._count.addresses;
        const uncheckedCount = totalAddresses - checkedCount;

        return {
          id: selection.id,
          name: selection.name,
          _count: selection._count,
          checkedCount,
          serviceableCount,
          preorderCount,
          noServiceCount,
          uncheckedCount,
        };
      } catch (error) {
        console.error(`Error loading stats for selection ${selection.id}:`, error);
        // Return safe default values if there's an error
        return {
          id: selection.id,
          name: selection.name,
          _count: selection._count,
          checkedCount: 0,
          serviceableCount: 0,
          preorderCount: 0,
          noServiceCount: 0,
          uncheckedCount: 0,
        };
      }
    })
  );

  // Sort selections: active jobs first, then by creation date
  const sortedSelections = selectionsWithStats.sort((a, b) => {
    // Check if selection has an active job (running, pending, or paused)
    const aHasActiveJob = recentJobs.some(
      job => job.selectionId === a.id && ['running', 'pending', 'paused'].includes(job.status)
    );
    const bHasActiveJob = recentJobs.some(
      job => job.selectionId === b.id && ['running', 'pending', 'paused'].includes(job.status)
    );
    
    // If one has active job and the other doesn't, prioritize the one with active job
    if (aHasActiveJob && !bHasActiveJob) return -1;
    if (!aHasActiveJob && bHasActiveJob) return 1;
    
    // Otherwise, maintain creation date order (already sorted from query)
    return 0;
  });

    return {
      sources,
      selections: sortedSelections,
      totalAddresses,
      totalChecks,
      totalCheckedAddresses,
      serviceableChecks,
      preorderChecks,
      noServiceChecks,
      recentJobs,
      hasActiveJobs: activeJobCount > 0,
    };
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    // Return safe defaults if there's a catastrophic error
    return {
      sources: [],
      selections: [],
      totalAddresses: 0,
      totalChecks: 0,
      totalCheckedAddresses: 0,
      serviceableChecks: 0,
      preorderChecks: 0,
      noServiceChecks: 0,
      recentJobs: [],
      hasActiveJobs: false,
    };
  }
}

