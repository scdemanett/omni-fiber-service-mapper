import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure SQLite for better handling of large datasets and concurrent access
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

// Add critical SQLite parameters for better concurrent performance:
// - timeout: 60000ms (increased from 30s to handle large uploads)
// - connection_limit: 1 (SQLite best practice - single writer)
// - pool_timeout: 60 seconds
const urlParams = new URLSearchParams();
urlParams.set('timeout', '60000');
urlParams.set('connection_limit', '1');
urlParams.set('pool_timeout', '60');

const urlWithParams = databaseUrl.includes('?') 
  ? `${databaseUrl}&${urlParams.toString()}` 
  : `${databaseUrl}?${urlParams.toString()}`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: urlWithParams,
      },
    },
  });

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

export default prisma;

