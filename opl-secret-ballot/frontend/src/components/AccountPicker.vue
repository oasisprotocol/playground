<script setup lang="ts">
import { computed, ref } from 'vue';

import { Network, networkName, useEthereumStore } from '../stores/ethereum';
import JazzIcon from './JazzIcon.vue';

const eth = useEthereumStore();

const iconsize = 30;

const abbrAddr = computed(() => {
  if (!eth.address) return;
  const addr = eth.address.replace('0x', '');
  return `${addr.slice(0, 5)}…${addr.slice(-5)}`;
});
const netName = computed(() => networkName(eth.network));
const unkNet = computed(() => eth.network === Network.Unknown);

const connecting = ref(false);
const showingConnecting = ref(false);

async function connectWallet() {
  if (connecting.value) return;
  connecting.value = true;
  try {
    setTimeout(() => {
      showingConnecting.value = connecting.value;
    }, 300);
    await eth.connect();
  } finally {
    connecting.value = false;
  }
}
</script>

<template>
  <button class="v-align" :class="{ 'cursor-default': !!eth.address }" @click="connectWallet">
    <div class="v-align" v-if="!connecting && eth.address">
      <JazzIcon :size="iconsize" :address="eth.address" />
      <div class="text-xs leading-none ml-1">
        <abbr :title="eth.address" class="font-mono block no-underline">{{ abbrAddr }}</abbr>
        <span class="text-2xs" :class="{ 'unk-net': unkNet }">{{ netName }}</span>
      </div>
    </div>
    <div class="v-align" v-else>
      <div class="empty-icon"></div>
      <span class="ml-1 text-sm">
        <span v-if="showingConnecting">Connecting…</span>
        <span v-else>Connect Wallet</span>
      </span>
    </div>
  </button>
</template>

<style lang="postcss" scoped>
.v-align {
  @apply inline-flex items-center;
}

.empty-icon {
  --icon-size: 30px;
  @apply border border-gray-900;

  width: var(--icon-size);
  height: var(--icon-size);
  border-radius: 100%;
  display: inline-block;

  &::after {
    position: relative;
    line-height: var(--icon-size);
    content: '👋';
  }
}

.unk-net {
  @apply text-red-500 underline decoration-wavy decoration-1;
}
</style>
