"use client"

import { useState } from "react";

export default function Progress() {
    const steps = ["$ 1.000", "$ 5.000", "$ 50.000", "$ 100.000", "$ 300.000", "$ 500.000", "$ 1 Milhão"];
    const [currentStep, setCurrentStep] = useState<number>(0);

    function increment(){
        setCurrentStep(prevStep => prevStep+1);
    }
  
    return (
      <div className="w-64 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center font-extrabold text-[#2263a3] text-2xl font-jost mb-2">Progresso</h2>
        <ul className="flex flex-col gap-1 m-0">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`text-center font-extrabold font-jost text-xl py-2 ${
                index === currentStep
                  ? " border-2 w-full border-yellow-500 text-black "
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
  