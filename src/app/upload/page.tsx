'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Upload, FileJson, Trash2, Loader2, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getGeoJSONSources, deleteGeoJSONSource } from '@/app/actions/geojson';
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

  const handleDelete = async (e: React.MouseEvent, sourceId: string, sourceName: string) => {
    e.stopPropagation(); // Prevent navigation
    if (!confirm(`Delete "${sourceName}" and all its addresses?`)) return;

    try {
      const result = await deleteGeoJSONSource(sourceId);
      if (result.success) {
        toast.success('Source deleted');
        loadSources();
      } else {
        toast.error(result.error || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Delete failed');
    }
  };

  const handleSourceClick = (sourceId: string) => {
    router.push(`/selections?source=${sourceId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload GeoJSON</h1>
        <p className="mt-2 text-muted-foreground">
          Upload address data from OpenAddress.io or other GeoJSON sources (up to 100MB)
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
                    .json or .geojson files (up to 100MB)
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
                    className="group flex cursor-pointer items-center justify-between rounded-lg border bg-card p-4 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-serviceable" />
                        <span className="font-medium group-hover:text-primary">
                          {source.name}
                        </span>
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
                      <div className="hidden items-center gap-1 text-sm text-primary group-hover:flex">
                        <Filter className="h-4 w-4" />
                        <span>Create Selection</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(e, source.id, source.name)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
