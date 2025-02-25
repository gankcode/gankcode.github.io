<template>
  <div class="min-h-screen min-w-screen">
    <header class="min-h-[48px]">
      <AppHeader class="fixed w-full top-0 z-50 backdrop-blur-sm" />
      <AppHeader class="invisible" />
    </header>

    <main class="min-h-[calc(100vh_-_48px_-_48px)]">
      <AppMain />
    </main>

    <footer class="min-h-[48px]">
      <AppFooter />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/layouts/home/AppHeader.vue";
import AppMain from "~/layouts/home/AppMain.vue";
import AppFooter from "~/layouts/home/AppFooter.vue";
</script>
