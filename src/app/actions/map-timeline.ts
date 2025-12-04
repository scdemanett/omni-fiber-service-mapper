'use server';

import { prisma } from '@/lib/db';

export interface TimelineSnapshot {
  date: Date;
  serviceableCount: number;
  preorderCount: number;
  noServiceCount: number;
  uncheckedCount: number;
}

export interface AddressAtTime {
  id: string;
  longitude: number;
  latitude: number;
  addressString: string;
  city: string | null;
  serviceabilityType: string | null;
  serviceable: boolean | null;
  salesType: string | null;
  status: string | null;
  cstatus: string | null;
  checkedAt: Date | null;
}

/**
 * Get timeline of checks for a selection
 * Returns unique dates when service status changed (grouped by day)
 * Uses API updateDate from matchedAddress (when status changed), not when we checked
 */
export async function getCheckTimeline(selectionId: string): Promise<Date[]> {
  // First, get all address IDs in this selection
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
    },
    select: { id: true },
  });

  const addressIds = addresses.map(a => a.id);

  // Get all checks for these addresses with API dates
  const checks = await prisma.serviceabilityCheck.findMany({
    where: { 
      addressId: { in: addressIds }
    },
    select: { 
      apiUpdateDate: true,
      apiCreateDate: true,
      checkedAt: true // Fallback if API dates are not available
    },
    orderBy: { checkedAt: 'asc' },
  });

  console.log(`Timeline query: Found ${checks.length} total checks for ${addressIds.length} addresses in selection ${selectionId}`);

  // Group by date using API updateDate (when status changed), fallback chain to createDate then checkedAt
  const dateMap = new Map<string, Date>();
  checks.forEach((check) => {
    // Use API update date if available (tracks when service status changed to available),
    // fall back to createDate (when first planned), then to when we checked it
    const relevantDate = check.apiUpdateDate || check.apiCreateDate || check.checkedAt;
    const dateKey = relevantDate.toISOString().split('T')[0];
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, relevantDate);
    }
  });

  const dates = Array.from(dateMap.values()).sort((a, b) => a.getTime() - b.getTime());
  console.log(`Timeline for selection ${selectionId}: Found ${dates.length} unique days:`, dates.map(d => d.toISOString().split('T')[0]));
  return dates;
}

/**
 * Get addresses with their status at a specific point in time
 * Filters by when Omni Fiber changed service status (API updateDate), not when we checked
 */
export async function getAddressesAtTime(
  selectionId: string,
  asOfDate: Date
): Promise<AddressAtTime[]> {
  // Get all addresses in the selection with ALL their checks
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
    },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
      },
    },
  });

  return addresses.map((addr) => {
    // Filter checks to those with status changes before the target date
    // Use apiUpdateDate if available (when service status changed),
    // otherwise fall back to apiCreateDate, then checkedAt
    const checksBeforeDate = addr.checks.filter(c => {
      const relevantDate = c.apiUpdateDate || c.apiCreateDate || c.checkedAt;
      return relevantDate <= asOfDate;
    });

    // Prefer the most recent check without an error
    const validCheck = checksBeforeDate.find(c => !c.error || c.error === '');
    const check = validCheck || checksBeforeDate[0];
    
    return {
      id: addr.id,
      longitude: addr.longitude,
      latitude: addr.latitude,
      addressString: addr.addressString,
      city: addr.city,
      serviceabilityType: check?.serviceabilityType || null,
      serviceable: check?.serviceable ?? null,
      salesType: check?.salesType || null,
      status: check?.status || null,
      cstatus: check?.cstatus || null,
      checkedAt: check?.apiUpdateDate || check?.apiCreateDate || check?.checkedAt || null,
    };
  });
}

/**
 * Get snapshot statistics at a specific point in time
 */
export async function getSnapshotStats(
  selectionId: string,
  asOfDate: Date
): Promise<TimelineSnapshot> {
  const addresses = await getAddressesAtTime(selectionId, asOfDate);

  // Exclude addresses with errors from stats
  const validAddresses = addresses.filter(a => !a.checkedAt || a.serviceabilityType !== null);

  const serviceableCount = validAddresses.filter(
    (a) => a.serviceabilityType === 'serviceable'
  ).length;
  const preorderCount = validAddresses.filter(
    (a) => a.serviceabilityType === 'preorder'
  ).length;
  const noServiceCount = validAddresses.filter(
    (a) => a.serviceabilityType === 'none'
  ).length;
  const uncheckedCount = validAddresses.filter(
    (a) => a.serviceabilityType === null
  ).length;

  return {
    date: asOfDate,
    serviceableCount,
    preorderCount,
    noServiceCount,
    uncheckedCount,
  };
}

