<template>
  <div>
    <DataView :value="articles" data-key="id">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div class="md:w-40 relative">
                <img
                  class="block xl:block mx-auto rounded w-full"
                  :src="item.cover"
                  :alt="item.cover"
                />
                <div
                  class="absolute bg-black/70 rounded-border"
                  style="left: 4px; top: 4px"
                >
                  {{ item.title }}
                </div>
              </div>
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
              >
                <div
                  class="flex flex-row md:flex-col justify-between items-start gap-2"
                >
                  <div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                      >{{ item.category }}</span
                    >
                    <div class="text-lg font-medium mt-2">
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="bg-surface-100 p-1" style="border-radius: 30px">
                    <div
                      class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="
                        border-radius: 30px;
                        box-shadow:
                          0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                          0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                      "
                    >
                      <span class="text-surface-900 font-medium text-sm">{{
                        item.rating
                      }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-sm font-semibold">
                    {{ $fmt.localDate(item.updatedAt) }}
                  </span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Buy Now"
                      :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                      class="flex-auto md:flex-initial whitespace-nowrap"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

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
  console.log(articles.value);
};
getArticles(offset.value, limit.value);
watch(locale, () => {
  getArticles(offset.value, limit.value);
});
</script>
