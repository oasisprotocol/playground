<script setup lang="ts">
import { BigNumber, ethers } from 'ethers';
import { computed, ref } from 'vue';
import { ContentLoader } from 'vue-content-loader';

import type { Poll } from '../../../functions/api/types';
import type { DAOv1 } from '../contracts';
import { staticDAOv1, useDAOv1, useBallotBoxV1 } from '../contracts';
import { Network, useEthereumStore } from '../stores/ethereum';

const props = defineProps<{ id: string }>();
const proposalId = `0x${props.id}`;

const daoV1 = useDAOv1();
const ballotBoxV1 = useBallotBoxV1();
const eth = useEthereumStore();

const error = ref('');
const isTransacting = ref(false);
const poll = ref<{ proposal: DAOv1.ProposalWithIdStructOutput; ipfsParams: Poll } | undefined>(
  undefined,
);
const winningChoice = ref<number | undefined>(undefined);
const selectedChoice = ref<number | undefined>();
const existingVote = ref<number | undefined>(undefined);

(async () => {
  const [active, topChoice, params] = await daoV1.value.callStatic.proposals(proposalId);
  const proposal = { id: proposalId, active, topChoice, params };
  const ipfsParamsRes = await fetch(`https://w3s.link/ipfs/${params.ipfsHash}`);
  const ipfsParams = await ipfsParamsRes.json();
  // TODO: redirect to 404
  poll.value = { proposal, ipfsParams } as any;
  if (!proposal.active) {
    selectedChoice.value = winningChoice.value = proposal.topChoice;
  }
})();

const canVote = computed(() => {
  if (!eth.address) return false;
  if (winningChoice.value !== undefined) return false;
  if (selectedChoice.value === undefined) return false;
  if (existingVote.value !== undefined) return false;
  return true;
});

const canSelect = computed(() => {
  if (winningChoice.value !== undefined) return false;
  if (eth.address === undefined) return true;
  if (existingVote.value !== undefined) return false;
  return true;
});

async function closeBallot(): Promise<void> {
  await eth.connect();
  await eth.switchNetwork(Network.Enclave);
  const tx = await ballotBoxV1.value.write!.closeBallot(proposalId, {
    value: ethers.utils.parseEther('0.03'),
  });
  const receipt = await tx.wait();

  if (receipt.status != 1) throw new Error('cast vote tx failed');
}

async function vote(e: Event): Promise<void> {
  e.preventDefault();
  try {
    error.value = '';
    isTransacting.value = true;
    await doVote();
  } catch (e: any) {
    error.value = e.reason ?? e.message;
  } finally {
    isTransacting.value = false;
  }
}

async function doVote(): Promise<void> {
  await eth.connect();

  if (selectedChoice.value === undefined) throw new Error('no choice selected');

  const choice = selectedChoice.value;

  console.log('casting vote');
  await eth.switchNetwork(Network.Enclave);
  const tx = await ballotBoxV1.value.write!.castVote(proposalId, choice, {
    value: ethers.utils.parseEther('0.03'),
  });
  const receipt = await tx.wait();

  if (receipt.status != 1) throw new Error('cast vote tx failed');
  existingVote.value = choice;

  // Check if the ballot has closed by examining the events (logs).
  let topChoice = undefined;
  for (const event of receipt.events ?? []) {
    if (
      event.address == import.meta.env.VITE_BALLOT_BOX_V1_ADDR &&
      event.event === 'BallotClosed'
    ) {
      topChoice = BigNumber.from(event.data).toNumber();
    }
  }
  if (topChoice === undefined) return;
  winningChoice.value = topChoice;
  let hasClosed = false;
  while (!hasClosed) {
    console.log('checking if ballot has been closed on BSC');
    hasClosed = !(await staticDAOv1.callStatic.proposals(proposalId)).active;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

eth.connect();
</script>

<template>
  <main style="max-width: 60ch" class="p-5 m-auto">
    <h1 class="font-medium text-3xl mb-4">
      <ContentLoader v-if="!poll?.ipfsParams.name" width="30" height="3">
        <rect x="0" y="0.1em" rx="3" ry="3" width="30ch" height="1.3em" />
      </ContentLoader>
      <span v-else>{{ poll.ipfsParams.name }}</span>
    </h1>
    <p v-if="poll" class="text-gray-500 mb-10" style="height: 3em">
      {{ poll.ipfsParams.description }}
    </p>
    <ContentLoader v-else width="60" height="6">
      <rect x="0" y="0.1em" rx="3" ry="3" width="50ch" height="1.1em" />
      <rect x="0" y="1.4em" rx="3" ry="3" width="45ch" height="1.1em" />
      <rect x="0" y="2.7em" rx="3" ry="3" width="47ch" height="1.1em" />
      <rect x="0" y="4.0em" rx="3" ry="3" width="28ch" height="1.1em" />
    </ContentLoader>
    <h2 class="text-lg font-medium underline">Choices</h2>
    <p v-if="poll?.ipfsParams.options.publishVotes" class="text-orange-600 my-2">
      Votes will be made public after voting has ended.
    </p>
    <form @submit="vote">
      <ul v-if="poll?.ipfsParams.choices">
        <li
          class="choice-input"
          v-for="(choice, choiceId) in poll.ipfsParams.choices"
          :key="choiceId"
          :class="{
            selected: selectedChoice === choiceId,
            won: choiceId === winningChoice,
            lost: winningChoice !== undefined && choiceId !== winningChoice,
          }"
        >
          <label class="inline-block py-6 px-3 pr-4 w-full">
            <input
              tabindex="1"
              name="choice"
              :value="choiceId"
              type="radio"
              :disabled="!canSelect"
              v-model="selectedChoice"
            />
            <span class="inline-block ml-2">{{ choice }}</span>
          </label>
        </li>
      </ul>
      <ContentLoader v-else width="50" height="6">
        <rect x="0" y="0.1em" rx="3" ry="3" width="26ch" height="1.1em" />
        <rect x="0" y="1.4em" rx="3" ry="3" width="33ch" height="1.1em" />
        <rect x="0" y="2.7em" rx="3" ry="3" width="37ch" height="1.1em" />
        <rect x="0" y="4.0em" rx="3" ry="3" width="10ch" height="1.1em" />
      </ContentLoader>
      <p v-if="error" class="error my-2">
        <span class="font-bold">Error:</span>&nbsp;<span>{{ error.replace('Error: ', '') }}</span>
      </p>
      <button
        tabindex="1"
        class="my-3 border-2 border-blue-800 text-gray-100 rounded-md p-2 bg-blue-600 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-default disabled:bg-white transition-colors font-bold text-xl disabled:hidden"
        :disabled="!canVote || isTransacting"
        @click="vote"
      >
        <span v-if="isTransacting">Pushing…</span>
        <span v-else-if="!isTransacting">Vote</span>
      </button>
    </form>
    <button
      tabindex="1"
      class="my-3 border-2 border-blue-800 text-gray-100 rounded-md p-2 bg-red-600 disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-default disabled:bg-white transition-colors font-bold text-xl disabled:hidden"
      :disabled="false"
      @click="closeBallot"
    >
      <span>Close Ballot</span>
    </button>
  </main>
</template>

<style lang="postcss" scoped>
.choice-input {
  @apply my-4 border-2 border-black rounded-sm;
}
.choice-input:not(.lost).selected {
  @apply bg-gradient-to-b from-secondary to-secondary via-transparent;
}
.choice-input.won {
  @apply bg-secondary;
}
.choice-input * {
  cursor: pointer;
}
</style>
