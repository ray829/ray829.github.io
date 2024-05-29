import Hljs from 'highlight.js';
// import '../../node_modules/highlight.js/styles/arduino-light.css' //light
// import '../../node_modules/highlight.js/styles/darcula.css'; //dark
import '../../node_modules/highlight.js/styles/obsidian.css';

const Highlight = {};
//自定义插件
Highlight.install = function (Vue) {
    //自定义指令v-highlight
    Vue.directive('highlight', {
        //绑定元素插入父节点时调用
        inserted: function (el) {
            const blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++){
                Hljs.highlightBlock(blocks[i]);
            }
        },
        // 指令所在组件的VNode及其子VNode全局更新后调用
        componentUpdated: function (el) {
            const blocks = el.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                Hljs.highlightBlock(blocks[i])
            }
        }
    });
}

export default Highlight