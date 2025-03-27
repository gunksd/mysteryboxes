// components/providers/web3-provider.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { useTheme } from "next-themes"

// 动态导入RainbowKit和Wagmi组件
const RainbowKitProvider = dynamic(
  () => import('@rainbow-me/rainbowkit').then(mod => mod.RainbowKitProvider),
  { ssr: false }
)

const WagmiConfig = dynamic(
  () => import('wagmi').then(mod => mod.WagmiConfig),
  { ssr: false }
)

export function Web3Provider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<any>(null)
  
  useEffect(() => {
    setMounted(true)
    
    // 在客户端动态导入配置
    import('@/lib/rainbowkit-config').then((mod) => {
      setConfig({
        chains: mod.chains,
        wagmiConfig: mod.wagmiConfig,
        cuteTheme: mod.cuteTheme
      })
    }).catch(err => {
      console.error('Failed to load RainbowKit config:', err)
    })
  }, [])
  
  // 在服务器端或配置加载前，只渲染children
  if (!mounted || !config) {
    return <>{children}</>
  }
  
  const isDarkMode = resolvedTheme === "dark"
  
  return (
    <WagmiConfig config={config.wagmiConfig}>
      <RainbowKitProvider
        chains={config.chains}
        theme={isDarkMode ? config.cuteTheme.darkMode : config.cuteTheme.lightMode}
        modalSize="compact"
        appInfo={{
          appName: "CryptoBox",
          learnMoreUrl: "https://your-website.com/about",
          disclaimer: ({ Text, Link }: any) => (
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