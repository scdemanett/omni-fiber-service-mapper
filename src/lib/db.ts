import { PrismaClient } from '../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma ORM v7 uses driver adapters for direct DB connections.
// Keep the URL simple (SQLite file URL); tune concurrency via PRAGMAs below.
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
    return new PrismaClient({
      log: ['error', 'warn'],
      adapter,
    });
  })();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Enable WAL mode for better concurrent read/write performance
// WAL (Write-Ahead Logging) allows readers to read while writers write,
// which is critical for preventing timeouts during large uploads
prisma.$queryRawUnsafe('PRAGMA journal_mode = WAL;')
  .then(() => {
    console.log('✓ SQLite WAL mode enabled for concurrent access');
  })
  .catch(err => {
    console.error('Failed to enable WAL mode:', err);
  });

// Increase busy timeout to reduce SQLITE_BUSY during large operations.
prisma.$queryRawUnsafe('PRAGMA busy_timeout = 60000;')
  .then(() => {
    console.log('✓ SQLite busy_timeout set to 60000ms');
  })
  .catch(err => {
    console.error('Failed to set SQLite busy_timeout:', err);
  });

export default prisma;

