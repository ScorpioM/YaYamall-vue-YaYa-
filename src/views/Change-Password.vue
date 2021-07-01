<template>
  <div class="change-password-box">
    <Swiper class="swiper" />
    <div class="logo">
      <div class="container">
        <img src="../assets/img/login/logo2.png" alt />
      </div>
    </div>
    <div class="container">
      <div class="swiper-box">
        <!-- <img src="../assets/images/Swiper/01.png" alt /> -->
        <!-- <p>精品资源，在线学习。</p> -->
      </div>
      <div class="Change-Password clearfix">
        <!-- <img src="../assets/images/Swiper/box.png" alt /> -->
        <div class="header-title">账号注册</div>
        <el-form :model="form" :rules="rules" ref="ruleForm"  label-width="65px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="nick">
            <el-input v-model="form.nick" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            
            <el-input v-model="form.name" placeholder="请输入您的真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            
            <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            
            <el-input v-model="form.email" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              show-password
              v-model="form.password"
              @keyup.enter.native="changePassword"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="Sign_box">
          <div class="sign_opacity" v-if="form.phoneNumber==''||form.code==''||form.passWord == ''"></div>
          <div
            class="Sign_in"
            :style="form.phoneNumber==''||form.code==''||form.passWord == ''?'':'box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);'"
            @click="changePassword"
          >注册</div>
        </div>
        <div class="back-box clearfix">
          <router-link tag="div" to="/login" class="back-password" @click="jump(1)">登录</router-link>
          <!-- <router-link tag="div" to="/register" class="register" @click="jump(2)">注册</router-link> -->
        </div>
      </div>
    </div>
    <!-- 底部背景 -->
    <!-- <img class="footer-img" src="../assets/images/Swiper/bg.png" alt /> -->
  </div>
</template>

<script>
import Swiper from "@/components/login/Swiper";
export default {
  name: "Change-Password",
  components: {Swiper},
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.passwordFlag.test(value)) {
        callback();
      } else {
        callback("字母+数字组合,至少包含一个字母和数字,长度控制在8-16位");
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
    var validateMobilePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不可为空"));
      } else {
        if (value !== "") {
          var reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的手机号码"));
          }
        }
        callback();
      };
    };
    // var validateName =( rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("昵称不可为空"));
    //   } else {
    //     if (value !== "") {
    //      this.$http
    //       .get(
    //         "/mt/users/userNameExist",{params:{name:value}}
    //       ).then(res=>{
    //         if(res.data.code !==200){
    //            callback(new Error("该昵称已被占用"));
    //         }
    //       })
    //     }
    //     callback();
    //   };
    // };
    return {
      form: {
        name: "",
        nick: "",
        phone: "",
        email: "",
        password:''
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        nick: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { required: true, validator: validateName, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { required: true, validator: validateMobilePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { required: true, validator: validateEmail, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { required: true, validator: validatePassword, trigger: "blur" }
        ],

      },
      passwordFlag: /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}$/, // 密码验证
      codeNumber: 60, // 验证码时长
      codeFlag: false, // 获取验证码
      codeSetInterval: "", // 验证码定时器
      pwdFlag: false // 密码验证
    };
  },
  created() {},
  methods: {
    jump(flag) {
      if (flag == 1) {
        this.$emit("dialogVisibleShow", "登录");
      } else {
        this.$emit("dialogVisibleShow", "注册");
      }
    },
    // 密码验证
    pwdBlur() {
      var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;
      if (!reg.test(this.form.passWord)) {
        this.$message({
          message: "字母+数字组合,至少包含一个字母和数字,长度控制在8-15",
          type: "warning"
        });
        this.pwdFlag = false;
        return;
      } else {
        this.pwdFlag = true;
      }
    },
    // 表单验证
    submitForm() {
      var flag;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    // 修改密码
    changePassword() {
      if (this.submitForm() !== false) {
        this.$http
          .post(
            "/mt/users/enroll",this.form
          )
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
              // 跳转登录页面
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error"
              });
            }
          });
      }
    }
  },
  mounted() {},
  watch: {
    codeNumber(newV, oldV) {
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
.change-password-box {
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
    > .swiper-box {
      > img {
        width: 619px;
        height: 327px;
      }
      > p {
        padding-left: 100px;
        font-size: 35px;
        font-weight: 600;
        letter-spacing: 4px;
      }
    }
    .Change-Password {
      z-index: 9;
      position: absolute;
      top: 50%;
      right: 0%;
      transform: translate(0%, -50%);
      width: 496px;
      height: 526px;
      background: #fff;
      border-radius: 12px;
      padding: 0 43px;
      box-sizing: border-box;
      box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.12);
      > img {
        position: absolute;
        top: -130px;
        right: -130px;
        width: 226px;
        height: 226px;
      }
      > .header-title {
        margin-bottom: 20px;
        padding: 34px 0 17px 0;
        font-size: 35px;
        text-align: center;
        color:#3D78FF;
        letter-spacing: 4px;
      }

      > .input-box {
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
          background: #4444e5;
          border-radius: 4px;
          text-align: center;

          font-size: 14px;
          line-height: 42px;
          color: #fff;
        }
      }

      .demo-ruleForm {
        margin-bottom: 40px;
        > .el-form-item {
          margin-bottom: 25px;
          > .el-form-item__content {
            > label {
              display: block;
              margin-bottom: 8px;
              font-size: 14px;
              font-weight: 500;
              line-height: 24px;
              color: #262626;
            }
            > .el-input {
            }
          }
        }
        > .codeDiv {
          > .el-form-item__content {
            > .el-input {
              width: 236px;
            }
            > .getCode {
              cursor: pointer;
              float: right;
              width: 124px;
              height: 42px;
              background: #3D78FF;
              border-radius: 4px;
              text-align: center;

              font-size: 14px;
              line-height: 42px;
              color: #fff;
            }
          }
        }
      }

      > .Sign_box {
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
          width: 80%;
          cursor: pointer;
          overflow: hidden;
          margin-top: 24px;
          margin-left: 60px;
          height: 42px;
          background: #3D78FF;
          border-radius: 4px;

          // box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);

          text-align: center;
          font-size: 16px;
          font-weight: 500;
          line-height: 42px;
          color: #fff;
        }
      }
      > .back-box {
        width: 100%;
        padding-top: 16px;
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

  // 底部背景
  > .footer-img {
    position: fixed;
    z-index: -1;
    bottom: 0;
    height: 20%;
    width: 100%;
  }
}
</style>