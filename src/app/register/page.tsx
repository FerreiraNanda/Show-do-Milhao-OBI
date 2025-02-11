"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { FaRegEye } from "react-icons/fa";
import Image from "next/image";
import logoObi from '../../../public/logoOBI.svg'
import { useRouter } from "next/navigation"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aux, setAux] = useState("");
    const [passwordAux, setPasswordAux] = useState("");
    const [amount, setAmount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5107/api/Users/Register', {
                name,
                email,
                password,
                amount
            });
        } catch (error) {
            console.log(error);
        }
        router.push('/profile')
    }

    function handleDisabled(event: boolean) {
        setIsDisabled(event);
    }

    useEffect(() => {
        if (password.length > 5 && password === passwordAux) {
            handleDisabled(false);
        } else {
            handleDisabled(true)
        }
    }, [password, passwordAux]);

    return (
        <main className="h-full items-center justify-center flex flex-row bg-gray-200">
            <div className="w-1/2 h-screen bg-[#2263a3] min-w-52">
                <Image src={logoObi} alt="Logo da OBI" quality={100} priority
                    className="scale-75" />
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200">
                <h1 className="text-[#2263a3] text-4xl font-jost mb-4 font-bold">Cadastrar</h1>
                <div className="flex flex-col bg-white w-[45%] rounded-lg pt-3 pb-8 items-center">
                    <form className="flex flex-col w-[90%] pt-5">
                        <label className="text-sm">
                            Nome Completo
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3] hover:outline-[#2263a3] hover:outline-4 box-border" />
                        <label className="text-sm">E-mail</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3] hover:outline-[#2263a3] hover:outline-2 box-border" />
                        <label className="text-sm">Senha</label>
                        <input type="password" value={aux} onChange={(e) => setAux(e.target.value)} onBlur={() => setPassword(aux)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3] hover:outline-[#2263a3] hover:outline-2 box-border" />
                        <label className="text-sm">Confirme a Senha</label>
                        <input type="password" value={passwordAux} onChange={(e) => setPasswordAux(e.target.value)} required
                            className="py-2 px-3 mb-3 rounded-lg border-[1.5px] border-[#2263a3] hover:outline-[#2263a3] hover:outline-2 box-border" />
                    </form>
                    <span className="text-[13px] pt-3 text-[#2263a3] ">Sua senha deve ter no mínimo 6 caracteres</span>
                    <button onClick={handleRegister} className={`${isDisabled ? "bg-[#2263a3] text-white py-2 rounded-lg mt-5 transform transition-all w-[90%] justify-center duration-300 hover:shadow-lg hover:text-yellow-400 opacity-50" : 'bg-[#2263a3] text-white py-2 rounded-lg mt-5 transform transition-all w-[90%] justify-center duration-300 hover:shadow-lg hover:text-yellow-400'} `}
                        disabled={isDisabled} >Cadastrar</button>
                    <a href="/" className="mt-4 underline text-sm transition-all duration-300 hover:text-[#2263a3] ">Voltar para login</a>
                </div>
            </div>
        </main>
    )
}
