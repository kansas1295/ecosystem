[**@eth-optimism/viem**](../README.md) • **Docs**

***

[@eth-optimism/viem](../README.md) / SendL2ToL2MessageParameters

# SendL2ToL2MessageParameters\<TChain, TAccount, TChainOverride, TDerivedChain\>

> **SendL2ToL2MessageParameters**\<`TChain`, `TAccount`, `TChainOverride`, `TDerivedChain`\>: `BaseWriteContractActionParameters`\<`TChain`, `TAccount`, `TChainOverride`, `TDerivedChain`\> & `object`

## Type declaration

### destinationChainId

> **destinationChainId**: `number`

Chain ID of the destination chain.

### message

> **message**: `Hex`

Message payload to call target with.

### target

> **target**: `Address`

Target contract or wallet address.

## Type Parameters

• **TChain** *extends* `Chain` \| `undefined` = `Chain` \| `undefined`

• **TAccount** *extends* `Account` \| `undefined` = `Account` \| `undefined`

• **TChainOverride** *extends* `Chain` \| `undefined` = `Chain` \| `undefined`

• **TDerivedChain** *extends* `Chain` \| `undefined` = `DeriveChain`\<`TChain`, `TChainOverride`\>

## Defined in

[packages/viem/src/actions/sendL2ToL2Message.ts:28](https://github.com/ethereum-optimism/ecosystem/blob/c1e85d9590ff961efd71aa28bb561bf44dbc4c2d/packages/viem/src/actions/sendL2ToL2Message.ts#L28)