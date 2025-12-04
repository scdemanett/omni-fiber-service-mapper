'use server';

import { prisma } from '@/lib/db';
import { parseGeoJSONContent, parseFeature } from '@/lib/geojson-parser';
import { revalidatePath } from 'next/cache';

export interface UploadResult {
  success: boolean;
  sourceId?: string;
  addressCount?: number;
  error?: string;
}

/**
 * Upload and parse a GeoJSON file
 */
export async function uploadGeoJSON(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    const content = await file.text();
    
    // Parse and count features first
    const features = Array.from(parseGeoJSONContent(content));
    
    if (features.length === 0) {
      return { success: false, error: 'No valid GeoJSON features found in the file' };
    }

    // Create the source record
    const source = await prisma.geoJSONSource.create({
      data: {
        name: name || file.name,
        fileName: file.name,
        addressCount: features.length,
      },
    });

    // Parse and insert addresses in batches
    const batchSize = 500;
    let inserted = 0;

    for (let i = 0; i < features.length; i += batchSize) {
      const batch = features.slice(i, i + batchSize);
      const addressData = batch
        .map((feature) => parseFeature(feature))
        .filter((addr): addr is NonNullable<typeof addr> => addr !== null)
        .map((addr) => ({
          ...addr,
          sourceId: source.id,
        }));

      if (addressData.length > 0) {
        await prisma.address.createMany({
          data: addressData,
        });
        inserted += addressData.length;
      }
    }

    // Update the actual count if some features were invalid
    if (inserted !== features.length) {
      await prisma.geoJSONSource.update({
        where: { id: source.id },
        data: { addressCount: inserted },
      });
    }

    revalidatePath('/upload');
    revalidatePath('/selections');
    revalidatePath('/');

    return {
      success: true,
      sourceId: source.id,
      addressCount: inserted,
    };
  } catch (error) {
    console.error('Error uploading GeoJSON:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all GeoJSON sources
 */
export async function getGeoJSONSources() {
  return prisma.geoJSONSource.findMany({
    orderBy: { uploadedAt: 'desc' },
    include: {
      _count: {
        select: { addresses: true },
      },
    },
  });
}

/**
 * Delete a GeoJSON source and all its addresses
 */
export async function deleteGeoJSONSource(sourceId: string) {
  try {
    await prisma.geoJSONSource.delete({
      where: { id: sourceId },
    });
    
    revalidatePath('/upload');
    revalidatePath('/selections');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting source:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get unique property values for filtering
 */
export async function getUniquePropertyValues(sourceId: string, propertyName: keyof {
  city: string;
  region: string;
  postcode: string;
}) {
  const addresses = await prisma.address.findMany({
    where: { sourceId },
    select: { [propertyName]: true },
    distinct: [propertyName],
  });

  const values = addresses
    .map((a) => a[propertyName])
    .filter((v) => typeof v === 'string' && v !== '') as string[];

  return [...new Set(values)].sort();
}

/**
 * Get address count by filter
 */
export async function getAddressCountByFilter(
  sourceId: string,
  filters: { city?: string[]; region?: string[]; postcode?: string[] }
) {
  const where: Record<string, unknown> = { sourceId };
  
  if (filters.city?.length) {
    where.city = { in: filters.city };
  }
  if (filters.region?.length) {
    where.region = { in: filters.region };
  }
  if (filters.postcode?.length) {
    where.postcode = { in: filters.postcode };
  }

  return prisma.address.count({ where });
}

