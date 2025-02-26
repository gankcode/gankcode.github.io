<template>
  <div>
    <DataView
      :value="articles?.map?.((it) => it || undefined) || []"
      data-key="id"
    >
      <template #list="props">
        <div class="flex flex-col justify-center items-center">
          <div
            v-for="(item, index) in props.items"
            :key="index + '.' + item.id"
          >
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

const getArticles = async () => {
  const items = await queryCollection("articles")
    .where("stem", "LIKE", locale.value + "/%")
    .order("updatedAt", "DESC")
    .all();
  for (const item of items || []) {
    item.route = getRouteByArticleId(item.id) || "";
  }
  return items || [];
};
const { data: articles } = await useAsyncData(() => getArticles(), {
  watch: [locale],
});
</script>
