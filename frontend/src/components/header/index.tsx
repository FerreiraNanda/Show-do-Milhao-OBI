import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

import { IoMdPlay } from "react-icons/io";
import PositionedMenu from "../menu";
import ProfileMenu from "../menu/menu";

export function Header() {
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
                <nav className="flex justify-center items-center gap-8 mr-40">
                    <div className="flex items-center gap-2 hover:text-amber-300 transition duration-300">
                        <Link href="/">
                            <span className="font-semibold ">
                                Jogar
                            </span>
                        </Link>
                        <IoMdPlay size={20} />
                    </div>

                    <PositionedMenu/>
                    <ProfileMenu/>
                </nav>
            </div>
        </header>
    );
}