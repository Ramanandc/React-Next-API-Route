import prisma from "@/lib/prisma";
import { BudgetLayout } from "../layouts/layouts";
import CreateTransaction from "./createTransactions";
import TransactionItem from "./transactionsItems";

async function getTransaction() {
  return await prisma.transaction.findMany();
}

export default async function TransactionPage() {
  const transaction = await getTransaction();

  return (
    <BudgetLayout>
    <div>
    <header>
        <div className="container mx-auto flex items-center justify-between pb-4">
          <h1 className="text-xl font-bold text-gray-700">Transcations</h1>

          {/* Dropdown Input for Account Selection */}
          <div className="flex items-center space-x-2">
          <CreateTransaction />
          </div>
        </div>
      </header>
    
      <div className="container mx-auto relative overflow-x-auto">
        <TransactionItem transaction={transaction} />
      </div>
    </div>
    </BudgetLayout>
  );
}
