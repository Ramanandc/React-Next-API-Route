const { PrismaClient } = require("@prisma/client");
// create seed data for accounts

const prisma = new PrismaClient();

async function main() {
  const accounts = [
    {
      accountName: "Main Account",
      accountNo: 123456,
      accountIfccode: "IFSC0001",
      accountBranch: "Main Branch",
      accountBalance: 10000,
    },
    {
      accountName: "Savings Account",
      accountNo: 654321,
      accountIfccode: "IFSC0002",
      accountBranch: "Savings Branch",
      accountBalance: 20000,
    },
  ];

  for (const account of accounts) {
    await prisma.accounts.create({
      data: account,
    });
  }
}

main()
  .then(() => {
    console.log("Seed data created successfully");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
