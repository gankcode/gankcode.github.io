<template>
  <Card
    class="w-[96vw] max-w-[1020px] mx-[2vw] my-2 dark:bg-gray-800 cursor-pointer overflow-hidden"
    @click="$router.push(article?.to)"
  >
    <template #title>
      <div class="flex flex-wrap justify-between">
        <div class="text-blue-500 underline underline-offset-8 text-nowrap">
          {{ article?.title }}
        </div>
        <div class="flex flex-row">
          <Tag
            class="m-1 text-xs"
            size="xs"
            severity="warn"
            :value="$fmt?.fromNow?.(article.updatedAt)"
          />
          <Tag
            class="m-1 text-xs"
            size="xs"
            severity="secondary"
            :value="$fmt?.localDate?.(article.updatedAt, 'YYYY-MM-DD HH:mm')"
          />
        </div>
      </div>
    </template>
    <template #subtitle>
      <div class="text-sm">
        {{ article?.description }}
      </div>
    </template>
    <template #content>
      <div class="w-full flex flex-wrap md:flex-row justify-center">
        <div class="max-w-[240px] mr-6">
          <Image
            v-if="article?.cover"
            :alt="article?.title"
            :src="article?.cover"
          />
        </div>
        <ContentRenderer
          class="prose prose-sm"
          :prose="true"
          v-if="article?.excerpt"
          :value="article?.excerpt"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row">
        <div v-for="(tag, index) in article?.tags" :key="index">
          <Tag class="m-1" size="sm" severity="info" :value="tag" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
const $fmt = useFormat();
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
