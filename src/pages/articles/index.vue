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

const route = useRoute();
const { locale } = useI18n();
const { getRouteByArticleId } = useArticles();

const { data: articles } = await useAsyncData(
  () =>
    queryCollection("articles")
      .where("stem", "LIKE", locale.value + "/%")
      .order("updatedAt", "DESC")
      .all(),
  {
    lazy: true,
    deep: true,
    watch: [locale, route],
    dedupe: "cancel",
    transform: (data) => {
      for (const item of data || []) {
        item.route = getRouteByArticleId(item.id) || "";
      }
      return data || [];
    },
  }
);
</script>
