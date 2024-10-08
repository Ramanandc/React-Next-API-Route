import prisma from "@/lib/prisma";

async function getAccounts() {
  return await prisma.mutualFundNav.findMany();
}

export default async function Page() {
  const accounts = await getAccounts();
  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts.map((account: any) => (
          <li key={account.schemeId}>
            {account.schemeId}: {account.schemeName} {account.latestNav}
          </li>
        ))}
      </ul>
    </div>
  );
}
