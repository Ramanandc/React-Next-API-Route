"use client";

import { useEffect, useState } from "react";
import { BudgetLayout } from "../layouts/layouts";
import CreateTransaction from "./createTransactions";
import TransactionItem from "./transactionsItems";

// Define the transaction type
interface Transaction {
  transactionId: number;
  accountId: number;
  userId: string;
  amount: number;
  transactionType: "CREDIT" | "DEBIT";
  reason?: string;
  date: string;
}

async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch("/api/transactions");
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setFilteredTransactions(data); // Initially, show all transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getTransactions();
  }, []);

  const handleFilterChange = (filter: string) => {
    setFilterType(filter);
    if (filter === "CREDIT") {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.transactionType === "CREDIT")
      );
    } else if (filter === "DEBIT") {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.transactionType === "DEBIT")
      );
    } else {
      setFilteredTransactions(transactions); // Show all transactions
    }
  };

  return (
    <BudgetLayout>
      <div>
        <header>
          <div className="container mx-auto flex items-center justify-between pb-4">
            <h1 className="text-xl font-bold text-gray-700">Transactions</h1>

            <div className="flex items-center space-x-2">
              <select
                id="transaction"
                value={filterType}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="">All Transactions</option>
                <option value="CREDIT">CREDIT</option>
                <option value="DEBIT">DEBIT</option>
              </select>

              <CreateTransaction />
            </div>
          </div>
        </header>

        <div className="container mx-auto relative overflow-x-auto">
          <TransactionItem transaction={filteredTransactions} />
        </div>
      </div>
    </BudgetLayout>
  );
}
