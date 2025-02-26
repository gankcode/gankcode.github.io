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
const { getArticleIdByRoute } = useArticles();

const previous = ref(null);
const next = ref(null);
const article = ref(null);

const pageId = getArticleIdByRoute();

const { data: cur } = await useAsyncData(() =>
  queryCollection("articles").where("id", "=", pageId).limit(1).first()
);
const { data: left } = await useAsyncData(() =>
  queryCollection("articles")
    .where("updatedAt", "<", cur.value.updatedAt)
    .order("updatedAt", "DESC")
    .limit(1)
    .first()
);
const { data: right } = await useAsyncData(() =>
  queryCollection("articles")
    .where("updatedAt", ">", cur.value.updatedAt)
    .order("updatedAt", "ASC")
    .limit(1)
    .first()
);
article.value = cur.value;
previous.value = left.value;
next.value = right.value;

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
});
</script>
