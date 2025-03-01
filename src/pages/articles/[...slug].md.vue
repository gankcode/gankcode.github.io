<template>
  <div class="w-full h-full flex justify-center items-center p-4">
    <template v-if="article">
      <div
        class="w-full h-full flex flex-col gap-4 items-center justify-center"
      >
        <img
          v-if="article.cover"
          :src="article.cover"
          class="object-contain w-full max-h-[30vh]"
          :alt="article.title"
        />
        <MarkdownRender class="max-w-[1080px]" :value="article" />
        <div class="flex w-full justify-between">
          <div v-if="previous">
            <NuxtLink :to="`/articles/${previous?.id}`">
              {{ previous?.title }}
              <q-btn :label="$t('articles.previous')" />
            </NuxtLink>
          </div>
          <div v-if="next">
            <NuxtLink :to="`/articles/${next?.id}`">
              {{ next?.title }}
              <q-btn :label="$t('articles.next')" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty-page text-2xl">
        <h1>{{ $t("articles.notFound") }}</h1>
        <p>{{ $t("articles.noContent") }}</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import MarkdownRender from "~/components/article/MarkdownRender.vue";

const { locale } = useI18n();
const { computedTitle } = useWindow();
const { getArticleIdByRoute } = useArticles();

const { data: article } = await useAsyncData(() =>
  queryCollection("articles")
    .where("id", "=", getArticleIdByRoute())
    .limit(1)
    .first()
    .catch((err) => {
      console.error(err);
    })
);

const { data: previous } = await useAsyncData(() =>
  queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .where("updatedAt", "<", article.value?.updatedAt)
    .order("updatedAt", "DESC")
    .limit(1)
    .first()
    .catch((err) => {
      console.error(err);
    })
);

const { data: next } = await useAsyncData(() =>
  queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .where("updatedAt", "<", article.value?.updatedAt)
    .order("updatedAt", "ASC")
    .limit(1)
    .first()
    .catch((err) => {
      console.error(err);
    })
);

useHead(() => ({
  titleTemplate: computedTitle(article.value?.title),
}));

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
});
</script>
