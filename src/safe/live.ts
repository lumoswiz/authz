import { Effect, Layer } from "effect"
import {
  type Address,
  encodeFunctionData,
  encodePacked,
  getContractAddress,
  hashTypedData,
  type Hex,
  keccak256
} from "viem"
import { ViemClient } from "../client/service.js"
import { ZERO_ADDRESS } from "../shared/constants.js"
import { OperationType, type TransactionData } from "../shared/types.js"
import { isContractDeployedFx } from "../shared/utils.js"
import { SAFE_PROXY_ABI, SAFE_PROXY_FACTORY_ABI, SAFE_SINGLETON_ABI } from "./abi.js"
import { GAS_DEFAULTS, SAFE_PROXY_FACTORY, SAFE_SINGLETON } from "./constants.js"
import { generateSafeTypedData } from "./eip712.js"
import type { SafeError } from "./errors.js"
import {
  BuildSafeDeploymentTxError,
  GetNonceError,
  GetOwnersError,
  GetSafeDeploymentAddressError,
  GetSafeTxHashError,
  GetThresholdError,
  GetVersionError,
  IsModuleEnabledError,
  IsOwnerError
} from "./errors.js"
import { SafeService } from "./service.js"
import type {
  BuildEnableModuleTxArgs,
  BuildExecTransactionArgs,
  BuildSafeDeploymentTxArgs,
  BuildSafeTransactionDataArgs,
  CalculateSafeAddressArgs,
  GetSafeTransactionHashArgs,
  IsModuleEnabledArgs,
  SafeOwnerArgs,
  SafeTransactionData
} from "./types.js"

