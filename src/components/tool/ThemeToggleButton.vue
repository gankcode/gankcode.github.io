<template>
  <UButton
    class="flex row items-center text-nowrap dark:flex hidden"
    icon="i-lucide-moon"
    size="xl"
    variant="ghost"
    @click="isDark = !isDark"
  />
  <UButton
    class="flex row items-center text-nowrap dark:hidden flex"
    icon="i-lucide-sun"
    size="xl"
    variant="ghost"
    @click="isDark = !isDark"
  />
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
