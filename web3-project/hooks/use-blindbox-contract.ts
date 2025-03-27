"use client"

import { useState, useEffect, useCallback } from "react"
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction, useBalance } from "wagmi"
import { parseEther, formatEther } from "viem"
import {
  BLINDBOX_CONTRACT_ADDRESS,
  PLATFORM_TOKEN_ADDRESS,
  BLINDBOX_ABI,
  PLATFORM_TOKEN_ABI,
  type GameChoice,
} from "@/lib/contracts/BlindboxNFTGameWithStaking"
import { useToast } from "@/components/ui/use-toast"

export function useBlindboxContract() {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const [userNFTs, setUserNFTs] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [stakedNFTs, setStakedNFTs] = useState<number[]>([])

  // 获取ETH余额
  const { data: ethBalance } = useBalance({
    address,
    enabled: isConnected && !!address,
  })

  // 获取合约常量
  const { data: mintPrice } = useContractRead({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "MINT_PRICE",
    enabled: isConnected,
  })

  // 获取用户NFT余额
  const { data: nftBalance, refetch: refetchNFTBalance } = useContractRead({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "balanceOf",
    args: [address || "0x0000000000000000000000000000000000000000"],
    enabled: isConnected && !!address,
  })

  // 获取用户代币余额
  const { data: tokenBalance, refetch: refetchTokenBalance } = useContractRead({
    address: PLATFORM_TOKEN_ADDRESS,
    abi: PLATFORM_TOKEN_ABI,
    functionName: "balanceOf",
    args: [address || "0x0000000000000000000000000000000000000000"],
    enabled: isConnected && !!address,
  })

  // 获取用户质押的NFT数量
  const { data: stakedNFTCount, refetch: refetchStakedNFTCount } = useContractRead({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "totalStakedNFTs",
    args: [address || "0x0000000000000000000000000000000000000000"],
    enabled: isConnected && !!address,
  })

  // 铸造盲盒
  const {
    data: mintData,
    write: writeMintBlindbox,
    error: mintError,
  } = useContractWrite({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "mintBlindbox",
  })

  // 等待铸造交易
  const { isLoading: isMintLoading, isSuccess: isMintSuccess } = useWaitForTransaction({
    hash: mintData?.hash,
  })

  // 玩游戏
  const {
    data: gameData,
    write: writePlayGame,
    error: gameError,
  } = useContractWrite({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "playGame",
  })

  // 等待游戏交易
  const { isLoading: isGameLoading, isSuccess: isGameSuccess } = useWaitForTransaction({
    hash: gameData?.hash,
  })

  // 质押NFT
  const {
    data: stakeData,
    write: writeStakeNFT,
    error: stakeError,
  } = useContractWrite({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "stakeNFT",
  })

  // 等待质押交易
  const { isLoading: isStakeLoading, isSuccess: isStakeSuccess } = useWaitForTransaction({
    hash: stakeData?.hash,
  })

  // 取消质押NFT
  const {
    data: unstakeData,
    write: writeUnstakeNFT,
    error: unstakeError,
  } = useContractWrite({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "unstakeNFT",
  })

  // 等待取消质押交易
  const { isLoading: isUnstakeLoading, isSuccess: isUnstakeSuccess } = useWaitForTransaction({
    hash: unstakeData?.hash,
  })

  // 领取质押奖励
  const {
    data: claimData,
    write: writeClaimRewards,
    error: claimError,
  } = useContractWrite({
    address: BLINDBOX_CONTRACT_ADDRESS,
    abi: BLINDBOX_ABI,
    functionName: "claimStakingRewards",
  })

  // 等待领取奖励交易
  const { isLoading: isClaimLoading, isSuccess: isClaimSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  // 获取用户拥有的NFT
  const fetchUserNFTs = useCallback(async () => {
    if (!isConnected || !address || !nftBalance) return

    setIsLoading(true)
    try {
      const nfts: number[] = []
      const balance = Number(nftBalance)

      // 模拟获取NFT，实际应用中应该使用合约方法
      for (let i = 0; i < balance; i++) {
        try {
          // 这里应该调用合约的tokenOfOwnerByIndex方法
          // 为了简化，我们使用模拟数据
          nfts.push(i + 1)
        } catch (error) {
          console.error(`Error fetching NFT at index ${i}:`, error)
        }
      }

      setUserNFTs(nfts)
    } catch (error) {
      console.error("Error fetching user NFTs:", error)
      toast({
        title: "获取NFT失败",
        description: "无法获取您的NFT，请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, nftBalance, toast])

  // 获取用户质押的NFT
  const fetchStakedNFTs = useCallback(async () => {
    if (!isConnected || !address || !stakedNFTCount) return

    setIsLoading(true)
    try {
      const staked: number[] = []
      const count = Number(stakedNFTCount)

      // 模拟获取质押的NFT，实际应用中应该使用合约方法
      for (let i = 0; i < count; i++) {
        try {
          // 这里应该调用合约的相关方法获取质押的NFT
          // 为了简化，我们使用模拟数据
          staked.push(100 + i)
        } catch (error) {
          console.error(`Error fetching staked NFT at index ${i}:`, error)
        }
      }

      setStakedNFTs(staked)
    } catch (error) {
      console.error("Error fetching staked NFTs:", error)
      toast({
        title: "获取质押NFT失败",
        description: "无法获取您质押的NFT，请稍后再试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, stakedNFTCount, toast])

  // 铸造盲盒函数
  const mintBlindbox = useCallback(async () => {
    if (!isConnected || !mintPrice) {
      toast({
        title: "未连接钱包",
        description: "请先连接您的钱包",
        variant: "destructive",
      })
      return
    }

    try {
      // 修改这里，确保mintPrice是bigint类型
      writeMintBlindbox({
        value: BigInt(mintPrice.toString()),
      })

      toast({
        title: "铸造请求已提交",
        description: "请等待交易确认",
      })
    } catch (error) {
      console.error("Error minting blindbox:", error)
      toast({
        title: "铸造失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    }
  }, [isConnected, mintPrice, writeMintBlindbox, toast])

  // 玩游戏函数
  const playGame = useCallback(
    async (choice: GameChoice, betAmount: string) => {
      if (!isConnected) {
        toast({
          title: "未连接钱包",
          description: "请先连接您的钱包",
          variant: "destructive",
        })
        return
      }

      try {
        writePlayGame({
          args: [choice],
          value: parseEther(betAmount),
        })

        toast({
          title: "游戏请求已提交",
          description: "请等待交易确认",
        })
      } catch (error) {
        console.error("Error playing game:", error)
        toast({
          title: "游戏失败",
          description: error instanceof Error ? error.message : "未知错误",
          variant: "destructive",
        })
      }
    },
    [isConnected, writePlayGame, toast],
  )

  // 质押NFT函数
  const stakeNFT = useCallback(
    async (tokenId: number) => {
      if (!isConnected) {
        toast({
          title: "未连接钱包",
          description: "请先连接您的钱包",
          variant: "destructive",
        })
        return
      }

      try {
        writeStakeNFT({
          args: [BigInt(tokenId)],
        })

        toast({
          title: "质押请求已提交",
          description: "请等待交易确认",
        })
      } catch (error) {
        console.error("Error staking NFT:", error)
        toast({
          title: "质押失败",
          description: error instanceof Error ? error.message : "未知错误",
          variant: "destructive",
        })
      }
    },
    [isConnected, writeStakeNFT, toast],
  )

  // 取消质押NFT函数
  const unstakeNFT = useCallback(
    async (tokenId: number) => {
      if (!isConnected) {
        toast({
          title: "未连接钱包",
          description: "请先连接您的钱包",
          variant: "destructive",
        })
        return
      }

      try {
        writeUnstakeNFT({
          args: [BigInt(tokenId)],
        })

        toast({
          title: "取消质押请求已提交",
          description: "请等待交易确认",
        })
      } catch (error) {
        console.error("Error unstaking NFT:", error)
        toast({
          title: "取消质押失败",
          description: error instanceof Error ? error.message : "未知错误",
          variant: "destructive",
        })
      }
    },
    [isConnected, writeUnstakeNFT, toast],
  )

  // 领取质押奖励函数
  const claimRewards = useCallback(
    async (tokenId: number) => {
      if (!isConnected) {
        toast({
          title: "未连接钱包",
          description: "请先连接您的钱包",
          variant: "destructive",
        })
        return
      }

      try {
        writeClaimRewards({
          args: [BigInt(tokenId)],
        })

        toast({
          title: "领取奖励请求已提交",
          description: "请等待交易确认",
        })
      } catch (error) {
        console.error("Error claiming rewards:", error)
        toast({
          title: "领取奖励失败",
          description: error instanceof Error ? error.message : "未知错误",
          variant: "destructive",
        })
      }
    },
    [isConnected, writeClaimRewards, toast],
  )

  // 监听交易成功事件
  useEffect(() => {
    if (isMintSuccess) {
      toast({
        title: "铸造成功",
        description: "您的盲盒已成功铸造",
      })
      refetchNFTBalance()
      fetchUserNFTs()
    }

    if (isGameSuccess) {
      toast({
        title: "游戏完成",
        description: "游戏结果已确认，请查看结果",
      })
    }

    if (isStakeSuccess) {
      toast({
        title: "质押成功",
        description: "您的NFT已成功质押",
      })
      refetchNFTBalance()
      refetchStakedNFTCount()
      fetchUserNFTs()
      fetchStakedNFTs()
    }

    if (isUnstakeSuccess) {
      toast({
        title: "取消质押成功",
        description: "您的NFT已成功取消质押",
      })
      refetchNFTBalance()
      refetchStakedNFTCount()
      fetchUserNFTs()
      fetchStakedNFTs()
    }

    if (isClaimSuccess) {
      toast({
        title: "领取奖励成功",
        description: "您已成功领取质押奖励",
      })
      refetchTokenBalance()
    }
  }, [
    isMintSuccess,
    isGameSuccess,
    isStakeSuccess,
    isUnstakeSuccess,
    isClaimSuccess,
    toast,
    refetchNFTBalance,
    refetchStakedNFTCount,
    refetchTokenBalance,
    fetchUserNFTs,
    fetchStakedNFTs,
  ])

  // 初始化时获取用户NFT
  useEffect(() => {
    if (isConnected && address && nftBalance) {
      fetchUserNFTs()
    }
  }, [isConnected, address, nftBalance, fetchUserNFTs])

  // 初始化时获取用户质押的NFT
  useEffect(() => {
    if (isConnected && address && stakedNFTCount) {
      fetchStakedNFTs()
    }
  }, [isConnected, address, stakedNFTCount, fetchStakedNFTs])

  return {
    isConnected,
    address,
    ethBalance: ethBalance?.formatted || "0",
    // 修改这里，确保mintPrice在传递给formatEther之前是bigint类型
    mintPrice: mintPrice ? formatEther(BigInt(mintPrice.toString())) : "0.01",
    nftBalance: nftBalance ? Number(nftBalance) : 0,
    // 同样需要检查tokenBalance是否需要转换
    tokenBalance: tokenBalance ? formatEther(BigInt(tokenBalance.toString())) : "0",
    stakedNFTCount: stakedNFTCount ? Number(stakedNFTCount) : 0,
    userNFTs,
    stakedNFTs,
    isLoading,
    isMintLoading,
    isGameLoading,
    isStakeLoading,
    isUnstakeLoading,
    isClaimLoading,
    mintBlindbox,
    playGame,
    stakeNFT,
    unstakeNFT,
    claimRewards,
    fetchUserNFTs,
    fetchStakedNFTs,
  }
}

