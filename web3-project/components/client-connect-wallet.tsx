"use client"

import dynamic from "next/dynamic"

// 动态导入 ConnectWallet 组件，确保它只在客户端渲染
const ConnectWallet = dynamic(() => import("@/components/connect-wallet"), {
  ssr: false,
})

export function ClientConnectWallet() {
  return <ConnectWallet />
}

