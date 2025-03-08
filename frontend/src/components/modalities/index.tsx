"use client";

import { useState } from "react";

export default function Modalities({ setTypes }: { setTypes: (msg: string) => void }) {
  const [item, setItem] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.target.value);
    setTypes(event.target.value); 
  };

  return (
    <div className="bg-white text-xl p-4 rounded-lg">
      <h1 className="text-[17px] mb-4 text-[#2263A3]">Modalidade Iniciação</h1>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="modalities"
            value="0"
            checked={item === "0"}
            onChange={handleChange}
            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500"
          />
          <span className="hover:text-[#2263A3] transition duration-300">Nível Junior</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="modalities"
            value="1"
            checked={item === "1"}
            onChange={handleChange}
            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500"
          />
          <span className="hover:text-[#2263A3] transition duration-300">Nível 1</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="modalities"
            value="2"
            checked={item === "2"}
            onChange={handleChange}
            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500"
          />
          <span className="hover:text-[#2263A3] transition duration-300">Nível 2</span>
        </label>
      </div>
    </div>
  );
}
