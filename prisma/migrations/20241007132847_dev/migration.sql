/*
  Warnings:

  - You are about to drop the `Fund` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fund";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MutualFundNav" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "schemeId" TEXT NOT NULL,
    "schemeName" TEXT NOT NULL,
    "latestNav" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MutualFundNav_schemeId_key" ON "MutualFundNav"("schemeId");
