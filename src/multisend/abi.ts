import { parseAbi } from "viem"

export const MULTI_SEND_ABI = parseAbi([
  "function multiSend(bytes memory transactions)"
])
