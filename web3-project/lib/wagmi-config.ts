import { getDefaultWallets } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient } from "wagmi"
import { publicProvider } from "wagmi/providers/public"

// 从环境变量中获取 WalletConnect Project ID
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

if (!walletConnectProjectId) {
  console.warn("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable")
}

// 配置支持的链
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.sepolia || chain.goerli], // 使用 sepolia 或 goerli 作为备选
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "CryptoBox",
  projectId: walletConnectProjectId,
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

