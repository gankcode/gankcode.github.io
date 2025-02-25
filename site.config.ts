
import fs from "fs";
const cname = fs.readFileSync("CNAME", "utf8");

export default {
    site: {
        url: "https://" + cname,
    },
    locales: {
        en: {
            app:{
                name:'GankCode'
            }
        },
        zh: {
            app:{
                name:'攻克代码'
            }
        }
    }
}