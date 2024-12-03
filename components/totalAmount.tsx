import prisma from "@/lib/prisma";

async function getAccounts() {
  return prisma.accounts.findMany();
}

export default async function TotalAmount() {
  const accounts = await getAccounts();
  const totalAmount = accounts.reduce((acc, account) => {
    return acc + account.accountBalance;
  }, 0);

  return (
    <>
      <p className="mt-2 text-2xl font-bold text-sky-800">₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</p>
    </>
  );
}
