"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useBlindboxContract } from "@/hooks/use-blindbox-contract"
import { useToast } from "@/components/ui/use-toast"

export function OpenMysteryBox() {
  const [showNFTDialog, setShowNFTDialog] = useState(false)
  const [boxAnimation, setBoxAnimation] = useState(false)
  const [discoveredNFT, setDiscoveredNFT] = useState<any | null>(null)
  const { toast } = useToast()

  const { isConnected, mintPrice, nftBalance, userNFTs, isLoading, isMintLoading, mintBlindbox } = useBlindboxContract()

  const rarities = ["Common", "Rare", "Epic", "Legendary"]
  const rarityColors = {
    Common: "bg-gray-100 text-gray-800 border-gray-300",
    Rare: "bg-blue-100 text-blue-800 border-blue-300",
    Epic: "bg-purple-100 text-purple-800 border-purple-300",
    Legendary: "bg-amber-100 text-amber-800 border-amber-300",
  }

  const rarityGlows = {
    Common: "shadow-gray-400/50",
    Rare: "shadow-blue-400/50",
    Epic: "shadow-purple-400/50",
    Legendary: "shadow-amber-400/50",
  }

  const getRarityClass = (rarity: string) => {
    return rarityColors[rarity as keyof typeof rarityColors] || "bg-gray-100 text-gray-800 border-gray-300"
  }

  const getRarityGlow = (rarity: string) => {
    return rarityGlows[rarity as keyof typeof rarityGlows] || ""
  }

  const openMysteryBox = async () => {
    if (!isConnected) {
      toast({
        title: "未连接钱包",
        description: "请先连接您的钱包",
        variant: "destructive",
      })
      return
    }

    setBoxAnimation(true)

    try {
      await mintBlindbox()

      // 注意：在实际应用中，我们应该监听合约事件来获取铸造结果
      // 这里为了演示，我们模拟一个随机结果
      setTimeout(() => {
        const rarityIndex = Math.floor(Math.random() * 4)
        const rarity = rarities[rarityIndex]
        const nftId = Math.random().toString(36).substring(2, 10)

        setDiscoveredNFT({
          id: nftId,
          name: `Crypto Box #${nftId}`,
          rarity,
          image: "/placeholder.svg?height=300&width=300",
        })

        setBoxAnimation(false)
        setShowNFTDialog(true)
      }, 2000)
    } catch (error) {
      console.error("Error opening mystery box:", error)
      setBoxAnimation(false)
      toast({
        title: "铸造失败",
        description: "无法铸造盲盒，请稍后再试",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-b from-background to-primary/5">
        <CardHeader>
          <CardTitle>Mystery Box</CardTitle>
          <CardDescription>Open a box to discover a random NFT. 3% platform fee applies.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-8">
          <div className="relative w-64 h-64 perspective-1000">
            <div
              className={`relative w-full h-full transition-all duration-700 transform-gpu ${boxAnimation ? "scale-110" : ""} ${boxAnimation ? "animate-pulse" : ""}`}
            >
              {/* Treasure chest SVG */}
              <svg
                className="w-full h-full drop-shadow-xl"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M88 128H424V384H88V128Z" fill="#8B5E3C" />
                <path d="M88 128H424V192H88V128Z" fill="#6E4C30" />
                <path d="M72 128H440V160H72V128Z" fill="#A67C52" />
                <path d="M104 160H408V384H104V160Z" fill="#A67C52" />
                <path d="M104 160H408V192H104V160Z" fill="#8B5E3C" />
                <path d="M256 192L104 192V384H408V192L256 192Z" fill="#8B5E3C" />
                <path d="M184 192H328V224H184V192Z" fill="#FFCC4D" />
                <path d="M200 224H312V240H200V224Z" fill="#FFCC4D" />
                <path d="M104 384H408V416H104V384Z" fill="#6E4C30" />
                <path d="M88 384H424V416H88V384Z" fill="#8B5E3C" />
                <path d="M72 384H440V416H72V384Z" fill="#A67C52" />
                <path d="M256 224m-16 0a16 16 0 1 0 32 0a16 16 0 1 0 -32 0Z" fill="#FFAC33" />
                <path d="M256 224m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0Z" fill="#FFCC4D" />
                <path className="animate-pulse" d="M256 160L232 120L256 80L280 120L256 160Z" fill="#FFCC4D" />
                <path className="animate-pulse" d="M256 160L232 120L256 80L280 120L256 160Z" fill="#FFAC33" />
                <path className="animate-pulse" d="M216 152L200 104L232 72L248 120L216 152Z" fill="#FFCC4D" />
                <path className="animate-pulse" d="M296 152L312 104L280 72L264 120L296 152Z" fill="#FFCC4D" />
              </svg>

              {/* Sparkles */}
              <div className={`absolute top-1/4 right-1/4 ${boxAnimation ? "animate-ping" : "animate-pulse"}`}>
                <svg
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                </svg>
              </div>
              <div
                className={`absolute bottom-1/3 left-1/4 ${boxAnimation ? "animate-ping" : "animate-pulse"} delay-300`}
              >
                <svg
                  className="w-4 h-4 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-2 -right-2">
              <Badge variant="outline" className="bg-primary text-primary-foreground font-bold shadow-lg">
                {mintPrice} ETH
              </Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={openMysteryBox}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300"
            disabled={isMintLoading || boxAnimation || !isConnected}
          >
            {isMintLoading || boxAnimation ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening...
              </>
            ) : !isConnected ? (
              "Connect Wallet to Open"
            ) : (
              <>
                Open Box <span className="ml-2">🎁</span>
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showNFTDialog} onOpenChange={setShowNFTDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary animate-pulse" />
              New NFT Discovered!
            </DialogTitle>
            <DialogDescription>You've discovered a new NFT from the mystery box.</DialogDescription>
          </DialogHeader>

          {discoveredNFT && (
            <div className="flex flex-col items-center space-y-4 py-4">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl ${getRarityGlow(discoveredNFT.rarity)}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 z-10"></div>
                <img
                  src={discoveredNFT.image || "/placeholder.svg"}
                  alt={discoveredNFT.name}
                  className="w-64 h-64 object-cover transform transition-transform duration-700 hover:scale-110"
                />
                <Badge className={`absolute top-2 right-2 z-20 ${getRarityClass(discoveredNFT.rarity)}`}>
                  {discoveredNFT.rarity}
                </Badge>

                {/* Animated sparkles for legendary and epic NFTs */}
                {(discoveredNFT.rarity === "Legendary" || discoveredNFT.rarity === "Epic") && (
                  <>
                    <div className="absolute top-1/4 left-1/4 z-20 animate-ping">
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 z-20 animate-ping delay-300">
                      <svg
                        className="w-3 h-3 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
              <h3 className="text-lg font-semibold">{discoveredNFT.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {discoveredNFT.id}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setShowNFTDialog(false)}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

