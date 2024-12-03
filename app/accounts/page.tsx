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
      <div className="container mx-auto  mb-10 flex items-center justify-between">
        <h1 className="text-lg  ">Accounts</h1>
        <CreateAccount />
      </div>
      <div className="container mx-auto relative overflow-x-auto">
       
          <AccountItem account={accounts} />
      </div>
    </div>
    </BudgetLayout>
  );
}
