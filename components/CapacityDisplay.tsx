"use client";
import React, { useState } from "react";
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
  amazonQPricing,
  author_price,
  author_pro_price,
  freeSpice,
  readerCapacityPricing,
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
  spice: number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  author,
  authorPro,
  spice,
}) => {
  const [selectedReaderPlan, setSelectedReaderPlan] = useState(
    readerCapacityPricing[0]
  );
  const [selectedAmazonPlan, setSelectedAmazonPlan] = useState(
    amazonQPricing[0]
  );

  // New states for dynamic inputs
  const [readerSessions, setReaderSessions] = useState(0);
  const [amazonQuestions, setAmazonQuestions] = useState(0);

  // Handle Reader Plan Change
  const handleReaderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    const plan = readerCapacityPricing.find(
      (p) => p.sessions === selectedValue
    );
    if (plan) setSelectedReaderPlan(plan);
  };

  // Handle Amazon Q Plan Change
  const handleAmazonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);
    const plan = amazonQPricing.find((p) => p.questions === selectedValue);
    if (plan) setSelectedAmazonPlan(plan);
  };

  // Calculate individual totals
  const authorTotal = author * author_price;
  const authorProTotal = authorPro * author_pro_price;
  const totalSpiceFee =
    author * freeSpice + authorPro * freeSpice < spice
      ? (spice - author * freeSpice - authorPro * freeSpice) * spiceFee
      : 0;

  const readerCapacity =
    selectedReaderPlan.planType === "Monthly"
      ? selectedReaderPlan.price
      : selectedReaderPlan.price / 12;

  const amazonQCapacity =
    selectedAmazonPlan.planType === "Monthly"
      ? selectedAmazonPlan.price
      : selectedAmazonPlan.price / 12;

  const enableFee = authorPro > 0 ? 250 : 0;

  // Calculate costs based on dynamic session/question inputs
  const readerSessionCost =
    readerSessions - selectedReaderPlan.sessions > 0
      ? (readerSessions - selectedReaderPlan.sessions) *
        selectedReaderPlan.additionalSessionCost
      : 0;
  const amazonQuestionCost =
    amazonQuestions - selectedAmazonPlan.questions > 0
      ? (amazonQuestions - selectedAmazonPlan.questions) *
        selectedAmazonPlan.additionalQuestionCost
      : 0;

  // Calculate the sum of all totals
  const grandTotal =
    authorTotal +
    authorProTotal +
    readerCapacity +
    amazonQCapacity +
    readerSessionCost +
    amazonQuestionCost +
    enableFee +
    totalSpiceFee;

  const data = {
    labels: [
      "Author",
      "Author Pro",
      "Reader Capacity",
      "Amazon Q Capacity",
      "Reader Sessions",
      "Amazon Q Questions",
      "Spice",
    ],
    datasets: [
      {
        label: "Input Values",
        data: [
          authorTotal,
          authorProTotal,
          readerCapacity,
          amazonQCapacity,
          readerSessionCost,
          amazonQuestionCost,
          totalSpiceFee,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
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
        text: "Capacity-Based Pricing",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col mx-2 px-5 border border-black p-3 w-fit">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-slate-700 mb-6">
        Capacity-Based Pricing
      </h2>
      <div className="flex gap-4">
        {/* Reader Pricing */}
        <div className="flex-1 border-r border-gray-200 pr-4">
          <h3 className="text-xl font-semibold mb-4 text-slate-700">
            📖 Reader Pricing
          </h3>
          <select
            className="w-full p-2 border border-gray-400 rounded-md text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            onChange={handleReaderChange}
            value={selectedReaderPlan.sessions}
          >
            {readerCapacityPricing.map((plan, index) => (
              <option key={index} value={plan.sessions}>
                {plan.planType} - {plan.sessions.toLocaleString()} sessions
              </option>
            ))}
          </select>

          {/* Input for Reader Sessions */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-slate-700">
              Reader Sessions:
            </label>
            <input
              type="number"
              value={readerSessions}
              onChange={(e) => setReaderSessions(Number(e.target.value))}
              className="w-full p-2 border border-gray-400 rounded-md text-slate-700 text-sm"
              placeholder="Enter number of reader sessions"
            />
          </div>

          <ul className="space-y-2 text-sm text-slate-600 mt-4">
            <li>
              <strong>Plan Type:</strong> {selectedReaderPlan.planType}
            </li>
            <li>
              <strong>Sessions:</strong>{" "}
              {selectedReaderPlan.sessions.toLocaleString()}
            </li>
            <li>
              <strong>Price:</strong> $
              {selectedReaderPlan.price.toLocaleString()}
            </li>
            <li>
              <strong>Additional Cost per Session:</strong> $
              {selectedReaderPlan.additionalSessionCost}
            </li>
            <li>
              <strong>1 session = 30 min</strong>
            </li>
          </ul>
        </div>

        {/* Amazon Q Pricing */}
        <div className="flex-1 border-r border-gray-200 px-4">
          <h3 className="text-xl font-semibold mb-4 text-slate-700">
            🤖 Amazon Q Pricing
          </h3>
          <select
            className="w-full p-2 border border-gray-400 rounded-md text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
            onChange={handleAmazonChange}
            value={selectedAmazonPlan.questions}
          >
            {amazonQPricing.map((plan, index) => (
              <option key={index} value={plan.questions}>
                {plan.planType} - {plan.questions.toLocaleString()} questions
              </option>
            ))}
          </select>

          {/* Input for Amazon Q Questions */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-slate-700">
              Amazon Q Questions:
            </label>
            <input
              type="number"
              value={amazonQuestions}
              onChange={(e) => setAmazonQuestions(Number(e.target.value))}
              className="w-full p-2 border border-gray-400 rounded-md text-slate-700 text-sm"
              placeholder="Enter number of questions"
            />
          </div>

          <ul className="space-y-2 text-sm text-slate-600 mt-4">
            <li>
              <strong>Plan Type:</strong> {selectedAmazonPlan.planType}
            </li>
            <li>
              <strong>Questions:</strong>{" "}
              {selectedAmazonPlan.questions.toLocaleString()}
            </li>
            <li>
              <strong>Price:</strong> $
              {selectedAmazonPlan.price.toLocaleString()}
            </li>
            <li>
              <strong>Additional Cost per Question:</strong> $
              {selectedAmazonPlan.additionalQuestionCost}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex">
          {/* Chart Display */}
          <div className="w-full max-w-md mx-2">
            <Bar data={data} options={options} />
          </div>

          {/* Sum Display */}
          <div className="p-4 border border-slate-300 rounded-lg shadow-md bg-slate-50">
            <h3 className="text-lg font-semibold mb-2 text-slate-700">
              Capacity-Based Total:
            </h3>
            <ul className="mb-4 space-y-2 text-slate-600">
              <li>Author: {authorTotal} $</li>
              <li>Author Pro: {authorProTotal} $</li>
              <li>Reader Capacity: {readerCapacity.toFixed(2)} $</li>
              <li>Amazon Q Capacity: {amazonQCapacity.toFixed(2)} $</li>
              <li>Reader Sessions: {readerSessionCost.toFixed(2)} $</li>
              <li>Amazon Q Questions: {amazonQuestionCost.toFixed(2)} $</li>
              <li>Enablement Fee: {enableFee} $</li>
              <li>SPICE Fee: {totalSpiceFee} $</li>
            </ul>
            <div className="text-xl font-bold text-slate-800">
              Total: {grandTotal.toFixed(2)}$ / Month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
