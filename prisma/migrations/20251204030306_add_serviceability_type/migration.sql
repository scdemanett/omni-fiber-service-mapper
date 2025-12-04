-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_batch_jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selectionId" TEXT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalAddresses" INTEGER NOT NULL,
    "checkedCount" INTEGER NOT NULL DEFAULT 0,
    "serviceableCount" INTEGER NOT NULL DEFAULT 0,
    "preorderCount" INTEGER NOT NULL DEFAULT 0,
    "noServiceCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "lastCheckAt" DATETIME,
    "currentIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_batch_jobs" ("checkedCount", "completedAt", "createdAt", "currentIndex", "id", "lastCheckAt", "name", "selectionId", "serviceableCount", "startedAt", "status", "totalAddresses", "updatedAt") SELECT "checkedCount", "completedAt", "createdAt", "currentIndex", "id", "lastCheckAt", "name", "selectionId", "serviceableCount", "startedAt", "status", "totalAddresses", "updatedAt" FROM "batch_jobs";
DROP TABLE "batch_jobs";
ALTER TABLE "new_batch_jobs" RENAME TO "batch_jobs";
CREATE TABLE "new_serviceability_checks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "addressId" TEXT NOT NULL,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selectionId" TEXT,
    "serviceable" BOOLEAN NOT NULL,
    "serviceabilityType" TEXT NOT NULL DEFAULT 'none',
    "salesType" TEXT,
    "status" TEXT,
    "cstatus" TEXT,
    "isPreSale" INTEGER,
    "salesStatus" TEXT,
    "matchType" TEXT,
    "apiCreateDate" DATETIME,
    "apiUpdateDate" DATETIME,
    "fullResponse" TEXT NOT NULL,
    "error" TEXT,
    CONSTRAINT "serviceability_checks_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_serviceability_checks" ("addressId", "apiCreateDate", "apiUpdateDate", "checkedAt", "cstatus", "error", "fullResponse", "id", "isPreSale", "salesType", "selectionId", "serviceable", "status") SELECT "addressId", "apiCreateDate", "apiUpdateDate", "checkedAt", "cstatus", "error", "fullResponse", "id", "isPreSale", "salesType", "selectionId", "serviceable", "status" FROM "serviceability_checks";
DROP TABLE "serviceability_checks";
ALTER TABLE "new_serviceability_checks" RENAME TO "serviceability_checks";
CREATE INDEX "serviceability_checks_addressId_idx" ON "serviceability_checks"("addressId");
CREATE INDEX "serviceability_checks_serviceable_idx" ON "serviceability_checks"("serviceable");
CREATE INDEX "serviceability_checks_serviceabilityType_idx" ON "serviceability_checks"("serviceabilityType");
CREATE INDEX "serviceability_checks_checkedAt_idx" ON "serviceability_checks"("checkedAt");
CREATE INDEX "serviceability_checks_selectionId_idx" ON "serviceability_checks"("selectionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
