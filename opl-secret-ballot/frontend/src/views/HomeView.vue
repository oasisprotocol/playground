<script setup lang="ts">
import { reactive } from 'vue';
import { ContentLoader } from 'vue-content-loader';

import type { Poll } from '../../../functions/api/types';
import type { DAOv1 } from '../contracts';
import { useDAOv1 } from '../contracts';
import { Network, useEthereumStore } from '../stores/ethereum';

const eth = useEthereumStore();
const dao = useDAOv1();

type FullProposal = DAOv1.ProposalWithIdStructOutput & { params: Poll };
const activePolls = reactive<Record<string, FullProposal>>({});
const pastPolls = reactive<Record<string, FullProposal>>({});

async function fetchProposals(
  fetcher: (offset: number, batchSize: number) => Promise<DAOv1.ProposalWithIdStructOutput[]>,
  destination: Record<string, FullProposal>,
): Promise<void> {
  await eth.switchNetwork(Network.Host);
  const batchSize = 100;
  for (let offset = 0; ; offset += batchSize) {
    let proposals: DAOv1.ProposalWithIdStructOutput[] = [];
    try {
      proposals = await fetcher(offset, batchSize);
    } catch (e: any) {
      console.error('failed to fetch proposals', e);
      break;
    }
    proposals.forEach(async ({ id, proposal }) => {
      const ipfsHash = proposal.params.ipfsHash;
      id = id.slice(2);
      try {
        const ipfsParamsRes = await fetch(`https://w3s.link/ipfs/${ipfsHash}`);
        const params: Poll = await ipfsParamsRes.json();
        destination[id] = { id, params, proposal } as any;
      } catch (e) {
        console.error('failed to fetch proposal params from IPFS', e);
      }
    });
    if (proposals.length < batchSize) return;
  }
}
(async () => {
  const { number: blockTag } = await eth.provider.getBlock('latest');
  fetchProposals(
    (offset, batchSize) =>
      dao.value.callStatic.getActiveProposals(offset, batchSize, {
        blockTag,
      }),
    activePolls,
  );
  fetchProposals((offset, batchSize) => {
    return dao.value.callStatic.getPastProposals(offset, batchSize, {
      blockTag,
    });
  }, pastPolls);
})();
</script>

<template>
  <main style="max-width: 60ch" class="py-5 m-auto w-4/5">
    <RouterLink
      to="polls"
      class="inline-block border border-blue-800 py-2 px-3 rounded-lg my-3 font-medium text-blue-600"
    >
      New Poll
    </RouterLink>
    <section>
      <h2>Active Polls</h2>
      <ol v-if="Object.keys(activePolls).length > 0" class="table-auto">
        <li
          class="border-black border-2 rounded-sm my-5 flex"
          v-for="[pollId, poll] in Object.entries(activePolls)"
          :key="pollId"
          :id="pollId"
        >
          <RouterLink :to="{ name: 'poll', params: { id: pollId } }">
            <p class="flex-1 py-4 px-8">
              <span class="font-bold">Name:</span> {{ poll.params.name }}<br />
              <span class="font-bold">Description:</span> {{ poll.params.description }}<br />
              <span class="font-bold">Creator:</span> {{ poll.params.creator?.replace('0x', '') }}
            </p>
          </RouterLink>
        </li>
      </ol>
      <ContentLoader v-else class="inline" width="1" height="1">
        <rect x="0" y="0" rx="3" ry="3" width="5" height="5" />
      </ContentLoader>
      <h2>Past Polls</h2>
      <ol v-if="Object.keys(pastPolls).length > 0" class="table-auto">
        <li
          class="border-black border-2 rounded-sm my-5 flex"
          v-for="[pollId, poll] in Object.entries(pastPolls)"
          :id="pollId"
          :key="pollId"
        >
          <RouterLink :to="{ name: 'poll', params: { id: pollId } }">
            <p class="flex-1 py-4 px-8">
              <span class="font-bold">Name:</span> {{ poll.params.name }}<br />
              <span class="font-bold">Description:</span> {{ poll.params.description }}<br />
              <span class="font-bold">Creator:</span> {{ poll.params.creator?.replace('0x', '') }}
              <span class="font-bold">Outcome:</span>
              {{ poll.params.choices[poll.proposal.topChoice] }}
            </p>
          </RouterLink>
        </li>
      </ol>
      <ContentLoader v-else class="inline" width="1" height="1">
        <rect x="0" y="0" rx="3" ry="3" width="5" height="5" />
      </ContentLoader>
    </section>
  </main>
</template>

<style scoped lang="postcss">
form {
  @apply text-center;
}

input {
  @apply block my-4 p-1 mx-auto text-3xl text-center border border-gray-400 rounded-md;
}

h2 {
  @apply font-bold text-2xl my-2;
}
</style>
