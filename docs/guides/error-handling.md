# Error Handling

This guide shows you how to handle errors originating from the SDK. SDK by default exports the following error classes from file [errors.ts](https://github.com/aeternity/aepp-sdk-js/blob/develop/src/utils/errors.ts)

## Error Hierarchy

```
BaseError
│   ArgumentError
│   IllegalArgumentError
│   ArgumentCountMismatchError
│   InsufficientBalanceError
│   MissingParamError
│   NoSerializerFoundError
│   RequestTimedOutError
│   TxTimedOutError
│   TypeError
│   UnsupportedPlatformError
│   UnsupportedProtocolError
│   NotImplementedError
│   UnsupportedVersionError
└───InternalError
│   │   UnexpectedTsError
│
└───AccountError
│   │   InvalidKeypairError
│   │   UnavailableAccountError
│
└───AensError
│   │   AensPointerContextError
│   │   InsufficientNameFeeError
│   │   InvalidAensNameError
│
└───AeppError
│   │   InvalidRpcMessageError
│   │   MissingCallbackError
│   │   UnAuthorizedAccountError
│   │   UnknownRpcClientError
│   │   UnsubscribedAccountError
│
└───ChannelError
│   │   ChannelCallError
│   │   ChannelConnectionError
│   │   ChannelPingTimedOutError
│   │   UnexpectedChannelMessageError
│   │   UnknownChannelStateError
│
└───CompilerError
│   │   InvalidAuthDataError
│
└───ContractError
│   │   BytecodeMismatchError
│   │   DuplicateContractError
│   │   InactiveContractError
│   │   InvalidMethodInvocationError
│   │   MissingContractAddressError
│   │   MissingContractDefError
│   │   MissingFunctionNameError
│   │   NodeInvocationError
│   │   NoSuchContractFunctionError
│   │   NotPayableFunctionError
│   │   MissingEventDefinitionError
│   │   AmbiguousEventDefinitionError
│
└───CryptographyError
│   │   InvalidChecksumError
│   │   DerivationError
│   │   InvalidPasswordError
│   │   MerkleTreeHashMismatchError
│   │   MissingNodeInTreeError
│   │   UnknownNodeLengthError
│   │   UnknownPathNibbleError
│
└───NodeError
│   │   DuplicateNodeError
│   │   NodeNotFoundError
│
└───TransactionError
│   │   DecodeError
│   │   EncodeError
│   │   PayloadLengthError
│   │   DryRunError
│   │   IllegalBidFeeError
│   │   InvalidSignatureError
│   │   InvalidTxError
│   │   InvalidTxParamsError
│   │   PrefixNotFoundError
│   │   SchemaNotFoundError
│   │   TagNotFoundError
│   │   TxNotInChainError
│   │   UnknownTxError
│   │   UnsupportedABIversionError
│   │   UnsupportedVMversionError
│
└̌───WalletError
│   │   AlreadyConnectedError
│   │   NoWalletConnectedError
│   │   RpcConnectionError
│
└̌───RpcError
│   │   RpcInvalidTransactionError
│   │   RpcBroadcastError
│   │   RpcRejectedByUserError
│   │   RpcUnsupportedProtocolError
│   │   RpcConnectionDenyError
│   │   RpcNotAuthorizeError
│   │   RpcPermissionDenyError
│   │   RpcInternalError
```

## Usage

```js
// import required error classes
const {
  AeSdk,
  Node,
  MemoryAccount,
  generateKeyPair,
  InvalidTxParamsError,
  InvalidAensNameError
} = require('@aeternity/aepp-sdk')

// setup
const NODE_URL = 'https://testnet.aeternity.io'
const PAYER_ACCOUNT_KEYPAIR = generateKeyPair()
const NEW_USER_KEYPAIR = generateKeyPair()

const payerAccount = new MemoryAccount({ keypair: PAYER_ACCOUNT_KEYPAIR })
const newUserAccount = new MemoryAccount({ keypair: NEW_USER_KEYPAIR })
const node = new Node(NODE_URL)
const aeSdk = new AeSdk({
  nodes: [{ name: 'testnet', instance: node }],
})
await aeSdk.addAccount(payerAccount, { select: true })
await aeSdk.addAccount(newUserAccount)

// catch exceptions
try {
  const spendTxResult = await aeSdk.spend(-1, await newUserAccount.address(), { onAccount: payerAccount})
} catch(err) {
  if(err instanceof InvalidTxParamsError){
    console.log(`Amount specified is not valid, ${err.message}`)
  } else if(err instanceof InvalidAensNameError) {
    console.log(`Address specified is not valid, ${err.message}`)
  }
}

// using generic error classes
const {AensError, TransactionError, BaseError } = require('@aeternity/aepp-sdk')

try {
  const spendTxResult = await aeSdk.spend(1, "ak_2tv", { onAccount: payerAccount})
} catch(err) {
  if(err instanceof AensError) {
    // address or AENS related errors
  } else if(err instanceof TransactionError) {
    // transaction errors
  } else if(err instanceof BaseError) {
    // match any errors from the SDK
  }
}
```
