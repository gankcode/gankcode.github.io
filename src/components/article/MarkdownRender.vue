<template>
  <ContentRenderer
    class="W-full H-full prose"
    :prose="true"
    v-if="value"
    :value="value"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
