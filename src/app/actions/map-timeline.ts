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
 * Returns unique dates when checks were performed
 */
export async function getCheckTimeline(selectionId: string): Promise<Date[]> {
  // Get all unique check dates for this selection
  const checks = await prisma.serviceabilityCheck.findMany({
    where: { selectionId },
    select: { checkedAt: true },
    distinct: ['checkedAt'],
    orderBy: { checkedAt: 'asc' },
  });

  // Group by date (ignoring time for daily view)
  const dateMap = new Map<string, Date>();
  checks.forEach((check) => {
    const dateKey = check.checkedAt.toISOString().split('T')[0];
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, check.checkedAt);
    }
  });

  return Array.from(dateMap.values()).sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Get addresses with their status at a specific point in time
 */
export async function getAddressesAtTime(
  selectionId: string,
  asOfDate: Date
): Promise<AddressAtTime[]> {
  // Get all addresses in the selection
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
    },
    include: {
      checks: {
        where: {
          selectionId,
          checkedAt: { lte: asOfDate },
        },
        orderBy: { checkedAt: 'desc' },
        take: 1, // Get the most recent check before or at the target date
      },
    },
  });

  return addresses.map((addr) => {
    const check = addr.checks[0];
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
      checkedAt: check?.checkedAt || null,
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

  const serviceableCount = addresses.filter(
    (a) => a.serviceabilityType === 'serviceable'
  ).length;
  const preorderCount = addresses.filter(
    (a) => a.serviceabilityType === 'preorder'
  ).length;
  const noServiceCount = addresses.filter(
    (a) => a.serviceabilityType === 'none'
  ).length;
  const uncheckedCount = addresses.filter(
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

