import moment from "moment";
import "moment/dist/locale/zh-cn";

import quasarLangZh from "quasar/lang/zh-CN.js";

if (!moment.locales().includes("zh")) {
  moment.defineLocale("zh", {
    parentLocale: "zh-cn",
  });
}

export default defineI18nLocale(async (locale) => {
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
    articles: {
      readMore: "阅读更多",
      notFound: "页面不存在",
      noContent: "哎呀! 您访问的页面不存在。",
      previous: "上一篇",
      next: "下一篇",
    },
    tools: {
      search: "搜索",
      online: "在线工具",
      regex: "正则表达式",
      certinfo: "证书信息",
    },
    quasar: {
      ...quasarLangZh,
    },
    ...useRuntimeConfig().public.locales[locale],
  };
});
