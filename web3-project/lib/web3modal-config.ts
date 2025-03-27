// 这个文件只会在客户端导入，所以不需要担心服务器端渲染问题
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
import { mainnet, sepolia } from "wagmi/chains"

// 从环境变量中获取 WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

// 定义支持的链
const chains = [mainnet, sepolia]

// 创建 wagmi 配置
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "CryptoBox",
})

// 创建 Web3Modal (只在客户端执行)
if (typeof window !== "undefined") {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    themeMode: "light",
    themeVariables: {
      "--w3m-accent-color": "#FF6B9E",
      "--w3m-background-color": "#FF6B9E",
      "--w3m-font-family": "Nunito, system-ui, sans-serif",
      "--w3m-border-radius-master": "16px",
    },
  })
}

