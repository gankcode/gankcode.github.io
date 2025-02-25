<template>
  <div v-if="locales.length > 1">
    <UButton
      v-if="locales.length == 2"
      class="flex row items-center text-nowrap"
      icon="i-lucide-languages"
      size="xl"
      variant="ghost"
      :to="toggleLocalePath"
    />
    <UDropdown v-else arrow :items="[langs]">
      <template #item="{ item }">
        <UButton :label="item.label" variant="ghost" />
      </template>
      <UButton :label="name" icon="i-lucide-languages" variant="ghost" />
    </UDropdown>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n();
const router = useRouter();

const switchLocalePath = useSwitchLocalePath();
const toggleLocalePath = computed(() => {
  const i = locales.value.find((i) => i.code !== locale.value);
  return i?.code ? switchLocalePath(i?.code) : "";
});

const name = computed(() => {
  return locales.value.find((i) => i.code === locale.value)?.name || "";
});

const langs = computed(() => {
  return locales.value.map((i) => {
    return {
      label: i.name || i.code,
      checked: locale.value === i.code,
      color: locale.value === i.code ? "primary" : "neutral",
      onSelect: () => {
        router.push(switchLocalePath(i.code));
      },
      click: () => {
        router.push(switchLocalePath(i.code));
      },
    };
  });
});
</script>
