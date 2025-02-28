// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

import appconfig from "./site.config";

export default defineNuxtConfig({
  compatibilityDate: "2025-02-19",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  runtimeConfig: {
    public: {
      ...appconfig,
    },
  },
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxt/ui",
    "nuxt-quasar-ui",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
  ],
  srcDir: "src/",
  routeRules: {
    "/": { prerender: true },
  },
  site: {
    url: appconfig.site.url,
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "dark", // fallback value if not system preference found
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage", // or 'sessionStorage' or 'cookie'
    storageKey: "nuxt-color-mode",
  },
  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,
      },
    },
  },
  googleFonts: {
    families: {
      Roboto: true,
      Inter: [400, 700],
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
      "Crimson Pro": {
        wght: "200..900",
        ital: "200..700",
      },
    },
  },
  i18n: {
    baseUrl: appconfig.site.url,
    strategy: "prefix_and_default",
    locales: [
      {
        code: "en",
        name: "English",
        files: ["en-US.ts"],
      },
      {
        code: "zh",
        name: "中文",
        files: ["zh-CN.ts"],
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      redirectOn: "root", // all, root, no prefix
    },
    defaultLocale: `en`,
    lazy: true,
  },
  css: ["~/assets/css/app.css"],
  quasar: {
    lang: "en-US",
    plugins: [
      "Dark",
      "Notify",
      "Dialog",
      "Loading",
      "LoadingBar",
      "BottomSheet",
      "AppVisibility",
      "AppFullscreen",
      "LocalStorage",
      "SessionStorage",
    ],
    extras: {
      animations: "all",
      font: "roboto-font",
      fontIcons: [
        "bootstrap-icons",
        "ionicons-v4",
        "line-awesome",
        "material-icons",
        "material-icons-outlined",
        "material-icons-round",
        "material-icons-sharp",
        "material-symbols-outlined",
        "material-symbols-rounded",
        "material-symbols-sharp",
        "mdi-v7",
        "themify",
      ],
    },
  },
  content: {},
});
