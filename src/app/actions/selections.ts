'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export interface CreateSelectionResult {
  success: boolean;
  selectionId?: string;
  addressCount?: number;
  error?: string;
}

/**
 * Create a new address selection from filter criteria
 * Uses batching to handle large selections (SQLite has expression tree limit of 10,000)
 */
export async function createSelection(
  name: string,
  description: string | null,
  sourceId: string,
  filters: { city?: string[]; region?: string[]; postcode?: string[] }
): Promise<CreateSelectionResult> {
  try {
    // Build the where clause for finding addresses
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

    // Get matching address IDs
    const addresses = await prisma.address.findMany({
      where,
      select: { id: true },
    });

    if (addresses.length === 0) {
      return { success: false, error: 'No addresses match the filter criteria' };
    }

    // Create the selection first without addresses
    const selection = await prisma.addressSelection.create({
      data: {
        name,
        description,
        filterCriteria: JSON.stringify(filters),
      },
    });

    // Batch connect addresses to avoid SQLite expression tree limit
    // SQLite has a limit of 10,000 nested expressions, so we batch at 5,000 for safety
    const BATCH_SIZE = 5000;
    const addressIds = addresses.map((a) => a.id);
    
    for (let i = 0; i < addressIds.length; i += BATCH_SIZE) {
      const batch = addressIds.slice(i, i + BATCH_SIZE);
      await prisma.addressSelection.update({
        where: { id: selection.id },
        data: {
          addresses: {
            connect: batch.map((id) => ({ id })),
          },
        },
      });
    }

    revalidatePath('/selections');
    revalidatePath('/');

    return {
      success: true,
      selectionId: selection.id,
      addressCount: addresses.length,
    };
  } catch (error) {
    console.error('Error creating selection:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get all selections with address counts and serviceability stats
 * Optimized for large datasets using raw queries
 */
export async function getSelections() {
  const selections = await prisma.addressSelection.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { addresses: true },
      },
    },
  });

  // Get serviceability stats for each selection using optimized queries
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      try {
        const selectionId = selection.id;
        
        // Count checked addresses (have at least one check)
        // Convert BigInt to number for JavaScript arithmetic
        const checkedCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const serviceableCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'serviceable'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const preorderCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'preorder'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const noServiceCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.serviceabilityType = 'none'
            AND (sc.error IS NULL OR sc.error = '')
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const errorCount = await prisma.$queryRaw<[{ count: bigint }]>`
          SELECT COUNT(DISTINCT a.id) as count
          FROM addresses a
          INNER JOIN _AddressToAddressSelection atas ON a.id = atas.A
          INNER JOIN serviceability_checks sc ON a.id = sc.addressId
          WHERE atas.B = ${selectionId}
            AND sc.error IS NOT NULL
            AND sc.error != ''
            AND sc.checkedAt = (
              SELECT MAX(checkedAt) FROM serviceability_checks WHERE addressId = a.id
            )
        `.then(result => Number(result[0]?.count || 0));

        const totalAddresses = selection._count.addresses;
        const uncheckedCount = totalAddresses - checkedCount;

        return {
          ...selection,
          checkedCount,
          serviceableCount,
          preorderCount,
          noServiceCount,
          errorCount,
          uncheckedCount,
        };
      } catch (error) {
        console.error(`Error loading stats for selection ${selection.id}:`, error);
        // Return safe defaults on error
        return {
          ...selection,
          checkedCount: 0,
          serviceableCount: 0,
          preorderCount: 0,
          noServiceCount: 0,
          errorCount: 0,
          uncheckedCount: selection._count.addresses,
        };
      }
    })
  );

  return selectionsWithStats;
}

/**
 * Get selection details with addresses
 */
export async function getSelectionDetails(selectionId: string) {
  const selection = await prisma.addressSelection.findUnique({
    where: { id: selectionId },
    include: {
      addresses: {
        include: {
          checks: {
            orderBy: { checkedAt: 'desc' },
            take: 1,
          },
        },
      },
    },
  });

  return selection;
}

