'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Upload, FileJson, Trash2, Loader2, CheckCircle, ArrowRight, Filter, Pencil, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getGeoJSONSources, deleteGeoJSONSource, renameGeoJSONSource, getGeoJSONSourceDeleteImpact } from '@/app/actions/geojson';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEffect } from 'react';
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

interface UploadProgress {
  type: 'start' | 'source_created' | 'progress' | 'complete' | 'error';
  total?: number;
  inserted?: number;
  processed?: number;
  progress?: number;
  failed?: number;
  sourceId?: string;
  addressCount?: number;
  error?: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [insertedCount, setInsertedCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sourceName, setSourceName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sources, setSources] = useState<GeoJSONSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [justUploaded, setJustUploaded] = useState(false);
  const [uploadedSourceId, setUploadedSourceId] = useState<string | null>(null);
  const [editingSourceId, setEditingSourceId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  // Delete confirmation dialog state
  const [deleteDialogSource, setDeleteDialogSource] = useState<GeoJSONSource | null>(null);
  const [deleteImpact, setDeleteImpact] = useState<{
    addressCount: number;
    checkCount: number;
    fullyEmptiedSelections: { id: string; name: string }[];
    partiallyAffectedSelections: { id: string; name: string }[];
  } | null>(null);
  const [deleteImpactLoading, setDeleteImpactLoading] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const loadSources = useCallback(async () => {
    try {
      const data = await getGeoJSONSources();
      setSources(data as GeoJSONSource[]);
    } catch (error) {
      console.error('Error loading sources:', error);
      toast.error('Failed to load sources');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      if (!sourceName) {
        const nameWithoutExt = file.name.replace(/\.(geo)?json$/i, '');
        setSourceName(nameWithoutExt);
      }
    }
  }, [sourceName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json', '.geojson'],
      'application/geo+json': ['.geojson'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Preparing upload...');
    setUploadPercent(0);
    setInsertedCount(0);
    setTotalCount(0);
    setJustUploaded(false);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', sourceName || selectedFile.name);
      formData.append('streaming', 'true');

      const fileSizeMB = selectedFile.size / 1024 / 1024;
      if (fileSizeMB > 10) {
        toast.info(`Uploading ${fileSizeMB.toFixed(1)} MB file with progress tracking...`);
      }

      setUploadStatus('Uploading file...');
      setUploadPercent(5);

      const response = await fetch('/api/upload-geojson', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('Failed to get response reader');
        }

        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          
          const lines = buffer.split('\n\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data: UploadProgress = JSON.parse(line.slice(6));
                
                switch (data.type) {
                  case 'start':
                    setTotalCount(data.total || 0);
                    setUploadStatus(`Parsing ${data.total?.toLocaleString()} addresses...`);
                    setUploadPercent(10);
                    break;
                    
                  case 'source_created':
                    setUploadStatus('Inserting addresses into database...');
                    setUploadPercent(15);
                    break;
                    
                  case 'progress':
                    setInsertedCount(data.inserted || 0);
                    setUploadPercent(15 + (data.progress || 0) * 0.8);
                    setUploadStatus(
                      `Inserted ${data.inserted?.toLocaleString()} of ${data.total?.toLocaleString()} addresses (${data.progress}%)`
                    );
                    break;
                    
                  case 'complete':
                    setUploadPercent(100);
                    setUploadStatus('Upload complete!');
                    setUploadedSourceId(data.sourceId || null);
                    setJustUploaded(true);
                    toast.success(`Successfully uploaded ${data.addressCount?.toLocaleString()} addresses`);
                    setSelectedFile(null);
                    setSourceName('');
                    loadSources();
                    break;
                    
                  case 'error':
                    throw new Error(data.error);
                }
              } catch (e) {
                if (e instanceof SyntaxError) {
                  console.warn('Failed to parse SSE message:', line);
                } else {
                  throw e;
                }
              }
            }
          }
        }
      } else {
        const result = await response.json();
        if (result.success) {
          setUploadPercent(100);
          setUploadedSourceId(result.sourceId);
          setJustUploaded(true);
          toast.success(`Successfully uploaded ${result.addressCount?.toLocaleString()} addresses`);
          setSelectedFile(null);
          setSourceName('');
          loadSources();
        } else {
          throw new Error(result.error || 'Upload failed');
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClick = async (e: React.MouseEvent, source: GeoJSONSource) => {
    e.stopPropagation();
    setDeleteDialogSource(source);
    setDeleteConfirmText('');
    setDeleteImpact(null);
    setDeleteImpactLoading(true);
    try {
      const impact = await getGeoJSONSourceDeleteImpact(source.id);
      setDeleteImpact(impact);
    } catch {
      setDeleteImpact(null);
    } finally {
      setDeleteImpactLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialogSource) return;
    setIsDeleting(true);
    try {
      const result = await deleteGeoJSONSource(deleteDialogSource.id);
      if (result.success) {
        toast.success('Source deleted');
        setDeleteDialogSource(null);
        setDeleteConfirmText('');
        loadSources();
      } else {
        toast.error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStartEdit = (e: React.MouseEvent, sourceId: string, currentName: string) => {
    e.stopPropagation(); // Prevent navigation
    setEditingSourceId(sourceId);
    setEditingName(currentName);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSourceId(null);
    setEditingName('');
  };

  const handleSaveEdit = async (e: React.MouseEvent, sourceId: string) => {
    e.stopPropagation();
    
    if (!editingName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    try {
      const result = await renameGeoJSONSource(sourceId, editingName);
      if (result.success) {
        toast.success('Source renamed');
        setEditingSourceId(null);
        setEditingName('');
        loadSources();
      } else {
        toast.error(result.error || 'Rename failed');
      }
    } catch (error) {
      console.error('Rename error:', error);
      toast.error('Rename failed');
    }
  };

  const handleSourceClick = (sourceId: string) => {
    if (editingSourceId === sourceId) return; // Don't navigate when editing
    router.push(`/selections?source=${sourceId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Upload GeoJSON</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload address data from OpenAddresses.io or other GeoJSON sources (up to 200MB)
        </p>
      </div>

      {/* Success Alert with Next Step */}
      {justUploaded && (
        <Alert className="mb-8 border-serviceable/50 bg-serviceable/10">
          <CheckCircle className="h-5 w-5 text-serviceable" />
          <AlertTitle className="text-serviceable">Upload Complete!</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Your GeoJSON has been uploaded. Next, create a selection to filter addresses for checking.</span>
            <Button asChild className="ml-4">
              <Link href={uploadedSourceId ? `/selections?source=${uploadedSourceId}` : '/selections'}>
                <Filter className="mr-2 h-4 w-4" />
                Create Selection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload Card */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload New Source
            </CardTitle>
            <CardDescription>
              Supports FeatureCollection and line-delimited GeoJSON formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Source Name</Label>
              <Input
                id="name"
                placeholder="e.g., Lake County Ohio 2025"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                disabled={isUploading}
              />
            </div>

            <div
              {...getRootProps()}
              className={`
                cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors
                ${isUploading ? 'pointer-events-none opacity-50' : ''}
                ${isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <input {...getInputProps()} disabled={isUploading} />
              
              {selectedFile ? (
                <div className="space-y-2">
                  <FileJson className="mx-auto h-12 w-12 text-primary" />
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="font-medium">
                    {isDragActive ? 'Drop the file here' : 'Drag & drop or click to select'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    .json or .geojson files (up to 200MB)
                  </p>
                </div>
              )}
            </div>

            {/* Progress Section */}
            {isUploading && (
              <div className="space-y-3 rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Upload Progress</span>
                  <span className="text-muted-foreground">{Math.round(uploadPercent)}%</span>
                </div>
                <Progress value={uploadPercent} className="h-2" />
                <p className="text-sm text-muted-foreground">{uploadStatus}</p>
                {insertedCount > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-serviceable" />
                    <span>
                      <span className="font-medium text-serviceable">{insertedCount.toLocaleString()}</span>
                      {totalCount > 0 && (
                        <span className="text-muted-foreground"> of {totalCount.toLocaleString()}</span>
                      )}
                      {' '}addresses inserted
                    </span>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Parse
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Sources List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              Uploaded Sources
            </CardTitle>
            <CardDescription>
              {sources.length} source{sources.length !== 1 ? 's' : ''} uploaded
              {sources.length > 0 && ' • Click to create selection'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : sources.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <FileJson className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-2">No sources uploaded yet</p>
                <p className="mt-1 text-sm">Upload a GeoJSON file to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sources.map((source) => (
                  <div
                    key={source.id}
                    onClick={() => handleSourceClick(source.id)}
                    className={`group flex cursor-pointer items-center justify-between rounded-lg border bg-card p-4 transition-all ${
                      editingSourceId === source.id 
                        ? 'border-primary' 
                        : 'hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-serviceable" />
                        {editingSourceId === source.id ? (
                          <Input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-8 max-w-md"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEdit(e as unknown as React.MouseEvent, source.id);
                              } else if (e.key === 'Escape') {
                                handleCancelEdit(e as unknown as React.MouseEvent);
                              }
                            }}
                          />
                        ) : (
                          <span className="font-medium group-hover:text-primary">
                            {source.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{source._count.addresses.toLocaleString()} addresses</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(source.uploadedAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingSourceId === source.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleSaveEdit(e, source.id)}
                            className="text-serviceable hover:text-serviceable"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCancelEdit}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="hidden items-center gap-1 text-sm text-primary group-hover:flex">
                            <Filter className="h-4 w-4" />
                            <span>Create Selection</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleStartEdit(e, source.id, source.name)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleDeleteClick(e, source)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteDialogSource}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteDialogSource(null);
            setDeleteConfirmText('');
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete GeoJSON Source
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-1">
                <p>
                  You are about to permanently delete{' '}
                  <span className="font-semibold text-foreground">&quot;{deleteDialogSource?.name}&quot;</span>.
                  This action cannot be undone.
                </p>

                {/* Impact summary */}
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                  <p className="text-sm font-semibold text-destructive uppercase tracking-wide">
                    What will be permanently deleted
                  </p>
                  {deleteImpactLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Calculating impact...
                    </div>
                  ) : deleteImpact ? (
                    <div className="space-y-3 text-sm text-foreground">
                      <ul className="space-y-1">
                        <li>
                          <span className="font-medium">{deleteImpact.addressCount.toLocaleString()}</span>
                          {' '}address{deleteImpact.addressCount !== 1 ? 'es' : ''}
                        </li>
                        <li>
                          <span className="font-medium">{deleteImpact.checkCount.toLocaleString()}</span>
                          {' '}serviceability check result{deleteImpact.checkCount !== 1 ? 's' : ''} (all history)
                        </li>
                        {deleteImpact.fullyEmptiedSelections.length > 0 && (
                          <li>
                            <span className="font-medium">{deleteImpact.fullyEmptiedSelections.length}</span>
                            {' '}selection{deleteImpact.fullyEmptiedSelections.length !== 1 ? 's' : ''}
                            {' '}<span className="text-destructive font-medium">will be deleted</span>
                            {' '}(all their addresses come from this source)
                            <ul className="mt-1 ml-4 space-y-0.5 text-muted-foreground">
                              {deleteImpact.fullyEmptiedSelections.map((s) => (
                                <li key={s.id} className="truncate">• {s.name}</li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                      {deleteImpact.partiallyAffectedSelections.length > 0 && (
                        <div className="rounded border border-amber-300/50 bg-amber-50/50 dark:bg-amber-950/20 p-3 space-y-1">
                          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                            Will lose some addresses (not deleted)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            These selections contain addresses from other sources and will survive with reduced counts.
                          </p>
                          <ul className="mt-1 space-y-0.5 text-xs text-foreground">
                            {deleteImpact.partiallyAffectedSelections.map((s) => (
                              <li key={s.id} className="truncate">• {s.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Typed confirmation */}
                <div className="space-y-2">
                  <Label htmlFor="delete-confirm" className="text-sm">
                    Type{' '}
                    <span className="font-mono font-semibold text-foreground">
                      delete {deleteDialogSource?.name}
                    </span>
                    {' '}to confirm
                  </Label>
                  <Input
                    id="delete-confirm"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    placeholder={`delete ${deleteDialogSource?.name}`}
                    disabled={isDeleting}
                    autoComplete="off"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogSource(null);
                setDeleteConfirmText('');
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={
                isDeleting ||
                deleteConfirmText !== `delete ${deleteDialogSource?.name}`
              }
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete permanently
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
