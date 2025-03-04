<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <MarkdownRender
      class="w-full h-full max-w-[1080px]"
      v-if="content"
      :value="content"
    />
  </div>
</template>

<script lang="ts" setup>
import MarkdownRender from "~/components/article/MarkdownRender.vue";

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
