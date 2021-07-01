<template>
  <div class="home">
    <div class="title">个人信息/Personal information</div>

    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="nick">
          <el-input v-model="ruleForm.nick"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>
        <div class="submit" @click="submit">保存修改</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  width: 904px;
  height: 650px;
  background-color: #fff;
  float: left;
  padding: 0 20px;
  > .title {
    font-family: "Yesteryear", cursive;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid rgb(247, 247, 247);
    padding: 20px 0;
    margin-bottom: 20px;
  }
  >.form{
      width: 70%;
      margin-left:100px;
      
      .el-form{
text-align: left;   
      }
      /deep/ .el-form-item__label{
          padding-right: 50px;
      }
      /deep/ .el-form-item{
          margin-bottom: 40px;
      }
      >.submit{
          text-align: center;
         border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 90px;
    margin: 20px 0;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 38px;
    padding: 0 25px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
    &:hover{
      background: #abd373;
    color: #fff;
    }  
      }
  }
}
</style>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          nick: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
          ],

          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          
          },
          user:{
            name:'',
            phone:'',
            pictureAddr:'',
            nick:''
          },
          ruleForm: {
            id:localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          nick: localStorage.getItem("nick"),
          phone: localStorage.getItem("phone"),
          email: localStorage.getItem("email"),
          password:  localStorage.getItem("password"),
          rolesNames:'',
          type:1,
        },
    };
  },
  created() {},
  methods: {

    submit(){
       this.$http.post('mt/users/admin/up',this.ruleForm).then((res) => {
                        if (res.data.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                        }
            });
    },
  },
  mounted() {

    this.user.name=localStorage.getItem("name")
    this.user.phone=localStorage.getItem("phone")
    this.user.id=localStorage.getItem("id")
    this.user.pictureAddr=localStorage.getItem("pictureAddr")
  },
};
</script>
