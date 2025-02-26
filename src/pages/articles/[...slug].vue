<template>
  <div class="w-full h-full flex justify-center items-center p-8">
    <template v-if="article">
      <div
        class="w-full h-full flex flex-col gap-8 items-center justify-center"
      >
        <Image
          v-if="article.cover"
          :src="article.cover"
          class="object-cover object-center"
          :alt="article.title"
        />
        <ContentRenderer
          class="prose max-w-[1080px]"
          :prose="true"
          :value="article"
        />
        <div class="flex justify-between">
          <div v-if="previous">
            <NuxtLink :to="`/articles/${previous?.id}`">
              <Button label="Previous" severity="secondary" />
            </NuxtLink>
          </div>
          <div v-if="next">
            <NuxtLink :to="`/articles/${next?.id}`">
              <Button label="Next" severity="secondary" />
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

<script setup>
const { locale } = useI18n();
const { getArticleIdByRoute } = useArticles();

const pageId = getArticleIdByRoute();

const { data: article } = await useAsyncData(() =>
  queryCollection("articles").where("id", "=", pageId).limit(1).first()
);

const { data: previous } = await useAsyncData(() =>
  queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .andWhere((query) => {
      query.where("updatedAt", "<", article.value.updatedAt);
    })
    .order("updatedAt", "DESC")
    .limit(1)
    .first()
);

const { data: next } = await useAsyncData(() =>
  queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .andWhere((query) => {
      query.where("updatedAt", ">", article.value.updatedAt);
    })
    .order("updatedAt", "ASC")
    .limit(1)
    .first()
);

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
});
</script>
