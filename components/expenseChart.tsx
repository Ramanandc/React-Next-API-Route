"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart: React.FC = () => {
  const [transactions, setTransactions] = useState<
    { date: string; amount: number; transactionType: string }[]
  >([]);

  useEffect(() => {
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

    fetchTransactions();
  }, []);

  // Get all dates of the current month
  const getCurrentMonthDates = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const dates = [];
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  // Process and sort transactions
  const processedTransactions = (() => {
    const debitTransactions = transactions.filter(
      (transaction) => transaction.transactionType.toLowerCase() === "debit"
    );

    // Map transactions by date for quick lookup
    const transactionMap = new Map(
      debitTransactions.map((transaction) => [
        new Date(transaction.date).toLocaleDateString("en-IN"),
        transaction.amount,
      ])
    );

    // Ensure all dates in the current month are included
    return getCurrentMonthDates().map((date) => {
      const dateKey = date.toLocaleDateString("en-IN");
      return {
        date: dateKey,
        amount: transactionMap.get(dateKey) || 0, // Use 0 if no transaction on this date
      };
    });
  })();

  // Generate chart data
  const data = {
    labels: processedTransactions.map((t) => t.date),
    datasets: [
      {
        label: "Expenses (₹)",
        data: processedTransactions.map((t) => t.amount),
        backgroundColor: "#fca5a5", // Bar color
        borderColor: "#ef4444",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Debit Transactions for This Month",
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {processedTransactions.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ExpenseChart;
