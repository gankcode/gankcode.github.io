<template>
  <div class="flex row w-full justify-between shadow-sm dark:shadow-gray-800">
    <div class="flex row items-center">
      <AppTitle class="ml-2" />
      <UButton
        class="flex row items-center text-nowrap md:hidden"
        icon="i-lucide-menu"
        size="xl"
        variant="ghost"
        :trailing="false"
        @click="isNaviDrawerOpen = true"
        :label="$te(breadcrumbRoot) ? $t(breadcrumbRoot) : ''"
      />
    </div>
    <div class="hidden md:flex w-auto overflow-hidden">
      <UHorizontalNavigation :links="links">
        <template #default="{ link }">
          <span class="group-hover:text-primary relative">{{
            $t(link.label)
          }}</span>
        </template>
      </UHorizontalNavigation>
    </div>

    <USlideover
      v-model="isNaviDrawerOpen"
      class="flex md:hidden"
      side="left"
      :ui="{ width: 'w-screen max-w-xs' }"
    >
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <UButton
              class="flex row items-center text-nowrap md:hidden rotate-90"
              icon="i-lucide-menu"
              size="xl"
              variant="ghost"
              :trailing="false"
              @click="isNaviDrawerOpen = false"
            />
            <AppTitle />
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isNaviDrawerOpen = false"
            />
          </div>
        </template>
        <UVerticalNavigation :links="links">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative">{{
              $t(link.label)
            }}</span>
          </template>
        </UVerticalNavigation>
      </UCard>
    </USlideover>

    <div class="flex row items-center">
      <UTooltip text="https://github.com/robotism">
        <UButton
          la
          icon="i-simple-icons-github"
          variant="ghost"
          color="primary"
          size="xl"
          target="_blank"
          to="https://github.com/robotism"
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
