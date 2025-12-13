/**
 * Batch Processor - Resilient batch checking with resume capability
 */

import { prisma } from './db';
import type { ServiceabilityResult } from './omni-decoder';

export interface BatchProgress {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  totalAddresses: number;
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  currentIndex: number;
  startedAt?: Date;
  completedAt?: Date;
  lastCheckAt?: Date;
  selectionId?: string;
}

export interface AddressToCheck {
  id: string;
  addressString: string;
}

/**
 * Create a new batch job for a selection
 */
export async function createBatchJob(
  name: string,
  selectionId: string | null,
  addressIds: string[],
  recheckType?: string
): Promise<BatchProgress> {
  const job = await prisma.batchJob.create({
    data: {
      name,
      selectionId,
      status: 'pending',
      recheckType: recheckType || 'unchecked',
      totalAddresses: addressIds.length,
      checkedCount: 0,
      serviceableCount: 0,
      preorderCount: 0,
      noServiceCount: 0,
      currentIndex: 0,
    },
  });

  return {
    id: job.id,
    name: job.name,
    status: job.status as BatchProgress['status'],
    totalAddresses: job.totalAddresses,
    checkedCount: job.checkedCount,
    serviceableCount: job.serviceableCount,
    preorderCount: job.preorderCount,
    noServiceCount: job.noServiceCount,
    currentIndex: job.currentIndex,
    startedAt: job.startedAt ?? undefined,
    completedAt: job.completedAt ?? undefined,
    lastCheckAt: job.lastCheckAt ?? undefined,
  };
}

/**
 * Get batch job progress
 */
export async function getBatchJob(jobId: string): Promise<BatchProgress | null> {
  const job = await prisma.batchJob.findUnique({
    where: { id: jobId },
  });

  if (!job) return null;

  return {
    id: job.id,
    name: job.name,
    status: job.status as BatchProgress['status'],
    totalAddresses: job.totalAddresses,
    checkedCount: job.checkedCount,
    serviceableCount: job.serviceableCount,
    preorderCount: job.preorderCount,
    noServiceCount: job.noServiceCount,
    currentIndex: job.currentIndex,
    startedAt: job.startedAt ?? undefined,
    completedAt: job.completedAt ?? undefined,
    lastCheckAt: job.lastCheckAt ?? undefined,
    selectionId: job.selectionId ?? undefined,
  };
}

/**
 * Update batch job status
 */
export async function updateBatchJobStatus(
  jobId: string,
  status: BatchProgress['status'],
  updates?: Partial<Pick<BatchProgress, 'currentIndex' | 'checkedCount' | 'serviceableCount' | 'preorderCount' | 'noServiceCount'>>
): Promise<void> {
  await prisma.batchJob.update({
    where: { id: jobId },
    data: {
      status,
      ...(status === 'running' && { startedAt: new Date() }),
      ...(status === 'completed' && { completedAt: new Date() }),
      ...updates,
    },
  });
}

/**
 * Record a serviceability check result
 * 
 * All necessary data is extracted and stored in individual fields.
 * We don't store the full API response to avoid UTF-8 corruption issues and save space.
 */
export async function recordServiceabilityCheck(
  addressId: string,
  jobId: string,
  selectionId: string | null,
  result: ServiceabilityResult | null,
  error?: string
): Promise<void> {
  const hasError = (error ?? '').trim().length > 0;
  const safeResult: ServiceabilityResult = result ?? {
    serviceable: false,
    serviceabilityType: 'none',
  };

  // Only increment the serviceability buckets for successful (non-error) attempts.
  // Errors are tracked in ServiceabilityCheck.error and can be rechecked via recheckType='errors'.
  const incrementServiceable = !hasError && safeResult.serviceabilityType === 'serviceable' ? 1 : 0;
  const incrementPreorder = !hasError && safeResult.serviceabilityType === 'preorder' ? 1 : 0;
  const incrementNoService = !hasError && safeResult.serviceabilityType === 'none' ? 1 : 0;

  // One transaction: write the check + atomically increment batch counters.
  await prisma.$transaction([
    prisma.serviceabilityCheck.create({
      data: {
        addressId,
        selectionId: selectionId ?? undefined,
        serviceable: safeResult.serviceable,
        serviceabilityType: safeResult.serviceabilityType,
        salesType: safeResult.salesType,
        status: safeResult.status,
        cstatus: safeResult.cstatus,
        isPreSale: safeResult.isPreSale,
        salesStatus: safeResult.salesStatus,
        matchType: safeResult.matchType,
        apiCreateDate: safeResult.apiCreateDate ? new Date(safeResult.apiCreateDate) : null,
        apiUpdateDate: safeResult.apiUpdateDate ? new Date(safeResult.apiUpdateDate) : null,
        error: hasError ? error!.substring(0, 1000) : null, // Limit error message length
      },
    }),
    prisma.batchJob.update({
      where: { id: jobId },
      data: {
        // checkedCount/currentIndex represent attempted addresses (success OR failure)
        checkedCount: { increment: 1 },
        serviceableCount: { increment: incrementServiceable },
        preorderCount: { increment: incrementPreorder },
        noServiceCount: { increment: incrementNoService },
        currentIndex: { increment: 1 },
        lastCheckAt: new Date(),
      },
    }),
  ]);
}

