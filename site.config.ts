
import fs from "fs";
import Avatar from "primevue/avatar";
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
    },
    authors:{
        Robotism:{
            name:'Robotism',
            desc:'全栈开发者',
            avatar: "https://github.com/robotism.png",
            socials:{
                github: "robotism"
            }
        }
    }
}