<template>
  <div class="w-full h-full">
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();

const content = ref();
const getContent = async () => {
  const { data } = await useAsyncData(() =>
    queryCollection("about")
      .where("stem", "LIKE", locale.value + "/%")
      .first()
  );
  content.value = data.value;
};

await getContent();

useSeoMeta({
  title: content.value?.title,
  description: content.value?.description || content.value?.title,
});
</script>
