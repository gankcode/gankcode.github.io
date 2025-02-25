export default defineI18nLocale(async locale => {
  return {
    welcome: "欢迎光临!",

    nav: {
      "": "首页",
      home: "首页",
      articles: "文章",
      projects: "项目",
      tools: "工具",
      about: "关于",
    },

    ...useRuntimeConfig().public.locales[locale],
  }
})
