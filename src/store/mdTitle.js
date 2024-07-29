export default {
    namespaced: true,  //开启namespace:true，该模块就成为命名空间模块了
    state: {
        mdTitleList: [
            {
                name: "CommonJs&ESMoudle",
                imgUrl: "https://s1.imagehub.cc/images/2024/07/29/100bd44287da58eafa087cc1d1450653.md.jpeg",
                title: "CommonJs和ESMoudle",
                time: "2024-07-11 18:43",
                tag: "Nodejs JS ES6",
                desc: "今天我们来深度分析一下 `Commonjs` 和 `Es Module`，希望通过本文的学习，能够让大家彻底明白 `Commonjs` 和 `Es Module` 原理",
            },
            {
                name: "JS_typeConvert",
                imgUrl: "https://s1.imagehub.cc/images/2024/07/15/c519ef23b341cdf5e141464654635fd4.md.jpeg",
                title: "JS-类型转换",
                time: "2024-07-03 21:58",
                tag: "Nodejs JS html Type",
                desc: "在使用JavaScript一些操作符时，会碰到一些隐式类型转换",
            },
            {
                name: "JS_String",
                imgUrl: "https://s1.imagehub.cc/images/2024/07/18/446c66815455a582ac99d8a7d34ea71a.md.jpeg",
                title: "JS-字符串方法",
                time: "2024-07-03 19:35",
                tag: "Nodejs JS html String",
                desc: "总结了一些常用的JavaScript字符串方法，以及使用它们踩过的一些坑",
            },
            {
                name: "gitUse",
                imgUrl: "https://s1.imagehub.cc/images/2024/07/18/12625d128eb2af0db5f185ee7a59a351.jpeg",
                title: "git使用方法",
                time: "2024-06-29 21:33",
                tag: "git Github linux",
                desc: "Git 是一个分布式版本控制系统，广泛用于软件开发和其他版本控制任务。它可以帮助团队协作开发、跟踪代码的历史、更容易地进行版本管理和变更记录。下面是 Git 的基本使用简介:",
            },
            {
                name: "webFont",
                imgUrl: "https://s1.imagehub.cc/images/2024/07/23/25cd24e22ab498af5e22ce1de53b5c8c.jpeg",
                title: "前端字体优化",
                time: "2024-06-27 16:40",
                tag: "vue2 font-spider css",
                desc: "对字体进行一些压缩,以减少服务器压力以及加快客户端访问速度",
            }
        ]
    },
    mutations: {
        setMdInfo(state, mds) {
            state.mdsInfo = mds; // 将选中的 md 存入状态  
        },
        getMdInfo(state, { startInd = 0, gap = 5 }) {
            let mds = [];
            state.mdTitleList.map((md, ind) => {
                if (ind >= startInd && (mds.length - startInd) <= gap) {
                    let obj = {title: md.title, time: md.time, desc: md.desc}
                    mds.push(obj);
                }
            })
            // 直接将 mds 存入状态中  
            state.mdsInfo = mds;
        }
    }
}