<template>
  <div class="min-h-screen min-w-screen">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout name="home">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const { computedTitle } = useWindow();

const { start, finish } = useLoadingIndicator({
  duration: 300,
  throttle: 0,
});

const beforeRoute = (to: any, from: any, next: any) => {
  start();
  next();
};

const afterRoute = (to: any, from: any) => {
  finish();
};

onMounted(() => {
  router.beforeEach(beforeRoute);
  router.afterEach(afterRoute);
});

onUnmounted(() => {
  router.beforeEach(() => {});
  router.afterEach(() => {});
});

useHead(() => ({
  titleTemplate: computedTitle(),
}));
</script>
