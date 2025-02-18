"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  author_price,
  author_pro_price,
  freeSpice,
  reader_price,
  reader_pro_price,
  spiceFee,
} from "@/constants";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  author: number;
  authorPro: number;
  reader: number;
  readerPro: number;
  spice: number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  author,
  authorPro,
  reader,
  readerPro,
  spice,
}) => {
  // Calculate individual totals
  const authorTotal = author * author_price;
  const authorProTotal = authorPro * author_pro_price;
  const readerTotal = reader * reader_price;
  const readerProTotal = readerPro * reader_pro_price;
  const enableFee = authorPro > 0 ? 250 : 0;
  const totalSpiceFee =
    author * freeSpice + authorPro * freeSpice < spice
      ? (spice - author * freeSpice - authorPro * freeSpice) * spiceFee
      : 0;
  // Calculate the sum of all totals
  const grandTotal =
    authorTotal +
    authorProTotal +
    readerTotal +
    readerProTotal +
    enableFee +
    totalSpiceFee;

  const data = {
    labels: ["Author", "Author Pro", "Reader", "Reader Pro", "Spice"],
    datasets: [
      {
        label: "Input Values",
        data: [
          authorTotal,
          authorProTotal,
          readerTotal,
          readerProTotal,
          totalSpiceFee,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User based price",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col mx-2 border border-black p-3 w-fit">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-slate-700 mb-6">
        User Based Pricing
      </h2>

      <div className="flex">
        {/* Chart Display */}
        <div className="w-full max-w-md mx-2">
          <Bar data={data} options={options} />
        </div>

        {/* Sum Display */}
        <div className="p-10 border border-slate-300 rounded-lg shadow-md bg-slate-50">
          <h3 className="text-lg font-semibold mb-2 text-slate-700">
            User based total:
          </h3>
          <ul className="mb-4 space-y-2 text-slate-600">
            <li>Author: {authorTotal} $</li>
            <li>Author Pro: {authorProTotal} $</li>
            <li>Reader: {readerTotal} $</li>
            <li>Reader Pro: {readerProTotal} $</li>
            <li>Enablement Fee: {enableFee} $</li>
            <li>SPICE Fee: {totalSpiceFee} $</li>
          </ul>
          <div className="text-xl font-bold text-slate-800">
            Total: {grandTotal}$ / Month
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
