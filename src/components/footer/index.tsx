import Image from "next/image"

export function Footer(){
    return(
        <footer className="w-full h-[230px] bg-[#2263A3] text-white px-2">
            <div className="flex flex-col justify-center items-center h-full text-black">
                <Image src='/logoUfc.svg' alt="Logo UFC" width={143} height={91} quality={100} priority/>
                <a className="text-xs">Projeto Integrador II - Show do Milhão da OBI - Projeto Preparação Para OBI</a>
                <a className="text-xs">©Olímpiada Brasileira de Informática</a>
            </div>
        </footer>
    )
}