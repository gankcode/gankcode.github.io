<template>
  <div
    class="flex h-full w-full bg-gradient-to-br from-amber-500 to-pink-500 items-center justify-center"
  >
    <span>
      Copyright © {{ year }} {{ $env.site.host }} All rights reserved.
    </span>
  </div>
</template>

<script lang="ts" setup>
const year = computed(() => new Date().getFullYear());
</script>
