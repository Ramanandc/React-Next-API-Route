/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `Accounts` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `accountId` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `transactionId` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accounts" (
    "accountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountHolder" INTEGER NOT NULL,
    "accountNo" TEXT NOT NULL,
    "accountIfccode" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "accountBalance" REAL NOT NULL,
    CONSTRAINT "Accounts_accountHolder_fkey" FOREIGN KEY ("accountHolder") REFERENCES "Holder" ("holderId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Accounts" ("accountBalance", "accountBranch", "accountHolder", "accountId", "accountIfccode", "accountName", "accountNo", "userId") SELECT "accountBalance", "accountBranch", "accountHolder", "accountId", "accountIfccode", "accountName", "accountNo", "userId" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
CREATE TABLE "new_Transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "transactionType" TEXT NOT NULL,
    "reason" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("accountId", "amount", "date", "reason", "transactionId", "transactionType", "userId") SELECT "accountId", "amount", "date", "reason", "transactionId", "transactionType", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
