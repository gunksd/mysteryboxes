export const BLINDBOX_CONTRACT_ADDRESS = "0x7f6389247ECC1FF70a907F81A5EB429E7D2dAAa6"
export const PLATFORM_TOKEN_ADDRESS = "0xAA3015d09ed0eB454F64d46cE9865a0f08848a7C"

export const BLINDBOX_ABI = [
  // ERC721 标准接口
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function totalSupply() view returns (uint256)",

  // 合约特定功能
  "function MINT_PRICE() view returns (uint256)",
  "function platformToken() view returns (address)",
  "function fundPool() view returns (uint256)",
  "function stakingRewardPool() view returns (uint256)",

  // NFT元数据
  "function nftMetadata(uint256 tokenId) view returns (uint8 rarity, uint256 mintTimestamp)",
  "function userNFTs(address user, uint256 index) view returns (uint256)",

  // 质押相关
  "function stakeInfos(address user, uint256 tokenId) view returns (uint256 amount, uint256 stakedAt, uint256 lastClaimTime)",
  "function totalStakedNFTs(address user) view returns (uint256)",

  // 主要功能
  "function mintBlindbox() payable",
  "function playGame(uint8 playerChoice) payable",
  "function stakeNFT(uint256 tokenId)",
  "function unstakeNFT(uint256 tokenId)",
  "function claimStakingRewards(uint256 tokenId)",

  // 事件
  "event BlindboxMinted(address indexed player, uint256 tokenId, uint8 rarity)",
  "event GamePlayed(address indexed player, uint256 betAmount, uint8 result)",
  "event NFTStaked(address indexed staker, uint256 tokenId)",
  "event NFTUnstaked(address indexed staker, uint256 tokenId)",
  "event StakingRewardClaimed(address indexed staker, uint256 rewardAmount)",
]

export const PLATFORM_TOKEN_ABI = [
  // ERC20 标准接口
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",

  // 事件
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
]

// 稀有度枚举
export enum Rarity {
  Common = 0,
  Rare = 1,
  Epic = 2,
  Legendary = 3,
}

// 游戏结果枚举
export enum GameResult {
  Pending = 0,
  PlayerWin = 1,
  Tie = 2,
  HouseWin = 3,
}

// 游戏选择枚举
export enum GameChoice {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

