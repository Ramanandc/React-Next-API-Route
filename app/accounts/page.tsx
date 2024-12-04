import prisma from "@/lib/prisma";
import { BudgetLayout } from "../layouts/layouts";
import AccountItem from "./accountsItems";
import CreateAccount from "./createAccount";

async function getAccounts() {
  return await prisma.accounts.findMany();
}

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <BudgetLayout>
    <div>
    <header>
        <div className="container mx-auto flex items-center justify-between pb-4">
          <h1 className="text-xl font-bold text-gray-700">Accounts</h1>

          {/* Dropdown Input for Account Selection */}
          <div className="flex items-center space-x-2">
          <CreateAccount />
          </div>
        </div>
      </header>
      <div className="container mx-auto relative overflow-x-auto">
       
          <AccountItem account={accounts} />
      </div>
    </div>
    </BudgetLayout>
  );
}
