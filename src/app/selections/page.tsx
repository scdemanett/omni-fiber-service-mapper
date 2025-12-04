'use client';

import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Filter, Plus, Trash2, Loader2, CheckCircle, AlertCircle, Clock, Play, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getGeoJSONSources, getUniquePropertyValues, getAddressCountByFilter } from '@/app/actions/geojson';
import { createSelection, getSelections, deleteSelection } from '@/app/actions/selections';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface GeoJSONSource {
  id: string;
  name: string;
  fileName: string;
  uploadedAt: Date;
  addressCount: number;
  _count: { addresses: number };
}

interface Selection {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  filterCriteria: string;
  _count: { addresses: number };
  checkedCount: number;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  uncheckedCount: number;
}

function SelectionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedSourceId = searchParams.get('source');
  const hasHandledPreselection = useRef(false);

  const [sources, setSources] = useState<GeoJSONSource[]>([]);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Create selection form state
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [selectionName, setSelectionName] = useState('');
  const [selectionDescription, setSelectionDescription] = useState('');
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [previewCount, setPreviewCount] = useState<number | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [sourcesData, selectionsData] = await Promise.all([
        getGeoJSONSources(),
        getSelections(),
      ]);
      setSources(sourcesData as GeoJSONSource[]);
      setSelections(selectionsData as Selection[]);

      // If we have a preselected source and it exists, open the dialog (only once)
      if (preselectedSourceId && !hasHandledPreselection.current && sourcesData.some((s: GeoJSONSource) => s.id === preselectedSourceId)) {
        hasHandledPreselection.current = true;
        setSelectedSourceId(preselectedSourceId);
        setDialogOpen(true);
        // Clear the URL parameter to prevent reopening on refresh
        router.replace('/selections', { scroll: false });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [preselectedSourceId, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Load cities when source is selected
  useEffect(() => {
    if (!selectedSourceId) {
      setAvailableCities([]);
      setSelectedCities([]);
      return;
    }

    const loadCities = async () => {
      try {
        const cities = await getUniquePropertyValues(selectedSourceId, 'city');
        setAvailableCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    };

    loadCities();
  }, [selectedSourceId]);

  // Update preview count when filters change
  useEffect(() => {
    if (!selectedSourceId) {
      setPreviewCount(null);
      return;
    }

    const updatePreview = async () => {
      setIsLoadingPreview(true);
      try {
        const count = await getAddressCountByFilter(selectedSourceId, {
          city: selectedCities.length > 0 ? selectedCities : undefined,
        });
        setPreviewCount(count);
      } catch (error) {
        console.error('Error getting preview count:', error);
        setPreviewCount(null);
      } finally {
        setIsLoadingPreview(false);
      }
    };

    const debounce = setTimeout(updatePreview, 300);
    return () => clearTimeout(debounce);
  }, [selectedSourceId, selectedCities]);

  const handleCreateSelection = async () => {
    if (!selectedSourceId) {
      toast.error('Please select a source');
      return;
    }
    if (!selectionName.trim()) {
      toast.error('Please enter a selection name');
      return;
    }

    setIsCreating(true);
    try {
      const result = await createSelection(
        selectionName.trim(),
        selectionDescription.trim() || null,
        selectedSourceId,
        {
          city: selectedCities.length > 0 ? selectedCities : undefined,
        }
      );

      if (result.success) {
        toast.success(`Created selection with ${result.addressCount?.toLocaleString()} addresses`);
        setDialogOpen(false);
        resetForm();
        loadData();
      } else {
        toast.error(result.error || 'Failed to create selection');
      }
    } catch (error) {
      console.error('Error creating selection:', error);
      toast.error('Failed to create selection');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteSelection = async (selectionId: string, name: string) => {
    if (!confirm(`Delete selection "${name}"?`)) return;

    try {
      const result = await deleteSelection(selectionId);
      if (result.success) {
        toast.success('Selection deleted');
        loadData();
      } else {
        toast.error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setSelectedSourceId('');
    setSelectionName('');
    setSelectionDescription('');
    setSelectedCities([]);
    setPreviewCount(null);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Address Selections</h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage address selections for serviceability checking
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Selection
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Selection</DialogTitle>
              <DialogDescription>
                Filter addresses from a source to create a selection for serviceability checking
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select value={selectedSourceId} onValueChange={setSelectedSourceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name} ({source._count.addresses.toLocaleString()} addresses)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Selection Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Painesville City December 2025"
                  value={selectionName}
                  onChange={(e) => setSelectionName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="Notes about this selection"
                  value={selectionDescription}
                  onChange={(e) => setSelectionDescription(e.target.value)}
                />
              </div>

              {availableCities.length > 0 && (
                <div className="space-y-2">
                  <Label>Filter by City</Label>
                  <ScrollArea className="h-48 rounded-md border p-4">
                    <div className="space-y-2">
                      {availableCities.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={`city-${city}`}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => toggleCity(city)}
                          />
                          <label
                            htmlFor={`city-${city}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {selectedCities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {selectedCities.map((city) => (
                        <Badge key={city} variant="secondary" className="text-xs">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {previewCount !== null && (
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Addresses matching filters:</span>
                    {isLoadingPreview ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-lg font-bold text-primary">
                        {previewCount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSelection} disabled={isCreating || !selectedSourceId}>
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Selection'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : selections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Filter className="h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-4 text-lg font-medium">No selections yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a selection to start checking serviceability
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selections.map((selection) => {
            const totalChecked = selection.checkedCount;
            const total = selection._count.addresses;
            const progress = total > 0 ? (totalChecked / total) * 100 : 0;

            return (
              <Card key={selection.id} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{selection.name}</CardTitle>
                      {selection.description && (
                        <CardDescription>{selection.description}</CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSelection(selection.id, selection.name)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {totalChecked.toLocaleString()} / {total.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-lg bg-serviceable/10 p-2">
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3 text-serviceable" />
                        <span className="text-sm font-bold text-serviceable">
                          {selection.serviceableCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        Available
                      </span>
                    </div>
                    <div className="rounded-lg bg-preorder/10 p-2">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-preorder" />
                        <span className="text-sm font-bold text-preorder">
                          {selection.preorderCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        Preorder
                      </span>
                    </div>
                    <div className="rounded-lg bg-no-service/10 p-2">
                      <div className="flex items-center justify-center gap-1">
                        <XCircle className="h-3 w-3 text-no-service" />
                        <span className="text-sm font-bold text-no-service">
                          {selection.noServiceCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        No Service
                      </span>
                    </div>
                    <div className="rounded-lg bg-unchecked/10 p-2">
                      <div className="flex items-center justify-center gap-1">
                        <AlertCircle className="h-3 w-3 text-unchecked" />
                        <span className="text-sm font-bold text-unchecked">
                          {selection.uncheckedCount.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase text-muted-foreground">
                        Pending
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/checker?selection=${selection.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Check
                      </Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/map?selection=${selection.id}`}>
                        View Map
                      </Link>
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Created{' '}
                    {formatDistanceToNow(new Date(selection.createdAt), { addSuffix: true })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SelectionsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    }>
      <SelectionsContent />
    </Suspense>
  );
}

