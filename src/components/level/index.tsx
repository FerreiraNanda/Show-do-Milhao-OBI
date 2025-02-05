"use client"

import { useState } from "react"


export default function Level({ setQuestions }: { setQuestions: (msg: string) => void }) {

    const [item, setItem] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem(event.target.value);
        setQuestions(event.target.value);
    };
    return (
        <div className="p-4 bg-gray-100 rounded-lg text-xl color-white">
            <h1 className=" text-[#2263A3] mb-4 flex-col">Tipos de Questão</h1>
            <div className="space-y-2">
                <label className="flex items-center gap-2">
                    <input type="radio" name="question" value="0" checked={item == "0"} onChange={handleChange} className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500" />
                    <span className="hover:text-[#2263A3] transition duration-300">Diversas</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="question" value="1" checked={item == "1"} onChange={handleChange} className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500" />
                    <span className="hover:text-[#2263A3] transition duration-300]">Ordenação</span>
                </label >
                <label className="flex items-center gap-2">
                    <input type="radio" name="question" value="2" checked={item == "2"} onChange={handleChange} className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition duration-500" />
                    <span className="hover:text-[#2263A3] transition duration-300">Agrupamento</span>
                </label>
            </div>
        </div>
    )
}