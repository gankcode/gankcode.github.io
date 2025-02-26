<template>
  <div class="min-h-screen min-w-screen">
    <header>
      <AppHeader
        class="fixed w-full top-0 z-50 backdrop-blur-md"
        :style="{
          height: $env.style.header.height,
        }"
      />
      <AppHeader
        class="invisible"
        :style="{
          height: $env.style.header.height,
        }"
      />
    </header>

    <main>
      <AppMain
        :style="{
          minHeight: `calc(100vh - ${$env.style.header.height} - ${$env.style.footer.height})`,
        }"
      />
    </main>

    <footer>
      <AppFooter
        :style="{
          height: $env.style.footer.height,
        }"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "~/layouts/home/AppHeader.vue";
import AppMain from "~/layouts/home/AppMain.vue";
import AppFooter from "~/layouts/home/AppFooter.vue";
</script>
