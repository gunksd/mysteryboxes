"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] relative z-10">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                Web3 Mystery Box & Games
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Rare NFTs and Win Crypto Rewards
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Open mystery boxes to find rare NFTs, play games to win ETH, and stake your NFTs to earn rewards.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="group relative overflow-hidden">
                <Link href="/mystery-box">
                  <span className="relative z-10">Open Mystery Box</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/game">
                  <span>Play Games</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] md:h-[420px] md:w-[420px]">
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-purple-700 opacity-20 blur-3xl" />

              {/* Treasure chest SVG */}
              <div className="relative h-full w-full flex items-center justify-center">
                <svg
                  className="w-64 h-64 drop-shadow-xl"
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

                {/* Floating NFT elements */}
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-lg bg-gradient-to-br from-primary to-purple-600 p-1 shadow-lg animate-bounce">
                  <div className="h-full w-full rounded-lg bg-background flex items-center justify-center">
                    <span className="font-bold text-primary">NFT</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-lg bg-gradient-to-br from-primary to-purple-600 p-1 shadow-lg animate-pulse">
                  <div className="h-full w-full rounded-lg bg-background flex items-center justify-center">
                    <span className="font-bold text-primary">Mystery</span>
                  </div>
                </div>

                {/* Sparkles */}
                <div className="absolute top-1/4 right-1/4 animate-ping">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3L13.5 8.5H19L14.5 12L16 17.5L12 14L8 17.5L9.5 12L5 8.5H10.5L12 3Z" />
                  </svg>
                </div>
                <div className="absolute bottom-1/3 left-1/4 animate-ping delay-300">
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
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 relative z-10">
          <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">1,000+</div>
            <div className="text-sm text-muted-foreground">NFTs Minted</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground">Rarity Levels</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">10 ETH</div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
          </div>
          <div className="bg-background/50 backdrop-blur-sm border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
        </div>
      </div>
    </section>
  )
}

