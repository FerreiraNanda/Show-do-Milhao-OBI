"use client"

import Image from 'next/image'
import help from '../../../public/help.svg'
import { useState } from 'react'

export default function Help() {

    const [isDisabled, setIsDisabled] = useState(false);

    function handleClick(){
        setIsDisabled(true);
    }

    return (
        <button onClick={() => {handleClick()}} disabled={isDisabled} className={`${isDisabled ? 'opacity-50' : ''}`}>
            <div className='bg-white flex flex-col pt-0 pb-4 px-2 items-center rounded-lg'>
                <Image src={help} alt='Parada' quality={100} className='scale-[0.7] hover:scale-90 transform transition-all duration-300' />
                <span className='font-jost mt-0 font-bold text-xl text-[#2263a3]'>Ajuda</span>
            </div>
        </button>

    )
}