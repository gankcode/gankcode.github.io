<template>
  <div class="min-h-screen min-w-screen">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { getPagePathArray } = useLocalePage();
const router = useRouter();
const { t } = useI18n();
const { layout } = useLayout();

const { start, finish } = useLoadingIndicator({
  duration: 300,
  throttle: 0,
});

onMounted(() => {
  router.beforeEach(start);
  router.afterEach(finish);
});

onUnmounted(() => {
  router.beforeEach(() => {});
  router.afterEach(() => {});
});

useHead({
  // or as a function
  titleTemplate: () => {
    const root = getPagePathArray()[0];
    return root ? t("nav." + root) : t("nav.home");
  },
});
</script>
