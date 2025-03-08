import Image from "next/image";
import logoImg from "../../../public/logo.png";

export function HeaderAux() {
    return (
        <header className="w-full h-[70px] bg-[#2263A3] text-white px-2 ">
            <div className="flex justify-between items-center h-full">
                <div className="relative items-center justify-start max-w-screen-sm mr-40 w-full">
                    <Image src={logoImg}
                        alt="Logo OBI"
                        quality={100}
                        priority
                        className="scale-50 w-32 min-w-[700px] h-auto" />
                </div>
            </div>
        </header>
    );
}