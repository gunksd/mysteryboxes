// lib/rainbowkit-config.ts
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// 从环境变量中获取 WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable");
}

// 配置支持的链
export const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'CryptoBox',
  projectId,
  chains,
});

// 注意这里使用createConfig而不是createClient
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// 创建自定义可爱风格主题
export const cuteTheme = {
  lightMode: lightTheme({
    accentColor: '#FF6B9E',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'rounded',
  }),
  darkMode: darkTheme({
    accentColor: '#FF6B9E',
    accentColorForeground: 'white',
    borderRadius: 'large',
    fontStack: 'rounded',
  })
};