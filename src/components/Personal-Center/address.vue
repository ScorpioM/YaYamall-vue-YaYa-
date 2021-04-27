<template>
  <div class="home">
    <div class="title">收货地址/Address list</div>
    <!-- 地址管理 -->
    <div class="address-list">
        <div class="title">地址管理</div>
        <ul>
            <li v-for="(item,index) in address" :key="index">
                
                <div>
                    <span class="fa name">{{item.shouhuoren}}</span>
                    <span class="fa phone">{{item.tel}}</span>
                </div>
                <span @click="moren(item)" :class="{isdefault:item.moRen==1}">{{item.moRen==1?'默认':'设为默认'}}</span>
                <div class="fa address">
                    地址：{{item.dizhi + item.xxidizhi}}
                </div>
                <div class="option">
                    <span class="fa" @click="updateAddress(item)" >编辑</span>
                    <span class="fa"   @click="delAddress(item)">删除</span>
                </div>
            </li>
        </ul>
    </div>
     <div class="add-address">
        <div class="title">新增地址/ Add address</div>
            <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="收货人" prop="shouhuoren">
          <el-input v-model="ruleForm.shouhuoren"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="tel">
          <el-input v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="所在地" prop="dizhi">
          <el-input v-model="ruleForm.dizhi"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="xxidizhi">
          <el-input type="textarea" v-model="ruleForm.xxidizhi"></el-input>
        </el-form-item>
       
      </el-form>
        <div class="submit" @click="addAddress">保存</div>
    </div>
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
  >.address-list{
      overflow: auto;
      >.title{
          font-family: "Yesteryear", cursive;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 2px solid rgb(247, 247, 247);
    padding: 10px 0;
    text-align: left;
          
      }
      >ul{
          width: 1054px;
          display: flex;
          flex-flow: row nowrap;
          li{
    border: none;
    display: block;
    width: 255px;
    height: 150px;
    text-align: left;
    padding-top: 10px;
    background: url('../../assets/img/Personal-Center/address/peraddbg.png')no-repeat scroll 0% 0%;
    margin-right: 10px;
    position: relative;
    &:hover{
        >span{
            opacity: 1;
        }
    }
    >.isdefault{
        opacity: 1;
    }
    >span{
        position: absolute;
        top: 0;
        right: 5px;
        background: #ee3495;
        color: #fff;
        padding: 3px;
        font-size: 13px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }
    >div{
        margin: 10px;
    }
    >div:first-child{
        >.name{
            color: #6E6E6E;
            font-size: 14px;
            margin-right: 10px;
            &::before{
                content: "\f0f0";
                width: 16px;
                height: 16px;
                margin-right: 5px;

            }
        }
        >.phone{
            font-size: 14px;
            color: #A40000;
&::before{
    color: #6E6E6E;
                content: "\f10a";
                width: 16px;
                height: 16px;
                margin-right: 5px;

            }
        }
    
    }
    >.address{
        color: #6E6E6E;
            font-size: 14px;
            line-height: 20px;
        &::before{
                content: "\f041";
                width: 16px;
                height: 16px;
                margin-right: 5px;  

            }
    }
    >.option{
        margin-left: 120px;
        >span{
            color: #555454;
            font-size: 15px;
            cursor: pointer;
             &:hover{
                color: #A40000;
            }
        }
        >span:first-child{
            &::before{
                content: "\f044";
                width: 16px;
                height: 16px;
                margin-right: 5px;  

            }
            &::after{
                content: " ";
                background: #6E6E6E;
                height: 16px;
                margin-right: 5px;  
                margin-left: 5px;

            }
        }
        >span:last-child{
            &::before{
                content: "\f014";
                width: 16px;
                height: 16px;
                margin-right: 5px;  
            }
        }
    }
          }
      }
  }
  >.add-address{
      >.title{
          font-family: "Yesteryear", cursive;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 2px solid rgb(247, 247, 247);
    padding: 10px 0;
    text-align: left;
          
      }
      >.form{
      width: 70%;
      
      .el-form{
text-align: left;   
      }
      /deep/ .el-form-item{
          margin-bottom: 20px;
      }
      >.submit{
          text-align: center;
         border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 80px;
    margin: 5px 0;
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
 
  
}
</style>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
        isdefault:false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],

          },
          ruleForm: {
            userId:localStorage.getItem("id"),
            shouhuoren: '',
            tel: '',
            dizhi: '',
            xxidizhi: '',
          
        },
        update:false,
        address:[
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
        ]
    };
  },
  created() {},
  methods: {

      getAddress(){
          this.$http.get('mt/dizhi/findAll', { params: {
              id:localStorage.getItem("id")
          } }).then((res) => {
                this.address = res.data.data;
                // console.log( this.newsList)
               
            });
      },
      submit(){},
      addAddress(){
          if(this.update == false){
               delete this.ruleForm.id
                    this.$http.get('mt/dizhi/saveOrUpd',{
                 params:this.ruleForm
             }
            ).then((res) => {
              if(res.data.code == 200){
                  this.getAddress();
                 this.$notify({
                                title: '成功',
                                message: '新增地址成功',
                                type: 'success'
                            });
                            this.getAddress();

                          let obj ={
            userId:localStorage.getItem("id"),
            shouhuoren: '',
            tel: '',
            dizhi: '',
            xxidizhi: '',
          
        }
        this.ruleForm = obj

              }else{
                this.$notify({
                                title: '失败',
                                message: '新增地址失败',
                                type: 'error'
                            });
              }
              
            });
          }else{
              this.$http.get('mt/dizhi/saveOrUpd',{
                 params:this.ruleForm
             }
            ).then((res) => {
              if(res.data.code == 200){
                  this.getAddress();
                 this.$notify({
                                title: '成功',
                                message: '修改地址成功',
                                type: 'success'
                            });
                            this.getAddress();

                          let obj ={
            userId:localStorage.getItem("id"),
            shouhuoren: '',
            tel: '',
            dizhi: '',
            xxidizhi: '',
          
        }
        this.ruleForm = obj

              }else{
                this.$notify({
                                title: '失败',
                                message: '修改地址失败',
                                type: 'error'
                            });
              }
              
            });
          }
             
      },

         moren(item){
             console.log(item)
             item.moRen = 1;
             this.$http.get('mt/dizhi/saveOrUpd',{
                 params:item
                
             }
            ).then((res) => {
              if(res.data.code == 200){
                  this.getAddress();
                 this.$notify({
                                title: '成功',
                                message: '设为默认地址成功',
                                type: 'success'
                            });
                            this.getAddress();


              }else{
                this.$notify({
                                title: '失败',
                                message: '设为默认地址失败',
                                type: 'error'
                            });
              }
              
            });
      },
      updateAddress(item){
          this.update = true;
            this.ruleForm.shouhuoren = item.shouhuoren
            this.ruleForm.tel = item.tel
            this.ruleForm.dizhi = item.dizhi
            this.ruleForm.xxidizhi = item.xxidizhi;
            this.ruleForm.id = item.id;
      },
      delAddress(item){
          this.$http.get('mt/dizhi/del?id='+item.id
            ).then((res) => {
              if(res.data.code == 200){
                  this.getAddress();
                 this.$notify({
                                title: '成功',
                                message: '删除地址成功',
                                type: 'success'
                            });

                            }
            })
      },
  },
  mounted() {
      this.getAddress();
  },
};
</script>
