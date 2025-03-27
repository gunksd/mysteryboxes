"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Rarity } from "@/lib/contracts/BlindboxNFTGameWithStaking"

interface NFTCardProps {
  tokenId: number
  rarity: Rarity
  isStaked: boolean
  onStake: (tokenId: number) => Promise<void>
  onUnstake: (tokenId: number) => Promise<void>
  onClaim: (tokenId: number) => Promise<void>
  isLoading: boolean
}

export function NFTCard({ tokenId, rarity, isStaked, onStake, onUnstake, onClaim, isLoading }: NFTCardProps) {
  const [showActions, setShowActions] = useState(false)

  const rarityNames = ["Common", "Rare", "Epic", "Legendary"]
  const rarityColors = {
    [Rarity.Common]: "bg-gray-100 text-gray-800 border-gray-300",
    [Rarity.Rare]: "bg-blue-100 text-blue-800 border-blue-300",
    [Rarity.Epic]: "bg-purple-100 text-purple-800 border-purple-300",
    [Rarity.Legendary]: "bg-amber-100 text-amber-800 border-amber-300",
  }

  const rarityRewards = {
    [Rarity.Common]: "1",
    [Rarity.Rare]: "2",
    [Rarity.Epic]: "5",
    [Rarity.Legendary]: "10",
  }

  const handleStake = async () => {
    await onStake(tokenId)
  }

  const handleUnstake = async () => {
    await onUnstake(tokenId)
  }

  const handleClaim = async () => {
    await onClaim(tokenId)
  }

  return (
    <Card
      className={`overflow-hidden border-primary/20 transition-all duration-300 hover:shadow-md ${isStaked ? "bg-gradient-to-b from-primary/5 to-primary/10" : ""}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardContent className="p-3">
        <div className="relative aspect-square rounded-md overflow-hidden bg-muted">
          <img
            src="/placeholder.svg?height=200&width=200"
            alt={`NFT #${tokenId}`}
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${rarityColors[rarity]}`}>{rarityNames[rarity]}</Badge>

          {isStaked && (
            <div className="absolute bottom-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
              Staked
            </div>
          )}

          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${showActions ? "opacity-100" : "opacity-0"}`}
          >
            <div className="text-white text-center">
              <div className="text-lg font-bold">NFT #{tokenId}</div>
              <div className="text-sm">{rarityNames[rarity]}</div>
              {isStaked && <div className="mt-1 text-xs">Earning {rarityRewards[rarity]} tokens/day</div>}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 flex justify-center">
        {isStaked ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs" onClick={handleClaim} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Claim"}
            </Button>
            <Button size="sm" variant="outline" className="text-xs" onClick={handleUnstake} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Unstake"}
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="text-xs bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 w-full"
            onClick={handleStake}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
            Stake NFT
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

