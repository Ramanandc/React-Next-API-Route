-- CreateTable
CREATE TABLE "Asset" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "assetId" BIGINT NOT NULL,
    "quantity" BIGINT NOT NULL,
    "date" DATETIME NOT NULL,
    "price" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "Expenditure" (
    "expenseId" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountId" BIGINT NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Income" (
    "incomeId" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "accountId" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AssetType" (
    "assetId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Accounts" (
    "accountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNo" TEXT NOT NULL,
    "accountIfccode" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "accountBalance" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "AssetValue" (
    "assetValueId" BIGINT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "latestPrice" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MutualFundNav" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "schemeId" TEXT NOT NULL,
    "schemeName" TEXT NOT NULL,
    "latestNav" REAL NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AssetType_assetId_key" ON "AssetType"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "MutualFundNav_schemeId_key" ON "MutualFundNav"("schemeId");
