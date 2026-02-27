'use server';

import { prisma } from '@/lib/db';

export interface RunSummary {
  id: string;
  name: string;
  status: string;
  provider: string | null;
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
      provider: true,
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
 * Delete a batch run and all serviceability checks that belong to it.
 *
 * Primary path: delete checks by batchJobId (exact, no risk of affecting other runs).
 * Legacy fallback: for checks that predate the batchJobId column (batch_job_id IS NULL),
 * use a narrow time-range bounded by startedAt/completedAt as a best-effort cleanup.
 */
export async function deleteRun(jobId: string): Promise<void> {
  const job = await prisma.batchJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error('Run not found');

  const primaryDelete = prisma.serviceabilityCheck.deleteMany({
    where: { batchJobId: jobId },
  });

  // Legacy fallback: delete un-tagged checks that fall in this job's time window
  // (only applies to checks created before the batchJobId column was added)
  const anchor = job.completedAt ?? job.lastCheckAt;
  const legacyDeletes = anchor
    ? [prisma.serviceabilityCheck.deleteMany({
        where: {
          batchJobId: null,
          selectionId: job.selectionId ?? undefined,
          checkedAt: {
            gte: job.startedAt ?? new Date(anchor.getTime() - 48 * 60 * 60 * 1000),
            lte: anchor,
          },
        },
      })]
    : [];

  await prisma.$transaction([
    primaryDelete,
    ...legacyDeletes,
    prisma.batchJob.delete({ where: { id: jobId } }),
  ]);
}
