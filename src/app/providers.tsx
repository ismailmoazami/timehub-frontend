"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Children, type ReactNode } from "react"
import config from "@/RainbowKitConfig"
import { WagmiProvider } from "wagmi" 
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import "@rainbow-me/rainbowkit/styles.css"

export default function Providers(props: {children: ReactNode}) {
    const [queryClient] = useState(() => new QueryClient);

    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
                <RainbowKitProvider>
                    {props.children}
                </RainbowKitProvider>
            </WagmiProvider>
        </QueryClientProvider>
    )
}