/**
 * Delete a selection (doesn't delete addresses, just the selection)
 */
export async function deleteSelection(selectionId: string) {
  try {
    await prisma.addressSelection.delete({
      where: { id: selectionId },
    });

    revalidatePath('/selections');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error deleting selection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update a selection's name and/or description
 */
export async function updateSelection(
  selectionId: string,
  name: string,
  description: string | null
) {
  try {
    await prisma.addressSelection.update({
      where: { id: selectionId },
      data: {
        name,
        description,
      },
    });

    revalidatePath('/selections');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    console.error('Error updating selection:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Add additional addresses to an existing selection from the same or different source
 */
export async function addAddressesToSelection(
  selectionId: string,
  sourceId: string,
  filters: { city?: string[]; region?: string[]; postcode?: string[] }
): Promise<CreateSelectionResult> {
  try {
    // Get the selection to verify it exists
    const selection = await prisma.addressSelection.findUnique({
      where: { id: selectionId },
      include: {
        addresses: {
          select: { id: true },
        },
      },
    });

    if (!selection) {
      return { success: false, error: 'Selection not found' };
    }

    // Get existing address IDs in this selection
    const existingAddressIds = new Set(selection.addresses.map((a) => a.id));

    // Build the where clause for finding new addresses
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

    // Get matching address IDs
    const matchingAddresses = await prisma.address.findMany({
      where,
      select: { id: true },
    });

    // Filter out addresses that are already in the selection
    const newAddressIds = matchingAddresses
      .map((a) => a.id)
      .filter((id) => !existingAddressIds.has(id));

    if (newAddressIds.length === 0) {
      return { success: false, error: 'No new addresses match the filter criteria (all matching addresses are already in the selection)' };
    }

    // Batch connect new addresses to avoid SQLite expression tree limit
    const BATCH_SIZE = 5000;
    
    for (let i = 0; i < newAddressIds.length; i += BATCH_SIZE) {
      const batch = newAddressIds.slice(i, i + BATCH_SIZE);
      await prisma.addressSelection.update({
        where: { id: selectionId },
        data: {
          addresses: {
            connect: batch.map((id) => ({ id })),
          },
        },
      });
    }

    // Update the filter criteria to reflect the addition
    const currentFilters = JSON.parse(selection.filterCriteria || '{}');
    const updatedFilters = {
      ...currentFilters,
      additionalSources: [
        ...(currentFilters.additionalSources || []),
        { sourceId, filters, addedAt: new Date().toISOString() },
      ],
    };

    await prisma.addressSelection.update({
      where: { id: selectionId },
      data: {
        filterCriteria: JSON.stringify(updatedFilters),
      },
    });

    revalidatePath('/selections');
    revalidatePath('/');

    return {
      success: true,
      selectionId: selection.id,
      addressCount: newAddressIds.length,
    };
  } catch (error) {
    console.error('Error adding addresses to selection:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get addresses for a selection with pagination
 */
export async function getSelectionAddresses(
  selectionId: string,
  page: number = 1,
  pageSize: number = 50,
  filter?: 'all' | 'serviceable' | 'not-serviceable' | 'unchecked'
) {
  const skip = (page - 1) * pageSize;

  const baseWhere = {
    selections: { some: { id: selectionId } },
  };

  // First get all addresses with their checks
  const addresses = await prisma.address.findMany({
    where: baseWhere,
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { addressString: 'asc' },
  });

  // Apply filter in memory (simpler for SQLite)
  let filteredAddresses = addresses;
  if (filter && filter !== 'all') {
    filteredAddresses = addresses.filter((a) => {
      const latestCheck = a.checks[0];
      switch (filter) {
        case 'serviceable':
          return latestCheck?.serviceable === true;
        case 'not-serviceable':
          return latestCheck?.serviceable === false;
        case 'unchecked':
          return !latestCheck;
        default:
          return true;
      }
    });
  }

  const total = filteredAddresses.length;
  const paginatedAddresses = filteredAddresses.slice(skip, skip + pageSize);

  return {
    addresses: paginatedAddresses,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

