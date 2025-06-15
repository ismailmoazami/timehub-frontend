"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia, anvil } from "viem/chains"

export default getDefaultConfig({
    appName: "Timehub",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
    chains: [sepolia, anvil],
    ssr: false
})