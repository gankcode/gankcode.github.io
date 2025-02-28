<template>
  <div class="w-full h-full flex justify-center items-center p-8">
    <template v-if="article">
      <div
        class="w-full h-full flex flex-col gap-8 items-center justify-center"
      >
        <img
          v-if="article.cover"
          :src="article.cover"
          class="object-cover object-center"
          :alt="article.title"
        />
        <ContentRenderer
          class="max-w-[1080px]"
          :prose="true"
          :value="article"
        />
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
const { locale } = useI18n();
const { computedTitle } = useWindow();
const { getArticleIdByRoute } = useArticles();

const pageId = getArticleIdByRoute();

const { data: article } = await useAsyncData(() =>
  queryCollection("articles")
    .where("id", "=", pageId)
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
