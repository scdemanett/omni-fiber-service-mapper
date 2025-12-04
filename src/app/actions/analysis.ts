'use server';

import { prisma } from '@/lib/db';

export interface AddressStatusChange {
  addressId: string;
  addressString: string;
  fromType: string;
  toType: string;
  changedAt: Date;
  previousCheckAt: Date;
}

export interface ServiceProgressStats {
  totalAddresses: number;
  currentServiceable: number;
  currentPreorder: number;
  currentNoService: number;
  recentTransitions: AddressStatusChange[];
  transitionCounts: {
    preorderToServiceable: number;
    noneToPreorder: number;
    noneToServiceable: number;
    other: number;
  };
}

/**
 * Get addresses that changed serviceability type between checks
 */
export async function getStatusChanges(
  selectionId: string,
  fromDate?: Date,
  limit: number = 50
): Promise<AddressStatusChange[]> {
  // Get all addresses in the selection with their checks
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
      checks: { some: {} }, // Only addresses that have been checked
    },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 10, // Get recent history
        where: fromDate ? { checkedAt: { gte: fromDate } } : undefined,
      },
    },
  });

  const changes: AddressStatusChange[] = [];

  // Analyze each address for status changes
  for (const addr of addresses) {
    if (addr.checks.length < 2) continue; // Need at least 2 checks to see a change

    // Compare most recent check with previous check
    const latest = addr.checks[0];
    const previous = addr.checks[1];

    if (latest.serviceabilityType !== previous.serviceabilityType) {
      changes.push({
        addressId: addr.id,
        addressString: addr.addressString,
        fromType: previous.serviceabilityType,
        toType: latest.serviceabilityType,
        changedAt: latest.checkedAt,
        previousCheckAt: previous.checkedAt,
      });
    }
  }

  // Sort by most recent changes first
  changes.sort((a, b) => b.changedAt.getTime() - a.changedAt.getTime());

  return changes.slice(0, limit);
}

/**
 * Get service progress statistics for a selection
 */
export async function getServiceProgress(selectionId: string): Promise<ServiceProgressStats> {
  // Get all addresses with their latest checks
  const addresses = await prisma.address.findMany({
    where: {
      selections: { some: { id: selectionId } },
    },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
        take: 2, // Get latest and previous
      },
    },
  });

  // Count current status
  const currentServiceable = addresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'serviceable'
  ).length;
  const currentPreorder = addresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'preorder'
  ).length;
  const currentNoService = addresses.filter(
    (a) => a.checks[0]?.serviceabilityType === 'none'
  ).length;

  // Analyze transitions
  let preorderToServiceable = 0;
  let noneToPreorder = 0;
  let noneToServiceable = 0;
  let other = 0;
  const recentTransitions: AddressStatusChange[] = [];

  for (const addr of addresses) {
    if (addr.checks.length < 2) continue;

    const latest = addr.checks[0];
    const previous = addr.checks[1];

    if (latest.serviceabilityType !== previous.serviceabilityType) {
      const transition = `${previous.serviceabilityType}_to_${latest.serviceabilityType}`;
      
      // Count transition types
      if (previous.serviceabilityType === 'preorder' && latest.serviceabilityType === 'serviceable') {
        preorderToServiceable++;
      } else if (previous.serviceabilityType === 'none' && latest.serviceabilityType === 'preorder') {
        noneToPreorder++;
      } else if (previous.serviceabilityType === 'none' && latest.serviceabilityType === 'serviceable') {
        noneToServiceable++;
      } else {
        other++;
      }

      recentTransitions.push({
        addressId: addr.id,
        addressString: addr.addressString,
        fromType: previous.serviceabilityType,
        toType: latest.serviceabilityType,
        changedAt: latest.checkedAt,
        previousCheckAt: previous.checkedAt,
      });
    }
  }

  // Sort by most recent
  recentTransitions.sort((a, b) => b.changedAt.getTime() - a.changedAt.getTime());

  return {
    totalAddresses: addresses.length,
    currentServiceable,
    currentPreorder,
    currentNoService,
    recentTransitions: recentTransitions.slice(0, 50),
    transitionCounts: {
      preorderToServiceable,
      noneToPreorder,
      noneToServiceable,
      other,
    },
  };
}

/**
 * Get check history for a specific address
 */
export async function getAddressCheckHistory(addressId: string) {
  const address = await prisma.address.findUnique({
    where: { id: addressId },
    include: {
      checks: {
        orderBy: { checkedAt: 'desc' },
      },
    },
  });

  return address;
}

