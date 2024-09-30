[**@eth-optimism/viem**](../README.md) • **Docs**

***

[@eth-optimism/viem](../README.md) / sendL2ToL2Message

# sendL2ToL2Message()

> **sendL2ToL2Message**\<`chain`, `account`, `chainOverride`\>(`client`, `parameters`): `Promise`\<[`SendL2ToL2MessageReturnType`](../type-aliases/SendL2ToL2MessageReturnType.md)\>

Initiates the intent of sending a L2 to L2 message. Used in the interop flow.

## Type Parameters

• **chain** *extends* `undefined` \| `Chain`

• **account** *extends* `undefined` \| `Account`

• **chainOverride** *extends* `undefined` \| `Chain` = `undefined`

## Parameters

• **client**: `Client`\<`Transport`, `chain`, `account`\>

L2 Wallet Client

• **parameters**: [`SendL2ToL2MessageParameters`](../type-aliases/SendL2ToL2MessageParameters.md)\<`chain`, `account`, `chainOverride`, `DeriveChain`\<`chain`, `chainOverride`\>\>

[SendL2ToL2MessageParameters](../type-aliases/SendL2ToL2MessageParameters.md)

## Returns

`Promise`\<[`SendL2ToL2MessageReturnType`](../type-aliases/SendL2ToL2MessageReturnType.md)\>

The sendL2ToL2Message transaction hash. [SendL2ToL2MessageReturnType](../type-aliases/SendL2ToL2MessageReturnType.md)

## Defined in

[packages/viem/src/actions/sendL2ToL2Message.ts:78](https://github.com/ethereum-optimism/ecosystem/blob/c1e85d9590ff961efd71aa28bb561bf44dbc4c2d/packages/viem/src/actions/sendL2ToL2Message.ts#L78)