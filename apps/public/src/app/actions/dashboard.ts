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
    errorCount: number;
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
    provider: string | null;
  }[];
  hasActiveJobs: boolean;
  /** Provider ids that have at least one completed batch job with checks. */
  activeProviderIds: string[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const [sources, selections, totalAddresses, totalChecks, recentJobs, usedProviderRows] = await Promise.all([
      prisma.geoJSONSource.findMany({
        orderBy: { uploadedAt: 'desc' },
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
        take: 4,
      }),
      prisma.$queryRaw<{ provider: string }[]>`
        SELECT DISTINCT provider FROM batch_jobs WHERE provider IS NOT NULL
      `,
    ]);

    // ── Global serviceability stats ──
    // Single query using PostgreSQL DISTINCT ON + FILTER to replace 4 separate queries.
    // DISTINCT ON ("addressId") with ORDER BY "checkedAt" DESC picks the latest check per address.
    const globalStats = await prisma.$queryRaw<[{
      serviceableCount: bigint;
      preorderCount: bigint;
      noServiceCount: bigint;
      totalChecked: bigint;
    }]>`
      WITH latest_checks AS (
        SELECT DISTINCT ON ("addressId")
          "addressId",
          "serviceabilityType",
          error
        FROM serviceability_checks
        ORDER BY "addressId", "checkedAt" DESC
      )
      SELECT
        COUNT(*) FILTER (WHERE "serviceabilityType" = 'serviceable' AND (error IS NULL OR error = '')) as "serviceableCount",
        COUNT(*) FILTER (WHERE "serviceabilityType" = 'preorder' AND (error IS NULL OR error = '')) as "preorderCount",
        COUNT(*) FILTER (WHERE "serviceabilityType" = 'none' AND (error IS NULL OR error = '')) as "noServiceCount",
        COUNT(*) FILTER (WHERE error IS NULL OR error = '') as "totalChecked"
      FROM latest_checks
    `;

    const serviceableChecks = Number(globalStats[0]?.serviceableCount || 0);
    const preorderChecks = Number(globalStats[0]?.preorderCount || 0);
    const noServiceChecks = Number(globalStats[0]?.noServiceCount || 0);
    const totalCheckedAddresses = Number(globalStats[0]?.totalChecked || 0);

    // ── Per-selection stats ──
    // Single query for ALL selections replaces 5*N sequential queries (massive perf win).
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

    // Build a lookup map from the stats query
    const statsMap = new Map(
      selectionStatsRows.map((row) => [row.selectionId, row])
    );

    // Check for active jobs
    const activeJobCount = await prisma.batchJob.count({
      where: { status: { in: ['running', 'pending'] } },
    });

    // Merge selection metadata with computed stats
    const selectionsWithStats = selections.map((selection) => {
      const stats = statsMap.get(selection.id);
      const checkedCount = Number(stats?.checkedCount || 0);
      const totalAddr = selection._count.addresses;

      return {
        id: selection.id,
        name: selection.name,
        _count: selection._count,
        checkedCount,
        serviceableCount: Number(stats?.serviceableCount || 0),
        preorderCount: Number(stats?.preorderCount || 0),
        noServiceCount: Number(stats?.noServiceCount || 0),
        errorCount: Number(stats?.errorCount || 0),
        uncheckedCount: totalAddr - checkedCount,
      };
    });

    // Sort selections: active jobs first, then by creation date
    const sortedSelections = selectionsWithStats.sort((a, b) => {
      const aHasActiveJob = recentJobs.some(
        job => job.selectionId === a.id && ['running', 'pending', 'paused'].includes(job.status)
      );
      const bHasActiveJob = recentJobs.some(
        job => job.selectionId === b.id && ['running', 'pending', 'paused'].includes(job.status)
      );

      if (aHasActiveJob && !bHasActiveJob) return -1;
      if (!aHasActiveJob && bHasActiveJob) return 1;
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
      activeProviderIds: usedProviderRows.map((r) => r.provider),
    };
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
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
      activeProviderIds: [],
    };
  }
}
