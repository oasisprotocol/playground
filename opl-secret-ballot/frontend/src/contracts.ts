import { ethers } from 'ethers';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';

import type { BallotBoxV1, DAOV1 } from '@oasisprotocol/secret-ballot-backend';
import { BallotBoxV1__factory, DAOV1__factory } from '@oasisprotocol/secret-ballot-backend';

import { Network, useEthereumStore } from './stores/ethereum';

export type { BallotBoxV1, DAOV1 } from '@oasisprotocol/secret-ballot-backend';

const hostProvider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_HOST_WEB3_GATEWAY,
  'any',
);
const enclaveProvider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_ENCLAVE_WEB3_GATEWAY,
  'any',
);

export const staticBallotBox = BallotBoxV1__factory.connect(
  import.meta.env.VITE_BALLOT_BOX_V1_ADDR!,
  enclaveProvider,
);
export const staticDAOV1 = DAOV1__factory.connect(import.meta.env.VITE_DAO_V1_ADDR!, hostProvider);

export function useBallotBoxV1(): ComputedRef<{
  read: BallotBoxV1;
  write?: BallotBoxV1;
}> {
  const eth = useEthereumStore();
  const addr = import.meta.env.VITE_BALLOT_BOX_V1_ADDR!;
  return computed(() => {
    const read = BallotBoxV1__factory.connect(addr, enclaveProvider);
    const write =
      eth.network === Network.Enclave && eth.signer
        ? BallotBoxV1__factory.connect(addr, eth.signer)
        : undefined;
    return { read, write };
  });
}

export function useDAOV1(): ComputedRef<DAOV1> {
  const eth = useEthereumStore();
  const addr = import.meta.env.VITE_DAO_V1_ADDR!;
  return computed(() => {
    return DAOV1__factory.connect(addr, eth.signer ?? eth.provider);
  });
}
