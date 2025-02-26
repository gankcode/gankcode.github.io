<template>
  <div
    class="flex row w-full h-full justify-between shadow-sm dark:shadow-gray-800"
  >
    <div class="flex row items-center">
      <AppTitle class="ml-2" />
      <div class="flex md:hidden">
        <Button
          class="text-nowrap"
          icon="pi pi-bars"
          variant="text"
          @click="isNaviDrawerOpen = true"
          :label="$te(breadcrumbRoot) ? $t(breadcrumbRoot) : ''"
        />
      </div>
    </div>
    <div class="hidden md:flex w-auto overflow-hidden backdrop-blur-md">
      <UHorizontalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            $t(link.label)
          }}</span>
        </template>
      </UHorizontalNavigation>
    </div>

    <Drawer v-model:visible="isNaviDrawerOpen">
      <template #header>
        <div class="flex items-center justify-between">
          <Button
            class="flex row items-center text-nowrap md:hidden"
            color="gray"
            variant="text"
            icon="pi pi-bars"
            @click="isNaviDrawerOpen = false"
          />
          <AppTitle />
        </div>
      </template>
      <UVerticalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            $t(link.label)
          }}</span>
        </template>
      </UVerticalNavigation>
    </Drawer>

    <div class="flex row items-center">
      <UTooltip :text="$env.site.github">
        <Button
          icon="pi pi-github"
          variant="text"
          color="primary"
          target="_blank"
          @click="$win.open($env.site.github)"
        />
      </UTooltip>
      <LocaleSelectButton />
      <ThemeToggleButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppTitle from "./AppTitle.vue";
import LocaleSelectButton from "~/components/tool/LocaleSelectButton.vue";
import ThemeToggleButton from "~/components/tool/ThemeToggleButton.vue";

const localePath = useLocalePath();

const isNaviDrawerOpen = ref(false);

const router = useRouter();
const localeRoute = useLocaleRoute();
const $win = useWindow();

const breadcrumbRoot = computed(() => {
  const cur = router.currentRoute.value.path;
  const loc = localeRoute("/")?.path || "";
  const path = cur.replace(loc, "");
  const items = path.split("/").filter((i) => !!i);
  return "nav." + items[0];
});

const onClick = (_: string) => {
  isNaviDrawerOpen.value = false;
};

const links = ref([
  {
    label: "nav.home",
    icon: "i-lucide-home",
    root: true,
    to: computed(() => {
      return localePath("/");
    }),
    click: () => {
      onClick?.("nav.home");
    },
  },
  {
    label: "nav.articles",
    icon: "i-lucide-square-library",
    to: computed(() => {
      return localePath("/articles");
    }),
    click: () => {
      onClick?.("nav.articles");
    },
  },
  {
    label: "nav.projects",
    icon: "i-lucide-box",
    to: computed(() => {
      return localePath("/projects");
    }),
    click: () => {
      onClick?.("nav.projects");
    },
  },
  {
    label: "nav.tools",
    icon: "i-lucide-wrench",
    to: computed(() => {
      return localePath("/tools");
    }),
    click: () => {
      onClick?.("nav.tools");
    },
  },
  {
    label: "nav.about",
    icon: "i-lucide-user",
    to: computed(() => {
      return localePath("/about");
    }),
    click: () => {
      onClick?.("nav.about");
    },
  },
]);
</script>
