import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  createBatchJob,
  getBatchJob,
  updateBatchJobStatus,
  recordServiceabilityCheck,
  getAddressesByServiceabilityType,
  getAddressesWithErrors,
} from '@/lib/batch-processor';
import { isServiceable, type ShopperResponse } from '@/lib/omni-decoder';
import { fetchShopperData } from '@/lib/omni-shopper-api';

const DELAY_MS = Number(process.env.BATCH_DELAY_MS ?? 250); // minimum spacing between request STARTs
const MAX_IN_FLIGHT = Number(process.env.BATCH_MAX_IN_FLIGHT ?? 10); // cap concurrent Omni requests
const STATUS_POLL_MS = Number(process.env.BATCH_STATUS_POLL_MS ?? 1000);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Route segment config
export const maxDuration = 300; // 5 minutes max for long-running batch jobs
export const dynamic = 'force-dynamic';

/**
 * POST /api/batch-check
 * Start or manage a batch checking job
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, selectionId, jobId, name, recheckType } = body;

    switch (action) {
      case 'start':
        return handleStart(selectionId, name, recheckType);
      case 'pause':
        return handlePause(jobId);
      case 'resume':
        return handleResume(jobId);
      case 'cancel':
        return handleCancel(jobId);
      case 'status':
        return handleStatus(jobId);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in batch-check:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function handleStart(selectionId: string, name: string, recheckType?: 'unchecked' | 'preorder' | 'noservice' | 'errors' | 'all') {
  if (!selectionId) {
    return NextResponse.json({ error: 'Selection ID is required' }, { status: 400 });
  }

  // Check if there's already a running or pending job for this selection
  const existingJob = await prisma.batchJob.findFirst({
    where: {
      selectionId,
      status: { in: ['running', 'pending'] },
    },
  });

  if (existingJob) {
    return NextResponse.json(
      { error: 'A job is already in progress for this selection. Please wait or cancel it first.' },
      { status: 409 }
    );
  }

  // Get addresses based on recheck type.
  // All filtering is pushed to the database via LATERAL JOINs.
  let addresses: { id: string }[];
  const recheckMode = recheckType || 'unchecked';
  
  if (recheckMode === 'preorder') {
    const preorderAddresses = await getAddressesByServiceabilityType(selectionId, 'preorder');
    addresses = preorderAddresses.map(a => ({ id: a.id }));
  } else if (recheckMode === 'noservice') {
    const noServiceAddresses = await getAddressesByServiceabilityType(selectionId, 'none');
    addresses = noServiceAddresses.map(a => ({ id: a.id }));
  } else if (recheckMode === 'errors') {
    // Use the new DB-level error filtering instead of loading all + filtering in memory
    const errorAddresses = await getAddressesWithErrors(selectionId);
    addresses = errorAddresses.map(a => ({ id: a.id }));
  } else if (recheckMode === 'all') {
    addresses = await prisma.address.findMany({
      where: {
        selections: { some: { id: selectionId } },
      },
      select: { id: true },
    });
  } else {
    // Default: only unchecked addresses
    addresses = await prisma.address.findMany({
      where: {
        selections: { some: { id: selectionId } },
        checks: { none: {} },
      },
      select: { id: true },
    });
  }

  if (addresses.length === 0) {
    const messageMap = {
      'preorder': 'No preorder addresses found to re-check.',
      'noservice': 'No addresses with no service found to re-check.',
      'errors': 'No addresses with errors found to re-check.',
      'all': 'No addresses in selection.',
      'unchecked': 'All addresses in this selection have already been checked.'
    };
    return NextResponse.json(
      { error: messageMap[recheckMode] },
      { status: 400 }
    );
  }

  // Create batch job with descriptive name
  const jobName = name || `${recheckMode === 'preorder' ? 'Re-check Preorder' : recheckMode === 'noservice' ? 'Re-check No Service' : recheckMode === 'errors' ? 'Re-check Errors' : recheckMode === 'all' ? 'Re-check All' : 'Check Unchecked'} - ${new Date().toLocaleString()}`;
  
  const job = await createBatchJob(
    jobName,
    selectionId,
    addresses.map((a) => a.id),
    recheckMode
  );

  // Start processing in background (non-blocking)
  processBatchInBackground(job.id, selectionId);

  return NextResponse.json({
    success: true,
    job,
  });
}

async function handlePause(jobId: string) {
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  // Update status to paused - the processing loop will check this
  await updateBatchJobStatus(jobId, 'paused');

  const job = await getBatchJob(jobId);
  return NextResponse.json({ success: true, job });
}

async function handleCancel(jobId: string) {
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  // Update status to cancelled
  await prisma.batchJob.update({
    where: { id: jobId },
    data: { 
      status: 'cancelled',
      completedAt: new Date(),
    },
  });

  const job = await getBatchJob(jobId);
  return NextResponse.json({ success: true, job });
}

async function handleResume(jobId: string) {
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  const batchJob = await prisma.batchJob.findUnique({ where: { id: jobId } });
  if (!batchJob) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  if (!batchJob.selectionId) {
    return NextResponse.json({ error: 'No selection associated with job' }, { status: 400 });
  }

  // Check if there's already a running job
  const runningJob = await prisma.batchJob.findFirst({
    where: {
      selectionId: batchJob.selectionId,
      status: 'running',
      id: { not: jobId },
    },
  });

  if (runningJob) {
    return NextResponse.json(
      { error: 'Another job is already running for this selection.' },
      { status: 409 }
    );
  }

  // Resume processing
  await updateBatchJobStatus(jobId, 'running');
  processBatchInBackground(jobId, batchJob.selectionId);

  const job = await getBatchJob(jobId);
  return NextResponse.json({ success: true, job });
}

async function handleStatus(jobId: string) {
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  const job = await getBatchJob(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  // Get recent checks for this job (last 50)
  const batchJob = await prisma.batchJob.findUnique({ where: { id: jobId } });
  const recentChecks = await prisma.serviceabilityCheck.findMany({
    where: {
      selectionId: batchJob?.selectionId,
      checkedAt: {
        gte: batchJob?.startedAt || new Date(0),
      },
    },
    include: {
      address: {
        select: {
          addressString: true,
        },
      },
    },
    orderBy: { checkedAt: 'desc' },
    take: 50,
  });

  const logs = recentChecks.map((check) => ({
    id: check.id,
    address: check.address.addressString,
    serviceable: check.serviceable,
    serviceabilityType: check.serviceabilityType,
    status: check.status,
    error: check.error,
    time: check.checkedAt,
  }));

  return NextResponse.json({ job, logs });
}

/**
 * Start batch processing in background (fire and forget)
 */
