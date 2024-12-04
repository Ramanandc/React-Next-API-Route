"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IncomeItem({ income }: { income: any }) {
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
          accountId: income.incomeId,
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
      key={income.incomeId}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {income.accountId}
      </th>
      <td className="px-6 py-4">{income.amount}</td>
      <td className="px-6 py-4">{income.date}</td>
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
