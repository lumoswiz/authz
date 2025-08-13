import { Effect, Layer } from "effect"
import { decodeFunctionData, encodeFunctionData, type Hex } from "viem"
import { type MetaTransactionData, OperationType } from "../shared/types.js"
import { MULTI_SEND_ABI } from "./abi.js"
import { MULTISEND_141, MULTISEND_CALLONLY_141 } from "./constants.js"
import { DecodeMultiError, EncodeMultiError, type MultiSendError } from "./errors.js"
import { MultiSendService } from "./service.js"
import { encodeMetaTx, remove0x, unpack } from "./utils.js"

export const MultiSendServiceLive = Layer.succeed(
  MultiSendService,
  MultiSendService.of({
    encodeMulti: (transactions) =>
      Effect.try((): MetaTransactionData => {
        const contractAddress = transactions.some(
            (t) => (t.operation ?? OperationType.Call) === OperationType.DelegateCall
          )
          ? MULTISEND_141
          : MULTISEND_CALLONLY_141
        const encoded = ("0x" + transactions.map(encodeMetaTx).map(remove0x).join("")) as Hex
        return {
          operation: OperationType.DelegateCall,
          to: contractAddress,
          value: "0x0",
          data: encodeFunctionData({
            abi: MULTI_SEND_ABI,
            functionName: "multiSend",
            args: [encoded]
          })
        }
      }).pipe(Effect.mapError((cause): MultiSendError => new EncodeMultiError({ cause }))),

    decodeMulti: (data) =>
      Effect.try(() => {
        const { args } = decodeFunctionData({
          abi: MULTI_SEND_ABI,
          data
        })
        const [transactionsEncoded] = args as [Hex]
        const packed = transactionsEncoded as string
        const result: Array<MetaTransactionData> = []
        let cursor = 2
        while (cursor < packed.length) {
          const { endIndex, ...tx } = unpack(packed, cursor)
          result.push(tx)
          cursor = endIndex
        }
        return result
      }).pipe(Effect.mapError((cause): MultiSendError => new DecodeMultiError({ cause })))
  })
)
