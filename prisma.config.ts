
// Prisma 7 config: connection URLs for CLI operations (migrate, db push, etc.)
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Used by Prisma CLI for migrations and schema push.
    // For Supabase, use the direct connection (port 5432).
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "postgresql://localhost:5432/omni_fiber_mapper",
  },
});
