<template>
  <q-layout view="lHh lpR fFf" container>
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="showMenu = !showMenu" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="showMenu" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      23423423
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showMenu = ref(true);

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
