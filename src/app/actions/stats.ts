'use server';

import { prisma } from '@/lib/db';

/**
 * Retry a database operation with exponential backoff
 */
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Check if it's a timeout error
      const isTimeout = error instanceof Error && 
        (error.message.includes('timeout') || 
         error.message.includes('Socket timeout') ||
         error.message.includes('database is locked'));
      
      // Only retry on timeout/lock errors, not on other errors
      if (!isTimeout || attempt === maxRetries - 1) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = initialDelay * Math.pow(2, attempt);
      console.log(`Database timeout on attempt ${attempt + 1}, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Get counts for navigation state with retry logic for handling concurrent operations
 */
export async function getNavStats() {
  return retryWithBackoff(async () => {
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
  });
}

