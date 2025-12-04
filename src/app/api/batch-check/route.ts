import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  createBatchJob,
  getBatchJob,
  updateBatchJobStatus,
  recordServiceabilityCheck,
  getAddressesByServiceabilityType,
} from '@/lib/batch-processor';
import { isServiceable, type ShopperResponse } from '@/lib/omni-decoder';

const DELAY_MS = 2000; // 2 seconds between requests

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

async function handleStart(selectionId: string, name: string, recheckType?: 'unchecked' | 'preorder' | 'all') {
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

  // Get addresses based on recheck type
  let addresses;
  const recheckMode = recheckType || 'unchecked';
  
  if (recheckMode === 'preorder') {
    // Re-check only addresses that were preorder in their last check
    const preorderAddresses = await getAddressesByServiceabilityType(selectionId, 'preorder');
    addresses = preorderAddresses.map(a => ({ id: a.id }));
  } else if (recheckMode === 'all') {
    // Check all addresses (useful for re-checking everything)
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
        checks: { none: {} }, // Only addresses without any checks
      },
      select: { id: true },
    });
  }

  if (addresses.length === 0) {
    const messageMap = {
      'preorder': 'No preorder addresses found to re-check.',
      'all': 'No addresses in selection.',
      'unchecked': 'All addresses in this selection have already been checked.'
    };
    return NextResponse.json(
      { error: messageMap[recheckMode] },
      { status: 400 }
    );
  }

  // Create batch job with descriptive name
  const jobName = name || `${recheckMode === 'preorder' ? 'Re-check Preorder' : recheckMode === 'all' ? 'Re-check All' : 'Check Unchecked'} - ${new Date().toLocaleString()}`;
  
  const job = await createBatchJob(
    jobName,
    selectionId,
    addresses.map((a) => a.id)
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

  // Get unchecked addresses for the selection (starting from current index)
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
      checks: { none: {} }, // Only addresses without checks
    },
    select: {
      id: true,
      addressString: true,
    },
    orderBy: { id: 'asc' },
  });

  console.log(`Found ${addresses.length} unchecked addresses`);

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];
    
    // Check job status before each address - allows pause/cancel to take effect
    const currentJob = await prisma.batchJob.findUnique({ 
      where: { id: jobId },
      select: { status: true },
    });

    if (!currentJob || currentJob.status === 'paused' || currentJob.status === 'cancelled') {
      console.log(`Job ${jobId} was ${currentJob?.status || 'deleted'}, stopping processing`);
      return;
    }

    try {
      console.log(`[${i + 1}/${addresses.length}] Checking: ${address.addressString}`);
      
      // Call the check-serviceability API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/check-serviceability`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: address.addressString }),
        }
      );

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const result = await response.json();
      
      // Validate result structure
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid API response structure');
      }

      const serviceabilityResult = isServiceable(result.fullResponse as ShopperResponse);

      // Record the result
      await recordServiceabilityCheck(
        address.id,
        jobId,
        serviceabilityResult,
        result.error
      );

      console.log(`  -> ${serviceabilityResult.serviceabilityType}: ${serviceabilityResult.serviceable ? 'SERVICEABLE' : 'Not serviceable'}`);

      // Wait between requests (respecting rate limits)
      if (i < addresses.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      }
    } catch (error) {
      console.error(`Error checking address ${address.addressString}:`, error);
      // Record the error but continue
      try {
        await recordServiceabilityCheck(
          address.id,
          jobId,
          { serviceable: false, serviceabilityType: 'none' },
          error instanceof Error ? error.message.substring(0, 500) : 'Unknown error'
        );
      } catch (e) {
        console.error('Failed to record error:', e);
        // If we can't even record the error, log it and continue
        // This prevents the entire batch from failing due to one bad record
      }
    }
  }

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
