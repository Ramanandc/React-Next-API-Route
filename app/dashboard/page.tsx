import ExpenseChart from "@/components/expenseChart";
import IncomeChart from "@/components/incomeChart";
import TotalAmount from "@/components/totalAmount";
import TotalCredit from "@/components/totalCredit";
import TotalDebit from "@/components/totalDebit";
import prisma from "@/lib/prisma";
import { BudgetLayout } from "../layouts/layouts";

async function getHolders() {
  return await prisma.holder.findMany();
}

export default async function Page() {
  const accountHolders = await getHolders();

  return (
    <BudgetLayout>
      <header>
        <div className="container mx-auto flex items-center justify-between pb-4">
          <h1 className="text-xl font-bold text-gray-700">Overview</h1>

          {/* Dropdown Input for Account Selection */}
          <div className="flex items-center space-x-2">
            <select
              id="accountHolder"
              className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">All Accounts</option>
              {accountHolders.map((holder) => (
                <option key={holder.holderId} value={holder.holderId}>
                  {holder.holderName}
                </option>
              ))}
              
            </select>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">Amount</h3>
          <TotalAmount />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Debit{" "}
            {new Date().toLocaleString("default", { month: "numeric" }) +
              "/" +
              new Date().getFullYear()}
          </h3>
         <TotalDebit />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Credit{" "}
            {new Date().toLocaleString("default", { month: "numeric" }) +
              "/" +
              new Date().getFullYear()}
          </h3>
          <TotalCredit />
        </div>
      </div>
      {/* create two column layout */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white shadow rounded-lg">
          <ExpenseChart />
        </div>
        <div className="bg-white shadow rounded-lg">
          <IncomeChart />
        </div>
      </div>
    </BudgetLayout>
  );
}
