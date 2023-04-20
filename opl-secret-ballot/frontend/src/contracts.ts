import { ethers } from 'ethers';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';

import type { BallotBoxV1, DAOv1 } from '@oasislabs/secret-ballot-backend';
import { BallotBoxV1__factory, DAOv1__factory } from '@oasislabs/secret-ballot-backend';

import { Network, useEthereumStore } from './stores/ethereum';

export type { BallotBoxV1, DAOv1 } from '@oasislabs/secret-ballot-backend';

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
export const staticDAOv1 = DAOv1__factory.connect(import.meta.env.VITE_DAO_V1_ADDR!, hostProvider);

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

export function useDAOv1(): ComputedRef<DAOv1> {
  const eth = useEthereumStore();
  const addr = import.meta.env.VITE_DAO_V1_ADDR!;
  return computed(() => {
    return DAOv1__factory.connect(addr, eth.signer ?? eth.provider);
  });
}
