<template>
  <q-layout
    view="hHh LpR fFf"
    :container="true"
    :style="{
      height: `calc(100vh - ${$env.style.header.height} - ${$env.style.footer.height} - 56px)`,
    }"
  >
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="showMenu = !showMenu" />
        <q-toolbar-title> Online Tools </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="showMenu" side="left" bordered>
      <div v-for="(item, index) in items" :key="index">
        {{ item.label }}
        <div v-for="(subItem, subIndex) in item.items" :key="subIndex">
          {{ subItem.label }}
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showMenu = ref(false);

const search = ref("");

const items = computed(() => {
  const all = [
    {
      label: "Documents",
      items: [
        {
          label: "New",
        },
        {
          label: "Search",
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          label: "Settings",
        },
        {
          label: "Messages",
        },
        {
          label: "Logout",
        },
      ],
    },
    {
      separator: true,
    },
  ];
  if (!search.value) {
    return all;
  }

  const filter = [];

  for (const item of all) {
    if (!item.label) {
      filter.push(item);
      continue;
    }
    if (item.label.toLowerCase().includes(search.value.toLowerCase())) {
      filter.push(item);
      continue;
    }
    item.items = item.items.filter((i) =>
      i.label.toLowerCase().includes(search.value.toLowerCase())
    );
    for (const subitem of item.items || []) {
      if (subitem.label.toLowerCase().includes(search.value.toLowerCase())) {
        filter.push(item);
        break;
      }
    }
  }

  return filter;
});
</script>

<style scoped>
::v-deep .q-drawer {
  position: relative !important;
}
</style>
