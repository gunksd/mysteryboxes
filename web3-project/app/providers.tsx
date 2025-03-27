"use client"

import { type ReactNode, useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"

// 动态导入 Web3Provider 以避免服务器端渲染问题
const Web3Provider = dynamic(() => import("@/components/providers/web3-provider").then((mod) => mod.Web3Provider), {
  ssr: false,
})

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {mounted ? <Web3Provider>{children}</Web3Provider> : children}
    </ThemeProvider>
  )
}

