import moment from "moment";

import "moment/dist/locale/en-gb";

if (!moment.locales().includes("en")) {
  moment.defineLocale("en", {
    parentLocale: "en-gb",
  });
}

export default defineI18nLocale(async (locale) => {
  return {
    welcome: "Welcome!",
    nav: {
      "": "home",
      home: "Home",
      articles: "Articles",
      projects: "Projects",
      tools: "Tools",
      about: "About",
    },
    articles: {
      readMore: "Read More",
      notFound: "Page not found",
      noContent: "Oops! The content you're looking for doesn't exist.",
    },
    tools: {
      online: "Online Tools",
      regex: "Regex",
      certinfo: "Certinfo",
    },
    ...useRuntimeConfig().public.locales[locale],
  };
});
