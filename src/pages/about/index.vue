<template>
  <div class="w-full h-full">
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { locale } = useI18n();

const { data: content } = await useAsyncData(route.path, () =>
  queryCollection("about")
    .where("stem", "LIKE", locale.value + "/%")
    .first()
    .catch((err) => {
      console.error(err);
    })
);

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description || content.value?.title,
});
</script>
