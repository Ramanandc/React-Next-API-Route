/*
  Warnings:

  - You are about to drop the `MutualFundNav` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MutualFundNav";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Fund" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "schemeId" TEXT NOT NULL,
    "schemeName" TEXT NOT NULL,
    "latestNav" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fund_schemeId_key" ON "Fund"("schemeId");
