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

  // Get stats per selection
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      const addresses = await prisma.address.findMany({
        where: { selections: { some: { id: selection.id } } },
        include: {
          checks: {
            orderBy: { checkedAt: 'desc' },
            take: 1,
          },
        },
      });

      const checkedCount = addresses.filter((a) => a.checks.length > 0).length;
      const serviceableCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'serviceable').length;
      const preorderCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'preorder').length;
      const noServiceCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'none').length;

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
}

