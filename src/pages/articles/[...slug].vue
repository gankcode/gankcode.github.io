<template>
  <template v-if="article">
    <div class="w-full h-full">
      <ContentRenderer :value="article" />
    </div>
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The content you're looking for doesn't exist.</p>
      <NuxtLink to="/">Go back home</NuxtLink>
    </div>
  </template>
</template>

<script setup>
const { locale } = useI18n();

const { getArticleIdByRoute } = useArticles();

const article = ref(null);
const getPage = async () => {
  const pageId = getArticleIdByRoute();
  if (!pageId) {
    return ref(null);
  }
  const { data: article } = await useAsyncData(() =>
    queryCollection("articles").where("id", "=", pageId).first()
  );
  return article.value;
};

article.value = await getPage();
watch(
  () => locale.value,
  () => {
    article.value = getPage();
    console.log(article.value);
  }
);

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description,
});
</script>
