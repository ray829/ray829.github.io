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
    height: 100%;
    grid-template-columns: [c1] 75% [c2] auto [c3];
    grid-template-rows: 1fr;
    overflow: scroll;
    column-gap: 20px;
    .markdown-body {
        background-color: var(--card-mask-color);
        color: rgba(77, 86, 86, 1)
    }
    .markdown-toc {
        background-color: var(--card-mask-color);
    }
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
</style>