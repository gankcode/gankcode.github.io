<template>
  <q-tabs
    class="text-teal mx-1"
    inline-label
    dense
    no-caps
    :model-value="tab"
    :align="align"
    :vertical="vertical"
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
const localePath = useLocalePath();
const router = useRouter();
const { getPagePathArray } = useLocalePage();

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

const links = ref([
  {
    label: "nav.home",
    icon: "la la-home",
    root: true,
    click: () => {
      router.push(localePath("/"));
    },
  },
  {
    label: "nav.articles",
    icon: "la la-book",
    click: () => {
      router.push(localePath("/articles"));
    },
  },
  {
    label: "nav.projects",
    icon: "la la-box",
    click: () => {
      router.push(localePath("/projects"));
    },
  },
  {
    label: "nav.tools",
    icon: "la la-tools",
    click: () => {
      router.push(localePath("/tools"));
    },
  },
  {
    label: "nav.about",
    icon: "la la-user",
    click: () => {
      router.push(localePath("/about"));
    },
  },
]);

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
