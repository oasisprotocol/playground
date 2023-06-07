<script setup lang="ts">
import { ethers } from 'ethers';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { staticBallotBox, useDAOv1 } from '../contracts';
import { Network, useEthereumStore } from '../stores/ethereum';
import type { Poll } from '../../../functions/api/types';

const router = useRouter();
const eth = useEthereumStore();
const dao = useDAOv1();

const pinBody = async (jwt: string, poll: Poll) => {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      pinataContent: poll,
    }),
  });
  const resBody: any = await res.json();
  if (res.status !== 200) throw new Error('failed to pin');
  const resp = { ipfsHash: resBody.IpfsHash };
  return new Response(JSON.stringify(resp), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  });
};

const errors = ref<string[]>([]);
const pollName = ref('');
const pollDesc = ref('');
const choices = ref<Array<{ key: number; value: string }>>([]);
const publishVotes = ref(false);
const creating = ref(false);

let choiceCount = 0; // a monotonic counter for use as :key
const removeChoice = (i: number) => choices.value.splice(i, 1);
const addChoice = () => {
  choices.value.push({ key: choiceCount, value: '' });
  choiceCount++;
};
addChoice();
addChoice();
addChoice();

async function createPoll(e: Event): Promise<void> {
  if (e.target instanceof HTMLFormElement) {
    e.target.checkValidity();
    if (!e.target.reportValidity()) return;
  }
  e.preventDefault();
  try {
    errors.value.splice(0, errors.value.length);
    creating.value = true;
    const proposalId = await doCreatePoll();
    if (!proposalId) return;
    router.push({ name: 'poll', params: { id: proposalId } });
  } catch (e: any) {
    errors.value.push(`Failed to create poll: ${e.message ?? JSON.stringify(e)}`);
    console.error(e);
  } finally {
    creating.value = false;
  }
}

async function doCreatePoll(): Promise<string> {
  await eth.connect();
  await eth.switchNetwork(Network.Host);
  if (errors.value.length > 0) return '';
  const poll: Poll = {
    creator: eth.address!,
    name: pollName.value,
    description: pollDesc.value,
    choices: choices.value.map((c) => c.value),
    options: {
      publishVotes: publishVotes.value,
    },
  };

  const res = await pinBody(import.meta.env.VITE_PINATA_JWT!, poll);
  const resJson = await res.json();
  if (res.status !== 201) throw new Error(resJson.error);
  const ipfsHash = resJson.ipfsHash;
  const proposalParams = {
    ipfsHash,
    numChoices: choices.value.length,
    publishVotes: poll.options.publishVotes,
  };
  // TODO: check if proposal already exists on the host chain and continue if so (idempotence)
  const value = ethers.utils.parseEther('0.005');
  const proposalId = await dao.value.callStatic.createProposal(proposalParams, { value });
  console.log('creating proposal');
  const createProposalTx = await dao.value.createProposal(proposalParams, { value });
  console.log('creating proposal in', createProposalTx.hash);
  if ((await createProposalTx.wait()).status !== 1)
    throw new Error('createProposal tx receipt reported failure.');
  let isActive = false;
  while (!isActive) {
    console.log('checking if ballot has been created on Sapphire');
    isActive = await staticBallotBox.callStatic.ballotIsActive(proposalId);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return proposalId.replace('0x', '');
}
</script>

<template>
  <main style="max-width: 60ch" class="py-5 m-auto w-4/5">
    <h2>New Poll</h2>
    <form @submit="createPoll">
      <fieldset>
        <legend>Name</legend>
        <input class="w-3/4" type="text" v-model="pollName" required />
      </fieldset>
      <fieldset>
        <legend>Description</legend>
        <textarea class="p-2 bg-transparent w-full h-full" v-model="pollDesc" required />
      </fieldset>
      <fieldset>
        <legend>Choices</legend>
        <ol class="ml-8 list-decimal">
          <li class="choice-item" v-for="(choice, i) in choices" :key="choice.key">
            <input type="text" required v-model="choices[i].value" />
            <button
              v-if="choices.length > 1"
              class="inline-block text-lg text-gray-500 pl-1"
              :data-ix="i"
              @click.prevent="removeChoice(i)"
            >
              Ⓧ
            </button>
          </li>
        </ol>
        <button class="underline ml-3 my-2 text-gray-700" @click.prevent="addChoice">
          ＋Add choice
        </button>
      </fieldset>
      <fieldset>
        <legend>Additional Options</legend>
        <ul class="px-3">
          <li class="my-3">
            <input id="publish-votes" type="checkbox" v-model="publishVotes" />
            <label class="inline-block mx-3" for="publish-votes"
              >Publish individual votes after voting has ended.</label
            >
          </li>
        </ul>
      </fieldset>
      <div v-if="errors.length > 0" class="text-red-500 px-3 mt-5 rounded-sm">
        <span class="font-bold">Errors:</span>
        <ul class="list-disc px-8">
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <button
        class="my-3 border-2 border-blue-700 text-blue-900 rounded-md p-2"
        :disabled="creating"
      >
        <span v-if="creating">Creating…</span>
        <span v-else>Create Poll</span>
      </button>
    </form>
  </main>
</template>

<style scoped lang="postcss">
.choice-item:first-of-type {
  @apply mt-0;
}

input[type='text'] {
  @apply inline-block text-lg mx-3 bg-transparent;
  border-bottom: 1px solid black;
}

fieldset {
  @apply border-2 p-4 border-gray-800 rounded-sm bg-transparent my-6;
}

legend {
  @apply px-1 font-medium;
}

h2 {
  @apply font-bold text-2xl my-2;
}
</style>
