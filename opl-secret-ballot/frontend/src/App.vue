<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

import AccountPicker from './components/AccountPicker.vue';
</script>

<template>
  <header class="flex flex-row justify-between py-2 px-8">
    <RouterLink to="/">
      <h1 class="text-xl font-medium" style="line-height: 40px" tabindex="0">🗳️ Secret Ballot</h1>
    </RouterLink>
    <div class="flex items-center">
      <AccountPicker class="border border-gray-900 py-1 px-2 rounded-lg ml-3" />
    </div>
  </header>

  <RouterView el="main" />
</template>

<style lang="postcss">
h2 {
  @apply font-bold text-2xl my-2;
}

.error {
  @apply text-red-500;
}

.choice-item input {
  @apply inline-block my-1;
  width: 85%;
  border-bottom-width: 1px;
}
</style>
