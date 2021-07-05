<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <Header v-if="$route.meta.header !== 'none'" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    <v-loading v-if="isLoading"></v-loading>
  </div>
</template>
<script>
import Header from "./components/common/Header2";

export default {
  name: "App",
  components: {
    Header,
  },
  computed: {
  },
  data() {
    return {
      isLoading: this.$store.getters.isLoading
    };
  },
  created() {},
  mounted() {
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
      this.$store.commit("setIsLogin", false);
      localStorage.setItem("isLogin", false);
    });
  },
  methods: {
     delay(){
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
        }
  },
  watch: {//使用watch 监听$router的变化
    isLoading:{
      
    }
  },
  
};
</script>

<style lang="less">
@import "./style/base.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
