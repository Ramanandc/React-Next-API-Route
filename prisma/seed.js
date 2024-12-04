const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Insert multiple holders
  const holders = await prisma.holder.createMany({
    data: [
      { holderName: "Chitravelu Swaminathan" },
      { holderName: "Thamariselvi Swaminathan" },
      { holderName: "Ramanand Chitravelu" }, // Add a default holder
      { holderName: "Abinaya Ramanand" },
      { holderName: "Vindunaa AR" },
      { holderName: "Rudhran AR" },
    ],
  });

  console.log(`${holders.count} holders added.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
