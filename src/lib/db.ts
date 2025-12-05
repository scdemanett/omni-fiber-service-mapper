import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure SQLite for better handling of large datasets
const databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
const urlWithTimeout = databaseUrl.includes('?') 
  ? `${databaseUrl}&timeout=30000` 
  : `${databaseUrl}?timeout=30000`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
    // Increase timeout for large datasets (SQLite default is 5000ms)
    datasources: {
      db: {
        url: urlWithTimeout,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

