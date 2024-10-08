import prisma from "@/lib/prisma";
import AccountItem from "./accountsItems";
import CreateAccount from "./createAccount";

async function getAccounts() {
  return await prisma.accounts.findMany();
}

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <div>
      <div className="container mx-auto  mb-10 flex items-center justify-between">
        <h1 className="text-lg  ">Accounts</h1>
        <CreateAccount />
      </div>
      <div className="container mx-auto relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Account Nane
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Account No
              </th>
              <th scope="col" className="px-6 py-3">
                Branch
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account: any) => (
              <AccountItem key={account.accountId} account={account} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
