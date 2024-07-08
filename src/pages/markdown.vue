<template>
    <div style="height: 100%; padding-top: 50px; box-sizing: border-box;">
        <div class="md">
            <div class="markdown-body" v-highlight v-html="mdContent"></div>    
            <div class="catalog">
                <div class="catalog-container" :id=item.content v-for="(item, index) in catalogContent" :key="index" @click="handleAnchor(item)">
                    <div :class="item.tag" class="listStyle"></div>
                    <div class="catalog-nav" :class="{'navFocus': index === 0}">{{ item.content }}</div>
                </div>
            </div>
        </div>
        <!-- <myFooter></myFooter> -->
    </div>
</template>

<script>
import MarkdownIt from "markdown-it";
// eslint-disable-next-line no-unused-vars
import {debounce} from "../utils/tool.js";
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

    // components: {myFooter},

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
            // eslint-disable-next-line no-unused-vars
            md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
                let tag = tokens[idx].tag;
                if (/^h[1-6]$/.test(tag)) {
                    let id = tokens[idx + 1].content;
                    tokens[idx].attrPush(['id', id]);
                }
                return self.renderToken(tokens, idx, options);
            }

            let re = /<h[1-6](([\s\S])*?)<\/h[1-6]>/g;
            const result = md.render(mymd);
            let nav = result.match(re);
            nav.map((val, ind) => {
                if (val.match(/<h[1-6]\s*[^>]*>(.*?)<\/h[1-6]>/)) {
                    val = val.match(/<(h[1-6])\s*[^>]*>(.*?)<\/h[1-6]>/);
                    nav[ind] = val[1];
                    let tmp = { tag: val[1], content: val[2] };
                    this.catalogContent.push(tmp);
                }
            });
            console.log(this.catalogContent);
            this.mdContent = result;
        },
        handleAnchor(item) {
            const navTitle = document.getElementById(item.content);
            navTitle.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        },
        handleMdScroll() {
            const md = document.querySelector('.markdown-body');
            let titleOffsetTops = [];
            let tag = 0; // 记录当前内容所在第几个区域来减少无用的dom获取操作
            for (let item of this.catalogContent) {
                let mdtitle = document.querySelector(`.markdown-body #${item.content}`);
                titleOffsetTops.push(mdtitle.offsetTop);
            }
            md.addEventListener('scroll', () => {
                let mdScrollTop = md.scrollTop;
                for (let i = 0; i < titleOffsetTops.length-1; i++){
                    if ( tag !== i && mdScrollTop >= titleOffsetTops[i] && mdScrollTop < titleOffsetTops[i + 1]) {
                        let target = document.querySelector(`.catalog #${this.catalogContent[i].content} .catalog-nav`);
                        let navFocus = document.querySelector('.navFocus');
                        navFocus.classList.remove('navFocus');
                        target.classList.add('navFocus');
                        tag = i;
                    }
                }
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
    background-color: rgba(255, 255, 255, .6);
    width: 100%;
    height: 100%;
    grid-template-columns: [c1] 20% [c2] 60% [c3] 20% [c4];
    /deep/ .markdown-body {
        grid-column: 2/3;
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
        color: rgba(83, 83, 83, 1);
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
        padding-left: 10px;
        font-size: @catalog-font;
        height: max-content;
        align-self: center;
        justify-self: end;
        margin-right: 30%;
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
                line-height: 16px;
                color: rgba(83, 83, 83, 1);
                list-style: none;
                margin: 10px 0;
                opacity: 0;
                transition: opacity .3s linear;
                &:hover {
                    opacity: .5;
                }
            }
            .navFocus {
                opacity: 1;
            }
        }
    }
}
</style>