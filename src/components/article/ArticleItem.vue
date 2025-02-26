<template>
  <Card
    class="w-[96vw] max-w-[768px] overflow-hidden mx-[2vw] my-2 dark:bg-gray-800 cursor-pointer"
    @click="$router.push(article?.to)"
  >
    <template #title>
      <div class="text-blue-500 underline underline-offset-8">
        {{ article?.title }}
      </div>
    </template>
    <template #subtitle>
      <div>{{ article?.description }}</div>
    </template>
    <template #content>
      <div class="w-full flex flex-wrap justify-center">
        <Image class="m-2" :alt="article?.title" :src="article?.cover" />
        <ContentRenderer v-if="article?.excerpt" :value="article?.excerpt" />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row">
        <div v-for="(tag, index) in article?.tags" :key="index">
          <Tag class="m-1" size="sm" severity="secondary" :value="tag" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
