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

  // Get serviceability stats by type
  const [serviceableChecks, preorderChecks, noServiceChecks] = await Promise.all([
    prisma.serviceabilityCheck.count({ where: { serviceabilityType: 'serviceable' } }),
    prisma.serviceabilityCheck.count({ where: { serviceabilityType: 'preorder' } }),
    prisma.serviceabilityCheck.count({ where: { serviceabilityType: 'none' } }),
  ]);

  // Check for active jobs
  const activeJobCount = await prisma.batchJob.count({
    where: { status: { in: ['running', 'pending'] } },
  });

  // Get stats per selection with error handling
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      try {
        // Use aggregation instead of loading full records to avoid UTF-8 issues
        const totalAddresses = await prisma.address.count({
          where: { selections: { some: { id: selection.id } } },
        });

        // Count checks by serviceability type
        const [serviceableCount, preorderCount, noServiceCount] = await Promise.all([
          prisma.serviceabilityCheck.count({
            where: {
              selectionId: selection.id,
              serviceabilityType: 'serviceable',
              checkedAt: {
                gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // Last year
              },
            },
          }),
          prisma.serviceabilityCheck.count({
            where: {
              selectionId: selection.id,
              serviceabilityType: 'preorder',
              checkedAt: {
                gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
              },
            },
          }),
          prisma.serviceabilityCheck.count({
            where: {
              selectionId: selection.id,
              serviceabilityType: 'none',
              checkedAt: {
                gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
              },
            },
          }),
        ]);

        // Get count of unique addresses that have been checked
        const checkedAddressIds = await prisma.serviceabilityCheck.findMany({
          where: { selectionId: selection.id },
          select: { addressId: true },
          distinct: ['addressId'],
        });
        const checkedCount = checkedAddressIds.length;

        return {
          id: selection.id,
          name: selection.name,
          _count: selection._count,
          checkedCount,
          serviceableCount,
          preorderCount,
          noServiceCount,
          uncheckedCount: totalAddresses - checkedCount,
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

