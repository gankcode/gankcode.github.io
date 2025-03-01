<template>
  <div>
    <q-infinite-scroll @load="load">
      <div class="flex flex-col justify-center items-center">
        <div v-for="(item, index) in articles" :key="index + '.' + item.id">
          <ArticleItem :article="item" />
        </div>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import ArticleItem from "~/components/article/ArticleItem.vue";

const route = useRoute();
const { getRouteByArticleId, getArticlePathByRoute } = useArticles();

const { data: articles } = await useAsyncData(
  route.path,
  async () => {
    const query = queryCollection("articles").where(
      "stem",
      "LIKE",
      getArticlePathByRoute() + "/%"
    );

    if (typeof route.query?.tags === "string") {
      const tags = (route.query.tags as string).split(",").filter((i) => !!i);
      for (const tag of tags) {
        query.where("tags", "LIKE", '%"' + tag + '"%');
      }
    }
    try {
      return await query.order("updatedAt", "DESC").all();
    } catch (err) {
      console.error(err);
    }
  },
  {
    transform: (data) => {
      for (const item of data || []) {
        item.route = getRouteByArticleId(item.id) || "";
      }
      return data || [];
    },
    watch: [route],
    deep: true,
  }
);

const load = (index: number, done: () => void) => {
  done();
};
</script>
