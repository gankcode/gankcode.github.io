// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";

import appconfig from "./site.config";


export default defineNuxtConfig({
  compatibilityDate: '2025-02-19',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
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
    "@primevue/nuxt-module",
    "@nuxt/ui",
  ],
  srcDir: "src/",
  routeRules: {
    "/": { prerender: true },
  },
  site: {
    url: appconfig.site.url,
  },
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in", // default
    },
    layoutTransition: {
      name: "fade",
      mode: "out-in", // default
    },
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
        // ...
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
    strategy: "prefix_and_default",
    // strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name:"English",
        file: 'en-US.ts'
      },
      {
        code: "zh",
        name:"中文",
        file: 'zh-CN.ts'
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true,
      redirectOn: "root", // all, root, no prefix
    },
    defaultLocale:  `en`,
    lazy: true,
  },
  css: ["~/app.css"],
  tailwindcss: {
    cssPath: ["~/app.css", { injectPosition: "first" }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },
  primevue: {
    options: {
      theme: {
        // preset: Aura,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
    composables: {
      include: ["*"],
      exclude: ["useToast"],
    },
    directives: {
      include: "*",
    },
  },
  content: {
  },
});
