<template>
  <q-layout view="hhh lpr fff" class="">
    <q-header
      class="fixed w-full top-0 bg-[var(--ui-bg)] shadow-md dark:shadow-gray-800"
      :style="{
        paddingTop: $env.style.header.height,
      }"
    />
    <q-header
      class="fixed w-full top-0 z-top bg-transparent"
      :style="{
        height: $env.style.header.height,
      }"
    >
      <AppHeader />
    </q-header>

    <q-page-container>
      <q-page
        :style="{
          minHeight: `calc(100vh - ${$env.style.header.height} - ${$env.style.footer.height} - 4px)`,
        }"
      >
        <AppMain />
      </q-page>
    </q-page-container>

    <q-footer
      class="bg-transparent shadow-md dark:shadow-gray-300"
      :style="{
        height: $env.style.footer.height,
      }"
    >
      <AppFooter />
    </q-footer>
  </q-layout>
</template>

<script lang="ts" setup>
import AppHeader from "~/layouts/home/AppHeader.vue";
import AppMain from "~/layouts/home/AppMain.vue";
import AppFooter from "~/layouts/home/AppFooter.vue";
</script>