/**
 * Get addresses for a selection that haven't been checked yet
 */
export async function getUncheckedAddresses(
  selectionId: string,
  limit?: number
): Promise<AddressToCheck[]> {
  const addresses = await prisma.address.findMany({
    where: {
      selections: {
        some: { id: selectionId },
      },
      checks: {
        none: {},
      },
    },
    select: {
      id: true,
      addressString: true,
    },
    take: limit,
  });

  return addresses;
}

/**
 * Get addresses from a selection that were not serviceable in the last check
 */
export async function getNonServiceableAddresses(
  selectionId: string,
  limit?: number
): Promise<AddressToCheck[]> {
  // Get all addresses in the selection with their latest check
  const addresses = await prisma.address.findMany({
    where: {
      selections: {
        some: { id: selectionId },
      },
    },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
      },
    },
    take: limit,
  });

  // Filter to only those whose latest check was not serviceable
  return addresses
    .filter((addr) => {
      const latestCheck = addr.checks[0];
      return !latestCheck || !latestCheck.serviceable;
    })
    .map((addr) => ({
      id: addr.id,
      addressString: addr.addressString,
    }));
}

/**
 * Get addresses from a selection by their serviceability type in the last check
 */
export async function getAddressesByServiceabilityType(
  selectionId: string,
  serviceabilityType: 'serviceable' | 'preorder' | 'none',
  limit?: number
): Promise<AddressToCheck[]> {
  // Get all addresses in the selection with their latest check
  const addresses = await prisma.address.findMany({
    where: {
      selections: {
        some: { id: selectionId },
      },
    },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
      },
    },
    take: limit,
  });

  // Filter to only those whose latest check matches the serviceability type
  return addresses
    .filter((addr) => {
      const latestCheck = addr.checks[0];
      return latestCheck && latestCheck.serviceabilityType === serviceabilityType;
    })
    .map((addr) => ({
      id: addr.id,
      addressString: addr.addressString,
    }));
}

/**
 * Get all batch jobs
 */
export async function getAllBatchJobs(): Promise<BatchProgress[]> {
  const jobs = await prisma.batchJob.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return jobs.map((job) => ({
    id: job.id,
    name: job.name,
    status: job.status as BatchProgress['status'],
    totalAddresses: job.totalAddresses,
    checkedCount: job.checkedCount,
    serviceableCount: job.serviceableCount,
    preorderCount: job.preorderCount,
    noServiceCount: job.noServiceCount,
    currentIndex: job.currentIndex,
    startedAt: job.startedAt ?? undefined,
    completedAt: job.completedAt ?? undefined,
    lastCheckAt: job.lastCheckAt ?? undefined,
    selectionId: job.selectionId ?? undefined,
  }));
}

/**
 * Get addresses to check for a batch job (with resume capability)
 */
export async function getAddressesForBatchJob(
  jobId: string,
  selectionId: string | null
): Promise<AddressToCheck[]> {
  const job = await prisma.batchJob.findUnique({ where: { id: jobId } });
  if (!job) return [];

  // If resuming, get addresses from current index
  if (selectionId) {
    const addresses = await prisma.address.findMany({
      where: {
        selections: {
          some: { id: selectionId },
        },
      },
      select: {
        id: true,
        addressString: true,
      },
      orderBy: { id: 'asc' },
      skip: job.currentIndex,
    });

    return addresses;
  }

  return [];
}

