import Vue from "vue";
import VueRouter from "vue-router";

import App from "@/App.vue";
import homePage from "@/pages/homePage.vue";
// import Photos from "@/pages/Photos.vue";
import dayLog from '@/pages/dayLog';
import about from "@/pages/about.vue";
import Timeline from '@/pages/Timeline';
import markdown from '@/pages/markdown';
import NotFound from '@/pages/NotFound';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: '/',
        component: App,
    },
    {
        path: '/home',
        name: 'home',
        component: homePage,
    },
    {
        path: '/photo',
        name: 'photo',
        component: () => import('../pages/Photos'),
    },
    {
        path: '/daylog',
        name: 'daylog',
        component: dayLog,
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: Timeline,
    },
    {
        path: '/markdown',
        name: 'markdown',
        component: markdown,
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    {
        path: '/404',
        name: 'NotFound',
        component: NotFound,
        meta: {title: '页面走丢了'}
    }
]

const router = new VueRouter({
    routes, //缩写，相当于routes: routes
})


export default router