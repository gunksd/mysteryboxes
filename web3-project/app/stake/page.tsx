"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Wallet, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ConnectWallet } from "@/components/connect-wallet"
import { useBlindboxContract } from "@/hooks/use-blindbox-contract"
import { NFTCard } from "./nft-card"
import { Rarity } from "@/lib/contracts/BlindboxNFTGameWithStaking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StakePage() {
  const [activeTab, setActiveTab] = useState("owned")

  const {
    isConnected,
    address,
    nftBalance,
    tokenBalance,
    stakedNFTCount,
    userNFTs,
    stakedNFTs,
    isLoading,
    isStakeLoading,
    isUnstakeLoading,
    isClaimLoading,
    stakeNFT,
    unstakeNFT,
    claimRewards,
  } = useBlindboxContract()

  // 模拟NFT数据，实际应用中应从合约获取
  const mockNFTs = [
    { tokenId: 1, rarity: Rarity.Common, isStaked: false },
    { tokenId: 2, rarity: Rarity.Rare, isStaked: false },
    { tokenId: 3, rarity: Rarity.Epic, isStaked: false },
    { tokenId: 4, rarity: Rarity.Legendary, isStaked: false },
  ]

  const mockStakedNFTs = [
    { tokenId: 5, rarity: Rarity.Common, isStaked: true },
    { tokenId: 6, rarity: Rarity.Rare, isStaked: true },
  ]

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            NFT Staking
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stake your NFTs to earn platform tokens and rewards.
          </p>
        </div>

        {!isConnected && (
          <Alert className="mb-8 border-primary/50 bg-primary/5">
            <Wallet className="h-4 w-4 text-primary" />
            <AlertTitle>Connect your wallet</AlertTitle>
            <AlertDescription>You need to connect your wallet to stake NFTs.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
            <CardHeader>
              <CardTitle>Staking Rewards</CardTitle>
              <CardDescription>Earn platform tokens by staking your NFTs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/20 rounded-xl text-center relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-[50%] -right-[50%] w-[100px] h-[100px] bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl opacity-70" />
                  <div className="absolute -bottom-[50%] -left-[50%] w-[100px] h-[100px] bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full blur-3xl opacity-70" />
                </div>
                <Sparkles className="mx-auto h-12 w-12 text-primary mb-4 relative z-10 animate-pulse" />
                <h3 className="text-lg font-medium mb-2 relative z-10">Staking Information</h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  Stake your NFTs to earn platform tokens. Different rarities earn different rewards.
                </p>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                    </div>
                    <span>Common NFT</span>
                  </div>
                  <Badge variant="outline" className="bg-gray-50">
                    1 token/day
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <span>Rare NFT</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    2 tokens/day
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2v8L22 8V2z" />
                        <path d="M2 14h8v8z" />
                        <path d="M22 2 12 10l-8 4 8 8 10-8V2Z" />
                      </svg>
                    </div>
                    <span>Epic NFT</span>
                  </div>
                  <Badge variant="outline" className="bg-purple-50">
                    5 tokens/day
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-amber-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3v18" />
                        <path d="M5.63 5.63 12 12l6.37-6.37" />
                        <path d="M12 12 5.63 18.37" />
                        <path d="M12 12l6.37 6.37" />
                      </svg>
                    </div>
                    <span>Legendary NFT</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-50">
                    10 tokens/day
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {isConnected ? (
                <div className="w-full text-center">
                  <div className="mb-2 text-sm">
                    Your token balance: <span className="font-bold">{tokenBalance}</span> CBT
                  </div>
                  <div className="text-xs text-muted-foreground">Staked NFTs: {stakedNFTCount || 0}</div>
                </div>
              ) : (
                <ConnectWallet />
              )}
            </CardFooter>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
              <CardTitle>Platform Token</CardTitle>
              <CardDescription>Information about our platform token.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-2xl font-bold text-white relative z-10">CBT</span>

                  {/* Animated sparkles */}
                  <div className="absolute top-0 right-0 animate-ping">
                    <svg
                      className="w-3 h-3 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 left-0 animate-ping delay-300">
                    <svg
                      className="w-2 h-2 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Name</span>
                  <span className="font-medium">CryptoBox Token</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Symbol</span>
                  <span className="font-medium">CBT</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Network</span>
                  <span className="font-medium">Sepolia Testnet</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-primary/5 transition-colors">
                  <span>Contract</span>
                  <span className="font-medium text-xs">0xAA3015d09ed0eB454F64d46cE9865a0f08848a7C</span>
                </div>
              </div>

              {/* Token utility visualization */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-1 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span className="text-xs">Platform Governance</span>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-center">
                  <svg
                    className="w-6 h-6 mx-auto mb-1 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                    <path d="m6 9 3-3 1-4 3.5 1 2.5 2.5 1 3.5-4 1Z" />
                  </svg>
                  <span className="text-xs">Exclusive Benefits</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground w-full text-center">
                Earn tokens by staking your NFTs in the platform.
              </div>
            </CardFooter>
          </Card>
        </div>

        {isConnected && (
          <div className="mt-8">
            <Tabs defaultValue="owned" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="owned">Your NFTs</TabsTrigger>
                <TabsTrigger value="staked">Staked NFTs</TabsTrigger>
              </TabsList>
              <TabsContent value="owned" className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : mockNFTs.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mockNFTs.map((nft) => (
                      <NFTCard
                        key={nft.tokenId}
                        tokenId={nft.tokenId}
                        rarity={nft.rarity}
                        isStaked={nft.isStaked}
                        onStake={stakeNFT}
                        onUnstake={unstakeNFT}
                        onClaim={claimRewards}
                        isLoading={isStakeLoading || isUnstakeLoading || isClaimLoading}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You don't have any NFTs yet.</p>
                    <Button
                      className="mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      asChild
                    >
                      <a href="/mystery-box">Get NFTs</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="staked" className="mt-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : mockStakedNFTs.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mockStakedNFTs.map((nft) => (
                      <NFTCard
                        key={nft.tokenId}
                        tokenId={nft.tokenId}
                        rarity={nft.rarity}
                        isStaked={nft.isStaked}
                        onStake={stakeNFT}
                        onUnstake={unstakeNFT}
                        onClaim={claimRewards}
                        isLoading={isStakeLoading || isUnstakeLoading || isClaimLoading}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You don't have any staked NFTs yet.</p>
                    <p className="text-sm text-muted-foreground mt-2">Stake your NFTs to earn platform tokens.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

