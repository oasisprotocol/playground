# End-to-End encrypted proxy contract example

This repo provides an example of how a contract can relay encrypted transactions on Oasis Sapphire, so the relayer cannot see which contract is being invoked or what the parameters are.

Using the [@oasis-protocol/sapphire-contracts](https://www.npmjs.com/package/@oasisprotocol/sapphire-contracts) library The E2EProxy contract generates a long-term X25519 keypair which allows users to submit a Deoxys-II encrypted payload (with forward secrecy) containing the contract address to invoke and the calldata to pass.

While [@oasis-protocol/sapphire-hardhat](https://www.npmjs.com/package/@oasisprotocol/sapphire-hardhat) package makes testing easy with Hardhat, you also need to run a local [sapphire-dev](https://github.com/oasisprotocol/oasis-web3-gateway/pkgs/container/sapphire-dev) instance which supports the necessary EVM precompiles.

For your convenience there is a `Makefile` which uses Docker to keep everything neatly contained:

```
make sapphire-dev &  # This will take a few minutes
make pnpm-install
make hardhat-compile
make hardhat-test
```