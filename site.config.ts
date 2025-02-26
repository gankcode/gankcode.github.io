import type { _height } from "#tailwind-config/theme";
import fs from "fs";

const cname = fs.readFileSync("CNAME", "utf8");

export default {
  site: {
    host: cname,
    url: "https://" + cname,
    github: "https://github.com/robotism",
  },
  style: {
    header: {
      height: "64px",
    },
    footer: {
      height: "48px",
    },
  },
  locales: {
    en: {
      app: {
        name: "GankCode",
      },
    },
    zh: {
      app: {
        name: "攻克代码",
      },
    },
  },
  authors: {
    Robotism: {
      name: "Robotism",
      desc: "全栈开发者",
      avatar: "https://github.com/robotism.png",
      socials: {
        github: "https://github.com/robotism",
      },
    },
  },
};
