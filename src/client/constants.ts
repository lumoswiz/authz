import {
  arbitrum,
  avalanche,
  base,
  baseSepolia,
  berachain,
  bsc,
  celo,
  gnosis,
  mainnet,
  optimism,
  polygon,
  sepolia,
  sonic
} from "viem/chains"

export const CHAINS = [
  mainnet,
  optimism,
  gnosis,
  polygon,
  arbitrum,
  avalanche,
  bsc,
  base,
  celo,
  sonic,
  berachain,
  baseSepolia,
  sepolia
] as const
