import { Effect, Layer } from "effect"
import { isContractDeployedFx } from "src/shared/utils.js"
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
import { SAFE_PROXY_ABI, SAFE_PROXY_FACTORY_ABI, SAFE_SINGLETON_ABI } from "./abi.js"
import { GAS_DEFAULTS, SAFE_PROXY_FACTORY, SAFE_SINGLETON, ZERO_ADDRESS } from "./constants.js"
import { generateSafeTypedData } from "./eip712.js"
import type { SafeError } from "./errors.js"
import {
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
import type { MetaTransactionData, SafeTransactionData } from "./types.js"
import { OperationType } from "./types.js"

export const SafeServiceLive = Layer.effect(
  SafeService,
  Effect.gen(function*() {
    const { publicClient } = yield* ViemClient

    const buildEnableModuleTx = ({
      module,
      safe
    }: {
      safe: Address
      module: Address
    }) =>
      Effect.sync((): MetaTransactionData => ({
        to: safe,
        value: "0x0" as Hex,
        data: encodeFunctionData({
          abi: SAFE_PROXY_ABI,
          functionName: "enableModule",
          args: [module]
        })
      }))

    const buildExecTransaction = ({
      safe,
      signatures,
      tx
    }: {
      safe: Address
      tx: SafeTransactionData
      signatures: Hex
    }) =>
      Effect.sync((): MetaTransactionData => ({
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
    }: {
      safe: Address
      to: Address
      data: Hex
      operation?: OperationType
      useOnChainNonce?: boolean
    }): Effect.Effect<SafeTransactionData, GetNonceError> =>
      Effect.gen(function*() {
        const nonce = yield* getNonce(safe, useOnChainNonce)

        return {
          to,
          value: "0x0",
          data,
          operation,
          ...GAS_DEFAULTS,
          gasToken: ZERO_ADDRESS,
          refundReceiver: ZERO_ADDRESS,
          nonce
        }
      })

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
    }): Effect.Effect<{
      txData: SafeTransactionData
      safeTxHash: Hex
    }, GetNonceError | GetVersionError | GetSafeTxHashError> =>
      Effect.gen(function*() {
        const txData = yield* buildSafeTransactionData({
          safe,
          to,
          data,
          operation,
          useOnChainNonce
        })

        const version = yield* getVersion(safe)

        const chainId = yield* Effect.tryPromise({
          try: () => publicClient.getChainId(),
          catch: (error): GetSafeTxHashError => new GetSafeTxHashError({ safe, cause: error })
        })

        const safeTxHash = yield* getSafeTransactionHash({
          safe,
          tx: txData,
          version,
          chainId
        })

        return { txData, safeTxHash }
      })

    const calculateSafeAddress = ({
      owners,
      saltNonce
    }: {
      owners: Array<Address>
      saltNonce: bigint
    }): Effect.Effect<Address, SafeError> =>
      Effect.tryPromise({
        try: async () => {
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

          const salt = keccak256(
            encodePacked(["bytes32", "uint256"], [keccak256(setupData), saltNonce])
          )

          const initCode = encodePacked(["bytes", "uint256"], [proxyCreationCode, BigInt(SAFE_SINGLETON)])

          return getContractAddress({
            from: SAFE_PROXY_FACTORY,
            opcode: "CREATE2",
            bytecode: initCode,
            salt
          })
        },
        catch: (error) => new GetSafeDeploymentAddressError({ cause: error })
      })

    const getNonce = (safe: Address, useOnChainNonce: boolean): Effect.Effect<bigint, GetNonceError> =>
      useOnChainNonce ?
        Effect.tryPromise({
          try: () =>
            publicClient.readContract({
              address: safe,
              abi: SAFE_PROXY_ABI,
              functionName: "nonce"
            }) as Promise<bigint>,
          catch: (error) => new GetNonceError({ safe, cause: error })
        }) :
        Effect.succeed(0n)

    const getOwners = (safe: Address): Effect.Effect<Array<Address>, GetOwnersError> =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: safe,
            abi: SAFE_PROXY_ABI,
            functionName: "getOwners"
          }) as Promise<Array<Address>>,
        catch: (error) => new GetOwnersError({ safe, cause: error })
      })

    const getThreshold = (safe: Address): Effect.Effect<bigint, GetThresholdError> =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: safe,
            abi: SAFE_PROXY_ABI,
            functionName: "getThreshold"
          }) as Promise<bigint>,
        catch: (error) => new GetThresholdError({ safe, cause: error })
      })

    const getVersion = (safe: Address) =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: safe,
            abi: SAFE_PROXY_ABI,
            functionName: "VERSION"
          }) as Promise<string>,
        catch: (error) => new GetVersionError({ safe, cause: error })
      })

    const getSafeTransactionHash = ({
      chainId,
      safe,
      tx,
      version
    }: {
      safe: Address
      tx: SafeTransactionData
      version: string
      chainId: number
    }): Effect.Effect<Hex, GetSafeTxHashError> =>
      Effect.gen(function*() {
        const deployed = yield* isContractDeployedFx({ client: publicClient, address: safe })

        if (deployed) {
          return yield* Effect.tryPromise({
            try: () =>
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
              }) as Promise<Hex>,
            catch: (error) => new GetSafeTxHashError({ safe, cause: error })
          })
        } else {
          const typedData = generateSafeTypedData({
            safeAddress: safe,
            safeVersion: version,
            chainId,
            data: tx
          })

          return hashTypedData(typedData)
        }
      })

    const isModuleEnabled = ({
      module,
      safe
    }: {
      safe: Address
      module: Address
    }): Effect.Effect<boolean, IsModuleEnabledError> =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: safe,
            abi: SAFE_PROXY_ABI,
            functionName: "isModuleEnabled",
            args: [module]
          }) as Promise<boolean>,
        catch: (error) => new IsModuleEnabledError({ safe, module, cause: error })
      })

    const isOwner = ({
      owner,
      safe
    }: {
      owner: Address
      safe: Address
    }): Effect.Effect<boolean, IsOwnerError> =>
      Effect.tryPromise({
        try: () =>
          publicClient.readContract({
            address: safe,
            abi: SAFE_PROXY_ABI,
            functionName: "isOwner",
            args: [owner]
          }) as Promise<boolean>,
        catch: (error) => new IsOwnerError({ safe, owner, cause: error })
      })

    return {
      buildEnableModuleTx,
      buildExecTransaction,
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
