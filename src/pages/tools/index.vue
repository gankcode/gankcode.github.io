<template>
  <div class="flex flex-row w-full">
    <ScrollPanel class="w-[25vw] h-[calc(100vh_-_48px)]">
      <Menu :model="items" class="w-[25vw] h-[calc(100vh_-_48px)]">
        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-2">
            <span class="text-xl font-semibold">
              <span class="text-primary">{{ $t("tools.online") }}</span>
            </span>
          </span>
        </template>
        <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </ScrollPanel>
    <ScrollPanel class="w-[75vw] h-[calc(100vh_-_48px)]">
      <NuxtPage />
    </ScrollPanel>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    separator: true,
  },
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
]);
</script>
