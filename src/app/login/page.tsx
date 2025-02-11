"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoObi from '../../../public/logoOBI.svg'

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5107/api/Users/Login", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(response.data));

            router.push("/")
        }catch(error){
            alert("Email ou senha inválidos");
        }
        
    }

    return (
        <div className="h-full items-center justify-center flex flex-row bg-gray-200">
            <div className=" w-1/2 h-screen bg-[#2263a3] min-w-52"> 
                <Image src={logoObi} alt="Logo da OBI" quality={100} priority
                className="scale-75"/>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-[#2263a3] text-4xl font-jost mb-4 font-bold">Entrar</h1>
                <div className="flex flex-col bg-white w-[45%] rounded-lg pt-3 pb-8 items-center">
                    <form className="flex flex-col w-[90%] pt-5">
                        <label className="text-sm">E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3]  hover:outline-8 outline-[#2263a3] transform transition-all duration-300 focus:outline-8" />
                        <label className="text-sm mt-3">Senha</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3]  hover:outline-8 outline-[#2263a3] transform transition-all duration-300 focus:outline-8" />
                    </form>
                    <a href="/" className="mt-4 underline text-sm transition-all duration-300 hover:text-[#2263a3] ">Esqueceu sua senha?</a>
                    <button onClick={handleLogin} className="bg-[#2263a3] text-white py-2 rounded-lg mt-5 transform transition-all w-[90%] justify-center duration-300 hover:shadow-lg hover:text-yellow-400 ">Login</button>
                    <a href="/register" className="mt-4 underline text-sm transition-all duration-300 hover:text-[#2263a3] ">Voltar para cadastro</a>
                </div>
            </div>
        </div>
    )
}