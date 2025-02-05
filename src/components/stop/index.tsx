"use client"

import Image from 'next/image'
import stop from '../../../public/stop.svg'
import { useState } from 'react'

export default function Stop() {

    const [isDisabled, setIsDisabled] = useState(false);

    function handleClick(){
        setIsDisabled(true)
    }

    return (
        <button onClick={handleClick} disabled={isDisabled} className={`${isDisabled ? 'opacity-50':''}`}>
            <div className='bg-white flex flex-col rounded-lg pt-2 pb-5 px-3 items-center'>
                <Image src={stop} alt='Parada' quality={100} className='scale-75 hover:scale-[0.89] transform transition-all duration-300' />
                <span className='font-jost font-bold text-xl text-[#2263a3]'>Parada</span>
            </div>
        </button>

    )
}