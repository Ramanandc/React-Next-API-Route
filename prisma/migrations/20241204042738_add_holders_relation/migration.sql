/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssetType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssetValue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expenditure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MutualFundNav` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - Added the required column `accountHolder` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AssetType_assetId_key";

-- DropIndex
DROP INDEX "MutualFundNav_schemeId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Asset";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssetType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssetValue";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Expenditure";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Income";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MutualFundNav";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Holder" (
    "holderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "holderName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" BIGINT NOT NULL PRIMARY KEY,
    "accountId" BIGINT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "reason" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accounts" (
    "accountId" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountHolder" INTEGER NOT NULL,
    "accountNo" TEXT NOT NULL,
    "accountIfccode" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "accountBalance" REAL NOT NULL,
    CONSTRAINT "Accounts_accountHolder_fkey" FOREIGN KEY ("accountHolder") REFERENCES "Holder" ("holderId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Accounts" ("accountBalance", "accountBranch", "accountId", "accountIfccode", "accountName", "accountNo", "userId") SELECT "accountBalance", "accountBranch", "accountId", "accountIfccode", "accountName", "accountNo", "userId" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Holder_holderName_key" ON "Holder"("holderName");
