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
 * Rename a GeoJSON source
 */
export async function renameGeoJSONSource(sourceId: string, newName: string) {
  try {
    if (!newName.trim()) {
      return { success: false, error: 'Name cannot be empty' };
    }

    await prisma.geoJSONSource.update({
      where: { id: sourceId },
      data: { name: newName.trim() },
    });
    
    revalidatePath('/upload');
    revalidatePath('/selections');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error renaming source:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get counts and names of what will be destroyed when a source is deleted.
 * Selections are split into two categories:
 *  - fullyEmptied: every address in the selection comes from this source → will be deleted
 *  - partiallyAffected: mixed sources → will lose some addresses but survive
 */
export async function getGeoJSONSourceDeleteImpact(sourceId: string) {
  const [addressCount, checkCount, fullyEmptied, partiallyAffected] = await Promise.all([
    prisma.address.count({ where: { sourceId } }),
    prisma.serviceabilityCheck.count({ where: { address: { sourceId } } }),
    // Selections where ALL addresses come from this source
    prisma.$queryRaw<{ id: string; name: string }[]>`
      SELECT s.id, s.name
      FROM address_selections s
      WHERE EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" = ${sourceId}
      )
      AND NOT EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" != ${sourceId}
      )
      ORDER BY s.name
    `,
    // Selections where only SOME addresses come from this source
    prisma.$queryRaw<{ id: string; name: string }[]>`
      SELECT s.id, s.name
      FROM address_selections s
      WHERE EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" = ${sourceId}
      )
      AND EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" != ${sourceId}
      )
      ORDER BY s.name
    `,
  ]);

  return {
    addressCount,
    checkCount,
    fullyEmptiedSelections: fullyEmptied,
    partiallyAffectedSelections: partiallyAffected,
  };
}

/**
 * Delete a GeoJSON source and all its addresses.
 * Selections that would be fully emptied are also deleted in the same transaction.
 */
export async function deleteGeoJSONSource(sourceId: string) {
  try {
    // Find selections that will be fully emptied so we can delete them too
    const fullyEmptied = await prisma.$queryRaw<{ id: string }[]>`
      SELECT s.id
      FROM address_selections s
      WHERE EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" = ${sourceId}
      )
      AND NOT EXISTS (
        SELECT 1 FROM "_AddressToAddressSelection" atas
        INNER JOIN addresses a ON atas."A" = a.id
        WHERE atas."B" = s.id AND a."sourceId" != ${sourceId}
      )
    `;

    const fullyEmptiedIds = fullyEmptied.map((s) => s.id);

    await prisma.$transaction([
      // Delete selections that would become empty shells
      ...(fullyEmptiedIds.length > 0
        ? [prisma.addressSelection.deleteMany({ where: { id: { in: fullyEmptiedIds } } })]
        : []),
      // Delete the source (cascades → addresses → checks + join table entries)
      prisma.geoJSONSource.delete({ where: { id: sourceId } }),
    ]);

    revalidatePath('/upload');
    revalidatePath('/selections');
    revalidatePath('/checker');
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

