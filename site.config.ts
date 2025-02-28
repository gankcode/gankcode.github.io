import fs from "fs";

const cname = fs.readFileSync("CNAME", "utf8");

export default {
  site: {
    host: cname,
    url: "https://" + cname,
    logo: "https://github.com/robotism.png",
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
      avatar: "https://github.com/robotism.png",
      socials: {
        github: "https://github.com/robotism",
      },
    },
  },
};
