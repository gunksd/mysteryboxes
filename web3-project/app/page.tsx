import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Hero from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { OpenMysteryBox } from "@/components/open-mystery-box"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-16">
        <Hero />

        <section className="container py-12 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-gradient-to-tr from-primary/10 to-blue-500/10 rounded-full blur-3xl opacity-30" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-8 relative z-10">Try Your Luck</h2>
          <div className="max-w-md mx-auto">
            <OpenMysteryBox />
          </div>

          <h2 className="text-3xl font-bold text-center mt-16 mb-8 relative z-10">Explore Features</h2>
          <div className="grid gap-6 md:grid-cols-3 relative z-10">
            <Card className="hover:shadow-lg transition-all duration-300 group border-primary/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary w-8 h-8"
                  >
                    <path d="M21 9V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                    <path d="M3 16V9h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                    <path d="M12 7v10" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 0 0 5H12" />
                    <path d="M12 12h4.5a2.5 2.5 0 0 0 0 5H12" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Mystery Box</h3>
                  <p className="text-muted-foreground">
                    Open mystery boxes to discover rare NFTs with varying rarities.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 group-hover:shadow-md"
                >
                  <Link href="/mystery-box">
                    <span>Open Boxes</span>
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
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group border-primary/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary w-8 h-8"
                  >
                    <rect width="8" height="8" x="2" y="2" rx="2" />
                    <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
                    <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
                    <path d="M8 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2" />
                    <path d="M14 14c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2" />
                    <rect width="8" height="8" x="14" y="14" rx="2" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Games</h3>
                  <p className="text-muted-foreground">
                    Play rock-paper-scissors to win double your bet or lose it all.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 group-hover:shadow-md"
                >
                  <Link href="/game">
                    <span>Play Now</span>
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
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 group border-primary/20 overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary w-8 h-8"
                  >
                    <path d="M4.4 19.4 7 22l2.6-2.6-2.6-2.6Z" />
                    <path d="m9.5 13.9 2.6 2.6 2.6-2.6-2.6-2.6Z" />
                    <path d="M14.6 19.4 17.2 22l2.6-2.6-2.6-2.6Z" />
                    <path d="m14.6 8.4 2.6 2.6 2.6-2.6-2.6-2.6Z" />
                    <path d="m4.4 8.4 2.6 2.6 2.6-2.6-2.6-2.6Z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Staking</h3>
                  <p className="text-muted-foreground">Stake your NFTs to earn platform tokens and rewards.</p>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 group-hover:shadow-md"
                >
                  <Link href="/stake">
                    <span>Stake NFTs</span>
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
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-medium">Connect Wallet</h3>
                <p className="text-muted-foreground">Connect your MetaMask, OKX, or Binance wallet to get started.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-medium">Choose Activity</h3>
                <p className="text-muted-foreground">Open mystery boxes, play games, or stake your NFTs.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-medium">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Win ETH from games, discover rare NFTs, and earn platform tokens.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 bg-gradient-to-t from-primary/5 to-background">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-sm opacity-70"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center text-white font-bold rounded-full bg-gradient-to-r from-primary to-purple-600 text-xs">
                C
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CryptoBox. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

