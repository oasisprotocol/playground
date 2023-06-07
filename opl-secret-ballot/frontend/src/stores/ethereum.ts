import detectEthereumProvider from '@metamask/detect-provider';
import * as sapphire from '@oasisprotocol/sapphire-paratime';
import { BigNumber, ethers } from 'ethers';
import { defineStore } from 'pinia';
import { markRaw, ref, shallowRef } from 'vue';

export enum Network {
  Unknown = 0,
  Ethereum = 1,
  Goerli = 10,
  BscMainnet = 56,
  BscTestnet = 97,
  EmeraldTestnet = 0xa515,
  EmeraldMainnet = 0xa516,
  SapphireTestnet = 0x5aff,
  SapphireMainnet = 0x5afe,
  Local = 1337,

  Enclave = BigNumber.from(import.meta.env.VITE_ENCLAVE_NETWORK).toNumber(),
  Host = BigNumber.from(import.meta.env.VITE_HOST_NETWORK).toNumber(),
}

export enum ConnectionStatus {
  Unknown,
  Disconnected,
  Connected,
}

function networkFromChainId(chainId: number | string): Network {
  const id = typeof chainId === 'string' ? parseInt(chainId, 16) : chainId;
  if (Network[id]) return id as Network;
  return Network.Unknown;
}

export function networkName(network?: Network): string {
  if (network === Network.Local) return 'Local Network';
  if (network === Network.EmeraldTestnet) return 'Emerald Testnet';
  if (network === Network.EmeraldMainnet) return 'Emerald Mainnet';
  if (network === Network.SapphireTestnet) return 'Sapphire Testnet';
  if (network === Network.SapphireMainnet) return 'Sapphire Mainnet';
  if (network === Network.BscMainnet) return 'BSC';
  if (network === Network.BscTestnet) return 'BSC Testnet';
  return 'Unknown Network';
}

export const useEthereumStore = defineStore('ethereum', () => {
  const signer = shallowRef<ethers.Signer | undefined>(undefined);
  const provider = shallowRef<ethers.providers.Provider>(
    new ethers.providers.JsonRpcProvider(import.meta.env.VITE_HOST_WEB3_GATEWAY, 'any'),
  );
  const network = ref(Network.Host);
  const address = ref<string | undefined>(undefined);
  const status = ref(ConnectionStatus.Unknown);

  async function connect() {
    if (signer.value) return;
    const eth = await detectEthereumProvider();
    if (eth === null) throw new Error('no provider detected'); // TODO: catch error
    const s = new ethers.providers.Web3Provider(eth).getSigner();
    await s.provider.send('eth_requestAccounts', []);

    const setSigner = (addr: string | undefined, net: Network) => {
      if (!net) return;
      const isSapphire = sapphire.NETWORKS[net as number];
      signer.value = isSapphire ? sapphire.wrap(s) : s;
      provider.value = isSapphire ? markRaw(sapphire.wrap(s.provider)) : s.provider;
      network.value = net;
      address.value = addr;
    };

    const [addr, net] = await Promise.all([
      s.getAddress(),
      s.getChainId().then(networkFromChainId),
    ]);
    setSigner(addr, net);

    if (!eth.isMetaMask) {
      status.value = ConnectionStatus.Connected;
      return;
    }
    eth.on('accountsChanged', (accounts) => {
      setSigner(accounts[0], network.value);
    });
    eth.on('chainChanged', (chainId) => {
      setSigner(address.value, networkFromChainId(chainId));
    });
    eth.on('connect', () => (status.value = ConnectionStatus.Connected));
    eth.on('disconnect', () => (status.value = ConnectionStatus.Disconnected));
  }

  async function switchNetwork(network: Network) {
    const eth = (window as any).ethereum;
    if (!eth || !provider.value) return;
    const { chainId: currentNetwork } = await provider.value.getNetwork();
    if (network == currentNetwork) return;
    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexlify(network).replace('0x0', '0x') }],
      });
    } catch (e: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if ((e as any).code !== 4902) throw e;
      if (network == Network.SapphireTestnet) {
        try {
          await eth.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5aff',
                chainName: 'Sapphire Testnet',
                rpcUrls: ['https://testnet.sapphire.oasis.dev'],
              },
            ],
          });
        } catch (e: any) {
          throw new Error(e);
        }
      } else if (network === Network.SapphireMainnet) {
        try {
          await eth.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x5afe',
                chainName: 'Sapphire Mainnet',
                rpcUrls: ['https://sapphire.oasis.io'],
              },
            ],
          });
        } catch (e: any) {
          throw new Error(e);
        }
      }
      throw e;
    }
  }

  return { signer, provider, address, network, connect, switchNetwork };
});
