import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from '../store/index';

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Index",
        component: () =>
            import ("@/views/Index.vue"),
        meta: { requiresAuth: true, keepAlive: true,header: 'none', title: "首页",index:0, }
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/About.vue"),
        meta: { requiresAuth: false, keepAlive: true, title: "关于" }
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import("../views/Login.vue"),
        meta: { requiresAuth: false, title: "登录", header: 'none', footer: 'none' }
    },
    {
        path: "/Change-Password",
        name: "Change-Password",
        component: () =>
            import("../views/Change-Password.vue"),
        meta: { requiresAuth: false, title: "修改密码", header: 'none', footer: 'none' }
    },
    {
        path: "/Pain",
        name: "Pain",
        component: () =>
            import("../views/Pain.vue"),
        meta: { requiresAuth: true,keepAlive: true, title: "病痛百科",index:4 }
    },
    {
        path: "/Pain-details",
        name: "Pain-details",
        component: () =>
            import("../views/Pain-details.vue"),
        meta: { requiresAuth: true,keepAlive: true, title: "病痛详情",index:1 }
    },
    {
        path: "/Product-details",
        name: "Product-details",
        component: () =>
            import("../views/Product-details.vue"),
        meta: { requiresAuth: true,keepAlive: true, title: "商品详情",index:6 }
    },
    {
        path: "/Drug",
        name: "Drug",
        component: () =>
            import("../views/Drug.vue"),
        meta: { requiresAuth: true,keepAlive: true, title: "药品列表",index:2 }
    },
    {
        path: "/Instrument",
        name: "Instrument",
        component: () =>
            import("../views/Instrument.vue"),
        meta: { requiresAuth: true, keepAlive: true,title: "器械专区",index:3 }
    },
    {
        path: "/Personal-Center",
        name: "Personal-Center",
        component: () =>
            import("../views/Personal-Center.vue"),
        meta: { requiresAuth: true,keepAlive: true, title: "个人中心",index:5 }
    },
    
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, form, savedPosition) {
        return { x: 0, y: 0 }
    }
});

// 页面刷新时，重新赋值有没登录
if (window.localStorage.getItem('isLogin')) {
    store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
}
if (window.localStorage.getItem('setIsId')) {
    
    store.commit('setIsId', window.localStorage.getItem('id'));
   
}
if (window.localStorage.getItem('setName')) {
    store.commit("setName", window.localStorage.getItem('name'));
   
}
if (window.localStorage.getItem('setpictureAddr')) {
    
    store.commit("setpictureAddr",window.localStorage.getItem('pictureAddr'));
   
}

if (window.localStorage.getItem('setNick')) {
    
    store.commit("setNick", window.localStorage.getItem('nick'));
   
}
if (window.localStorage.getItem('setPhone')) {
    
    store.commit("setPhone", window.localStorage.getItem('phone'));
   
}


axios.interceptors.response.use(
    response => {
        //当返回信息为未登录或者登录失效的时候重定向为登录页面
        if (response.data.retCode == '401' || response.data.retCode == '201' || response.data.retMsg == '用户未登录') {
            localStorage.removeItem("user")
            Toast("登入失效,请重新登录")
            setTimeout(() => {
                router.push({
                    path: "/login",
                    querry: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
                })
                window.location.reload()
            }, 2000);
        }
        return response;
    },
    error => {
    })

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) { // 判断该路由是否需要登录权限
        if (store.getters.isLogin) { // 通过vuex 如果当前有登录
            next();
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next();
    }
});


export default router;