<template>
  <div class="dark:flex hidden">
    <Button icon="pi pi-moon" variant="text" @click="isDark = !isDark" />
  </div>
  <div class="flex dark:hidden">
    <Button icon="pi pi-sun" variant="text" @click="isDark = !isDark" />
  </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
