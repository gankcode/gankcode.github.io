<template>
  <q-card class="w-[95vw] mx-[2vw] my-2 dark:bg-gray-800 overflow-hidden">
    <q-card-section>
      <div class="flex flex-wrap items-center justify-between">
        <div
          class="text-xl font-bold text-pink-700 underline underline-offset-4 hover:text-cyan-500 cursor-pointer"
          @click="$router.push(article?.route)"
        >
          {{ article?.title }}
        </div>
        <div class="flex flex-row">
          <q-chip dense color="secondary" text-color="white" icon="alarm">
            {{ $fmt?.fromNow?.(article.updatedAt) }}
          </q-chip>
          <q-chip dense color="secondary" text-color="white" icon="event">
            {{ $fmt?.localDate?.(article.updatedAt, "YYYY-MM-DD HH:mm") }}
          </q-chip>
        </div>
      </div>
    </q-card-section>
    <div class="mx-4">
      <q-separator />
    </div>
    <q-card-section>
      <div class="md:flex cursor-pointer" @click="$router.push(article?.route)">
        <div class="md:shrink-0">
          <img
            v-if="article?.cover"
            class="h-48 w-full md:h-full md:w-64 object-contain"
            :src="article?.cover"
            :alt="article?.title"
          />
        </div>
        <div class="p-2">
          <MarkdownRender :value="article?.excerpt" x />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="flex flex-row">
        <q-chip
          v-for="(tag, index) in articleRouteTags"
          dense
          :key="index"
          icon="las la-location-arrow"
          color="green-4"
          :text-color="tag.removable ? 'red' : 'white'"
          clickable
          :removable="tag.removable"
          @click.stop="
            $router.push({
              path: route.path.startsWith(tag.route)
                ? tag.removedRoute
                : tag.route,
              query: {
                ...route.query,
              },
            })
          "
          @remove="
            $router.push({
              path: tag.removedRoute,
              query: {
                ...route.query,
              },
            })
          "
        >
          {{ tag.tag }}
        </q-chip>
        <q-chip
          v-for="(tag, index) in article?.tags"
          dense
          :key="index"
          icon="las la-tag"
          color="blue-4"
          :text-color="queryTags.includes(tag) ? 'red' : 'white'"
          clickable
          :removable="queryTags.includes(tag)"
          @click.stop="
            $router.push({
              path: route.path,
              query: {
                ...route.query,
                tags: queryTags.includes(tag)
                  ? queryTags.filter((i) => i !== tag)
                  : [tag, ...queryTags].join(),
              },
            })
          "
          @remove="
            $router.push({
              path: route.path,
              query: {
                ...route.query,
                tags: queryTags.filter((i) => i !== tag),
              },
            })
          "
        >
          {{ tag }}
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import MarkdownRender from "./MarkdownRender.vue";

const $fmt = useFormat();

const route = useRoute();
const { getPagePathArray } = useLocalePage();

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const queryTags = computed(() => {
  return (
    route.query.tags
      ?.toString()
      ?.split?.(",")
      ?.filter?.((i: string) => !!i) || []
  );
});

const routeTags = computed(() => {
  const route = getPagePathArray(true);
  return route?.filter?.((i: string) => !!i && !i.endsWith(".md"));
});

const articleRouteTags = computed(() => {
  const route = props.article?.route || "";
  const items = route
    ?.split?.("/")
    ?.filter?.((i: string) => !!i && !i.endsWith(".md"));
  const prefix = items.slice(0, 2) || [];
  const tags = items.slice(prefix.length) || [];
  return tags.map((i: string) => {
    const index = tags.indexOf(i);
    const routes = [];
    routes.push(...prefix);
    routes.push(tags.slice(0, index + 1));
    return {
      tag: i,
      route: "/" + routes.join("/"),
      removable: routeTags.value.includes(i),
      removedRoute: "/" + routes.slice(0, prefix.length + index).join("/"),
    };
  });
});
</script>
