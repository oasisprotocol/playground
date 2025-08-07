import { HardhatUserConfig } from "hardhat/config";
import '@oasisprotocol/sapphire-hardhat';
import "@nomicfoundation/hardhat-toolbox";

const env_private_key = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const TEST_HDWALLET = {
  mnemonic: "test test test test test test test test test test test junk",
  path: "m/44'/60'/0'/0",
  initialIndex: 0,
  count: 20,
  passphrase: "",
};

const config: HardhatUserConfig = {
  mocha: {
    timeout: 400000
  },
  paths: {
    tests: "./tests"
  },
  solidity: {
    version: "0.8.18",
    settings: {
      viaIR: false,
      /*
      debug: {
        revertStrings: "debug"
      },
      */
      optimizer: {
          enabled: true,
          runs: 200,
      }
    },
  },
  typechain: {
    target: "ethers-v5" // TODO: upgrade to ethers-v6 when hardhat-toolbox supports it
  },
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    sapphire_local: {
      url: "http://localhost:8545",
      accounts: TEST_HDWALLET,
      chainId: 0x5afd,
    },
    // https://docs.oasis.io/dapp/sapphire/
    sapphire_mainnet: {
      url: "https://sapphire.oasis.io/",
      accounts: env_private_key,
      chainId: 0x5afe,
    },
    sapphire_testnet: {
      url: "https://testnet.sapphire.oasis.dev",
      accounts: TEST_HDWALLET,
      chainId: 0x5aff,
    }
  }
};

export default config;
