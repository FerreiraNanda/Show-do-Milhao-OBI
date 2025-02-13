"use client"

import Image from 'next/image'
import help from '../../../public/help.svg'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function Help({ isHelp }: { isHelp: (msg: boolean) => void }) {

    const [isDisabled, setIsDisabled] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    function handleClick() {
        setIsConfirmModalOpen(true);
    }

    function confirmHelp() {
        setIsDisabled(true);
        isHelp(true);
        setIsConfirmModalOpen(false);
    }

    function cancelHelp() {
        setIsConfirmModalOpen(false);
    }

    return (
        <>
            <button
                onClick={() => handleClick()}
                disabled={isDisabled}
                className={`${isDisabled ? 'opacity-50 border-b-4 rounded-lg border-yellow-300' : 'border-b-4 border-yellow-300 rounded-xl box-content'}`}
            >
                <div className='bg-white flex flex-col pt-0 pb-4 px-2 items-center rounded-lg'>
                    <Image src={help} alt='Parada' quality={100} className='scale-[0.7] hover:scale-90 transform transition-all duration-300' />
                    <span className='font-jost mt-0 font-bold text-xl text-[#2263a3]'>Ajuda</span>
                </div>
            </button>

            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h1 className="font-extrabold font-jost">Usar Ajuda?</h1>
                        <div className='flex flex-col'>
                            <span className="text-xs">Três alternativas ERRADAS serão reveladas</span>
                            <span className='text-xs'>Você só pode usar uma vez</span>
                        </div>
                        <div className="flex justify-center gap-5 mt-4">
                            <button onClick={confirmHelp} className="bg-green-500 px-4 py-2 text-white rounded-lg flex items-center gap-1">Sim<FaCheck size={15} /> </button>
                            <button onClick={cancelHelp} className="bg-red-500 px-4 py-2 text-white rounded-lg flex items-center gap-1">Não <IoMdClose size={17} /></button>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}