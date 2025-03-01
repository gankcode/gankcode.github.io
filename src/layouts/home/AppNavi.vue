<template>
  <q-tabs
    class="text-pink-700 mx-1"
    dense
    shrink
    no-caps
    stretch
    :model-value="tab"
    :align="align"
    :vertical="vertical"
    :inline-label="vertical"
    :switch-indicator="vertical"
  >
    <q-tab
      v-for="(item, index) in links"
      :key="index"
      :name="item.label"
      :icon="item.icon"
      :label="$t(item.label)"
      style="justify-content: start"
      @click="item.click"
    />
  </q-tabs>
</template>

<script lang="ts" setup>
const { getPagePathArray } = useLocalePage();
const { links } = useNavigation();

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String as PropType<
      "left" | "center" | "right" | "justify" | undefined
    >,
    default: "center",
  },
});

const tab = computed(() => {
  const page = getPagePathArray()[0];
  return (
    links.value.find((it) => {
      return it.label.indexOf(page) >= 0;
    })?.label ||
    links.value[0]?.label ||
    ""
  );
});
</script>

<style scoped>
.light-mode {
  .q-tab--active {
    background-color: rgba(127, 127, 127, 0.25);
  }
}
.dark-mode {
  .q-tab--active {
    background-color: rgba(255, 255, 255, 0.25);
  }
}

::v-deep(.q-tab--active) {
  .q-tab__label {
    font-weight: 600 !important;
  }
}
</style>
