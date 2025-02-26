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

const articles = ref<any[] | undefined>([]);

const { data: items } = await useAsyncData(() =>
  queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .order("updatedAt", "DESC")
    .all()
);
articles.value = items.value?.map((it) => it || undefined) || [];
for (const article of articles.value || []) {
  article.to = getRouteByArticleId(article.id);
}
</script>
