<template>
  <div class="flex flex-row items-center" v-if="locales.length > 1">
    <Button
      v-if="locales.length == 2"
      class="flex row text-nowrap"
      icon="pi pi-language"
      variant="text"
      @click="toggleLocalePath"
    />
    <Button
      v-else
      class="flex row text-nowrap"
      icon="pi pi-language"
      :label="name"
      variant="text"
      @click="popover.show($event)"
    />
    <Popover ref="popover">
      <div v-for="(lang, index) in langs" :key="index">
        <Button
          class="flex row items-center text-nowrap w-full"
          :label="lang.label"
          variant="text"
          @click="lang.onSelect"
        />
      </div>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n();
const router = useRouter();
const switchLocalePath = useSwitchLocalePath();

const popover = ref();

const name = computed(() => {
  return locales.value.find((i) => i.code === locale.value)?.name || "";
});

const toggleLocaleCode = computed(() => {
  const i = locales.value.find((i) => i.code !== locale.value);
  return i?.code || locale.value;
});

const toggleLocalePath = () => {
  const toggleCode = toggleLocaleCode.value;
  router.push(switchLocalePath(toggleCode));
};

const langs = computed(() => {
  return locales.value.map((i) => {
    return {
      code: i.code,
      label: i.name || i.code,
      color: locale.value === i.code ? "primary" : "neutral",
      onSelect: () => {
        popover.value.hide();
        router.push(switchLocalePath(i.code));
      },
      click: () => {
        popover.value.hide();
        router.push(switchLocalePath(i.code));
      },
    };
  });
});
</script>
