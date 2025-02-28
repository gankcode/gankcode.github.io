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
          <ContentRenderer
            :prose="true"
            v-if="article?.excerpt"
            :value="article?.excerpt"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="flex flex-row">
        <div v-for="(tag, index) in article?.tags" :key="index">
          <q-chip color="teal" text-color="white" icon="bi-tag" clickable>
            {{ tag }}
          </q-chip>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
const $fmt = useFormat();
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>
