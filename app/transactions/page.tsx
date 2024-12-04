"use client";

import { useEffect, useState } from "react";
import { BudgetLayout } from "../layouts/layouts";
import CreateTransaction from "./createTransactions";
import TransactionItem from "./transactionsItems";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from the server
  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions");
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch transactions on load
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <BudgetLayout>
      <div>
        <header>
          <div className="container mx-auto flex items-center justify-between pb-4">
            <h1 className="text-xl font-bold text-gray-700">Transactions</h1>
            <CreateTransaction onTransactionCreated={fetchTransactions} />
          </div>
        </header>

        <div className="container mx-auto relative overflow-x-auto">
          <TransactionItem 

          transaction={transactions}
          onTransactionDeleted={fetchTransactions}
          
          />
        </div>
      </div>
    </BudgetLayout>
  );
};

export default TransactionPage;
