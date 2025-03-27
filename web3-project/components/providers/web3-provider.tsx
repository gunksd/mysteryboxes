// components/providers/web3-provider.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiConfig } from "wagmi"
import { useTheme } from "next-themes"
import { chains, wagmiConfig, cuteTheme } from "@/lib/rainbowkit-config"

export function Web3Provider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }
  
  const isDarkMode = resolvedTheme === "dark"

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={isDarkMode ? cuteTheme.darkMode : cuteTheme.lightMode}
        modalSize="compact"
        appInfo={{
          appName: "CryptoBox",
          learnMoreUrl: "https://your-website.com/about",
          disclaimer: ({ Text, Link }) => (
            <Text>
              这是一个可爱的Web3应用 🌸 请安全使用您的钱包。
              了解更多请访问 <Link href="https://your-website.com/terms">使用条款</Link>
            </Text>
          ),
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Web3Provider;