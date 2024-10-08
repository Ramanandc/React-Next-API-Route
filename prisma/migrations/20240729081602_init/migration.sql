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
    "accountId" BIGINT NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Income" (
    "incomeId" BIGINT NOT NULL PRIMARY KEY,
    "accountId" BIGINT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AssetType" (
    "assetId" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Accounts" (
    "accountId" BIGINT NOT NULL PRIMARY KEY,
    "accountName" TEXT NOT NULL,
    "accountNo" BIGINT NOT NULL,
    "accountIfccode" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "accountBalance" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "AssetValue" (
    "assetValueId" BIGINT NOT NULL PRIMARY KEY,
    "assetId" TEXT NOT NULL,
    "latestPrice" BIGINT NOT NULL,
    "date" DATETIME NOT NULL
);
