"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 shadow-md bg-gray-200">
        <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
                <Image 
                    src="/logo.png"
                    alt="Timehub logo"
                    width={40}
                    height={40}
                />
                <span className="text-2xl font-bold text-gray-800">Timehub</span>
            </a>
            <a href="/launch" className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <span className="text-xl font-bold">Create</span>
                    </div>
            </a>
        </div>
        <ConnectButton />
        </header> 
    )
}