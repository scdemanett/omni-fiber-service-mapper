import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { parseGeoJSONContent, parseFeature, type GeoJSONFeature } from '@/lib/geojson-parser';

// Route segment config for large file uploads
export const maxDuration = 120; // 2 minutes timeout for large files
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const useStreaming = formData.get('streaming') === 'true';

    if (!file) {
      return new Response(JSON.stringify({ success: false, error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(`Uploading file: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    // Read file content
    const content = await file.text();

    // Parse features
    console.log('Parsing GeoJSON features...');
    const features = Array.from(parseGeoJSONContent(content));

    if (features.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'No valid GeoJSON features found in the file' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${features.length} features`);

    // If streaming is requested, use SSE
    if (useStreaming) {
      return streamingUpload(name || file.name, file.name, features);
    }

    // Regular non-streaming upload
    return regularUpload(name || file.name, file.name, features);
  } catch (error) {
    console.error('Error uploading GeoJSON:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function regularUpload(name: string, fileName: string, features: GeoJSONFeature[]) {
  // Create the source record first
  const source = await prisma.geoJSONSource.create({
    data: {
      name,
      fileName,
      addressCount: features.length,
    },
  });

  // Parse and insert addresses in batches
  const batchSize = 1000;
  let inserted = 0;

  for (let i = 0; i < features.length; i += batchSize) {
    const batch = features.slice(i, i + batchSize);
    const addressData = batch
      .map((feature) => {
        try {
          return parseFeature(feature);
        } catch {
          return null;
        }
      })
      .filter((addr): addr is NonNullable<typeof addr> => addr !== null)
      .map((addr) => ({
        ...addr,
        sourceId: source.id,
      }));

    if (addressData.length > 0) {
      await prisma.address.createMany({ data: addressData });
      inserted += addressData.length;
    }
  }

  // Update the actual count
  if (inserted !== features.length) {
    await prisma.geoJSONSource.update({
      where: { id: source.id },
      data: { addressCount: inserted },
    });
  }

  return new Response(
    JSON.stringify({ success: true, sourceId: source.id, addressCount: inserted }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

async function streamingUpload(name: string, fileName: string, features: GeoJSONFeature[]) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial progress
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start', total: features.length })}\n\n`));

        // Create the source record
        const source = await prisma.geoJSONSource.create({
          data: {
            name,
            fileName,
            addressCount: features.length,
          },
        });

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'source_created', sourceId: source.id })}\n\n`));

        // Parse and insert addresses in batches
        const batchSize = 500; // Smaller batches for more frequent updates
        let inserted = 0;
        let failed = 0;

        for (let i = 0; i < features.length; i += batchSize) {
          const batch = features.slice(i, i + batchSize);
          const addressData = batch
            .map((feature) => {
              try {
                return parseFeature(feature);
              } catch {
                failed++;
                return null;
              }
            })
            .filter((addr): addr is NonNullable<typeof addr> => addr !== null)
            .map((addr) => ({
              ...addr,
              sourceId: source.id,
            }));

          if (addressData.length > 0) {
            await prisma.address.createMany({ data: addressData });
            inserted += addressData.length;
          }

          // Send progress update
          const progress = Math.round(((i + batch.length) / features.length) * 100);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            type: 'progress', 
            inserted, 
            processed: i + batch.length,
            total: features.length,
            progress,
            failed 
          })}\n\n`));
        }

        // Update the actual count
        if (inserted !== features.length) {
          await prisma.geoJSONSource.update({
            where: { id: source.id },
            data: { addressCount: inserted },
          });
        }

        // Send completion
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
          type: 'complete', 
          sourceId: source.id, 
          addressCount: inserted,
          failed 
        })}\n\n`));

        controller.close();
      } catch (error) {
        console.error('Streaming upload error:', error);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
          type: 'error', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
