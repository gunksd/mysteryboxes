"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ClientConnectWallet } from "@/components/client-connect-wallet"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Mystery Box", path: "/mystery-box" },
    { name: "Games", path: "/game" },
    { name: "Stake", path: "/stake" },
  ]

  if (!mounted) return null

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-sm opacity-70"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center text-white font-bold rounded-full bg-gradient-to-r from-primary to-purple-600">
              C
            </div>
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            CryptoBox
          </span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-4 lg:space-x-6 mr-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                    pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
          <ClientConnectWallet />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-3 px-4 py-3 bg-background border-t">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                  pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <ClientConnectWallet />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

