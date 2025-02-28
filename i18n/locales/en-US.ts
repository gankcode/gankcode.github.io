import moment from "moment";
import "moment/dist/locale/en-gb";

import quasarLangEn from "quasar/lang/en-US.js";

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
      previous: "Previous",
      next: "Next",
    },
    tools: {
      search: "Search",
      online: "Online Tools",
      regex: "Regex",
      certinfo: "Certinfo",
    },
    quasar: {
      ...quasarLangEn,
    },
    ...useRuntimeConfig().public.locales[locale],
  };
});
