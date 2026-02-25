import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/batch-check
 * Read-only: returns current batch job statuses for map polling.
 */
export async function GET() {
  try {
    const jobs = await prisma.batchJob.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const jobsWithRunning = jobs.map(job => ({
      ...job,
      isRunning: job.status === 'running',
    }));

    return NextResponse.json({ jobs: jobsWithRunning });
  } catch (error) {
    console.error('Error getting batch jobs:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
