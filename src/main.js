import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./js/cookie";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.prototype.$store = store;
import "./config/rem";
import "font-awesome/css/font-awesome.min.css";
// 注册全局组件
import Dialog from "./components/dialog/dialog.vue";
Vue.component("Dialog", Dialog);
// 设置title
import VueWechatTitle from "vue-wechat-title";
Vue.use(VueWechatTitle);
Vue.use(MintUI);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import moment from "moment"; //导入文件

Vue.prototype.$moment = moment; //赋值使用
import Loading from "./components/common/Loading.vue";
Vue.component("v-loading", Loading);
import { Button } from "vant";
Vue.use(Button);
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import scroll from "vue-seamless-scroll";
Vue.use(scroll);
import axios from "axios";
Vue.prototype.$http = axios;
const requestApi = "/requestApi";
axios.defaults.baseURL = requestApi; // 配置axios请求的地址
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common["Authorization"] = ""; // 设置请求头为 Authorization

router.beforeEach((to, from, next) => {
  store.commit("setIsLoading", false);

  next();
});

router.afterEach((to, from) => {
  setTimeout(() => {
    store.commit("setIsLoading", JSON.parse(JSON.stringify(false)));
  }, 1000);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
