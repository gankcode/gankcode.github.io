<template>
  <q-card
    class="w-[96vw] max-w-[1020px] mx-[2vw] my-2 dark:bg-gray-800 cursor-pointer overflow-hidden"
    @click="$router.push(article?.route)"
  >
    <q-card-section>
      <div class="flex flex-wrap items-center justify-between">
        <div
          class="text-xl font-bold text-pink-700 underline underline-offset-4 hover:text-cyan-500"
        >
          {{ article?.title }}
        </div>
        <div class="flex flex-row">
          <q-chip color="secondary" text-color="white" icon="alarm" clickable>
            {{ $fmt?.fromNow?.(article.updatedAt) }}
          </q-chip>
          <q-chip color="secondary" text-color="white" icon="event" clickable>
            {{ $fmt?.localDate?.(article.updatedAt, "YYYY-MM-DD HH:mm") }}
          </q-chip>
        </div>
      </div>
    </q-card-section>
    <div class="mx-4">
      <q-separator />
    </div>
    <q-card-section>
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            v-if="article?.cover"
            class="h-48 w-full md:h-full md:w-64 object-contain"
            :src="article?.cover"
            :alt="article?.title"
          />
        </div>
        <div class="p-2">
          <MarkdownRender :value="article?.excerpt" />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="flex flex-row">
        <q-chip
          v-for="(tag, index) in routeTags"
          :key="index"
          icon="las la-location-arrow"
          color="teal-10"
          text-color="white"
          clickable
          @click.stop="$router.push(tag.route)"
        >
          {{ tag.tag }}
        </q-chip>
        <q-chip
          v-for="(tag, index) in article?.tags"
          :key="index"
          icon="las la-tag"
          color="lime-10"
          text-color="white"
          clickable
          @click.stop="
            $router.push({
              path: route.path,
              query: {
                tags: tag,
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

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const routeTags = computed(() => {
  const route = props.article?.route || "";
  const items = route
    ?.split?.("/")
    ?.filter?.((i: string) => !!i && i.indexOf(".md") < 0);
  const prefix = items.slice(0, 2) || [];
  const tags = items.slice(2) || [];
  return tags.map((i: string) => {
    const index = tags.indexOf(i);
    const routes = [];
    routes.push(...prefix);
    routes.push(tags.slice(0, index + 1));
    return {
      tag: i,
      route: "/" + routes.join("/"),
    };
  });
});
</script>
