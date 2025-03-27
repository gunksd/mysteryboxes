"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function MockConnectWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const { toast } = useToast()

  const handleConnect = () => {
    // 模拟随机钱包地址
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 14) + "..."
    setAddress(mockAddress)
    setIsConnected(true)

    toast({
      title: "钱包已连接",
      description: "您的钱包已成功连接到应用",
      variant: "default",
    })
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress("")

    toast({
      title: "钱包已断开",
      description: "您的钱包已断开连接",
      variant: "default",
    })
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 text-sm font-medium border border-pink-200 hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-200 transition-colors duration-300"
          onClick={() => {
            toast({
              title: "切换网络",
              description: "在实际应用中，这将打开网络选择器",
              variant: "default",
            })
          }}
        >
          切换网络
        </Button>

        <Button
          variant="outline"
          className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 text-sm font-medium border border-pink-200 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 transition-colors duration-300"
          onClick={handleDisconnect}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          {address}
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      className="group relative overflow-hidden inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <span className="relative z-10 flex items-center">
        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        连接钱包
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  )
}

export default MockConnectWallet

