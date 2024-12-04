import prisma from "@/lib/prisma";

async function getTransaction() {
  return prisma.transaction.findMany();
}

export default async function TotalCredit() {
  const transactions = await getTransaction();
  const totalCredit = transactions.reduce((acc, transaction) => {
    return transaction.transactionType.toLowerCase() === "credit"
      ? acc + transaction.amount
      : acc;
  }, 0); // Initial accumulator value is 0

  return (
    <>
      <p className="mt-2 text-2xl font-bold text-sky-800">
        ₹ {totalCredit.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </p>
    </>
  );
}
