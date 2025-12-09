'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Upload,
  Filter,
  Play,
  Map,
  FileJson,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Activity,
  Lock,
  Loader2,
  Pause,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { getDashboardStats, type DashboardStats } from '@/app/actions/dashboard';
import { usePolling } from '@/lib/polling-context';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pollingEnabled } = usePolling();
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
      return data.hasActiveJobs;
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Poll when there are active jobs and polling is enabled
  useEffect(() => {
    if (stats?.hasActiveJobs && pollingEnabled) {
      const poll = async () => {
        try {
          const stillActive = await loadStats();
          if (stillActive) {
            // Schedule next poll only if job is still active
            pollingRef.current = setTimeout(poll, 3000);
          } else {
            pollingRef.current = null;
          }
        } catch (error) {
          console.error('Error polling dashboard stats:', error);
          // Continue polling even on error
          pollingRef.current = setTimeout(poll, 3000);
        }
      };

      // Start polling
      poll();

      return () => {
        if (pollingRef.current) {
          clearTimeout(pollingRef.current);
          pollingRef.current = null;
        }
      };
    } else if (pollingRef.current) {
      // Clear polling if it's disabled
      clearTimeout(pollingRef.current);
      pollingRef.current = null;
    }
  }, [stats?.hasActiveJobs, pollingEnabled, loadStats]);

  if (isLoading || !stats) {
    return (
      <div className="bg-grid-pattern min-h-page-content">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  const serviceableRate =
    stats.totalCheckedAddresses > 0
      ? ((stats.serviceableChecks / stats.totalCheckedAddresses) * 100).toFixed(1)
      : '0';

  return (
    <div className="bg-grid-pattern min-h-page-content">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track and manage Omni Fiber serviceability data
            </p>
          </div>
          <div className="flex items-center gap-4">
            {stats.hasActiveJobs && pollingEnabled && (
              <Badge variant="outline" className="animate-pulse gap-1.5 border-primary text-primary">
                <Activity className="h-3 w-3" />
                Live updating
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-card to-card/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Addresses
              </CardTitle>
              <FileJson className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalAddresses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                from {stats.sources.length} source{stats.sources.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Addresses Checked
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCheckedAddresses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{stats.totalChecks.toLocaleString()} total checks</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-serviceable/10 to-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Now
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-serviceable" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-serviceable">
                {stats.serviceableChecks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{serviceableRate}% of addresses</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-preorder/10 to-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Preorder
              </CardTitle>
              <Clock className="h-4 w-4 text-preorder" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-preorder">
                {stats.preorderChecks.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">future availability</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Breakdown */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Service Availability Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-serviceable/10">
                  <CheckCircle className="h-5 w-5 text-serviceable" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-serviceable">
                    {stats.serviceableChecks.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Available Now</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preorder/10">
                  <Clock className="h-5 w-5 text-preorder" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-preorder">
                    {stats.preorderChecks.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Preorder/Planned</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-no-service/10">
                  <XCircle className="h-5 w-5 text-no-service" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-no-service">
                    {stats.noServiceChecks.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">No Service</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Button asChild className="justify-start">
                <Link href="/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload GeoJSON
                </Link>
              </Button>
              
              {stats.sources.length > 0 ? (
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/selections">
                    <Filter className="mr-2 h-4 w-4" />
                    Create Selection
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="justify-start" disabled>
                  <Filter className="mr-2 h-4 w-4" />
                  Create Selection
                  <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                </Button>
              )}
              
              {stats.selections.length > 0 ? (
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/checker">
                    <Play className="mr-2 h-4 w-4" />
                    Run Checker
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="justify-start" disabled>
                  <Play className="mr-2 h-4 w-4" />
                  Run Checker
                  <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                </Button>
              )}
              
              {stats.selections.length > 0 ? (
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/map">
                    <Map className="mr-2 h-4 w-4" />
                    View Map
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="justify-start" disabled>
                  <Map className="mr-2 h-4 w-4" />
                  View Map
                  <Lock className="ml-auto h-3 w-3 text-muted-foreground" />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Selections */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Selections</CardTitle>
                <CardDescription>Your address selection campaigns</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/selections">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {stats.selections.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Filter className="h-12 w-12 opacity-30" />
                  <p className="mt-4">No selections created yet</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link href="/selections">Create your first selection</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.selections.slice(0, 5).map((selection) => {
                    const progress =
                      selection._count.addresses > 0
                        ? (selection.checkedCount / selection._count.addresses) * 100
                        : 0;

                    return (
                      <div
                        key={selection.id}
                        className="rounded-lg border bg-card/50 p-4 transition-colors hover:bg-card"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{selection.name}</span>
                              {selection.uncheckedCount === 0 ? (
                                <Badge variant="outline" className="text-serviceable">
                                  Complete
                                </Badge>
                              ) : progress > 0 ? (
                                <Badge variant="secondary">In Progress</Badge>
                              ) : (
                                <Badge variant="outline">Pending</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{selection._count.addresses.toLocaleString()} total</span>
                              <span>•</span>
                              <span className="text-serviceable">
                                {selection.serviceableCount} avail
                              </span>
                              <span>•</span>
                              <span className="text-preorder">
                                {selection.preorderCount} preorder
                              </span>
                              <span>•</span>
                              <span className="text-no-service">
                                {selection.noServiceCount} none
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/checker?selection=${selection.id}`}>
                                <Play className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm">
                              <Link href={`/map?selection=${selection.id}`}>
                                <Map className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Jobs */}
        {stats.recentJobs.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Batch Jobs</CardTitle>
              <CardDescription>History of serviceability check runs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentJobs.map((job) => {
                  // Extract the timestamp from the original job name
                  const nameParts = job.name.split(' - ');
                  const timestamp = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
                  // Find the current selection name
                  const jobSelection = stats.selections.find((s) => s.id === job.selectionId);
                  const currentSelectionName = jobSelection?.name || nameParts[0];
                  // Combine current selection name with original timestamp
                  const displayName = timestamp ? `${currentSelectionName} - ${timestamp}` : currentSelectionName;

                  return (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        {job.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-serviceable" />
                        ) : job.status === 'running' ? (
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        ) : job.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        ) : job.status === 'paused' ? (
                          <Pause className="h-5 w-5 text-preorder" />
                        ) : job.status === 'cancelled' ? (
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-not-serviceable" />
                        )}
                        <div>
                          <div className="font-medium">{displayName}</div>
                          <div className="text-sm text-muted-foreground">
                            {job.checkedCount.toLocaleString()} / {job.totalAddresses.toLocaleString()}{' '}
                            checked • {job.serviceableCount.toLocaleString()} serviceable
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            job.status === 'completed'
                              ? 'outline'
                              : job.status === 'running'
                              ? 'default'
                              : job.status === 'pending'
                              ? 'secondary'
                              : 'secondary'
                          }
                        >
                          {job.status}
                        </Badge>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
