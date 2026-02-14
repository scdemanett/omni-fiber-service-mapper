import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawUrl = process.env.DATABASE_URL ?? '';

// Strip sslmode from the connection string so it doesn't override the Pool's ssl config.
// pg v8+ treats sslmode=require as verify-full which rejects Supabase's certificate chain.
// We handle SSL through the Pool's native ssl option instead.
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, (match, offset) => {
  // If this was the first query param (after ?), replace ? with nothing or fix the next &
  return offset === rawUrl.indexOf('?') ? '?' : '';
}).replace(/\?$/, '').replace(/\?&/, '?');

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const pool = new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      log: ['error', 'warn'],
      adapter,
    });
  })();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
