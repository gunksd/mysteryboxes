// lib/rainbowkit-config.ts

// 检查是否在客户端环境
const isBrowser = typeof window !== 'undefined';

// 创建默认导出对象
let chains = [];
let publicClient = null;
let wagmiConfig = null;
let cuteTheme = {
  lightMode: {},
  darkMode: {}
};

// 只在客户端环境执行配置
if (isBrowser) {
  // 动态导入样式
  require('@rainbow-me/rainbowkit/styles.css');
  
  // 动态导入模块
  const { getDefaultWallets, lightTheme, darkTheme } = require('@rainbow-me/rainbowkit');
  const { configureChains, createConfig } = require('wagmi');
  const { mainnet, sepolia } = require('wagmi/chains');
  const { publicProvider } = require('wagmi/providers/public');

  // 从环境变量中获取 WalletConnect Project ID
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

  if (!projectId) {
    console.warn("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID environment variable");
  }

  // 配置支持的链
  const chainsConfig = configureChains(
    [mainnet, sepolia],
    [publicProvider()]
  );

  chains = chainsConfig.chains;
  publicClient = chainsConfig.publicClient;

  const { connectors } = getDefaultWallets({
    appName: 'CryptoBox',
    projectId,
    chains,
  });

  // 创建wagmi配置
  wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  // 创建自定义主题
  cuteTheme = {
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
}

export { chains, publicClient, wagmiConfig, cuteTheme };