export const SafeServiceLive = Layer.effect(
  SafeService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    const buildEnableModuleTx = ({
      module,
      safe
    }: BuildEnableModuleTxArgs) =>
      Effect.sync((): TransactionData => ({
        to: safe,
        value: "0x0",
        data: encodeFunctionData({
          abi: SAFE_PROXY_ABI,
          functionName: "enableModule",
          args: [module]
        })
      }))

    const buildSafeDeploymentTx = ({
      owner,
      saltNonce
    }: BuildSafeDeploymentTxArgs): Effect.Effect<TransactionData, SafeError> =>
      Effect.try((): TransactionData => {
        const setupData = encodeFunctionData({
          abi: SAFE_SINGLETON_ABI,
          functionName: "setup",
          args: [
            [owner],
            1n,
            ZERO_ADDRESS,
            "0x",
            ZERO_ADDRESS,
            ZERO_ADDRESS,
            0n,
            ZERO_ADDRESS
          ]
        })
        const data = encodeFunctionData({
          abi: SAFE_PROXY_FACTORY_ABI,
          functionName: "createProxyWithNonce",
          args: [SAFE_SINGLETON, setupData, saltNonce]
        })
        return { to: SAFE_PROXY_FACTORY, value: "0x0", data }
      }).pipe(
        Effect.mapError((error) => new BuildSafeDeploymentTxError({ owner, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const buildExecTransaction = ({
      safe,
      signatures,
      tx
    }: BuildExecTransactionArgs) =>
      Effect.sync((): TransactionData => ({
        to: safe,
        value: "0x0",
        data: encodeFunctionData({
          abi: SAFE_PROXY_ABI,
          functionName: "execTransaction",
          args: [
            tx.to,
            BigInt(tx.value),
            tx.data,
            tx.operation,
            tx.safeTxGas,
            tx.baseGas,
            tx.gasPrice,
            tx.gasToken,
            tx.refundReceiver,
            signatures
          ]
        })
      }))

    const buildSafeTransactionData = ({
      data,
      operation = OperationType.Call,
      safe,
      to,
      useOnChainNonce = true
    }: BuildSafeTransactionDataArgs): Effect.Effect<SafeTransactionData, SafeError> =>
      getNonce(safe, useOnChainNonce).pipe(
        Effect.map((nonce): SafeTransactionData => ({
          to,
          value: "0x0",
          data,
          operation,
          ...GAS_DEFAULTS,
          gasToken: ZERO_ADDRESS,
          refundReceiver: ZERO_ADDRESS,
          nonce
        }))
      )

    const buildSignSafeTx = ({
      data,
      operation = OperationType.Call,
      safe,
      to,
      useOnChainNonce = true
    }: {
      data: Hex
      operation?: OperationType
      safe: Address
      to: Address
      useOnChainNonce?: boolean
    }): Effect.Effect<{ txData: SafeTransactionData; safeTxHash: Hex }, SafeError> =>
      buildSafeTransactionData({ safe, to, data, operation, useOnChainNonce }).pipe(
        Effect.flatMap((txData) =>
          getVersion(safe).pipe(
            Effect.flatMap((version) =>
              Effect.promise(() => publicClient.getChainId()).pipe(
                Effect.mapError((error) => new GetSafeTxHashError({ safe, cause: error })),
                Effect.flatMap((chainId) =>
                  getSafeTransactionHash({ safe, tx: txData, version, chainId }).pipe(
                    Effect.map((safeTxHash) => ({ txData, safeTxHash }))
                  )
                )
              )
            )
          )
        ),
        Effect.mapError((e): SafeError => e)
      )

    const calculateSafeAddress = ({
      owners,
      saltNonce
    }: CalculateSafeAddressArgs): Effect.Effect<Address, SafeError> =>
      Effect.promise(async (): Promise<Address> => {
        const proxyCreationCode = await publicClient.readContract({
          address: SAFE_PROXY_FACTORY,
          abi: SAFE_PROXY_FACTORY_ABI,
          functionName: "proxyCreationCode"
        }) as Hex
        const setupData = encodeFunctionData({
          abi: SAFE_SINGLETON_ABI,
          functionName: "setup",
          args: [
            owners,
            1n,
            ZERO_ADDRESS,
            "0x",
            ZERO_ADDRESS,
            ZERO_ADDRESS,
            0n,
            ZERO_ADDRESS
          ]
        })
        const salt = keccak256(encodePacked(["bytes32", "uint256"], [keccak256(setupData), saltNonce]))
        const initCode = encodePacked(["bytes", "uint256"], [proxyCreationCode, BigInt(SAFE_SINGLETON)])
        return getContractAddress({
          from: SAFE_PROXY_FACTORY,
          opcode: "CREATE2",
          bytecode: initCode,
          salt
        })
      }).pipe(
        Effect.mapError((error) => new GetSafeDeploymentAddressError({ cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const getNonce = (safe: Address, useOnChainNonce: boolean): Effect.Effect<bigint, SafeError> =>
      Effect.if(Effect.succeed(useOnChainNonce), {
        onTrue: () =>
          Effect.promise(() =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "nonce"
            }) as Promise<bigint>
          ).pipe(
            Effect.mapError((error) => new GetNonceError({ safe, cause: error })),
            Effect.mapError((e): SafeError => e)
          ),
        onFalse: () => Effect.succeed(0n)
      })

    const getOwners = (safe: Address): Effect.Effect<Array<Address>, SafeError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: safe,
          abi: SAFE_PROXY_ABI,
          functionName: "getOwners"
        }) as Promise<Array<Address>>
      ).pipe(
        Effect.mapError((error) => new GetOwnersError({ safe, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const getThreshold = (safe: Address): Effect.Effect<bigint, SafeError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: safe,
          abi: SAFE_PROXY_ABI,
          functionName: "getThreshold"
        }) as Promise<bigint>
      ).pipe(
        Effect.mapError((error) => new GetThresholdError({ safe, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const getVersion = (safe: Address): Effect.Effect<string, SafeError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: safe,
          abi: SAFE_PROXY_ABI,
          functionName: "VERSION"
        }) as Promise<string>
      ).pipe(
        Effect.mapError((error) => new GetVersionError({ safe, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const getSafeTransactionHash = ({
      chainId,
      safe,
      tx,
      version
    }: GetSafeTransactionHashArgs): Effect.Effect<Hex, SafeError> =>
      Effect.if(isContractDeployedFx({ client: publicClient, address: safe }), {
        onTrue: () =>
          Effect.promise(() =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "getTransactionHash",
              args: [
                tx.to,
                BigInt(tx.value),
                tx.data,
                tx.operation,
                tx.safeTxGas,
                tx.baseGas,
                tx.gasPrice,
                tx.gasToken,
                tx.refundReceiver,
                tx.nonce
              ]
            }) as Promise<Hex>
          ).pipe(
            Effect.mapError((error) => new GetSafeTxHashError({ safe, cause: error })),
            Effect.mapError((e): SafeError => e)
          ),
        onFalse: () => {
          const typedData = generateSafeTypedData({
            safeAddress: safe,
            safeVersion: version,
            chainId,
            data: tx
          })
          return Effect.sync((): Hex => hashTypedData(typedData))
        }
      })

    const isModuleEnabled = ({
      module,
      safe
    }: IsModuleEnabledArgs): Effect.Effect<boolean, SafeError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: safe,
          abi: SAFE_PROXY_ABI,
          functionName: "isModuleEnabled",
          args: [module]
        }) as Promise<boolean>
      ).pipe(
        Effect.mapError((error) => new IsModuleEnabledError({ safe, module, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    const isOwner = ({
      owner,
      safe
    }: SafeOwnerArgs): Effect.Effect<boolean, SafeError> =>
      Effect.promise(() =>
        publicClient.readContract({
          address: safe,
          abi: SAFE_PROXY_ABI,
          functionName: "isOwner",
          args: [owner]
        }) as Promise<boolean>
      ).pipe(
        Effect.mapError((error) => new IsOwnerError({ safe, owner, cause: error })),
        Effect.mapError((e): SafeError => e)
      )

    return {
      buildEnableModuleTx,
      buildExecTransaction,
      buildSafeDeploymentTx,
      buildSafeTransactionData,
      buildSignSafeTx,
      calculateSafeAddress,
      getNonce,
      getOwners,
      getThreshold,
      getSafeTransactionHash,
      getVersion,
      isModuleEnabled,
      isOwner
    }
  })
)