function processBatchInBackground(jobId: string, selectionId: string) {
  // Use setImmediate to not block the response
  setImmediate(() => {
    processBatch(jobId, selectionId).catch(async (error) => {
      console.error('Batch processing error:', error);
      try {
        await updateBatchJobStatus(jobId, 'failed');
      } catch (e) {
        console.error('Failed to update job status:', e);
      }
    });
  });
}

async function processBatch(jobId: string, selectionId: string) {
  console.log(`Starting batch processing for job ${jobId}`);
  
  // Get the current job state
  const job = await prisma.batchJob.findUnique({ where: { id: jobId } });
  if (!job) {
    console.log('Job not found, exiting');
    return;
  }

  // Update status to 'running' now that processing has started
  await updateBatchJobStatus(jobId, 'running');
  console.log(`Job ${jobId} status updated to 'running'`);

  // Get addresses based on the job's recheck type.
  // All filtering uses DB-level queries (LATERAL JOINs) instead of in-memory filtering.
  let addresses: { id: string; addressString: string }[];
  const recheckType = job.recheckType || 'unchecked';
  
  if (recheckType === 'preorder') {
    addresses = await getAddressesByServiceabilityType(selectionId, 'preorder');
  } else if (recheckType === 'noservice') {
    addresses = await getAddressesByServiceabilityType(selectionId, 'none');
  } else if (recheckType === 'errors') {
    addresses = await getAddressesWithErrors(selectionId);
  } else if (recheckType === 'all') {
    addresses = await prisma.address.findMany({
      where: {
        selections: { some: { id: selectionId } },
      },
      select: {
        id: true,
        addressString: true,
      },
      orderBy: { id: 'asc' },
    });
  } else {
    // Default: only unchecked addresses
    addresses = await prisma.address.findMany({
      where: {
        selections: { some: { id: selectionId } },
        checks: { none: {} },
      },
      select: {
        id: true,
        addressString: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  console.log(`Found ${addresses.length} addresses to check (mode: ${recheckType})`);

  // Rate-limited scheduler: start a new Omni request every DELAY_MS (start-to-start),
  // while allowing a small amount of concurrency so long requests don't stall throughput.
  const inFlight = new Set<Promise<void>>();
  let lastStartAt = 0;
  let lastStatusCheckAt = 0;

  const awaitAny = async () => {
    if (inFlight.size === 0) return;
    await Promise.race(inFlight);
  };

  const checkJobStillRunnable = async () => {
    const now = Date.now();
    if (now - lastStatusCheckAt < STATUS_POLL_MS) return true;
    lastStatusCheckAt = now;

    const currentJob = await prisma.batchJob.findUnique({
      where: { id: jobId },
      select: { status: true },
    });

    if (!currentJob || currentJob.status === 'paused' || currentJob.status === 'cancelled') {
      console.log(`Job ${jobId} was ${currentJob?.status || 'deleted'}, stopping processing`);
      return false;
    }

    return true;
  };

  const runOne = async (address: { id: string; addressString: string }, i: number) => {
    const started = Date.now();
    try {
      console.log(`[${i + 1}/${addresses.length}] Checking: ${address.addressString}`);

      const shopperData = await fetchShopperData(address.addressString);
      if (!shopperData) {
        const msg = 'Failed to fetch data from API';
        console.log(`  -> API ERROR: ${msg} (recording error + advancing progress)`);
        try {
          await recordServiceabilityCheck(address.id, jobId, selectionId, null, msg);
        } catch (dbErr) {
          console.error(`Failed to record API error for ${address.addressString}:`, dbErr);
        }
        return;
      }

      const serviceabilityResult = isServiceable(shopperData as ShopperResponse);

      await recordServiceabilityCheck(
        address.id,
        jobId,
        selectionId,
        serviceabilityResult
      );

      const elapsed = Date.now() - started;
      console.log(
        `  -> ${serviceabilityResult.serviceabilityType}: ${serviceabilityResult.serviceable ? 'SERVICEABLE' : 'Not serviceable'} (${elapsed}ms)`
      );
    } catch (error) {
      console.error(`Error checking address ${address.addressString}:`, error);
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.log(`  -> ERROR: ${msg} (recording error + advancing progress)`);
      try {
        await recordServiceabilityCheck(address.id, jobId, selectionId, null, msg);
      } catch (dbErr) {
        console.error(`Failed to record error for ${address.addressString}:`, dbErr);
      }
    }
  };

  for (let i = 0; i < addresses.length; ) {
    const runnable = await checkJobStillRunnable();
    if (!runnable) return;

    if (inFlight.size >= Math.max(1, MAX_IN_FLIGHT)) {
      await awaitAny();
      continue;
    }

    const now = Date.now();
    const nextStartAt = lastStartAt ? lastStartAt + Math.max(0, DELAY_MS) : now;
    const waitMs = Math.max(0, nextStartAt - now);
    if (waitMs > 0) {
      await sleep(waitMs);
    }

    const address = addresses[i];
    const p = runOne(address, i).finally(() => {
      inFlight.delete(p);
    });
    inFlight.add(p);
    lastStartAt = Date.now();
    i++;
  }

  // Wait for any remaining in-flight checks to finish.
  await Promise.allSettled([...inFlight]);

  // Mark as completed
  console.log(`Job ${jobId} completed`);
  await updateBatchJobStatus(jobId, 'completed');
}

/**
 * GET /api/batch-check
 * Get all batch jobs
 */
export async function GET() {
  try {
    const jobs = await prisma.batchJob.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Add running job info
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
