<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <button @click="btn" class="btn">登录</button>

    <el-select v-model="value" placeholder="请选择" @change="selectChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>
<style lang="less" scoped>
.btn {
  width: 100px;
  height: 50px;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      username: "",
      password: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  created() {
    // this.$setCookie("token", "123456", 1);
    console.log(this.$getCookie("token"));
    console.log(this.$store.getters.isLogin);
  },
  methods: {
    btn() {
      var list = {};
      if (this.username !== "" && this.password !== "") {
        this.$http
          .post(
            "login?username=" + this.username + "&password=" + this.password
          )
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              // 触发setIsLogin方法改变vuex中isLogin的值，
              this.$store.commit("setIsLogin", true);
              console.log(this.$store.getters.isLogin);
              this.$setCookie("token", res.data.token);
              // 改变localStorage中isLogin的值，
              window.localStorage.setItem("isLogin", true);
              // Cookies.set('Token', response.data.token)
              this.$router.push({ path: "/home" });
            }
          });
      } else {
        console.log("请输入账号和密码");
      }
      console.log(this.$store.getters.isLogin);
    },
    selectChange(event) {
      console.log(event);
    }
  },
  mounted() {}
};
</script>
