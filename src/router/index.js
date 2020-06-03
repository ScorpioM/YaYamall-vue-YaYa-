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
        meta: { requiresAuth: false, keepAlive: true }
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("../views/About.vue"),
        meta: { requiresAuth: false, keepAlive: true }
    }
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

// 页面刷新时，重新赋值有没登录
if (window.localStorage.getItem('isLogin')) {
    store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
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
        return Promise.reject(error)
    })

router.beforeEach((to, from, next) => {
    console.log(store.getters.isLogin);
    if (to.matched.some(r => r.meta.requiresAuth)) { // 判断该路由是否需要登录权限
        console.log(store.getters.isLogin);
        if (store.getters.isLogin) { // 通过vuex 如果当前有登录
            next();
        } else {
            console.log("没有登录吖")
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
});


export default router;