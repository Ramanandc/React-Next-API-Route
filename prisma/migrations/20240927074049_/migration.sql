/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountBalance` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Float`.
  - You are about to alter the column `accountId` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accounts" (
    "accountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountName" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "accountIfccode" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "accountBalance" REAL NOT NULL
);
INSERT INTO "new_Accounts" ("accountBalance", "accountBranch", "accountId", "accountIfccode", "accountName", "accountNo") SELECT "accountBalance", "accountBranch", "accountId", "accountIfccode", "accountName", "accountNo" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
