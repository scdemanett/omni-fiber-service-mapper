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
  // This ensures we don't count duplicates from rechecks
  const allAddresses = await prisma.address.findMany({
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
      },
    },
  });

  // Count addresses by their latest check status, excluding addresses with errors
  const serviceableChecks = allAddresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'serviceable' && !a.checks[0]?.error
  ).length;
  const preorderChecks = allAddresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'preorder' && !a.checks[0]?.error
  ).length;
  const noServiceChecks = allAddresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'none' && !a.checks[0]?.error
  ).length;

  // Check for active jobs
  const activeJobCount = await prisma.batchJob.count({
    where: { status: { in: ['running', 'pending'] } },
  });

  // Get stats per selection with error handling
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      try {
        // Get addresses for this selection with their latest check
        const addresses = await prisma.address.findMany({
          where: {
            selections: { some: { id: selection.id } },
          },
          include: {
            checks: {
              orderBy: { checkedAt: 'desc' },
              take: 1,
            },
          },
        });

        // Count addresses by their latest check status (excluding errors)
        const checkedCount = addresses.filter((a) => a.checks.length > 0 && !a.checks[0]?.error).length;
        const serviceableCount = addresses.filter(
          (a) => a.checks[0]?.serviceabilityType === 'serviceable' && !a.checks[0]?.error
        ).length;
        const preorderCount = addresses.filter(
          (a) => a.checks[0]?.serviceabilityType === 'preorder' && !a.checks[0]?.error
        ).length;
        const noServiceCount = addresses.filter(
          (a) => a.checks[0]?.serviceabilityType === 'none' && !a.checks[0]?.error
        ).length;

        return {
          id: selection.id,
          name: selection.name,
          _count: selection._count,
          checkedCount,
          serviceableCount,
          preorderCount,
          noServiceCount,
          uncheckedCount: addresses.length - checkedCount,
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

    return {
      sources,
      selections: selectionsWithStats,
      totalAddresses,
      totalChecks,
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
      serviceableChecks: 0,
      preorderChecks: 0,
      noServiceChecks: 0,
      recentJobs: [],
      hasActiveJobs: false,
    };
  }
}

