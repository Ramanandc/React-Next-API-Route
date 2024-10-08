"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountItem({ account }: { account: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch("/api/accounts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: account.accountId,
        }),
      });
      // Optionally, you can refresh the page or update the UI after deletion.
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setIsDeleting(false);
      router.refresh();
    }
  };

  return (
    <tr
      key={account.accountId}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {account.accountName}
      </th>
      <td className="px-6 py-4">{account.accountBalance}</td>
      <td className="px-6 py-4">{account.accountNo}</td>
      <td className="px-6 py-4">{account.accountBranch}</td>
      <td className="px-6 py-4">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 dark:text-red-400"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}
