<template>
  <ClientOnly>
    <div
      class="bg-gradient-to-br from-amber-500 to-pink-500 h-full w-full flex items-center justify-center min-h-[48px]"
    >
      <span> Copyright © {{ year }} {{ hostname }} All rights reserved. </span>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const year = computed(() => new Date().getFullYear());
const hostname = computed(() => window?.location?.hostname);
</script>
