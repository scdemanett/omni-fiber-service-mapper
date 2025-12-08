'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Play,
  Pause,
  RotateCcw,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Activity,
  List,
  XCircle,
  StopCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSelections } from '@/app/actions/selections';
import { Suspense } from 'react';
import { usePolling } from '@/lib/polling-context';
import { useSelection } from '@/lib/selection-context';

interface Selection {
  id: string;
  name: string;
  _count: { addresses: number };
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  errorCount: number;
  uncheckedCount: number;
}

interface BatchJob {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  totalAddresses: number;
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  currentIndex: number;
  startedAt?: string;
  completedAt?: string;
  lastCheckAt?: string;
  selectionId?: string;
}

interface LogEntry {
  id: string;
  time: Date;
  address: string;
  serviceable: boolean;
  serviceabilityType?: string;
  status?: string;
  error?: string;
}

function CheckerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedId = searchParams.get('selection');
  const { pollingEnabled } = usePolling();
  const { selectedCampaignId, setSelectedCampaignId } = useSelection();

  const [selections, setSelections] = useState<Selection[]>([]);
  // Prioritize URL param, then context, then empty string
  const [selectedSelectionId, setSelectedSelectionId] = useState<string>(
    preselectedId || selectedCampaignId || ''
  );
  const [currentJob, setCurrentJob] = useState<BatchJob | null>(null);
  const [allJobs, setAllJobs] = useState<BatchJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [recheckType, setRecheckType] = useState<'unchecked' | 'preorder' | 'noservice' | 'errors' | 'all'>('unchecked');
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const loadSelections = useCallback(async () => {
    try {
      const data = await getSelections();
      setSelections(data as Selection[]);
    } catch (error) {
      console.error('Error loading selections:', error);
      toast.error('Failed to load selections');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadJobs = useCallback(async () => {
    try {
      const response = await fetch('/api/batch-check');
      const data = await response.json();
      if (data.jobs) {
        setAllJobs(data.jobs);
        // currentJob will be set by the useEffect that watches selectedSelectionId and allJobs
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  }, []); // No dependencies - only load jobs on mount and when explicitly called

  useEffect(() => {
    loadSelections();
    loadJobs();
  }, [loadSelections, loadJobs]);

  useEffect(() => {
    if (preselectedId) {
      setSelectedSelectionId(preselectedId);
      setSelectedCampaignId(preselectedId); // Sync with context
    } else if (selectedCampaignId && !selectedSelectionId) {
      // If no URL param but we have a context value, use it
      setSelectedSelectionId(selectedCampaignId);
    }
  }, [preselectedId, selectedCampaignId, setSelectedCampaignId, selectedSelectionId]);

  // Update currentJob when selectedSelectionId or allJobs changes
  useEffect(() => {
    if (selectedSelectionId && allJobs.length > 0) {
      const activeJob = allJobs.find(
        (j) => (j.status === 'running' || j.status === 'pending' || j.status === 'paused') && j.selectionId === selectedSelectionId
      );
      setCurrentJob(activeJob || null);
      // Clear switching state if URL matches and selections are loaded
      // When switching campaigns, we don't need to wait for API since data is already in allJobs
      if ((preselectedId === selectedSelectionId || !preselectedId) && !isLoading && selections.length > 0) {
        setTimeout(() => setIsSwitching(false), 100);
      }
    }
  }, [selectedSelectionId, allJobs, preselectedId, isLoading, selections.length]);

  // Poll for job status when running or pending and polling is enabled
  useEffect(() => {
    if ((currentJob?.status === 'running' || currentJob?.status === 'pending') && pollingEnabled) {
      pollingRef.current = setInterval(async () => {
        try {
          const response = await fetch('/api/batch-check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'status', jobId: currentJob.id }),
          });
          const data = await response.json();
          if (data.job) {
            setCurrentJob(data.job);
            // Update activity logs
            if (data.logs) {
              setLogs(data.logs.map((log: { id: string; address: string; serviceable: boolean; status?: string; time: string }) => ({
                ...log,
                time: new Date(log.time),
              })));
            }
            // Stop polling when job is completed, cancelled, or failed
            if (data.job.status !== 'running' && data.job.status !== 'pending') {
              if (pollingRef.current) {
                clearInterval(pollingRef.current);
              }
              loadSelections(); // Refresh selection stats
              loadJobs(); // Refresh job list
            }
          }
        } catch (error) {
          console.error('Error polling job status:', error);
        }
      }, 2000);

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      };
    } else if (pollingRef.current) {
      // Clear polling if it's disabled
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, [currentJob?.id, currentJob?.status, pollingEnabled, loadSelections, loadJobs]);

  const handleStart = async () => {
    if (!selectedSelectionId) {
      toast.error('Please select a selection first');
      return;
    }

    const selection = selections.find((s) => s.id === selectedSelectionId);
    if (!selection) return;

    // Check if there's already a running or pending job
    const activeJob = allJobs.find(
      (j) => (j.status === 'running' || j.status === 'pending') && j.selectionId === selectedSelectionId
    );
    if (activeJob) {
      toast.error('A job is already in progress for this selection');
      setCurrentJob(activeJob);
      return;
    }

    setIsStarting(true);
    setLogs([]);

    try {
      const response = await fetch('/api/batch-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          selectionId: selectedSelectionId,
          name: `${selection.name} - ${new Date().toLocaleString()}`,
          recheckType,
        }),
      });

      const data = await response.json();
      if (data.success && data.job) {
        setCurrentJob(data.job);
        toast.success('Batch checking started');
      } else {
        toast.error(data.error || 'Failed to start batch check');
      }
    } catch (error) {
      console.error('Error starting batch check:', error);
      toast.error('Failed to start batch check');
    } finally {
      setIsStarting(false);
    }
  };

  const handlePause = async () => {
    if (!currentJob) return;

    try {
      const response = await fetch('/api/batch-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'pause', jobId: currentJob.id }),
      });

      const data = await response.json();
      if (data.success) {
        setCurrentJob(data.job);
        toast.success('Batch checking paused');
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
      } else {
        toast.error(data.error || 'Failed to pause');
      }
    } catch (error) {
      console.error('Error pausing batch check:', error);
      toast.error('Failed to pause');
    }
  };

  const handleCancel = async () => {
    if (!currentJob) return;

    try {
      const response = await fetch('/api/batch-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', jobId: currentJob.id }),
      });

      const data = await response.json();
      if (data.success) {
        setCurrentJob(data.job);
        toast.success('Batch checking cancelled');
        if (pollingRef.current) {
          clearInterval(pollingRef.current);
        }
        loadSelections();
        loadJobs();
      } else {
        toast.error(data.error || 'Failed to cancel');
      }
    } catch (error) {
      console.error('Error cancelling batch check:', error);
      toast.error('Failed to cancel');
    }
  };

  const handleResume = async () => {
    if (!currentJob) return;

    try {
      const response = await fetch('/api/batch-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resume', jobId: currentJob.id }),
      });

      const data = await response.json();
      if (data.success) {
        setCurrentJob(data.job);
        toast.success('Batch checking resumed');
      } else {
        toast.error(data.error || 'Failed to resume');
      }
    } catch (error) {
      console.error('Error resuming batch check:', error);
      toast.error('Failed to resume');
    }
  };

  const selectedSelection = selections.find((s) => s.id === selectedSelectionId);
  const progress = currentJob
    ? (currentJob.checkedCount / currentJob.totalAddresses) * 100
    : 0;

  // Check if there's an active (running, pending, or paused) job for the selected selection
  const activeJobForSelection = allJobs.find(
    (j) => (j.status === 'running' || j.status === 'pending' || j.status === 'paused') && j.selectionId === selectedSelectionId
  );
  const isJobActive = currentJob && (currentJob.status === 'running' || currentJob.status === 'paused' || currentJob.status === 'pending');
  const canStartNew = !isJobActive && !activeJobForSelection;
  
  // Check if there's ANY active job running (for any campaign)
  const anyActiveJob = allJobs.find(
    (j) => (j.status === 'running' || j.status === 'pending' || j.status === 'paused')
  );
  // Check if we arrived via deep link and another campaign is running
  const isDeepLinked = !!preselectedId;
  const isDifferentCampaignRunning = anyActiveJob && anyActiveJob.selectionId !== selectedSelectionId;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Serviceability Checker</h1>
        <p className="mt-2 text-muted-foreground">
          Run batch serviceability checks against the Omni Fiber API
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Batch Controls
              </CardTitle>
              <CardDescription>Select a campaign and start checking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading || isSwitching ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    {isSwitching ? 'Switching campaigns...' : 'Loading campaigns...'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Selection</label>
                    <Select
                      value={selectedSelectionId}
                      onValueChange={(value) => {
                        setSelectedSelectionId(value);
                        setSelectedCampaignId(value); // Save to context
                        // Check if there's an active job for this selection
                        const activeJob = allJobs.find(
                          (j) => (j.status === 'running' || j.status === 'paused' || j.status === 'pending') && j.selectionId === value
                        );
                        if (activeJob) {
                          setCurrentJob(activeJob);
                        } else {
                          setCurrentJob(null);
                        }
                      }}
                      disabled={!!anyActiveJob}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        {selections.map((selection) => (
                          <SelectItem key={selection.id} value={selection.id}>
                            {selection.name} ({selection.uncheckedCount.toLocaleString()} pending)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

              {selectedSelection && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total addresses</span>
                      <span className="font-medium">
                        {selectedSelection._count.addresses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Unchecked</span>
                      <span className="font-medium text-unchecked">
                        {selectedSelection.uncheckedCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Now</span>
                      <span className="font-medium text-serviceable">
                        {selectedSelection.serviceableCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preorder</span>
                      <span className="font-medium text-preorder">
                        {selectedSelection.preorderCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">No Service</span>
                      <span className="font-medium text-no-service">
                        {selectedSelection.noServiceCount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check Mode</label>
                    <Select value={recheckType} onValueChange={(value: 'unchecked' | 'preorder' | 'noservice' | 'errors' | 'all') => setRecheckType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unchecked">
                          Only Unchecked ({selectedSelection.uncheckedCount})
                        </SelectItem>
                        <SelectItem value="preorder">
                          Re-check Preorder ({selectedSelection.preorderCount})
                        </SelectItem>
                        <SelectItem value="noservice">
                          Re-check No Service ({selectedSelection.noServiceCount})
                        </SelectItem>
                        <SelectItem value="errors">
                          Re-check Errors ({selectedSelection.errorCount})
                        </SelectItem>
                        <SelectItem value="all">
                          Re-check All ({selectedSelection._count.addresses})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {recheckType === 'preorder' && (
                      <p className="text-xs text-muted-foreground">
                        Re-checks addresses that were marked as preorder to see if they're now available
                      </p>
                    )}
                    {recheckType === 'noservice' && (
                      <p className="text-xs text-muted-foreground">
                        Re-checks addresses that had no service to see if they're now serviceable
                      </p>
                    )}
                    {recheckType === 'errors' && (
                      <p className="text-xs text-muted-foreground">
                        Re-checks addresses that had API/network errors during previous checks
                      </p>
                    )}
                    {recheckType === 'all' && (
                      <p className="text-xs text-muted-foreground">
                        Warning: This will re-check all addresses, including those already checked
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {canStartNew ? (
                  // Show message if deep-linked to a campaign while another is running
                  isDeepLinked && isDifferentCampaignRunning ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                              Another campaign is currently running
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">
                              {anyActiveJob && (() => {
                                const runningSelection = selections.find((s) => s.id === anyActiveJob.selectionId);
                                return runningSelection 
                                  ? `"${runningSelection.name}" is being checked. Click below to switch to that campaign to pause or cancel it.`
                                  : 'Please wait for the current job to complete before starting a new one.';
                              })()}
                            </p>
                          </div>
                          {anyActiveJob && (() => {
                            const runningSelection = selections.find((s) => s.id === anyActiveJob.selectionId);
                            return runningSelection ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setIsSwitching(true);
                                  const newSelectionId = anyActiveJob.selectionId!;
                                  // Defer navigation to allow React to render loading state first
                                  setTimeout(() => {
                                    setSelectedSelectionId(newSelectionId);
                                    setSelectedCampaignId(newSelectionId);
                                    setCurrentJob(anyActiveJob);
                                    router.push(`/checker?selection=${newSelectionId}`);
                                  }, 0);
                                }}
                                className="w-full bg-white dark:bg-gray-950 hover:bg-amber-100 dark:hover:bg-amber-950 border-amber-300 dark:border-amber-800"
                              >
                                Switch to "{runningSelection.name}"
                              </Button>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={handleStart}
                      disabled={!selectedSelectionId || isStarting || isLoading || 
                        (recheckType === 'unchecked' && selectedSelection?.uncheckedCount === 0) ||
                        (recheckType === 'preorder' && selectedSelection?.preorderCount === 0) ||
                        (recheckType === 'noservice' && selectedSelection?.noServiceCount === 0) ||
                        (recheckType === 'errors' && selectedSelection?.errorCount === 0) ||
                        (recheckType === 'all' && selectedSelection?._count.addresses === 0)}
                      className="w-full"
                    >
                      {isStarting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Checking
                        </>
                      )}
                    </Button>
                  )
                ) : currentJob?.status === 'running' || currentJob?.status === 'pending' ? (
                  <div className="flex gap-2">
                    <Button onClick={handlePause} variant="outline" className="flex-1">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                    <Button onClick={handleCancel} variant="destructive" className="flex-1">
                      <StopCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : currentJob?.status === 'paused' ? (
                  <div className="flex gap-2">
                    <Button onClick={handleResume} className="flex-1">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                    <Button onClick={handleCancel} variant="destructive" className="flex-1">
                      <StopCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Jobs */}
          {allJobs.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {allJobs.slice(0, 10).map((job) => {
                      // Extract the timestamp from the original job name
                      const nameParts = job.name.split(' - ');
                      const timestamp = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
                      // Find the current selection name
                      const jobSelection = selections.find((s) => s.id === job.selectionId);
                      const currentSelectionName = jobSelection?.name || nameParts[0];
                      // Combine current selection name with original timestamp
                      const displayName = timestamp ? `${currentSelectionName} - ${timestamp}` : currentSelectionName;
                      
                      return (
                        <div
                          key={job.id}
                          className={`flex items-center justify-between rounded-lg border p-2 text-xs ${
                            currentJob?.id === job.id ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {job.status === 'running' ? (
                              <Loader2 className="h-3 w-3 animate-spin text-primary" />
                            ) : job.status === 'completed' ? (
                              <CheckCircle className="h-3 w-3 text-serviceable" />
                            ) : job.status === 'paused' ? (
                              <Pause className="h-3 w-3 text-preorder" />
                            ) : job.status === 'cancelled' ? (
                              <XCircle className="h-3 w-3 text-muted-foreground" />
                            ) : job.status === 'pending' ? (
                              <Clock className="h-3 w-3 text-muted-foreground" />
                            ) : job.status === 'failed' ? (
                              <AlertCircle className="h-3 w-3 text-not-serviceable" />
                            ) : (
                              <Clock className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span className="truncate">{displayName}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px]">
                            {job.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status & Logs */}
        <div className="space-y-6 lg:col-span-2">
          {currentJob && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {currentJob.status === 'running' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : currentJob.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-serviceable" />
                    ) : currentJob.status === 'paused' ? (
                      <Pause className="h-5 w-5 text-preorder" />
                    ) : currentJob.status === 'cancelled' ? (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    ) : currentJob.status === 'pending' ? (
                      <Clock className="h-5 w-5 text-primary" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    <span className="truncate">
                      {(() => {
                        // Extract the timestamp from the original job name (everything after the last " - ")
                        const nameParts = currentJob.name.split(' - ');
                        const timestamp = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
                        // Find the current selection name
                        const jobSelection = selections.find((s) => s.id === currentJob.selectionId);
                        const currentSelectionName = jobSelection?.name || nameParts[0];
                        // Combine current selection name with original timestamp
                        return timestamp ? `${currentSelectionName} - ${timestamp}` : currentSelectionName;
                      })()}
                    </span>
                  </CardTitle>
                  <Badge
                    variant={
                      currentJob.status === 'running'
                        ? 'default'
                        : currentJob.status === 'completed'
                        ? 'outline'
                        : currentJob.status === 'cancelled'
                        ? 'secondary'
                        : 'secondary'
                    }
                  >
                    {currentJob.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {currentJob.checkedCount.toLocaleString()} /{' '}
                      {currentJob.totalAddresses.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <div className="text-2xl font-bold text-serviceable">
                      {currentJob.serviceableCount.toLocaleString()}
                    </div>
                    <div className="text-xs uppercase text-muted-foreground">Available Now</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <div className="text-2xl font-bold text-preorder">
                      {currentJob.preorderCount.toLocaleString()}
                    </div>
                    <div className="text-xs uppercase text-muted-foreground">Preorder</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <div className="text-2xl font-bold text-no-service">
                      {currentJob.noServiceCount.toLocaleString()}
                    </div>
                    <div className="text-xs uppercase text-muted-foreground">No Service</div>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <div className="text-2xl font-bold text-unchecked">
                      {(currentJob.totalAddresses - currentJob.checkedCount).toLocaleString()}
                    </div>
                    <div className="text-xs uppercase text-muted-foreground">Remaining</div>
                  </div>
                </div>

                {currentJob.status === 'running' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      Checking addresses... (~0.5 seconds per address)
                    </span>
                  </div>
                )}

                {currentJob.status === 'paused' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Pause className="h-4 w-4" />
                    <span>Job paused. Click Resume to continue.</span>
                  </div>
                )}

                {currentJob.status === 'cancelled' && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="h-4 w-4" />
                    <span>Job cancelled. Start a new job to continue checking.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 opacity-50" />
                  <p className="mt-2">No activity yet</p>
                  <p className="text-sm">Start a batch check to see results here</p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {logs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center gap-3 rounded-lg border p-3 text-sm"
                      >
                        {log.serviceabilityType === 'serviceable' ? (
                          <CheckCircle className="h-4 w-4 text-serviceable" />
                        ) : log.serviceabilityType === 'preorder' ? (
                          <Clock className="h-4 w-4 text-preorder" />
                        ) : log.serviceabilityType === 'none' ? (
                          <XCircle className="h-4 w-4 text-no-service" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="flex-1 truncate font-mono text-xs">{log.address}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.time.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckerPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    }>
      <CheckerContent />
    </Suspense>
  );
}
