import Vue from "vue";
import Vuex from "vuex";
import mdTitle from "./mdTitle";
import loadingState from "./loadingState";

Vue.use(Vuex)

//准备actions对象--响应组件中用户的动作
// const actions = {}

//准备mutations对象--修改state中的数据
// const mutations = {}

//准备state对象--保存具体的数据
// const state = {}

//创建并暴露sotre
export default new Vuex.Store({
    // actions: actions,
    // mutations: mutations,
    // state: state,

    //当对象名和键值相同时可以省略
    // actions,
    // mutations,
    // state,
    modules: {
        mdTitle,
        loadingState
    },
})