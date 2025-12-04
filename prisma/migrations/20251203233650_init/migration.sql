-- CreateTable
CREATE TABLE "geojson_sources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressCount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "address_selections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filterCriteria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "number" TEXT,
    "street" TEXT,
    "unit" TEXT,
    "city" TEXT,
    "region" TEXT,
    "postcode" TEXT,
    "addressString" TEXT NOT NULL,
    "properties" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "addresses_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "geojson_sources" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "serviceability_checks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "addressId" TEXT NOT NULL,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selectionId" TEXT,
    "serviceable" BOOLEAN NOT NULL,
    "salesType" TEXT,
    "status" TEXT,
    "cstatus" TEXT,
    "isPreSale" INTEGER,
    "apiCreateDate" DATETIME,
    "apiUpdateDate" DATETIME,
    "fullResponse" TEXT NOT NULL,
    "error" TEXT,
    CONSTRAINT "serviceability_checks_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "batch_jobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "selectionId" TEXT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalAddresses" INTEGER NOT NULL,
    "checkedCount" INTEGER NOT NULL DEFAULT 0,
    "serviceableCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "lastCheckAt" DATETIME,
    "currentIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToAddressSelection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AddressToAddressSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "addresses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AddressToAddressSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "address_selections" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "addresses_sourceId_idx" ON "addresses"("sourceId");

-- CreateIndex
CREATE INDEX "addresses_city_idx" ON "addresses"("city");

-- CreateIndex
CREATE INDEX "addresses_postcode_idx" ON "addresses"("postcode");

-- CreateIndex
CREATE INDEX "addresses_addressString_idx" ON "addresses"("addressString");

-- CreateIndex
CREATE INDEX "serviceability_checks_addressId_idx" ON "serviceability_checks"("addressId");

-- CreateIndex
CREATE INDEX "serviceability_checks_serviceable_idx" ON "serviceability_checks"("serviceable");

-- CreateIndex
CREATE INDEX "serviceability_checks_checkedAt_idx" ON "serviceability_checks"("checkedAt");

-- CreateIndex
CREATE INDEX "serviceability_checks_selectionId_idx" ON "serviceability_checks"("selectionId");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToAddressSelection_AB_unique" ON "_AddressToAddressSelection"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToAddressSelection_B_index" ON "_AddressToAddressSelection"("B");
