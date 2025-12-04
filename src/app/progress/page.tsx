'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSelections } from '@/app/actions/selections';
import { getServiceProgress, type ServiceProgressStats } from '@/app/actions/analysis';
import { formatDistanceToNow } from 'date-fns';

interface Selection {
  id: string;
  name: string;
  _count: { addresses: number };
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  uncheckedCount: number;
}

function ProgressContent() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get('selection');

  const [selections, setSelections] = useState<Selection[]>([]);
  const [selectedSelectionId, setSelectedSelectionId] = useState<string>(preselectedId || '');
  const [progressStats, setProgressStats] = useState<ServiceProgressStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

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

  const loadProgress = useCallback(async (selectionId: string) => {
    setIsLoadingProgress(true);
    try {
      const stats = await getServiceProgress(selectionId);
      setProgressStats(stats);
    } catch (error) {
      console.error('Error loading progress:', error);
      toast.error('Failed to load progress data');
    } finally {
      setIsLoadingProgress(false);
    }
  }, []);

  useEffect(() => {
    loadSelections();
  }, [loadSelections]);

  useEffect(() => {
    if (preselectedId) {
      setSelectedSelectionId(preselectedId);
    }
  }, [preselectedId]);

  useEffect(() => {
    if (selectedSelectionId) {
      loadProgress(selectedSelectionId);
    }
  }, [selectedSelectionId, loadProgress]);

  const selectedSelection = selections.find((s) => s.id === selectedSelectionId);

  const getTransitionLabel = (from: string, to: string) => {
    if (from === 'preorder' && to === 'serviceable') {
      return { text: 'Preorder → Available', color: 'text-serviceable', icon: CheckCircle };
    } else if (from === 'none' && to === 'preorder') {
      return { text: 'No Service → Preorder', color: 'text-preorder', icon: Clock };
    } else if (from === 'none' && to === 'serviceable') {
      return { text: 'No Service → Available', color: 'text-serviceable', icon: CheckCircle };
    } else if (from === 'serviceable' && to === 'none') {
      return { text: 'Available → No Service', color: 'text-no-service', icon: XCircle };
    } else {
      return { text: `${from} → ${to}`, color: 'text-muted-foreground', icon: ArrowRight };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Service Progress Tracking</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor how service availability changes over time
        </p>
      </div>

      <div className="mb-6">
        <Select value={selectedSelectionId} onValueChange={setSelectedSelectionId}>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Select a campaign" />
          </SelectTrigger>
          <SelectContent>
            {selections.map((selection) => (
              <SelectItem key={selection.id} value={selection.id}>
                {selection.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : !selectedSelectionId ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <TrendingUp className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-4 text-lg font-medium">Select a campaign to view progress</p>
          </CardContent>
        </Card>
      ) : isLoadingProgress ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : progressStats ? (
        <div className="space-y-6">
          {/* Current Status Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressStats.totalAddresses.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card className="border-serviceable/20 bg-serviceable/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Available Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-serviceable">
                  {progressStats.currentServiceable.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((progressStats.currentServiceable / progressStats.totalAddresses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card className="border-preorder/20 bg-preorder/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Preorder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-preorder">
                  {progressStats.currentPreorder.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((progressStats.currentPreorder / progressStats.totalAddresses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card className="border-no-service/20 bg-no-service/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  No Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-no-service">
                  {progressStats.currentNoService.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {((progressStats.currentNoService / progressStats.totalAddresses) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transition Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Service Rollout Progress
              </CardTitle>
              <CardDescription>
                Addresses that changed status between checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-serviceable/10">
                    <CheckCircle className="h-5 w-5 text-serviceable" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {progressStats.transitionCounts.preorderToServiceable}
                    </div>
                    <div className="text-xs text-muted-foreground">Preorder → Available</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preorder/10">
                    <Clock className="h-5 w-5 text-preorder" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {progressStats.transitionCounts.noneToPreorder}
                    </div>
                    <div className="text-xs text-muted-foreground">None → Preorder</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-serviceable/10">
                    <CheckCircle className="h-5 w-5 text-serviceable" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {progressStats.transitionCounts.noneToServiceable}
                    </div>
                    <div className="text-xs text-muted-foreground">None → Available</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {progressStats.transitionCounts.other}
                    </div>
                    <div className="text-xs text-muted-foreground">Other Changes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Status Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Status Changes
              </CardTitle>
              <CardDescription>
                Addresses that changed serviceability status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progressStats.recentTransitions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 opacity-30" />
                  <p className="mt-4">No status changes detected yet</p>
                  <p className="mt-1 text-sm">
                    Re-check addresses to track progress over time
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {progressStats.recentTransitions.slice(0, 20).map((transition) => {
                    const label = getTransitionLabel(transition.fromType, transition.toType);
                    const Icon = label.icon;
                    
                    return (
                      <div
                        key={transition.addressId + transition.changedAt.toString()}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Icon className={`h-4 w-4 flex-shrink-0 ${label.color}`} />
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-sm truncate">{transition.addressString}</div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className={label.color}>
                                {label.text}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {formatDistanceToNow(new Date(transition.changedAt), { addSuffix: true })}
                        </div>
                      </div>
                    );
                  })}
                  {progressStats.recentTransitions.length > 20 && (
                    <p className="text-center text-sm text-muted-foreground pt-2">
                      Showing 20 of {progressStats.recentTransitions.length} changes
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      }
    >
      <ProgressContent />
    </Suspense>
  );
}

