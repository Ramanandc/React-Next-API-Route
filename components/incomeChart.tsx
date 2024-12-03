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
import React from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeChart: React.FC = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Income (₹)",
        data: [500, 700, 600, 800],
        backgroundColor: "rgba(37, 99, 235, 0.6)", // Tailwind's sky-600
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
        text: "Income for This Month",
      },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default IncomeChart;
