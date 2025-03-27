"use client"

import type { ReactNode } from "react"
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { useTheme } from "next-themes"

import "@rainbow-me/rainbowkit/styles.css"

// 从环境变量中获取 WalletConnect Project ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

if (!walletConnectProjectId) {
  console.warn("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable")
}

const { chains, provider } = configureChains(
  [chain.mainnet, chain.sepolia || chain.goerli], // 使用 sepolia 或 goerli 作为备选
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "CryptoBox",
  projectId: walletConnectProjectId,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={isDarkMode ? darkTheme() : lightTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

