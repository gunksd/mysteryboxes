"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectWallet } from "@/components/connect-wallet"
import { AlertCircle, Loader2, Scissors, Hand, FileText, Trophy, XCircle, MinusCircle, Coins } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBlindboxContract } from "@/hooks/use-blindbox-contract"
import { GameChoice, GameResult } from "@/lib/contracts/BlindboxNFTGameWithStaking"

export default function GamePage() {
  const [showResultDialog, setShowResultDialog] = useState(false)
  const [betAmount, setBetAmount] = useState<string>("0.01")
  const [userChoice, setUserChoice] = useState<GameChoice | null>(null)
  const [computerChoice, setComputerChoice] = useState<GameChoice | null>(null)
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  const [winnings, setWinnings] = useState<string>("0")
  const [animateChoice, setAnimateChoice] = useState<GameChoice | null>(null)
  const [poolAmount, setPoolAmount] = useState<string>("1.5")
  const { toast } = useToast()

  const { isConnected, isGameLoading, playGame } = useBlindboxContract()

  const handlePlayGame = async (choice: GameChoice) => {
    if (!isConnected) {
      toast({
        title: "未连接钱包",
        description: "请先连接您的钱包",
        variant: "destructive",
      })
      return
    }

    const betValue = Number.parseFloat(betAmount)
    const poolValue = Number.parseFloat(poolAmount)

    // Check if pool has enough funds to pay potential winnings
    if (betValue * 2 > poolValue) {
      toast({
        title: "Insufficient Pool Funds",
        description: "The pool doesn't have enough funds to pay potential winnings",
        variant: "destructive",
      })
      return
    }

    setUserChoice(choice)
    setAnimateChoice(choice)

    try {
      await playGame(choice, betAmount)

      // 注意：在实际应用中，我们应该监听合约事件来获取游戏结果
      // 这里为了演示，我们模拟一个随机结果
      setTimeout(() => {
        const choices: GameChoice[] = [GameChoice.Rock, GameChoice.Paper, GameChoice.Scissors]
        const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)]
        setComputerChoice(computerRandomChoice)

        // Determine winner
        let result: GameResult
        if (choice === computerRandomChoice) {
          result = GameResult.Tie
          setWinnings(betAmount)

          // Update pool (3% fee on draw)
          const fee = betValue * 0.03
          setPoolAmount((poolValue + fee).toFixed(2))
        } else if (
          (choice === GameChoice.Rock && computerRandomChoice === GameChoice.Scissors) ||
          (choice === GameChoice.Paper && computerRandomChoice === GameChoice.Rock) ||
          (choice === GameChoice.Scissors && computerRandomChoice === GameChoice.Paper)
        ) {
          result = GameResult.PlayerWin
          const winningsAmount = betValue * 2
          setWinnings(winningsAmount.toFixed(2))

          // Update pool (player gets double their bet)
          setPoolAmount((poolValue - betValue).toFixed(2))
        } else {
          result = GameResult.HouseWin
          setWinnings("0")

          // Update pool (player loses their bet to the pool)
          setPoolAmount((poolValue + betValue).toFixed(2))
        }

        setGameResult(result)
        setAnimateChoice(null)
        setShowResultDialog(true)
      }, 2000)
    } catch (error) {
      console.error("Error playing game:", error)
      setAnimateChoice(null)
      toast({
        title: "游戏失败",
        description: "无法完成游戏，请稍后再试",
        variant: "destructive",
      })
    }
  }

  const getChoiceIcon = (choice: GameChoice | null) => {
    switch (choice) {
      case GameChoice.Rock:
        return <Hand className="h-6 w-6" />
      case GameChoice.Paper:
        return <FileText className="h-6 w-6" />
      case GameChoice.Scissors:
        return <Scissors className="h-6 w-6" />
      default:
        return null
    }
  }

  const getResultIcon = (result: GameResult | null) => {
    switch (result) {
      case GameResult.PlayerWin:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case GameResult.HouseWin:
        return <XCircle className="h-6 w-6 text-red-500" />
      case GameResult.Tie:
        return <MinusCircle className="h-6 w-6 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Rock Paper Scissors
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Play Rock Paper Scissors against the computer. Win to double your bet, draw to keep your stake (minus 3%
            fee), or lose everything.
          </p>
        </div>

        {!isConnected && (
          <Alert className="mb-8 border-primary/50 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>Connect your wallet</AlertTitle>
            <AlertDescription>You need to connect your wallet to play games.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
              <CardTitle>Game Settings</CardTitle>
              <CardDescription>Set your bet amount and view pool information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bet-amount">Bet Amount (ETH)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="bet-amount"
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="focus-within:ring-primary"
                  />
                  <Select onValueChange={(value) => setBetAmount(value)} defaultValue="0.01">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.01">0.01 ETH</SelectItem>
                      <SelectItem value="0.05">0.05 ETH</SelectItem>
                      <SelectItem value="0.1">0.1 ETH</SelectItem>
                      <SelectItem value="0.5">0.5 ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-4 space-y-2 border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pool Balance:</span>
                  <Badge variant="outline" className="font-mono bg-primary/5">
                    <Coins className="h-3 w-3 mr-1" />
                    {poolAmount} ETH
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Potential Win:</span>
                  <Badge variant="outline" className="font-mono text-green-600 bg-green-50">
                    {(Number.parseFloat(betAmount) * 2).toFixed(3)} ETH
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fee on Draw:</span>
                  <Badge variant="outline" className="font-mono">
                    {(Number.parseFloat(betAmount) * 0.03).toFixed(4)} ETH
                  </Badge>
                </div>
              </div>

              {/* Game rules visualization */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs text-muted-foreground">
                <div className="p-2 rounded-lg bg-green-50 border border-green-100">
                  <Trophy className="h-4 w-4 mx-auto mb-1 text-green-500" />
                  <span>Win: Double your bet</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                  <MinusCircle className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                  <span>Draw: Get bet back (minus 3% fee)</span>
                </div>
                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  <XCircle className="h-4 w-4 mx-auto mb-1 text-red-500" />
                  <span>Lose: Forfeit your bet</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!isConnected && (
                <div className="w-full flex justify-center">
                  <ConnectWallet />
                </div>
              )}
            </CardFooter>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
              <CardTitle>Play Game</CardTitle>
              <CardDescription>Choose rock, paper, or scissors to start playing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className={`h-24 flex flex-col gap-2 p-2 transition-all duration-300 ${animateChoice === GameChoice.Rock ? "bg-primary/20 border-primary" : ""} ${animateChoice === GameChoice.Rock ? "scale-105" : ""}`}
                  onClick={() => handlePlayGame(GameChoice.Rock)}
                  disabled={isGameLoading || !isConnected || animateChoice !== null}
                >
                  <svg className="h-10 w-10 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Rock</span>
                </Button>
                <Button
                  variant="outline"
                  className={`h-24 flex flex-col gap-2 p-2 transition-all duration-300 ${animateChoice === GameChoice.Paper ? "bg-primary/20 border-primary" : ""} ${animateChoice === GameChoice.Paper ? "scale-105" : ""}`}
                  onClick={() => handlePlayGame(GameChoice.Paper)}
                  disabled={isGameLoading || !isConnected || animateChoice !== null}
                >
                  <svg className="h-10 w-10 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 6H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 10H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 14H12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Paper</span>
                </Button>
                <Button
                  variant="outline"
                  className={`h-24 flex flex-col gap-2 p-2 transition-all duration-300 ${animateChoice === GameChoice.Scissors ? "bg-primary/20 border-primary" : ""} ${animateChoice === GameChoice.Scissors ? "scale-105" : ""}`}
                  onClick={() => handlePlayGame(GameChoice.Scissors)}
                  disabled={isGameLoading || !isConnected || animateChoice !== null}
                >
                  <svg className="h-10 w-10 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17L19 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 15L20 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Scissors</span>
                </Button>
              </div>

              {animateChoice !== null && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Playing game...</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground w-full text-center">
                Win: Double your bet • Draw: Get your bet back (minus 3% fee) • Lose: Forfeit your bet
              </div>
            </CardFooter>
          </Card>
        </div>

        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getResultIcon(gameResult)}
                <span className="ml-2">
                  Game Result: You{" "}
                  {gameResult === GameResult.PlayerWin ? "win" : gameResult === GameResult.Tie ? "draw" : "lose"}!
                </span>
              </DialogTitle>
              <DialogDescription>Here's how the game played out.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col space-y-4 py-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">You</span>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
                    {userChoice === GameChoice.Rock && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {userChoice === GameChoice.Paper && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 6H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 10H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 14H12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {userChoice === GameChoice.Scissors && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 17L19 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 15L20 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="mt-2 capitalize">
                    {userChoice === GameChoice.Rock ? "Rock" : userChoice === GameChoice.Paper ? "Paper" : "Scissors"}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold relative">
                    <span className="relative z-10">VS</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-sm rounded-full -z-10"></div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground mb-2">Computer</span>
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shadow-md">
                    {computerChoice === GameChoice.Rock && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M18 8C18 6.34 16.66 5 15 5C14.29 5 13.63 5.26 13.12 5.69C12.74 4.73 11.89 4 10.85 4C10.36 4 9.91 4.14 9.5 4.36C9.16 3.56 8.37 3 7.5 3C6.12 3 5 4.12 5 5.5V10.39C4.39 10.96 4 11.77 4 12.69V18.3C4 20.4 5.6 22 7.7 22H15.3C17.4 22 19 20.4 19 18.3V12.69C19 11.19 18.66 9.13 18 8Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {computerChoice === GameChoice.Paper && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 18H12.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 6H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 10H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 14H12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {computerChoice === GameChoice.Scissors && (
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                          fill="currentColor"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M6.46001 15.54L11 11L9.00001 9L4.46001 13.54C3.51001 14.49 3.51001 16.01 4.46001 16.96C5.41001 17.91 6.93001 17.91 7.88001 16.96L15.54 9.3C16.49 8.35 16.49 6.83 15.54 5.88C14.59 4.93 13.07 4.93 12.12 5.88L7.88001 10.12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 17L19 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 15L20 20"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="mt-2 capitalize">
                    {computerChoice === GameChoice.Rock
                      ? "Rock"
                      : computerChoice === GameChoice.Paper
                        ? "Paper"
                        : "Scissors"}
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 backdrop-blur-sm p-4 rounded-md border border-primary/10">
                <div className="flex justify-between items-center">
                  <span>Your Bet:</span>
                  <span className="font-mono">{betAmount} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Result:</span>
                  <span
                    className={`font-bold capitalize ${
                      gameResult === GameResult.PlayerWin
                        ? "text-green-600"
                        : gameResult === GameResult.HouseWin
                          ? "text-red-600"
                          : "text-blue-600"
                    }`}
                  >
                    {gameResult === GameResult.PlayerWin ? "Win" : gameResult === GameResult.HouseWin ? "Lose" : "Draw"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Winnings:</span>
                  <span
                    className={`font-mono font-bold ${
                      gameResult === GameResult.PlayerWin
                        ? "text-green-600"
                        : gameResult === GameResult.HouseWin
                          ? "text-red-600"
                          : "text-blue-600"
                    }`}
                  >
                    {winnings} ETH
                  </span>
                </div>
              </div>

              {/* Result animation */}
              {gameResult === GameResult.PlayerWin && (
                <div className="relative h-12">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <svg
                        className="h-10 w-10 text-yellow-500 animate-bounce"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      <div className="absolute inset-0 bg-yellow-500/30 blur-xl rounded-full -z-10"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-2">
              <Button
                onClick={() => setShowResultDialog(false)}
                variant="outline"
                className="border-primary/20 hover:bg-primary/5"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowResultDialog(false)
                  setUserChoice(null)
                  setComputerChoice(null)
                  setGameResult(null)
                }}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Play Again
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

