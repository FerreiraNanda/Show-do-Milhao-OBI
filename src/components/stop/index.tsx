"use client";

import Image from 'next/image';
import stop from '../../../public/stop.svg';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

export default function Stop({ endGame }: { endGame: (msg: boolean) => void }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const router = useRouter();

    function handleClick() {
        setIsConfirmModalOpen(true);
    }

    function confirmStop() {
        setIsDisabled(true);
        endGame(true);
        router.push("/");
        setIsConfirmModalOpen(false);
    }

    function cancelStop() {
        setIsConfirmModalOpen(false);
    }

    return (
        <>
            <button
                onClick={handleClick}
                disabled={isDisabled}
                className={`${isDisabled ? 'opacity-50 border-b-4 rounded-lg border-yellow-300' : 'border-b-4 border-yellow-300 rounded-xl box-content'}`}
            >
                <div className='bg-white flex flex-col rounded-lg pt-2 pb-5 px-3 items-center'>
                    <Image src={stop} alt='Parada' quality={100} className='scale-75 hover:scale-[0.89] transform transition-all duration-300' />
                    <span className='font-jost font-bold text-xl text-[#2263a3]'>Parada</span>
                </div>
            </button>

            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h1 className="font-extrabold font-jost">Confirmar Parada</h1>
                        <span className="text-sm">Tem certeza de que deseja parar o jogo?</span>
                        <div className="flex justify-center gap-5 mt-4">
                            <button onClick={confirmStop} className="bg-green-500 px-4 py-2 text-white rounded-lg flex items-center gap-1">Sim<FaCheck size={15}/> </button>
                            <button onClick={cancelStop} className="bg-red-500 px-4 py-2 text-white rounded-lg flex items-center gap-1">Não <IoMdClose size={17}/></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
