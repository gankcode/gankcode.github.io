export default defineI18nLocale(async locale => {
  return {
    welcome: "Welcome!",
    nav: {
      "":"home",
      home: "Home",
      articles: "Articles",
      projects: "Projects",
      tools: "Tools",
      about: "About",
    },
    articles: {
      readMore: "Read More",
    },
    ...useRuntimeConfig().public.locales[locale],
  }
})
