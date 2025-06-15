
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-200">
        <div className="flex items-center gap-3">
            <Image 
                src="/logo.png"
                alt="Timehub logo"
                width={40}
                height={40}
            />
            <span className="text-2xl font-bold text-gray-800">Timehub</span>

        </div>
        <ConnectButton />
        </header> 
    )
}