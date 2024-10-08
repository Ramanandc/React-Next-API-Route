/*
  Warnings:

  - The primary key for the `AssetType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssetType" (
    "assetId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_AssetType" ("assetId", "name") SELECT "assetId", "name" FROM "AssetType";
DROP TABLE "AssetType";
ALTER TABLE "new_AssetType" RENAME TO "AssetType";
CREATE UNIQUE INDEX "AssetType_assetId_key" ON "AssetType"("assetId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
