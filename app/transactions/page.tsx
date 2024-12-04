import prisma from "@/lib/prisma";
import { BudgetLayout } from "../layouts/layouts";
import CreateTransaction from "./createTransactions";

async function getAccounts() {
  return await prisma.accounts.findMany();
}

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <BudgetLayout>
    <div>
      <div className="container mx-auto  mb-10 flex items-center justify-between">
        <h1 className="text-lg  ">Transcations</h1>
        <CreateTransaction />
      </div>
      <div className="container mx-auto relative overflow-x-auto">
        List of transactions
      </div>
    </div>
    </BudgetLayout>
  );
}
