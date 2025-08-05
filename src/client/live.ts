import { Layer } from "effect"
import { createPublicClient, http } from "viem"
import { sepolia } from "viem/chains"
import { ViemClient } from "./service.js"

export const makeViemClient = () =>
  createPublicClient({
    chain: sepolia,
    transport: http()
  })

export const LiveViemClientLayer = Layer.succeed(ViemClient, {
  publicClient: makeViemClient()
})
