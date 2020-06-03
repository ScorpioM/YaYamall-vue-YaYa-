import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./js/cookie";
import './config/rem';

// 设置title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import { Button } from 'vant';
Vue.use(Button)

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
import axios from 'axios';
Vue.prototype.$http = axios;
const requestApi = "/wllxApi";
axios.defaults.baseURL = requestApi; // 配置axios请求的地址
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");