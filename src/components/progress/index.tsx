"use client";

import React from "react";

interface ProgressProps {
  currentStep: number;
  increment: () => void;
}

export default function Progress({ currentStep, increment }: ProgressProps) {
  const steps = ["$ 1.000", "$ 5.000", "$ 50.000", "$ 100.000", "$ 300.000", "$ 500.000", "$ 1 Milhão"];

  return (
    <div className="w-64 bg-white pt-2 rounded-lg shadow-md border-b-4 border-yellow-300">
      <h2 className="text-center font-extrabold text-[#2263a3] text-2xl font-jost mb-2">Progresso</h2>
      <ul className="flex flex-col w-full">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`w-full text-center font-extrabold font-jost text-xl py-2 ${index<currentStep ? "bg-yellow-500  border-yellow-500":""}${
              index === currentStep
                ? " border-4 w-full border-yellow-500 text-black "
                : "text-gray-700"
            }`}
          >
            {index === steps.length - 1 ? (
              <span className="flex justify-center items-center">
                🏆 <span className="ml-2">{step}</span> 🏆
              </span>
            ) : (
              step
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
