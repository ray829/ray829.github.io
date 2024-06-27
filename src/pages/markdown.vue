<template>
    <div class="md">
        <div class="markdown-body" v-highlight v-html="mdContent"></div>
        <el-card class="markdown-toc">
            <h3 class="catalog">目录</h3>
            <div ref="reference" class="catalog-content"></div>
        </el-card>
    </div>
    
</template>

<script>
import MarkdownIt from "markdown-it";
import 'github-markdown-css';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';

export default {
    name: 'CyberloafingMarkdown',

    data() {
        return {
            mdContent: '',
        };
    },

    computed: {

    },
    created() {
    },
    mounted() {
        const mdName = this.$route.query.mdName;
        const mdUrl = '/posts/' + mdName + '.md';
        console.log(__dirname);
        this.loadFile(mdUrl)
        .then(data => {
            // console.log(data);
            // const md = new MarkdownIt({
                //     html: true, //可以识别html
                //     linkify: true,//自动检测像链接的文本
                //     breaks: true,//回车换行
                //     typographer: true,//优化排版，标点
                // });
                // this.mdContent = md.render(data);
                this.renderMarkdown(data);
            })
            .catch(error => {
                throw error;
            })
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
            const that = this;
            const md = new MarkdownIt().use(markdownItAnchor, {
                permalink: markdownItAnchor.permalink.ariaHidden({
                    placement: 'before'
                }),
                permalinkBefore: false//这些有需要就去看文档吧
            })
            .use(markdownItTocDoneRight, {
                containerClass: 'toc',//生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
                containerId: 'toc',//生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
                listType: 'ul',//导航列表使用ul还是ol
                listClass: 'listClass',//li标签的样式名
                linkClass: 'linkClass',//a标签的样式名
                callback: function (html,) {
                    //把目录单独列出来
                    that.$refs.reference.innerHTML = html;
                }
            })
            // const result = md.render(this.markdown)
            const result = md.render(mymd);
            // console.log(result);
            this.mdContent = result;
        }

    }
};
</script>

<style lang="less" scoped>
   .md {
    display: grid;
    column-gap: 20px;
    /deep/ .markdown-body {
        width: 73%;
        overflow: scroll;
        height: 85vh;
        padding-right: 1%;
        background-color: transparent;
        color: rgb(34, 35, 35);
        h1, h2, h3, h4, h5, h6 {
            border-bottom-width: 0;
        }
        &::-webkit-scrollbar {
            width: 9px;
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
            // background: #bfbfbf;
        }
    }
    .markdown-toc {
        width: calc(25% - 20px);
        max-height: 300px;
        border-width: 0;
        position: fixed;
        right: 0;
        background-color: var(--card-mask-color);
        .catalog {
                margin: 0;
                padding-bottom: 10px;
                font-weight: 600;
                border-bottom: 1px solid var(--color-gray);
            }
        
        /deep/.catalog-content {
            color: var(--font-color);
            font-weight: inherit;
            font-weight: 300;
            font-size: 1rem;
    
            a {
                display: inline-block;
                font-size: 1.3rem;
                font-weight: 400;
                margin-bottom: 8px;
            }
    
        }
    }
   }
</style>