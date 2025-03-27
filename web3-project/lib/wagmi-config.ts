import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient } from "wagmi"
import { mainnet, goerli, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

// 从环境变量中获取 WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

// 配置支持的链
const { chains, provider } = configureChains([mainnet, goerli, sepolia], [publicProvider()])

// 设置钱包
const { connectors } = getDefaultWallets({
  appName: "BlindBox NFT Game",
  projectId,
  chains,
})

// 创建Wagmi客户端
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export { wagmiClient, chains }

