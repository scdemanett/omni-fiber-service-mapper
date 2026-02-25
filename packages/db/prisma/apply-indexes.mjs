/**
 * Applies PostgreSQL expression indexes that cannot be expressed in schema.prisma.
 * Run automatically as a postdb:push lifecycle hook.
 */
import 'dotenv/config';
import pg from 'pg';

const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!url) {
  console.error('Error: DIRECT_URL or DATABASE_URL must be set in packages/db/.env');
  process.exit(1);
}

// Supabase (and most hosted Postgres providers) require SSL on direct connections.
// Local connections (localhost / 127.0.0.1) don't need it.
const isLocal = /localhost|127\.0\.0\.1/.test(url);
const client = new pg.Client({
  connectionString: url,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});
await client.connect();

try {
  // Functional index on the "effective date" expression used by all timeline LATERAL JOINs.
  // Covers: COALESCE("apiUpdateDate", "apiCreateDate", "checkedAt") <= $asOfDate
  await client.query(`
    CREATE INDEX IF NOT EXISTS "idx_sc_effective_date"
    ON "serviceability_checks" (
      "addressId",
      COALESCE("apiUpdateDate", "apiCreateDate", "checkedAt") DESC
    )
  `);
  console.log('  Applied: idx_sc_effective_date');
} finally {
  await client.end();
}
