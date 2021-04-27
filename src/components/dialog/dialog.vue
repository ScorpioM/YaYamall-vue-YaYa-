<template>
  <div class="home">
    <el-dialog
      :visible.sync="dialogVisible"
      width="65%"
      @close="close"
    >
      <div class="dia">
        <div class="left-box">
          
          <el-image 
                            style="width: 375px; height: 375px"
                            @click="srcList.unshift(changeImg)"
                            :src="changeImg" 
                            :preview-src-list="srcList"
                            >
                        </el-image>
          <vue-seamless-scroll
            :data="product.addr"
            :class-option="optionLeft"
            class="seamless-warp2"
          >
            <ul class="item">
              <li v-for="(item, index) in product.addr" :key="index">
                <img @click="changeImg = item" :src="item" alt="" />
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
        <div class="right-box">
          <div class="name">{{ product.name }}</div>
          <div class="price">￥{{ product.price }}.00</div>
          <div class="buy">
            <div class="num">
            <span @click="add">+</span>
            <input type="text" v-model="this.form.num" />
            <span @click="reduction">-</span>
          </div>
          <div class="cart" @click="addCart(product)">
            加入购物车
          </div>
          </div>
          
          <p class="info">{{ product.miaoshu | miaoshu }}</p>
          
          <div class="details" @click="jump(product),dialogVisible=false">
            查看所有功能
          </div>
          <div class="share">
            <div class="title">分享这个产品</div>
            <div class="icon">
              <div v-for="(item,index) in icons" :key="index" :class="{blue:index==0,green:index==1,lightblue:index==2}">
                <img class="unselect" :src="item.unselect" alt="">
                <img  class="select" :src="item.select" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.home {
  /deep/ .el-dialog__body{
    padding-top: 0;
  }
  .dia {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    > .left-box {
      padding: 0 15px;
      > img {
        width: 375px;
        height: 375px;
      }
    }
    > .right-box {
      width: 537px;
      height: 451px;
      text-align: left;
      padding: 0 15px;
      > .name {
        font-family: poppins, sans-serif;
        font-size: 22px;
        font-weight: 400;
        color: #000;
        margin-bottom: 20px;
        &:hover {
          color: #3d78ff;
        }
      }
      > .price {
        color: #3d78ff;
        font-size: 16px;
        font-weight: 700;
        margin-bottom:40px;
      }
      >.buy{
        margin-bottom: 20px;
        padding-bottom: 38px;
        border-bottom: 1px solid #ededed;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        > .num {
        margin-top: 10px;
        margin-right: 20px;
        > span {
          border: 1px solid #000;
          padding: 3px 6px;
          cursor: pointer;
        }
        > input {
          width: 28px;
          height: 20px;
          border-radius: 0;
          outline: none;
          border: 1px solid rgb(70, 70, 70);
          padding-left: 15px;
        }
      }
      >.cart{
        border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 80px;
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
      background: #3d78ff;
    color: #fff;
    }
      }
      }
      
      >.info{
        font-family: poppins,sans-serif;
    font-weight: 400;   
     color: #999;
    font-size: 14px;
    line-height: 21px;
    padding-bottom: 38px;
        border-bottom: 1px solid #ededed;
      }
      >.details{
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
      background: #3d78ff;
    color: #fff;
    }
      }
      >.share{
        >.title{
              color: #222;
    font-size: 22px;
    font-weight: 700;
        }
        >.icon{
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          .blue{
            background-color: rgb(4, 89, 158);
          }
          .green{
            background-color: rgb(51, 180, 116);
          }
          .lightblue{
            background-color: rgb(80, 161, 228);
          }
          >div{
            font-size: 18px;
    color: #808080;
    width: 40px;
    height: 40px;
    display: block;
    border: 1px solid #ebebeb;
    line-height: 40px;
    text-align: center;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;
    margin-right: 20px;
    margin-top: 20px;
    &:hover{
      >.select{
              opacity: 1;
            }
            >.unselect{
              opacity: 0;
            }
          
           
    }
    >img{
      position: absolute;
      top: 5px;
      left: 5px;
    }
            >.select{
              opacity: 0;
            }
            >.unselect{
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .seamless-warp2 {
    overflow: hidden;
    height: 83px;
    width: 370px;
    margin-top: 10px;
    ul.item {
      width: 101px * 8;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      li {
        float: left;
        padding: 0 10px;

        > img {
          width: 81px;
          height: 81px;
          border: 1px solid #e5e5e5;
          cursor: pointer;
          &:hover {
            border-color: #3d78ff;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "home",
  props: ["Visible","data"],
  components: {},
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        step: 0.5,
      };
    },
  },
  data() {
    return {
      srcList:[],
      dialogVisible: this.Visible,

      changeImg: this.data.addr[0] ,
      product: this.data,
      form: {
        num: 1,
      },
      newsList: [
    
      ],
      icons:[
        {
          unselect: require("../../assets/img/dialog/qq-false.png"),
          select: require("../../assets/img/dialog/qq-true.png"),
        },
        {
          unselect: require("../../assets/img/dialog/wx-false.png"),
          select: require("../../assets/img/dialog/wx-true.png"),
        },
        {
          unselect: require("../../assets/img/dialog/dd-false.png"),
          select: require("../../assets/img/dialog/dd-true.png"),
        },
      ]
    };
  },
  created() {},
  methods: {
    // 关闭弹窗回调
    close() {
      this.$emit("back", this.dialogVisible);
    },
    addCart() {
      this.$http
        .post("mt/gouwuche/addOrUpd", {
          shangpinid: this.product.id,
          type: 1,
          userId: localStorage.getItem("id"),
          num: this.form.num,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "加入购物车成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "失败",
              message: "加入购物车失败",
              type: "error",
            });
          }
        });
    },
    // 跳转至详情页
    jump(project){
            this.$router.push({path:'/Product-details'})
      sessionStorage.setItem("product",JSON.stringify(project))
        },
    // 数量++
    add(){
        this.form.num++
    },
    // 数量--
    reduction(){
        if(this.form.num>0){
          this.form.num--
        }
    },
  },
  mounted() {},
  filters:{
        miaoshu(val) {
            console.log(val)
      if (val) {
        return `${val.substring(0, 70)}...`;
      }
    },
    },
};
</script>
