<template>
  <div class="Sign-in">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="密码登录" name="name1">
        <div class="input-box">
          <label>账号</label>
          <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
        </div>
        <div class="input-box">
          <label>密码</label>
          <el-input
            @keyup.enter.native="signIn"
            v-model="form.passWord"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="短信登录" name="name2">
        <div class="input-box">
          <label>手机号</label>
          <el-input v-model="form.phoneNumber" placeholder="请输入手机号"></el-input>
        </div>
        <div class="input-box">
          <label>验证码</label>
          <el-input
            @keyup.enter.native="signIn"
            class="code"
            placeholder="输入验证码"
            v-model="form.code"
            clearable
          ></el-input>
          <div
            class="getCode"
            :style="form.phoneNumber==''?'background: #efefef;color: #bbbbbb;':''"
            @click="getCode"
          >{{codeFlag?codeNumber:'获取验证码'}}</div>
        </div>
      </el-tab-pane>

      <div class="Sign_box">
        <div
          class="sign_opacity"
          v-if="activeName=='name1'&&(form.userName == ''||form.passWord=='')"
        ></div>

        <div
          class="sign_opacity"
          v-if="activeName=='name2'&&(form.phoneNumber == ''||form.code=='')"
        ></div>
        <div
          class="Sign_in"
          v-if="activeName=='name1'"
          @click="signIn"
          :style="form.userName == ''||form.passWord==''?'':'box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);'"
        >登录</div>
        <div
          class="Sign_in"
          v-if="activeName=='name2'"
          @click="signIn"
          :style="form.phoneNumber == ''||form.code==''?'':'box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);'"
        >登录</div>
      </div>
      <div class="back-box clearfix">
        <div class="back-password" @click="jump(1)">忘记密码</div>
        <div class="register" @click="jump(2)">注册</div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Sign-in",
  components: {},
  data() {
    return {
      activeName: "name1",
      form: {
        userName: "",
        passWord: "",
        phoneNumber: "",
        code: ""
      },
      codeNumber: 60,
      codeFlag: false,
      codeSetInterval: ""
    };
  },
  created() {
    var that = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        if (
          (that.activeName == "name1" &&
            that.form.userName !== "" &&
            that.form.passWord !== "") ||
          (that.activeName == "name2" &&
            that.form.phoneNumber !== "" &&
            that.form.code !== "")
        ) {
          that.signIn();
        }
      }
    };
  },
  methods: {
    handleClick(tab, event) {},
    // 登录
    signIn() {
      if (this.activeName == "name1") {
        this.$http
          .post(
            "/login?username=" +
              this.form.userName +
              "&password=" +
              this.form.passWord
          )
          .then(res => {
            if (res.data.code == 200) {
              localStorage.setItem("isLogin", true);
              localStorage.setItem("token", res.data.data.token);
              this.store.state.login.token = res.data.data.token;
              this.$emit("dialogVisibleShow", "登录成功");
            } else {
              this.$message({
                showClose: true,
                message: res.data.data.message,
                type: "error"
              });
            }
          });
      } else {
        this.$http
          .post(
            "/login?compareCode=" +
              this.form.code +
              "&mobile=" +
              this.form.phoneNumber +
              "&ways=mobile"
          )
          .then(res => {
            if (res.data.code == 200) {
              localStorage.setItem("isLogin", true);
              localStorage.setItem("token", res.data.data.token);
              this.store.state.login.token = res.data.data.token;
              this.$emit("dialogVisibleShow", "登录成功");
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          });
      }
    },
    // 跳转
    jump(flag) {
      if (flag == 1) {
        this.$emit("dialogVisibleShow", "忘记密码");
      } else {
        this.$emit("dialogVisibleShow", "注册");
      }
    },
    // 获取验证码
    getCode() {
      // 节流阀
      if (this.codeFlag) {
        return;
      }
      if (this.activeName == "name2" && this.form.phoneNumber !== "") {
        if (this.codeNumber == 60) {
          if (!/^1[345678]\d{9}$/.test(this.form.phoneNumber)) {
            this.$message({
              message: "请输入正确的手机号",
              type: "warning"
            });
            return;
          }
          this.$http
            .post("user/get/message?mobile=" + this.form.phoneNumber)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "发送成功",
                  type: "success"
                });

                this.codeFlag = true;
                this.codeSetInterval = setInterval(() => {
                  this.codeNumber--;
                }, 1000);
              }
            });
        }
      }
    }
  },
  mounted() {},
  watch: {
    codeNumber(val1, val2) {
      if (this.codeNumber == 0) {
        this.codeNumber = 60;
        this.codeFlag = false;
        window.clearTimeout(this.codeSetInterval);
      }
    }
  }
};
</script>
<style lang="less">
.Sign-in {
  margin: 0 auto;
  width: 560px;
  height: 480px;
  background: #fff;
  border-radius: 12px;
  padding: 53px 60px 0 60px;
  box-sizing: border-box;

  > .el-tabs {
    .el-tabs__item.is-active {
      color: #6b70ff;
    }
    .el-tabs__item {
      padding: 0 44px;
      font-size: 18px;
      color: #262626;
    }
    .el-tabs__active-bar {
      height: 3px;
      border-radius: 6px;
      background-color: #6b70ff;
    }
    .el-input__inner {
      height: 42px;
    }
    .el-tabs__header {
      padding: 0 20px;
    }
    .el-tabs__content {
      padding: 0 20px;
    }
  }
  .input-box {
    margin-bottom: 24px;
    > label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: #262626;
    }
    > .code {
      width: 236px;
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
      margin-top: 24px;
      height: 42px;
      background: #6b70ff;
      border-radius: 4px;

      text-align: center;
      font-size: 16px;
      font-weight: 500;
      line-height: 42px;
      color: #fff;
    }
  }
  .back-box {
    padding-top: 16px;
    font-size: 14px;
    color: #666666;
    > div {
      cursor: pointer;
    }
    > div:nth-child(1) {
      float: left;
    }
    > div:nth-child(2) {
      float: right;
    }
  }
}
</style>