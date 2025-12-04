'use server';

import { prisma } from '@/lib/db';

/**
 * Get counts for navigation state
 */
export async function getNavStats() {
  const [sourceCount, selectionCount] = await Promise.all([
    prisma.geoJSONSource.count(),
    prisma.addressSelection.count(),
  ]);

  return {
    hasSources: sourceCount > 0,
    hasSelections: selectionCount > 0,
    sourceCount,
    selectionCount,
  };
}

