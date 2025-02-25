<template>
  <div class="flex row items-center">
    <Image
      src="https://github.com/robotism.png"
      alt="logo"
      class="hidden md:flex mx-2 rounded-full outline-2 outline-offset-1 outline-cyan-500 h-[32px] w-[32px]"
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
