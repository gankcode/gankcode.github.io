<template>
  <div>
    <DataView :value="articles" data-key="id">
      <template #list="props">
        <div class="flex flex-col justify-center items-center">
          <div v-for="(item, index) in props.items" :key="index">
            <ArticleItem :article="item" />
          </div>
        </div>
      </template>
    </DataView>
  </div>
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
  articles.value = data.value?.map((it) => it || undefined) || [];
  for (const article of articles.value || []) {
    article.to = getRouteByArticleId(article.id);
  }
};
await getArticles(offset.value, limit.value);
</script>
