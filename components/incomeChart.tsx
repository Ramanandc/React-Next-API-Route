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

const IncomeChart: React.FC = () => {
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

  // Helper function to group transactions by week
  type Transaction = { date: string; amount: number; transactionType: string };
  const groupTransactionsByWeek = (transactions: Transaction[]) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Initialize weeks
    const weeks: { [key: string]: number } = {
      "Week 1": 0,
      "Week 2": 0,
      "Week 3": 0,
      "Week 4": 0,
      "Week 5": 0, // Optional, for months with more than 4 weeks
    };

    transactions
      .filter((transaction) => transaction.transactionType.toLowerCase() === "credit") // Filter only credit transactions
      .forEach((transaction) => {
        const transactionDate = new Date(transaction.date);
        const weekNumber = Math.ceil(
          (transactionDate.getDate() - startOfMonth.getDate() + 1) / 7
        );

        const weekKey = `Week ${weekNumber}`;
        if (weeks[weekKey] !== undefined) {
          weeks[weekKey] += transaction.amount;
        }
      });

    return Object.entries(weeks).map(([week, total]) => ({
      week,
      total,
    }));
  };

  // Process weekly data
  const weeklyData = groupTransactionsByWeek(transactions);

  // Generate chart data
  const data = {
    labels: weeklyData.map((w) => w.week),
    datasets: [
      {
        label: "Income (₹)",
        data: weeklyData.map((w) => w.total),
        backgroundColor: "rgba(37, 99, 235, 0.6)", // Bar color
        borderColor: "rgba(37, 99, 235, 1)",
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
        text: "Income for This Month (Weekly)",
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {transactions.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default IncomeChart;
