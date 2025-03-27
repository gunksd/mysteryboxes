"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export function ConnectWallet() {
  const { isConnected } = useAccount()
  const { toast } = useToast()

  // 当钱包连接状态改变时显示通知
  useEffect(() => {
    if (isConnected) {
      toast({
        title: "钱包已连接",
        description: "您的钱包已成功连接到应用",
        variant: "default",
      })
    }
  }, [isConnected, toast])

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // 注意: 如果你的应用不使用身份验证，你可以移除所有与authenticationStatus相关的逻辑
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
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
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-600 font-medium border border-red-200 hover:bg-red-200 transition-colors duration-300"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    错误网络
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-2">
                  <button
                    onClick={openChainModal}
                    className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 text-sm font-medium border border-pink-200 hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-200 transition-colors duration-300"
                  >
                    {chain.hasIcon && (
                      <div className="mr-1.5 h-4 w-4 overflow-hidden rounded-full">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl || "/placeholder.svg"}
                            className="h-full w-full"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 text-sm font-medium border border-pink-200 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectWallet

