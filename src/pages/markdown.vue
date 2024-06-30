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
// import markdownItAnchor from 'markdown-it-anchor';
// import markdownItTocDoneRight from 'markdown-it-toc-done-right';
// .use(markdownItAnchor, {
//                 permalinkBefore: false,//这些有需要就去看文档吧
//                 tabIndex: true
//             })
//             .use(markdownItTocDoneRight, {
//                 containerClass: 'toc',//生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
//                 containerId: 'toc',//生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
//                 listType: 'ul',//导航列表使用ul还是ol
//                 listClass: 'listClass',//li标签的样式名
//                 linkClass: 'linkClass',//a标签的样式名
//                 callback: function (html,) {
//                     //把目录单独列出来
//                     that.$refs.reference.innerHTML = html;
//                 }
//             })

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
    },
    mounted() {
        const mdName = this.$route.query.mdName;
        const mdUrl = '/posts/' + mdName + '.md';
        this.loadFile(mdUrl)
            .then(data => {
                this.renderMarkdown(data);
            })
            .catch(error => {
                throw error;
            })
    },

    methods: {
        // addMdId(data) {
            
        // },
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
            // const that = this;
            const md = new MarkdownIt({
                html: true, //源码中启用HTML标签
                xhtmlOut: true, //使用‘/’来闭合单标签
                linkify: true //将类似URL的文本自动转换为链接
            });
            // md.renderer.rules.heading_open = function (tokens) {
            //     console.log(tokens);
            //     // const token = tokens[idx];
            //     // switch (token.tag) {
            //     // case 'h1':
            //     //     token.attrPush(['class', 'custom-class-h1']);
            //     //     break;
            //     // case 'h2':
            //     //     token.attrPush(['class', 'custom-class-h2']);
            //     //     break;
            //     // // 添加其他标题标签的样式
            //     // }
                
            //     // return self.renderToken(tokens, idx, options);
            // };

            let re = /<h[1-6](([\s\S])*?)<\/h[1-6]>/g;
            const result = md.render(mymd);
            let nav = result.match(re);
            nav.map((val, ind) => {
                val = val.match(/<h[1-6]>(.*?)<\/h[1-6]>/)[1];
                // console.log(val);
                nav[ind] = val;
            });
            console.log(nav);
            this.mdContent = result;
            console.log(result);
        }

    }
};
</script>

<style lang="less" scoped>
   .md {
    display: grid;
    column-gap: 20px;
    /deep/ .markdown-body {
        width: 70%;
        overflow: scroll;
        height: 85vh;
        font-size: 18px;
        padding: 0 2%;
        background-color: rgba(255, 255, 255, .6);
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
        background-color: rgba(255, 255, 255, .6);
        .catalog {
                margin: 0;
                padding-bottom: 10px;
                font-weight: 600;
                border-bottom: 1px solid var(--color-gray);
            }
        
        /deep/ .catalog-content {
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

            .listClass,
            .linkClass {
                list-style: none;
                text-decoration: none;
                color: rgba(103, 103, 103, 1);
            }
            .listClass {
                padding-left: 20px;
            }
    
        }
    }
   }
</style>