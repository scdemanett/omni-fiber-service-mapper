'use client';

import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import { Map as MapIcon, Loader2, Layers, Download, Activity, Clock, SkipBack, SkipForward, Trash2, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { getSelections, getSelectionAddresses } from '@/app/actions/selections';
import { getCheckTimeline, getAddressesAtTime, getSnapshotStats, getRunsForSelection, deleteRun, type AddressAtTime, type RunSummary } from '@/app/actions/map-timeline';
import { format } from 'date-fns';
import { usePolling } from '@/lib/polling-context';
import { useSelection } from '@/lib/selection-context';

interface BatchJob {
  id: string;
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';
  selectionId: string;
}

// Dynamically import the map component to avoid SSR issues
const ServiceMap = dynamic(() => import('@/components/service-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface Selection {
  id: string;
  name: string;
  _count: { addresses: number };
  checkedCount: number;
  serviceableCount: number;
  uncheckedCount: number;
}

interface AddressWithCheck {
  id: string;
  longitude: number;
  latitude: number;
  addressString: string;
  city: string | null;
  checks: {
    serviceable: boolean;
    serviceabilityType: string;
    salesType: string | null;
    status: string | null;
    cstatus: string | null;
    checkedAt: Date;
    apiCreateDate: Date | null;
    apiUpdateDate: Date | null;
  }[];
}

function MapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedId = searchParams.get('selection');
  const { pollingEnabled } = usePolling();
  const { 
    selectedCampaignId, 
    setSelectedCampaignId
  } = useSelection();
  
  // Read filter state from URL
  const urlShowServiceable = searchParams.get('serviceable');
  const urlShowPreorder = searchParams.get('preorder');
  const urlShowNoService = searchParams.get('noService');
  const urlShowUnchecked = searchParams.get('unchecked');

  const [selections, setSelections] = useState<Selection[]>([]);
  // Prioritize URL param, then context, then empty string
  const [selectedSelectionId, setSelectedSelectionId] = useState<string>(
    preselectedId || selectedCampaignId || ''
  );
  const [addresses, setAddresses] = useState<AddressWithCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [activeJob, setActiveJob] = useState<BatchJob | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Timeline state - local only (no URL or context syncing)
  const [timelineEnabled, setTimelineEnabled] = useState(false);
  const [timelineDates, setTimelineDates] = useState<Date[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(false);
  const [isLoadingTimelineData, setIsLoadingTimelineData] = useState(false);

  // Manage runs dialog state
  const [runsDialogOpen, setRunsDialogOpen] = useState(false);
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(false);
  const [deletingRunId, setDeletingRunId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Filter state - initialize from URL or default to true
  const [showServiceable, setShowServiceable] = useState(urlShowServiceable !== 'false');
  const [showPreorder, setShowPreorder] = useState(urlShowPreorder !== 'false');
  const [showNoService, setShowNoService] = useState(urlShowNoService !== 'false');
  const [showUnchecked, setShowUnchecked] = useState(urlShowUnchecked !== 'false');

  // Update URL when selection or filters change
  const updateUrl = useCallback((
    selectionId: string, 
    serviceable: boolean, 
    preorder: boolean, 
    noService: boolean, 
    unchecked: boolean
  ) => {
    const params = new URLSearchParams();
    if (selectionId) params.set('selection', selectionId);
    if (!serviceable) params.set('serviceable', 'false');
    if (!preorder) params.set('preorder', 'false');
    if (!noService) params.set('noService', 'false');
    if (!unchecked) params.set('unchecked', 'false');
    
    const queryString = params.toString();
    router.replace(`/map${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [router]);

  // Handle selection change
  const handleSelectionChange = useCallback((value: string) => {
    userChangedSelectionRef.current = true; // Mark that user changed selection
    setSelectedSelectionId(value);
    setSelectedCampaignId(value); // Save to context
    // URL update is handled by the debounced effect below
  }, [setSelectedCampaignId]);

  // Handle filter changes
  const handleFilterChange = useCallback((filter: 'serviceable' | 'preorder' | 'noService' | 'unchecked', value: boolean) => {
    const newServiceable = filter === 'serviceable' ? value : showServiceable;
    const newPreorder = filter === 'preorder' ? value : showPreorder;
    const newNoService = filter === 'noService' ? value : showNoService;
    const newUnchecked = filter === 'unchecked' ? value : showUnchecked;
    
    if (filter === 'serviceable') setShowServiceable(value);
    if (filter === 'preorder') setShowPreorder(value);
    if (filter === 'noService') setShowNoService(value);
    if (filter === 'unchecked') setShowUnchecked(value);
    
    updateUrl(selectedSelectionId, newServiceable, newPreorder, newNoService, newUnchecked);
  }, [selectedSelectionId, showServiceable, showPreorder, showNoService, showUnchecked, updateUrl]);

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

  const loadAddresses = useCallback(async (selectionId: string) => {
    try {
      // Load all addresses - clustering handles performance regardless of count
      const result = await getSelectionAddresses(selectionId, 1, Number.MAX_SAFE_INTEGER);
      setAddresses(result.addresses as unknown as AddressWithCheck[]);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  }, []);

  const loadTimeline = useCallback(async (selectionId: string) => {
    setIsLoadingTimeline(true);
    try {
      const dates = await getCheckTimeline(selectionId);
      console.log(`Map: Loaded ${dates.length} timeline dates for selection ${selectionId}`, dates);
      
      // Add "current" entry as the latest date (now) to show most recent data
      const datesWithCurrent = [...dates, new Date()];
      setTimelineDates(datesWithCurrent);
      
      if (datesWithCurrent.length > 0) {
        // Default to the "current" entry (last index)
        setSelectedTimeIndex(datesWithCurrent.length - 1);
      }
    } catch (error) {
      console.error('Error loading timeline:', error);
    } finally {
      setIsLoadingTimeline(false);
    }
  }, []);

  const loadAddressesAtTime = useCallback(async (selectionId: string, date: Date) => {
    setIsLoadingTimelineData(true);
    try {
      const addressesAtTime = await getAddressesAtTime(selectionId, date);
      // Convert to AddressWithCheck format
      const converted = addressesAtTime.map((addr) => ({
        id: addr.id,
        longitude: addr.longitude,
        latitude: addr.latitude,
        addressString: addr.addressString,
        city: addr.city,
        checks: addr.checkedAt ? [{
          serviceable: addr.serviceable ?? false,
          serviceabilityType: addr.serviceabilityType ?? 'none',
          salesType: addr.salesType,
          status: addr.status,
          cstatus: addr.cstatus,
          checkedAt: addr.checkedAt,
        }] : [],
      }));
      setAddresses(converted as unknown as AddressWithCheck[]);
    } catch (error) {
      console.error('Error loading addresses at time:', error);
    } finally {
      setIsLoadingTimelineData(false);
    }
  }, []);

  const checkForActiveJob = useCallback(async (selectionId: string) => {
    try {
      const response = await fetch('/api/batch-check');
      const data = await response.json();
      if (data.jobs) {
        const active = data.jobs.find(
          (j: BatchJob) => (j.status === 'running' || j.status === 'pending') && j.selectionId === selectionId
        );
        setActiveJob(active || null);
        return active || null;
      }
    } catch (error) {
      console.error('Error checking for active job:', error);
    }
    return null;
  }, []);

  useEffect(() => {
    loadSelections();
  }, [loadSelections]);

  // Initialize from URL or context (only on mount)
  const hasInitializedRef = useRef(false);
  const userChangedSelectionRef = useRef(false);
  
  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      if (preselectedId) {
        setSelectedSelectionId(preselectedId);
        setSelectedCampaignId(preselectedId);
      } else if (selectedCampaignId && selectedCampaignId !== selectedSelectionId) {
        setSelectedSelectionId(selectedCampaignId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update URL when state changes (with debounce to avoid loops)
  const urlUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!selectedSelectionId) return;
    
    // Clear any pending URL update
    if (urlUpdateTimeoutRef.current) {
      clearTimeout(urlUpdateTimeoutRef.current);
    }
    
    // Schedule URL update
    urlUpdateTimeoutRef.current = setTimeout(() => {
      updateUrl(
        selectedSelectionId,
        showServiceable,
        showPreorder,
        showNoService,
        showUnchecked
      );
    }, 500); // Debounce URL updates

    return () => {
      if (urlUpdateTimeoutRef.current) {
        clearTimeout(urlUpdateTimeoutRef.current);
      }
    };
  }, [selectedSelectionId, showServiceable, showPreorder, showNoService, showUnchecked, updateUrl]);

  // Load addresses when selection changes
  useEffect(() => {
    if (!selectedSelectionId) {
      setAddresses([]);
      setActiveJob(null);
      setTimelineEnabled(false);
      setTimelineDates([]);
      return;
    }

    const init = async () => {
      setIsLoadingAddresses(true);
      try {
        await loadAddresses(selectedSelectionId);
        await checkForActiveJob(selectedSelectionId);
        await loadTimeline(selectedSelectionId);
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    init();
  }, [selectedSelectionId, loadAddresses, checkForActiveJob, loadTimeline]);

  // Load addresses at selected time when timeline is enabled
  useEffect(() => {
    if (timelineEnabled && selectedSelectionId && timelineDates.length > 0) {
      const selectedDate = timelineDates[selectedTimeIndex];
      if (selectedDate) {
        loadAddressesAtTime(selectedSelectionId, selectedDate);
      }
    } else if (!timelineEnabled && selectedSelectionId) {
      // Load current addresses when timeline is disabled
      loadAddresses(selectedSelectionId);
    }
  }, [timelineEnabled, selectedTimeIndex, timelineDates, selectedSelectionId, loadAddressesAtTime, loadAddresses]);

  // Poll for updates when there's an active job and polling is enabled
  useEffect(() => {
    if (activeJob && selectedSelectionId && pollingEnabled && !timelineEnabled) {
      let cancelled = false;
      const poll = async () => {
        try {
          // Refresh addresses (only when NOT in timeline mode)
          await loadAddresses(selectedSelectionId);
          // Check if job is still active
          const job = await checkForActiveJob(selectedSelectionId);
          if (cancelled) return;
          if (!job) {
            // Job finished, stop polling
            if (pollingRef.current) {
              clearTimeout(pollingRef.current);
              pollingRef.current = null;
            }
            loadSelections(); // Refresh selection stats
            loadTimeline(selectedSelectionId); // Refresh timeline data
          } else {
            // Schedule next poll only if job is still active
            pollingRef.current = setTimeout(poll, 3000);
          }
        } catch (error) {
          if (cancelled) return;
          console.error('Error polling map updates:', error);
          // Continue polling even on error
          pollingRef.current = setTimeout(poll, 3000);
        }
      };

      // Start polling
      poll();

      return () => {
        cancelled = true;
        if (pollingRef.current) {
          clearTimeout(pollingRef.current);
          pollingRef.current = null;
        }
      };
    } else if (pollingRef.current) {
      // Clear polling if it's disabled or timeline is enabled
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  }, [activeJob, selectedSelectionId, pollingEnabled, timelineEnabled, loadAddresses, checkForActiveJob, loadSelections, loadTimeline]);

  // Filter addresses for display
  const filteredAddresses = addresses.filter((addr) => {
    const latestCheck = addr.checks[0];
    if (!latestCheck) return showUnchecked;
    const type = latestCheck.serviceabilityType;
    if (type === 'serviceable') return showServiceable;
    if (type === 'preorder') return showPreorder;
    return showNoService;
  });

  const selectedSelection = selections.find((s) => s.id === selectedSelectionId);

  // Calculate stats
  const serviceableCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'serviceable').length;
  const preorderCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'preorder').length;
  const noServiceCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'none').length;
  const uncheckedCount = addresses.filter((a) => !a.checks[0]).length;

  const latestCheckDate = addresses.reduce<Date | null>((latest, addr) => {
    const checkedAt = addr.checks[0]?.checkedAt;
    if (!checkedAt) return latest;
    const d = new Date(checkedAt);
    return !latest || d > latest ? d : latest;
  }, null);

  const handleToggleTimeline = () => {
    setTimelineEnabled(!timelineEnabled);
  };

  const handleTimelineChange = (value: number[]) => {
    setSelectedTimeIndex(value[0]);
  };

  const handleSkipBack = () => {
    setSelectedTimeIndex(Math.max(0, selectedTimeIndex - 1));
  };

  const handleSkipForward = () => {
    setSelectedTimeIndex(Math.min(timelineDates.length - 1, selectedTimeIndex + 1));
  };

  const handleExportGeoJSON = () => {
    if (filteredAddresses.length === 0) {
      toast.error('No addresses to export');
      return;
    }

    const features = filteredAddresses.map((addr) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [addr.longitude, addr.latitude],
      },
      properties: {
        address: addr.addressString,
        city: addr.city,
        serviceable: addr.checks[0]?.serviceable ?? null,
        serviceabilityType: addr.checks[0]?.serviceabilityType ?? null,
        salesType: addr.checks[0]?.salesType ?? null,
        status: addr.checks[0]?.status ?? null,
        cstatus: addr.checks[0]?.cstatus ?? null,
        checkedAt: addr.checks[0]?.checkedAt ?? null,
      },
    }));

    const geojson = {
      type: 'FeatureCollection',
      features,
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], {
      type: 'application/geo+json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSelection?.name || 'export'}-serviceability.geojson`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('GeoJSON exported');
  };

  const handleOpenRunsDialog = async () => {
    if (!selectedSelectionId) return;
    setRunsDialogOpen(true);
    setIsLoadingRuns(true);
    try {
      const data = await getRunsForSelection(selectedSelectionId);
      setRuns(data);
    } catch (error) {
      console.error('Error loading runs:', error);
      toast.error('Failed to load runs');
    } finally {
      setIsLoadingRuns(false);
    }
  };

  const handleDeleteRun = async (runId: string) => {
    setDeletingRunId(runId);
    try {
      await deleteRun(runId);
      setRuns((prev) => prev.filter((r) => r.id !== runId));
      toast.success('Run deleted');
      // Refresh timeline and addresses after deleting a run
      await loadTimeline(selectedSelectionId);
      if (!timelineEnabled) {
        await loadAddresses(selectedSelectionId);
      }
    } catch (error) {
      console.error('Error deleting run:', error);
      toast.error('Failed to delete run');
    } finally {
      setDeletingRunId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="flex h-page-content flex-col overflow-hidden">
      {/* Controls Bar */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto">
          <div className="flex h-16 items-center gap-4 px-4">
            <div className="flex items-center gap-2">
              <MapIcon className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-semibold">Map View</h1>
            </div>

            <div className="flex-1" />

            <Select value={selectedSelectionId} onValueChange={handleSelectionChange}>
              <SelectTrigger className="w-[350px]">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent className="z-[2000]">
                {selections.map((selection) => (
                  <SelectItem key={selection.id} value={selection.id}>
                    {selection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeJob && pollingEnabled && (
              <Badge variant="outline" className="animate-pulse gap-1.5 border-primary text-primary">
                <Activity className="h-3 w-3" />
                Live updating
              </Badge>
            )}
            {activeJob && !pollingEnabled && (
              <Badge variant="outline" className="gap-1.5 border-muted-foreground/50 text-muted-foreground">
                <Activity className="h-3 w-3" />
                Updates paused
              </Badge>
            )}

            <div className="flex items-center gap-3 border-l pl-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="serviceable"
                  checked={showServiceable}
                  onCheckedChange={(checked) => handleFilterChange('serviceable', !!checked)}
                />
                <Label htmlFor="serviceable" className="flex items-center gap-1 text-sm">
                  <span className="h-3 w-3 rounded-full bg-serviceable" />
                  Available ({serviceableCount})
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="preorder"
                  checked={showPreorder}
                  onCheckedChange={(checked) => handleFilterChange('preorder', !!checked)}
                />
                <Label htmlFor="preorder" className="flex items-center gap-1 text-sm">
                  <span className="h-3 w-3 rounded-full bg-preorder" />
                  Preorder ({preorderCount})
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="no-service"
                  checked={showNoService}
                  onCheckedChange={(checked) => handleFilterChange('noService', !!checked)}
                />
                <Label htmlFor="no-service" className="flex items-center gap-1 text-sm">
                  <span className="h-3 w-3 rounded-full bg-no-service" />
                  No Service ({noServiceCount})
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="unchecked"
                  checked={showUnchecked}
                  onCheckedChange={(checked) => handleFilterChange('unchecked', !!checked)}
                />
                <Label htmlFor="unchecked" className="flex items-center gap-1 text-sm">
                  <span className="h-3 w-3 rounded-full bg-unchecked" />
                  Pending ({uncheckedCount})
                </Label>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={handleExportGeoJSON}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline Controls */}
      {timelineDates.length > 1 && (
        <div className="border-b border-border/50 bg-card/50 backdrop-blur-lg">
          <div className="container mx-auto px-4 h-[60px]">
            <div className="flex items-center gap-4 h-full">
              <div className="flex items-center gap-2">
                <Switch
                  id="timeline-mode"
                  checked={timelineEnabled}
                  onCheckedChange={handleToggleTimeline}
                />
                <Label htmlFor="timeline-mode" className="flex items-center gap-2 text-sm cursor-pointer">
                  <Clock className="h-4 w-4" />
                  Timeline Mode
                </Label>
              </div>

              {timelineEnabled && (
                <>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSkipBack}
                      disabled={selectedTimeIndex === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSkipForward}
                      disabled={selectedTimeIndex === timelineDates.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1 flex items-center gap-4">
                    <Slider
                      value={[selectedTimeIndex]}
                      onValueChange={handleTimelineChange}
                      max={timelineDates.length - 1}
                      step={1}
                      className="flex-1"
                    />
                    <Badge variant="outline" className="min-w-[180px] justify-center">
                      {selectedTimeIndex === timelineDates.length - 1 
                        ? 'Latest (Current)'
                        : format(timelineDates[selectedTimeIndex], 'MMM d, yyyy h:mm a')}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {selectedTimeIndex + 1} of {timelineDates.length} {selectedTimeIndex === timelineDates.length - 1 ? '(current)' : 'checks'}
                    </div>
                  </div>
                </>
              )}

              <div className="ml-auto">
                <Dialog open={runsDialogOpen} onOpenChange={(open) => {
                  setRunsDialogOpen(open);
                  if (!open) setConfirmDeleteId(null);
                }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenRunsDialog}
                      disabled={!selectedSelectionId}
                    >
                      <History className="mr-2 h-4 w-4" />
                      Manage Runs
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Historical Runs</DialogTitle>
                    </DialogHeader>
                    {isLoadingRuns ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : runs.length === 0 ? (
                      <p className="py-6 text-center text-sm text-muted-foreground">No runs found for this campaign.</p>
                    ) : (
                      <div className="mt-2 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                        {runs.map((run) => (
                          <div
                            key={run.id}
                            className="flex items-start justify-between rounded-lg border border-border/60 bg-card p-3 gap-3"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-sm truncate">{run.name}</span>
                                <Badge
                                  variant={run.status === 'completed' ? 'default' : run.status === 'failed' || run.status === 'cancelled' ? 'destructive' : 'secondary'}
                                  className="text-xs capitalize"
                                >
                                  {run.status}
                                </Badge>
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                {run.startedAt ? format(new Date(run.startedAt), 'MMM d, yyyy h:mm a') : 'Unknown date'}
                                {run.completedAt && ` – ${format(new Date(run.completedAt), 'h:mm a')}`}
                              </div>
                              <div className="mt-1.5 flex items-center gap-3 text-xs">
                                <span className="text-serviceable font-medium">{run.serviceableCount} available</span>
                                <span className="text-preorder font-medium">{run.preorderCount} preorder</span>
                                <span className="text-no-service font-medium">{run.noServiceCount} no service</span>
                                <span className="text-muted-foreground">{run.checkedCount}/{run.totalAddresses} checked</span>
                              </div>
                            </div>
                            <div className="shrink-0">
                              {confirmDeleteId === run.id ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">Delete this run?</span>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteRun(run.id)}
                                    disabled={deletingRunId === run.id}
                                  >
                                    {deletingRunId === run.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Yes, delete'}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setConfirmDeleteId(null)}
                                    disabled={deletingRunId === run.id}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-destructive"
                                  onClick={() => setConfirmDeleteId(run.id)}
                                  disabled={deletingRunId !== null}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !selectedSelectionId ? (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <Layers className="h-16 w-16 opacity-30" />
            <p className="mt-4 text-lg font-medium">Select a campaign to view addresses</p>
          </div>
        ) : isLoadingAddresses ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ServiceMap 
            addresses={filteredAddresses}
            clusteringOptions={{
              maxClusterRadius: 80,
              disableClusteringAtZoom: 17,
              showCoverageOnHover: true,
              spiderfyOnMaxZoom: true,
            }}
          />
        )}

        {/* Timeline Loading Overlay */}
        {isLoadingTimelineData && (
          <div className="absolute inset-0 z-[999] flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-foreground">Loading timeline data...</p>
            </div>
          </div>
        )}

        {/* Stats Overlay */}
        {selectedSelection && !isLoadingAddresses && (
          <Card className="absolute bottom-4 left-4 z-[1000] w-64 bg-card/95 backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-sm font-medium">
                    {selectedSelection.name}
                  </CardTitle>
                  {timelineEnabled ? (
                    <Badge variant="secondary" className="w-fit text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      Historical
                    </Badge>
                  ) : latestCheckDate ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Showing data from {format(latestCheckDate, 'MMM d, yyyy')}
                    </span>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="font-semibold text-serviceable">{serviceableCount}</div>
                <div className="text-muted-foreground">Available Now</div>
              </div>
              <div>
                <div className="font-semibold text-preorder">{preorderCount}</div>
                <div className="text-muted-foreground">Preorder</div>
              </div>
              <div>
                <div className="font-semibold text-no-service">{noServiceCount}</div>
                <div className="text-muted-foreground">No Service</div>
              </div>
              <div>
                <div className="font-semibold text-unchecked">{uncheckedCount}</div>
                <div className="text-muted-foreground">Pending</div>
              </div>
              <div className="col-span-2 border-t pt-2 mt-1">
                <div className="font-semibold">{filteredAddresses.length}</div>
                <div className="text-muted-foreground">Showing on Map</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={
      <div className="flex h-page-content items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <MapContent />
    </Suspense>
  );
}

