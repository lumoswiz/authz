import type { MetaTransactionData, TransactionData } from "../../shared/types.js"

export const toTxs = (args: {
  setupTxs?: ReadonlyArray<TransactionData>
  multisendTxs?: ReadonlyArray<MetaTransactionData>
}): ReadonlyArray<TransactionData> => {
  const a = args.setupTxs ?? []
  const b = (args.multisendTxs ?? []).map(
    (t): TransactionData => ({ to: t.to, data: t.data, value: t.value })
  )
  return [...a, ...b]
}
