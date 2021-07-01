<template>
  <div class="sign-box">
    <Swiper class="swiper" />
    <div class="logo">
      <div class="container">
        <img src="../assets/img/login/logo2.png" alt />
      </div>
    </div>
    <div class="container">
      <div class="SignIn">
        <div class="header-title">
          <div>欢迎登陆</div>
          <span>YaYa药师药房</span>
        </div>
        <el-tabs v-model="activeName" >
          <el-tab-pane label="账号密码登录" name="name1">
            <div class="input-box">
              <!-- <label>账号</label> -->
              <el-input
                v-model="form.name"
                placeholder="请输入账号/手机号"
              ></el-input>
              <img class="user" src="../assets/img/login/user.png" alt="" />
            </div>
            <div class="input-box">
              <!-- <label>密码</label> -->
              <el-input
                @keyup.enter.native="signIn"
                v-model="form.password"
                show-password
                placeholder="请输入密码"
              ></el-input>
              <img
                class="passward"
                src="../assets/img/login/password.png"
                alt=""
              />
            </div>
          </el-tab-pane>
          <div class="Sign_box">
            

           
            <div
              class="Sign_in"
              @click="signIn"
              :style="
                form.userName == '' || form.passWord == ''
                  ? ''
                  : 'box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);'
              "
            >
              登录
            </div>
           
          </div>
          <div class="back-box clearfix">
            <router-link tag="div" to="/Change-Password" class="back-password"
              >注册新用户</router-link
            >
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/login/Swiper";
export default {
  name: "SignIn",
  components: { Swiper },
  data() {
    return {
      dialogVisible: true,
      activeName: "name1",
      form: {
        name: "",
        password: "",
        
      },
      codeNumber: 60,
      codeFlag: false,
      codeSetInterval: "",
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {},
    
    // 登录
    signIn() {
      if (this.form.name == "" || this.form.password == ""
      ) {
        return;
      }
      
        this.$http
          .post("/mt/users/login", {
            nick: this.form.name,
            password: this.form.password,
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$store.commit("setIsLogin", true);
              this.$store.commit("setIsId", res.data.data.id);
              this.$store.commit("setName", res.data.data.name);
              this.$store.commit("setpictureAddr", res.data.data.pictureAddr);
              this.$store.commit("setNick", res.data.data.nick);
              this.$store.commit("setPhone", res.data.data.phone);


  
              localStorage.setItem("isLogin",true)
              localStorage.setItem("id",res.data.data.id)
              localStorage.setItem("nick",res.data.data.nick)
              localStorage.setItem("phone",res.data.data.phone)
              localStorage.setItem("pictureAddr",res.data.data.pictureAddr)
              localStorage.setItem("name",res.data.data.name)
              localStorage.setItem("email",res.data.data.email)
              localStorage.setItem("password",res.data.data.password)
              
 this.$router.push({
                    path: "/",
                   
                })
            } else {
              this.$message({
                showClose: true,
                message:"账号或密码错误",
                type: "error",
              });
            }
          });
      
      
    },
    // 跳转
    jump(flag) {
      if (flag == 1) {
        this.$emit("dialogVisibleShow", "忘记密码");
      } else {
        this.$emit("dialogVisibleShow", "注册");
      }
    },
    
    socket(){
      
      if (typeof WebSocket != 'undefined') {
          console.log("您的浏览器支持Websocket通信协议")
      } else {
          alert("您的浏览器不支持Websocket通信协议，请使用Chrome或者Firefox浏览器！")
          return
      }
       // 需要判断浏览器是否支持webSocket  不支持 则直接放弃连接策略
	   var client = Stomp.client('ws://172.18.0.31:15674/ws');
	  
	  // 连接得routing key    可设置 用户唯一id 或者其他
	   var clientid='test1'
	  
	   //回调成功
      var on_connect = function(x) {
          id = client.subscribe("/topic/"+clientid, function(d) {
			  alert(d.body);
			  // 关闭连接
			  client.disconnect();
          });
      };
	  // 连接失败 // 需要编写连接重试  https://www.pianshen.com/article/40391626911/  可参考
      var on_error =  function() {
		alert("error");
      };
	  // 创建stomp连接
      client.connect('yunpan', 'yunpan', on_connect, on_error, '/');
    },
  },
  mounted() {},
  watch: {
    codeNumber(val1, val2) {
      if (this.codeNumber == 0) {
        this.codeNumber = 60;
        this.codeFlag = false;
        window.clearTimeout(this.codeSetInterval);
      }
    },
  },
};
</script>
<style lang="less">
.sign-box {
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  > .swiper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  > .logo {
    position: fixed;
    top: 10%;
    left: 30%;
    transform: translate(-50%, -50%);
    img {
      width: 357px;
      height: 77px;
    }
  }
  > .container {
    width: 1200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > .SignIn {
      z-index: 9;
      position: absolute;
      top: 50%;
      right: 0%;
      transform: translate(0%, -50%);
      width: 496px;
      height: 526px;
      background: #fff;
      border-radius: 5px;
      padding: 0 43px;
      box-sizing: border-box;
      box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.12);

      > .header-title {
        margin-bottom: 20px;
        padding: 34px 0 17px 0;
        text-align: left;
        > span {
          opacity: 0.4;
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          text-align: left;
          color: #000000;
          letter-spacing: 2px;
        }
        > div {
          font-size: 36px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          text-align: left;
          color: #3d78ff;
          letter-spacing: 4px;
          margin-bottom: 5px;
        }
      }

      > .el-tabs {
        .el-tabs__item.is-active {
          color: #3d78ff;
        }
        .el-tabs__item {
          padding: 0 145px 0 0;
          font-size: 18px;
          color: #262626;
        }
        .el-tabs__item:nth-last-child(1) {
          padding-right: 0;
        }
        .el-tabs__active-bar {
          height: 3px;
          border-radius: 6px;
          background-color: #3d78ff;
        }
        .el-input__inner {
          height: 42px;
          padding: 0 55px;
        }
        // .el-tabs__header {
        //   padding: 0 20px;
        // }
        // .el-tabs__content {
        //   padding: 0 20px;
        // }
      }
      .input-box {
        margin: 10px 0 32px 0;
        position: relative;
        text-align: left;
        > label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          color: #262626;
        }
        > .user {
          position: absolute;
          top: 10px;
          left: 15px;
        }
        > .passward {
          position: absolute;
          top: 10px;
          left: 15px;
        }
        > .verify {
          > .el-input__inner {
            padding: 0 15px;
          }
        }
        > .code {
          width: 236px;
        }
        > .code.el-input__inner {
          padding: 0 15px;
        }
        > .getCode {
          cursor: pointer;
          float: right;
          width: 124px;
          height: 42px;
          background: #6b70ff;
          border-radius: 4px;
          text-align: center;

          font-size: 14px;
          line-height: 42px;
          color: #fff;
        }
      }
      .input-box:nth-child(2) {
        margin-bottom: 48px;
      }
      .Sign_box {
        position: relative;
        > .sign_opacity {
          position: absolute;
          z-index: 9;
          top: 0;
          width: 100%;
          height: 42px;
          opacity: 0.75;
          background: #ffffff;
        }
        > .Sign_in {
          cursor: pointer;
          overflow: hidden;
          margin-top: 20px;
          height: 42px;
          background: #3d78ff;
          border-radius: 4px;

          text-align: center;
          font-size: 16px;
          font-weight: 500;
          line-height: 42px;
          color: #fff;
        }
      }
      .back-box {
        padding-top: 40px;
        font-size: 14px;
        color: #666666;
        > div {
          cursor: pointer;
        }
        > div:nth-child(1) {
          float: right;
        }
        > div:nth-child(2) {
          float: right;
        }
      }
    }
  }
}
</style>