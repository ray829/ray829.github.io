<template>
    <div style="height: 100%; box-sizing: border-box;">
        <div class="md">
            <div class="markdown-body" v-highlight v-html="mdContent" ref="markdownBody"></div>
            <div class="catalog">
                <div class="catalog-container" :id="item.id" v-for="(item, index) in catalogContent" :key="index"
                    @click="handleAnchor(item.id)">
                    <div :class="item.tag" class="listStyle"></div>
                    <div class="catalog-nav" :ref=item.id :class="{'navFocus': index === 0}">{{ item.content }}</div>
                </div>
                <i class="iconfont icon-chevron_down"></i>
            </div>
        </div>
        <!-- <myFooter></myFooter> -->
    </div>
</template>

<script>
import MarkdownIt from "markdown-it";
// eslint-disable-next-line no-unused-vars
import { debounce } from "../utils/tool.js";
// import myFooter from "@/components/myFooter.vue";
import 'github-markdown-css';

export default {
    name: 'CyberloafingMarkdown',

    data() {
        return {
            mdContent: '',
            catalogContent: [],
        };
    },
    computed: {

    },
    created() {
        const mdName = this.$route.query.mdName;
        const mdUrl = '/posts/' + mdName + '.md';
        this.loadFile(mdUrl)
            .then(data => {
                this.renderMarkdown(data);
            })
            .then(() => {
                this.handleMdScroll();
            })
            .catch(error => {
                throw error;
            })
    },
    mounted() {

    },

    methods: {
        genID(length) {
            if (length < 3) {
                console.warn('The ID length is too short！');
            }
            return 'md' + Number(Date.now() + Math.random().toString().slice(3, length)).toString(36);
        },
        loadFile(filePath) {
            return fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to load Markdown file');
                }
                return response.text();
            })
            .then(data => {
                // console.log('file', data);
                return data;
            })
            .catch(error => {
                console.error(error);
                throw error;
            });
        },
        renderMarkdown(mymd) {
            const md = new MarkdownIt({
                html: true, //源码中启用HTML标签
                xhtmlOut: true, //使用‘/’来闭合单标签
                linkify: true //将类似URL的文本自动转换为链接
            });
            const _this = this;
            // eslint-disable-next-line no-unused-vars
            md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
                let tag = tokens[idx].tag;
                if (/^h[1-6]$/.test(tag)) {
                    // let id = tokens[idx + 1].content;
                    let id = _this.genID(5);
                    tokens[idx].attrPush(['id', id]);
                }
                return self.renderToken(tokens, idx, options);
            }

            let re = /<h[1-6](([\s\S])*?)<\/h[1-6]>/g;
            const result = md.render(mymd);
            let nav = result.match(re);
            nav.map((val, ind) => {
                if (val.match(/<h[1-3]\s*[^>]*>(.*?)<\/h[1-3]>/)) {
                    val = val.match(/<(h[1-3])\s+[^>]*id=["']?([^"'>]+)["']?[^>]*>(.*?)<\/h[1-3]>/);
                    nav[ind] = val[1];
                    let tmp = { tag: val[1], id: val[2], content: val[3] };
                    this.catalogContent.push(tmp);
                }
            });
            // console.log(this.catalogContent);
            this.mdContent = result;
        },
        handleAnchor(id) {
            const navTitle = document.querySelector(`.markdown-body #${id}`);
            navTitle.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        },
        navClassHandle(val) {
            let target = this.$refs[this.catalogContent[val].id][0];
            let navFocus = document.querySelector('.navFocus');
            navFocus.classList.remove('navFocus');
            target.classList.add('navFocus');
        },
        handleMdScroll() {
            const md = this.$refs.markdownBody;
            let titleOffsetTops = [];
            let tag = 0; // 记录当前内容所在第几个区域来减少无用的dom获取操作
            let scrollTopPre = 0; //记录上一次滚动长度,以判断当前向上还是向下滚动
            for (let item of this.catalogContent) {
                let mdtitle = document.querySelector(`.markdown-body #${item.id}`);
                titleOffsetTops.push(mdtitle.offsetTop);
            }
            // console.log('itemOffsetTops',titleOffsetTops);
            let len = titleOffsetTops.length - 1;
            md.addEventListener('scroll', () => {
                let mdScrollTop = md.scrollTop;
                //判断是否滚动到最底部
                if (mdScrollTop > (md.scrollHeight - md.clientHeight - 2) && tag !== len) { 
                    tag = len;
                    // console.log(tag);
                    this.navClassHandle(tag);
                } else if (mdScrollTop >= scrollTopPre && mdScrollTop >= titleOffsetTops[tag+1]) { //若向下滚动且超过当前区域下边界
                    tag++;
                    // console.log(tag);
                    this.navClassHandle(tag);
                } else if (mdScrollTop < scrollTopPre && mdScrollTop < titleOffsetTops[tag]) { //若向上滚动且超过当前区域上边界
                    tag = --tag < 0 ? 0 : tag;
                    // console.log(tag);
                    this.navClassHandle(tag);
                }
                scrollTopPre = mdScrollTop;
             });
        }
    }
};
</script>

<style lang="less" scoped>
@catalog-font: 16px;
    .h1 {
        width: 22px;
        margin-right: 8px;
    }
    .h2 {
        width: 16px;
        margin-right: 14px;
    }
    .h3 {
        width: 12px;
        margin-right: 16px;
    }
   .md {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: [c1] 70% [c2] 30% [c3];
    /deep/ .markdown-body {
        grid-column: 1/2;
        width: 100%;
        height: 100%;
        position: relative; //这里加定位，是为了更方便的处理offetTop值
        justify-self: center;
        box-sizing: border-box;
        overflow: scroll;
        font-size: 18px;
        padding-bottom: 100px;
        background-color: transparent;
        border-radius: 5px;
        color: rgb(56, 56, 56);
        h1, h2, h3, h4, h5, h6 {
            border-bottom-width: 0;
            cursor: default;
        }
        p {
            cursor: default;
        }
        h1 {
            text-align: center;
            margin-top: 20px !important;
        }
        &::-webkit-scrollbar {
            display: none;
        }
        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-color: transparent;
            border-radius: 10px;
            border-width: 4px;
            background-clip: padding-box;
        }
        &:hover::-webkit-scrollbar-thumb {
            background: #bfbfbf;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: var(--scroll-hover-color);
            background-clip: border-box;
        }

        &::-webkit-scrollbar-corner {
            display: none;
        }
    }
    .catalog {
        position: relative;
        font-size: @catalog-font;
        height: max-content;
        max-height: 400px;
        overflow-y: scroll;
        align-self: center;
        justify-self: end;
        margin-right: 10%;
        &::-webkit-scrollbar {
                display: none;
        }
        .catalog-container{
            display: flex;
            align-items: center;
            cursor: pointer;
            .listStyle {
                display: inline-block;
                height: calc(@catalog-font / 4);
                background-color: rgba(83, 83, 83, .5);
                border-radius: 5px;
            }
            .catalog-nav {
                display: inline-block;
                line-height: 17px;
                color: rgba(83, 83, 83, .8);
                list-style: none;
                margin: 10px 0;
                // opacity: 0;
                transition: opacity .2s linear;
                &:hover {
                    color: rgb(4, 138, 247);
                }
            }
            .navFocus {
                color: rgb(4, 138, 247);
            }
        }
        i {
            position: absolute;
            font-size: 20px;
        }
    }
}
</style>