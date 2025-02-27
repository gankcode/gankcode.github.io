<template>
  <div class="w-full h-full">
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const { data: content } = await useAsyncData(
  () =>
    queryCollection("about")
      .where("stem", "LIKE", locale.value + "/%")
      .first(),
  {
    lazy: true,
    deep: true,
    watch: [locale],
    dedupe: "cancel",
  }
);

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description || content.value?.title,
});
</script>
