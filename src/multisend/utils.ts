import { type Address, encodePacked, getAddress, type Hex, size, toHex } from "viem"
import { type MetaTransactionData, OperationType } from "../shared/types.js"

export const encodeMetaTx = (tx: MetaTransactionData): Hex =>
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

export const remove0x = (hex: Hex): string => hex.slice(2)

export const unpack = (packed: string, startIndex: number): MetaTransactionData & { endIndex: number } => {
  const operation = parseInt(packed.substring(startIndex, startIndex + 2), 16) as OperationType
  const to = getAddress("0x" + packed.substring(startIndex + 2, startIndex + 42)) as Address
  const value = toHex(BigInt("0x" + packed.substring(startIndex + 42, startIndex + 106))) as Hex
  const hexDataLength = parseInt(packed.substring(startIndex + 106, startIndex + 170), 16)
  const endIndex = startIndex + 170 + hexDataLength * 2
  const data = ("0x" + packed.substring(startIndex + 170, endIndex)) as Hex
  return { operation, to, value, data, endIndex }
}
