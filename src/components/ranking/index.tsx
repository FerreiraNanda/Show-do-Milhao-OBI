"use client";
import { IoMdPlay } from "react-icons/io";
import { useRouter } from "next/navigation";  // Importar o useRouter para navegação
import { useState, useEffect } from "react";

interface StartGameProps {
  level: string;
  type: string;
}

export default function Ranking({ level, type }: StartGameProps) {
  const router = useRouter(); 

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (level === "" || type === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [level, type]);

  const handleClick = () => {
    router.push(`/game?level=${level}&type=${type}`);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg items-center grid place-items-center mb-16">
      <h1 className="text-4xl mb-4 text-center text-[#2263A3]">Ranking</h1>
      <div className="flex gap-4 justify-between w-80 h-80">
        <ul className="space-y-2">
          <li>1° Nickname</li>
          <li>2° Nickname</li>
          <li>3° Nickname</li>
          <li>4° Nickname</li>
          <li>5° Nickname</li>
        </ul>
        <ul className="space-y-2">
          <li>$ 1.000.000</li>
          <li>$ 950.000</li>
          <li>$ 900.000</li>
          <li>$ 800.000</li>
          <li>$ 700.000</li>
        </ul>
      </div>
      <button
        className={`${isDisabled ? 'text-3xl flex items-center gap-2 bg-[#2263a3] text-white font-bold py-3 px-4 rounded-lg shadow-md focus:ring-4 focus:ring-blue-300 transition opacity-50':'text-3xl flex items-center gap-2 bg-[#2263a3] text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition'}`}
        onClick={handleClick}
        disabled={isDisabled} 
      >
        <span className="hover:text-amber-300 transition-all duration-300 flex items-center gap-2">
          Começar <IoMdPlay size={25} />
        </span>
      </button>
    </div>
  );
}
