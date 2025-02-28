<template>
  <div class="flex row flex-nowrap items-center">
    <img
      :src="$env.site.logo"
      :alt="$env.site.logo"
      class="hidden md:flex h-[24px] w-[24px] mr-2 rounded-full outline-2 outline-offset-1 outline-cyan-500"
    />
    <NuxtLinkLocale
      to="/"
      class="cursor-pointer bg-gradient-to-r bg-clip-text text-transparent text-xl font-bold"
      :class="[
        'from-amber-500 to-pink-500',
        'hover:from-pink-500 hover:to-amber-500',
      ]"
    >
      {{ $t("app.name") }}
    </NuxtLinkLocale>
  </div>
</template>

<script lang="ts" setup></script>
