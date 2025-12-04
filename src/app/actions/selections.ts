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

    // Create the selection with connected addresses
    const selection = await prisma.addressSelection.create({
      data: {
        name,
        description,
        filterCriteria: JSON.stringify(filters),
        addresses: {
          connect: addresses.map((a) => ({ id: a.id })),
        },
      },
    });

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

  // Get serviceability stats for each selection
  const selectionsWithStats = await Promise.all(
    selections.map(async (selection) => {
      const addresses = await prisma.address.findMany({
        where: {
          selections: { some: { id: selection.id } },
        },
        include: {
          checks: {
            orderBy: { checkedAt: 'desc' },
            take: 1,
          },
        },
      });

      const checkedCount = addresses.filter((a) => a.checks.length > 0).length;
      const serviceableCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'serviceable').length;
      const preorderCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'preorder').length;
      const noServiceCount = addresses.filter((a) => a.checks[0]?.serviceabilityType === 'none').length;

      return {
        ...selection,
        checkedCount,
        serviceableCount,
        preorderCount,
        noServiceCount,
        uncheckedCount: addresses.length - checkedCount,
      };
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

