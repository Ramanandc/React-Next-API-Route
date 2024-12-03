'use client';
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
import React from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart: React.FC = () => {
  /* chart data for entier month date wise */
  
  const data = {
    labels :  new Array(new Date().getDate()).fill(0).map((_, i) => i + 1),
    datasets: [
      {
        label: "Expenses (₹)",
        data: new Array(new Date().getDate()).fill(0).map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(235, 99, 37, 0.6)", // Tailwind's sky-600
        borderColor: "rgba(235, 99, 37, 1)",
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
        text: "Expenses for This Month",
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ExpenseChart;
