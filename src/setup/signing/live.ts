import { Effect, Layer } from "effect"
import { walletActions } from "viem"
import type { Account, Address, Hex } from "viem"
import { ViemClient } from "../../client/service.js"
import { MultiSendService } from "../../multisend/service.js"
import { generateSafeTypedData } from "../../safe/eip712.js"
import { SafeService } from "../../safe/service.js"
import type { SafeTransactionData } from "../../safe/types.js"
import { OperationType } from "../../shared/types.js"
import { SAFE_VERSION_FALLBACK } from "./constants.js"
import {
  BuildSafeTxForSigningError,
  EncodeMultiForSigningError,
  GetChainIdForSigningError,
  GetVersionForSigningError,
  type SigningError,
  SignTypedDataForSigningError
} from "./errors.js"
import { SigningService } from "./service.js"
import type { SignMultisendTxArgs, SignTxArgs } from "./types.js"

export const SigningServiceLive = Layer.effect(
  SigningService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient
    const client = publicClient.extend(walletActions)
    const safe = yield* SafeService
    const multisend = yield* MultiSendService

    const signTyped = ({
      account,
      chainId,
      data,
      safeAddress,
      safeVersion
    }: {
      account: Account
      data: SafeTransactionData
      safeAddress: Address
      safeVersion: string
      chainId: number
    }) => {
      const typed = generateSafeTypedData({
        safeAddress,
        safeVersion,
        chainId,
        data
      })
      return Effect.tryPromise(() =>
        client.signTypedData({
          account,
          domain: typed.domain,
          types: typed.types as any,
          primaryType: typed.primaryType as any,
          message: typed.message as any
        })
      ).pipe(Effect.mapError((cause) => new SignTypedDataForSigningError({ safe: safeAddress, cause })))
    }

    const signTx = ({
      account,
      safe: safeAddress,
      txData
    }: SignTxArgs): Effect.Effect<Hex, SigningError> =>
      safe.getVersion(safeAddress).pipe(
        Effect.mapError((cause) => new GetVersionForSigningError({ safe: safeAddress, cause })),
        Effect.flatMap((version) =>
          Effect.promise(() => publicClient.getChainId()).pipe(
            Effect.mapError((cause) => new GetChainIdForSigningError({ cause })),
            Effect.flatMap((chainId) =>
              signTyped({ account, data: txData, safeAddress, safeVersion: version, chainId })
            )
          )
        ),
        Effect.mapError((e): SigningError => e)
      )

    const signMultisendTx = ({
      account,
      isDeployed = true,
      multisendTxs,
      safe: safeAddress
    }: SignMultisendTxArgs): Effect.Effect<{ txData: SafeTransactionData; signature: Hex }, SigningError> =>
      multisend.encodeMulti(multisendTxs).pipe(
        Effect.mapError((cause) => new EncodeMultiForSigningError({ cause })),
        Effect.flatMap(({ data, to }) =>
          safe
            .buildSignSafeTx({
              safe: safeAddress,
              to,
              data,
              operation: OperationType.DelegateCall,
              useOnChainNonce: isDeployed
            })
            .pipe(
              Effect.mapError((cause) =>
                new BuildSafeTxForSigningError({
                  safe: safeAddress,
                  to,
                  operation: OperationType.DelegateCall,
                  cause
                })
              )
            )
        ),
        Effect.flatMap(({ txData }) =>
          Effect.if(Effect.succeed(isDeployed), {
            onTrue: () =>
              safe.getVersion(safeAddress).pipe(
                Effect.mapError((cause) => new GetVersionForSigningError({ safe: safeAddress, cause })),
                Effect.flatMap((version) =>
                  Effect.promise(() => publicClient.getChainId()).pipe(
                    Effect.mapError((cause) => new GetChainIdForSigningError({ cause })),
                    Effect.flatMap((chainId) =>
                      signTyped({
                        account,
                        data: txData,
                        safeAddress,
                        safeVersion: version,
                        chainId
                      }).pipe(Effect.map((signature) => ({ txData, signature })))
                    )
                  )
                )
              ),
            onFalse: () =>
              Effect.promise(() => publicClient.getChainId()).pipe(
                Effect.mapError((cause) => new GetChainIdForSigningError({ cause })),
                Effect.flatMap((chainId) =>
                  signTyped({
                    account,
                    data: txData,
                    safeAddress,
                    safeVersion: SAFE_VERSION_FALLBACK,
                    chainId
                  }).pipe(Effect.map((signature) => ({ txData, signature })))
                )
              )
          })
        ),
        Effect.mapError((e): SigningError => e)
      )

    return { signTx, signMultisendTx }
  })
)
