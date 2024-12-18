/** @module sendSupERC20 */
import type {
  Account,
  Address,
  Chain,
  Client,
  ContractFunctionReturnType,
  DeriveChain,
  EstimateContractGasErrorType,
  EstimateContractGasParameters,
  Hash,
  SimulateContractParameters,
  Transport,
  WriteContractErrorType,
} from 'viem'
import { estimateContractGas, simulateContract } from 'viem/actions'

import { superchainTokenBridgeABI } from '@/abis.js'
import { contracts } from '@/contracts.js'
import type { BaseWriteContractActionParameters } from '@/core/baseWriteAction.js'
import { baseWriteAction } from '@/core/baseWriteAction.js'
import type { ErrorType } from '@/types/utils.js'

/**
 * @category Types
 */
export type SendSupERC20Parameters<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined,
  TDerivedChain extends Chain | undefined = DeriveChain<TChain, TChainOverride>,
> = BaseWriteContractActionParameters<
  TChain,
  TAccount,
  TChainOverride,
  TDerivedChain
> & {
  /** Token to send. */
  tokenAddress: Address
  /** Address to send tokens to. */
  to: Address
  /** Amount of tokens to send. */
  amount: bigint
  /** Chain ID of the destination chain. */
  chainId: number
}

/**
 * @category Types
 */
export type SendSupERC20ReturnType = Hash

/**
 * @category Types
 */
export type SendSupERC20ContractReturnType = ContractFunctionReturnType<
  typeof superchainTokenBridgeABI,
  'nonpayable',
  'sendERC20'
>

/**
 * @category Types
 */
export type SendSupERC20ErrorType =
  | EstimateContractGasErrorType
  | WriteContractErrorType
  | ErrorType

/**
 * Sends tokens to a target address on another chain. Used in the interop flow.
 * @category L2 Wallet Actions
 * @param client - L2 Wallet Client
 * @param parameters - {@link SendSupERC20Parameters}
 * @returns The sendSupERC20 transaction hash. {@link SendSupERC20ReturnType}
 */
export async function sendSupERC20<
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: SendSupERC20Parameters<chain, account, chainOverride>,
): Promise<SendSupERC20ReturnType> {
  const { tokenAddress, to, amount, chainId, ...txParameters } = parameters

  return baseWriteAction(
    client,
    {
      abi: superchainTokenBridgeABI,
      contractAddress: contracts.superchainTokenBridge.address,
      contractFunctionName: 'sendERC20',
      contractArgs: [tokenAddress, to, amount, BigInt(chainId)],
    },
    txParameters as BaseWriteContractActionParameters,
  )
}

/**
 * Estimates gas for {@link sendSupERC20}
 * @category L2 Wallet Actions
 * @param client - L2 Wallet Client
 * @param parameters - {@link SendSupERC20Parameters}
 * @returns The estimated gas value.
 */
export async function estimateSendSupERC20Gas<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: SendSupERC20Parameters<TChain, TAccount, TChainOverride>,
): Promise<bigint> {
  const { tokenAddress, to, amount, chainId, ...txParameters } = parameters

  return estimateContractGas(client, {
    abi: superchainTokenBridgeABI,
    address: contracts.superchainTokenBridge.address,
    functionName: 'sendERC20',
    args: [tokenAddress, to, amount, BigInt(chainId)],
    ...txParameters,
  } as EstimateContractGasParameters)
}

/**
 * Simulate contract call for {@link sendSupERC20}
 * @category L2 Public Actions
 * @param client - L2 Public Client
 * @param parameters - {@link SendSupERC20Parameters}
 * @returns The contract functions return value. {@link SendSupERC20ContractReturnType}
 */
export async function simulateSendSupERC20<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TChainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  parameters: SendSupERC20Parameters<TChain, TAccount, TChainOverride>,
): Promise<SendSupERC20ContractReturnType> {
  const { account, tokenAddress, to, amount, chainId } = parameters

  const res = await simulateContract(client, {
    account,
    abi: superchainTokenBridgeABI,
    address: contracts.superchainTokenBridge.address,
    chain: client.chain,
    functionName: 'sendERC20',
    args: [tokenAddress, to, amount, BigInt(chainId)],
  } as SimulateContractParameters)

  return res.result as SendSupERC20ContractReturnType
}
