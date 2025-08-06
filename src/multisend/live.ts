import { Effect, Layer } from "effect"
import {
  type Address,
  decodeFunctionData,
  encodeFunctionData,
  encodePacked,
  getAddress,
  type Hex,
  size,
  toHex
} from "viem"
import { type MetaTransactionData, OperationType } from "../shared/types.js"
import { MULTI_SEND_ABI } from "./abi.js"
import { MULTISEND_141, MULTISEND_CALLONLY_141 } from "./constants.js"
import { MultiSendService } from "./service.js"

const encodeMetaTx = (tx: MetaTransactionData): Hex =>
  encodePacked(
    ["uint8", "address", "uint256", "uint256", "bytes"],
    [
      tx.operation ?? OperationType.Call,
      tx.to,
      BigInt(tx.value),
      BigInt(size(tx.data)),
      tx.data
    ]
  )

const remove0x = (hex: Hex): string => hex.slice(2)

const unpack = (packed: string, startIndex: number): MetaTransactionData & { endIndex: number } => {
  const operation = parseInt(packed.substring(startIndex, startIndex + 2), 16) as OperationType

  const to = getAddress("0x" + packed.substring(startIndex + 2, startIndex + 42)) as Address

  const value = toHex(BigInt("0x" + packed.substring(startIndex + 42, startIndex + 106))) as Hex

  const hexDataLength = parseInt(packed.substring(startIndex + 106, startIndex + 170), 16)
  const endIndex = startIndex + 170 + hexDataLength * 2

  const data = ("0x" + packed.substring(startIndex + 170, endIndex)) as Hex

  return { operation, to, value, data, endIndex }
}

export const MultiSendServiceLive = Layer.succeed(
  MultiSendService,
  MultiSendService.of({
    encodeMulti: (transactions) =>
      Effect.sync(() => {
        const contractAddress = transactions.some(
            (t) => t.operation === OperationType.DelegateCall
          )
          ? MULTISEND_141
          : MULTISEND_CALLONLY_141

        const encoded = "0x" + transactions.map(encodeMetaTx).map(remove0x).join("")

        return {
          operation: OperationType.DelegateCall,
          to: contractAddress,
          value: "0x00",
          data: encodeFunctionData({
            abi: MULTI_SEND_ABI,
            functionName: "multiSend",
            args: [encoded as Hex]
          })
        }
      }),

    decodeMulti: (data) =>
      Effect.sync(() => {
        const { args } = decodeFunctionData({
          abi: MULTI_SEND_ABI,
          data
        })

        const [transactionsEncoded] = args as [Hex]
        const result: Array<MetaTransactionData> = []

        let cursor = 2
        while (cursor < transactionsEncoded.length) {
          const { endIndex, ...tx } = unpack(transactionsEncoded, cursor)
          result.push(tx)
          cursor = endIndex
        }

        return result
      })
  })
)
