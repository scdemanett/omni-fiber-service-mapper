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
 * Create a new address selection from filter criteria.
 * PostgreSQL handles large IN-lists natively, so no batching needed.
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

    // Create the selection and connect all addresses in one operation.
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
 * Get all selections with address counts and serviceability stats.
 * Uses a single CTE + DISTINCT ON query for all selections (replaces 5*N sequential queries).
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

  // Single query computes stats for ALL selections at once
  const selectionStatsRows = await prisma.$queryRaw<{
    selectionId: string;
    checkedCount: bigint;
    serviceableCount: bigint;
    preorderCount: bigint;
    noServiceCount: bigint;
    errorCount: bigint;
  }[]>`
    WITH latest_checks AS (
      SELECT DISTINCT ON ("addressId")
        "addressId",
        "serviceabilityType",
        error
      FROM serviceability_checks
      ORDER BY "addressId", "checkedAt" DESC
    )
    SELECT
      atas."B" as "selectionId",
      COUNT(DISTINCT CASE WHEN lc."addressId" IS NOT NULL THEN a.id END) as "checkedCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'serviceable' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "serviceableCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'preorder' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "preorderCount",
      COUNT(DISTINCT CASE WHEN lc."serviceabilityType" = 'none' AND (lc.error IS NULL OR lc.error = '') THEN a.id END) as "noServiceCount",
      COUNT(DISTINCT CASE WHEN lc.error IS NOT NULL AND lc.error != '' THEN a.id END) as "errorCount"
    FROM addresses a
    INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A"
    LEFT JOIN latest_checks lc ON a.id = lc."addressId"
    GROUP BY atas."B"
  `;

  const statsMap = new Map(
    selectionStatsRows.map((row) => [row.selectionId, row])
  );

  const selectionsWithStats = selections.map((selection) => {
    const stats = statsMap.get(selection.id);
    const checkedCount = Number(stats?.checkedCount || 0);
    const totalAddresses = selection._count.addresses;

    return {
      ...selection,
      checkedCount,
      serviceableCount: Number(stats?.serviceableCount || 0),
      preorderCount: Number(stats?.preorderCount || 0),
      noServiceCount: Number(stats?.noServiceCount || 0),
      errorCount: Number(stats?.errorCount || 0),
      uncheckedCount: totalAddresses - checkedCount,
    };
  });

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
 * Add additional addresses to an existing selection from the same or different source.
 * PostgreSQL handles large connection sets natively (no batching needed).
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

    // Connect all new addresses in one operation (no batching needed for PostgreSQL)
    await prisma.addressSelection.update({
      where: { id: selectionId },
      data: {
        addresses: {
          connect: newAddressIds.map((id) => ({ id })),
        },
      },
    });

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
 * Get addresses for a selection with pagination and filtering.
 * All filtering and pagination is pushed to the database (no in-memory filtering).
 */
export async function getSelectionAddresses(
  selectionId: string,
  page: number = 1,
  pageSize: number = 50,
  filter?: 'all' | 'serviceable' | 'not-serviceable' | 'unchecked'
) {
  const skip = (page - 1) * pageSize;

  // ── Unchecked filter: addresses with zero checks ──
  if (filter === 'unchecked') {
    const where = {
      selections: { some: { id: selectionId } },
      checks: { none: {} },
    };

    const [addresses, total] = await Promise.all([
      prisma.address.findMany({
        where,
        include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
        orderBy: { addressString: 'asc' },
        skip,
        take: pageSize,
      }),
      prisma.address.count({ where }),
    ]);

    return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  // ── Serviceable / Not-serviceable filters: need latest check status ──
  if (filter === 'serviceable' || filter === 'not-serviceable') {
    const isServiceable = filter === 'serviceable';

    // Count total matching addresses
    const [countResult] = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM addresses a
      INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A" AND atas."B" = ${selectionId}
      INNER JOIN LATERAL (
        SELECT serviceable
        FROM serviceability_checks sc
        WHERE sc."addressId" = a.id
        ORDER BY sc."checkedAt" DESC
        LIMIT 1
      ) lc ON true
      WHERE lc.serviceable = ${isServiceable}
    `;
    const total = Number(countResult?.count || 0);

    // Get paginated IDs (ordered)
    const pageRows = await prisma.$queryRaw<{ id: string }[]>`
      SELECT a.id
      FROM addresses a
      INNER JOIN "_AddressToAddressSelection" atas ON a.id = atas."A" AND atas."B" = ${selectionId}
      INNER JOIN LATERAL (
        SELECT serviceable
        FROM serviceability_checks sc
        WHERE sc."addressId" = a.id
        ORDER BY sc."checkedAt" DESC
        LIMIT 1
      ) lc ON true
      WHERE lc.serviceable = ${isServiceable}
      ORDER BY a."addressString" ASC
      LIMIT ${pageSize} OFFSET ${skip}
    `;

    // Fetch full address data with Prisma (preserves expected return shape)
    const addresses = pageRows.length > 0
      ? await prisma.address.findMany({
          where: { id: { in: pageRows.map((r) => r.id) } },
          include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
          orderBy: { addressString: 'asc' },
        })
      : [];

    return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  // ── Default: all addresses (no status filter) ──
  const where = {
    selections: { some: { id: selectionId } },
  };

  const [addresses, total] = await Promise.all([
    prisma.address.findMany({
      where,
      include: { checks: { orderBy: { checkedAt: 'desc' as const }, take: 1 } },
      orderBy: { addressString: 'asc' },
      skip,
      take: pageSize,
    }),
    prisma.address.count({ where }),
  ]);

  return { addresses, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}
