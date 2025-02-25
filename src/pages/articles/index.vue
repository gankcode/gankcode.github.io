<template>
  <DataView :value="articles" data-key="id">
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <ArticleItem :article="item" />
        </div>
      </div>
    </template>
  </DataView>
</template>

<script setup lang="ts">
import ArticleItem from "~/components/article/ArticleItem.vue";

const { locale } = useI18n();
const { getRouteByArticleId } = useArticles();

const offset = ref(0);
const limit = ref(99999999);
const articles = ref<any[] | undefined>([]);

const getArticles = async (offset: number, limit: number) => {
  const { data } = await useAsyncData(() =>
    queryCollection("articles")
      .where("stem", "LIKE", locale.value + "/%")
      .order("updatedAt", "DESC")
      .skip(offset)
      .limit(limit)
      .all()
  );
  articles.value = data.value?.map((it) => it || undefined);
  for (const article of articles.value || []) {
    article.to = getRouteByArticleId(article.id);
  }
  console.log(articles.value);
};
getArticles(offset.value, limit.value);
watch(locale, () => {
  getArticles(offset.value, limit.value);
});
</script>
