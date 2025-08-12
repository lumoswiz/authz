import { Schema } from "effect"

const hexIssues = (body: string, expectedLen: number) => {
  const issues: Array<Schema.FilterIssue | string> = []
  if (body.length !== expectedLen) {
    issues.push(`expected ${expectedLen} hex chars after 0x, got ${body.length}`)
  }
  if (!/^[0-9a-fA-F]*$/.test(body)) {
    issues.push("must contain only hex characters 0-9a-fA-F")
  }
  return issues.length ? issues : undefined
}

const addressPredicate = (s: string) => {
  if (typeof s !== "string") return "expected a string"
  if (!s.startsWith("0x")) return "must start with \"0x\""
  return hexIssues(s.slice(2), 40)
}

const bytes32Predicate = (s: string) => {
  if (typeof s !== "string") return "expected a string"
  if (!s.startsWith("0x")) return "must start with \"0x\""
  return hexIssues(s.slice(2), 64)
}

const addressFilter = Schema.filter(addressPredicate, {
  identifier: "AddressHex",
  description: "0x-prefixed, 20-byte hex string (40 hex chars after 0x)"
})

const bytes32Filter = Schema.filter(bytes32Predicate, {
  identifier: "Bytes32Hex",
  description: "0x-prefixed, 32-byte hex string (64 hex chars after 0x)"
})

export const AddressHex = addressFilter(Schema.String)
export const Bytes32Hex = bytes32Filter(Schema.String)

const LowerHex = Schema.transform(Schema.String, Schema.String, {
  strict: true,
  decode: (s) => (s.startsWith("0x") ? `0x${s.slice(2).toLowerCase()}` : s.toLowerCase()),
  encode: (s) => s
})

export const AddressLowerBase: Schema.Schema<string, string, never> = LowerHex.pipe(
  Schema.filter(addressPredicate, { identifier: "AddressHex" })
)

export const Bytes32LowerBase: Schema.Schema<string, string, never> = LowerHex.pipe(
  Schema.filter(bytes32Predicate, { identifier: "Bytes32Hex" })
)

export const AddressLower = AddressLowerBase.pipe(Schema.brand("AddressLower"))
export const Bytes32Lower = Bytes32LowerBase.pipe(Schema.brand("Bytes32Lower"))

export const decodeAddressLowerSync = (u: unknown) => Schema.decodeUnknownSync(AddressLowerBase)(u)

export const decodeBytes32LowerSync = (u: unknown) => Schema.decodeUnknownSync(Bytes32LowerBase)(u)

// Branded output types
export type AddressLower = typeof AddressLower.Type
export type Bytes32Lower = typeof Bytes32Lower.Type
