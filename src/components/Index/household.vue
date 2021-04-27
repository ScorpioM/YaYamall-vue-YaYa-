<template>
  <div class="home">
    <div class="container">
      <!-- title -->
      <div class="title">
        <div>最常用</div>
        <div>家庭常备</div>
      </div>

      <!-- <vue-seamless-scroll :data="newsList" :class-option="optionLeft" class="seamless-warp2">
                <ul class="item">
                    <li v-for="(item,index) in newsList"  :key="index">
                        <img :src="item.pic" alt="">
                    </li>
                </ul>
            </vue-seamless-scroll> -->
      <el-carousel trigger="click" height="750px">
        <el-carousel-item v-for="(item, index) in arr" :key="index">
          <ul class="houseHold">
            <li v-for="(item2, i) in item" :key="i">
              <img :src="item2.addr[0]" alt="" />
              <div class="info">
                <div class="name">{{ item2.name }}</div>
                <div class="price">￥{{ item2.price }}.00</div>
                <div class="details" @click="jump(item2)">查看详情</div>
              </div>
              
              <div class="move">
                    <div class="fa" @click="checkDetail(item2)"></div>
                    <div class="fa" @click="liked(item2)" ></div>
                    <div class="fa"  @click="addCart(item2)"></div>
              </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
      <Dialog @back="back($event)" v-if="Visible" :data="data" :Visible="Visible" :key="key" />
    </div> 
    
  </div>
</template>
<style lang="less" scoped>
.home {
  height: 923px;
  .title {
    margin-top: 115px;
    > div:first-child {
      color: #b4b4b4;
      font-size: 14px;
      font-weight: 500;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        border-top: 1px solid #abd373;
        top: 5px;
        left: 50%;
        margin-left: -60px;
      }
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        border-top: 1px solid #abd373;
        top: 5px;
        left: 50%;
        margin-left: 30px;
      }
    }
    > div:last-child {
      font-size: 35px;
      color: #000;
      font-family: yesteryear, cursive;
      margin-top: 20px;
    }
  }
  .seamless-warp2 {
    overflow: hidden;
    height: 80px;
    width: 800px;
    ul.item {
      width: 800px;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      li {
        float: left;
        > img {
          width: 200px;
          height: 100px;
        }
      }
    }
  }
  /deep/ .el-carousel__button {

      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #000;
      transition: all 0.3s;
    }
    /deep/ .el-carousel__indicator--horizontal {
      padding: 0;
      margin-left: 10px;
    }
    /deep/ .el-carousel__indicator.is-active button {
      border-radius: 50%;
      background-color: #000000;
    }
  ul.houseHold {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    > li {
      padding: 0 15px;
      margin: 15px 0;
      position: relative;
      cursor: pointer;
      &:hover{
          box-shadow: 0 1px 3px 0 rgb(216, 214, 214);
          >.move{
                opacity: 1;
          }
          >.info{
              >.price{
                  opacity: 0;
              }
              >.details{
                  opacity: 1;
              }
          }
      }
      > img {
        width: 255px;
        height: 255px;
      }
      >.move{
          width: 132px;
          height: 40px;
         background: #fff;
         border-radius: 10px;
         opacity: 0;
        left: 50%;
        margin-right: -50%;
        max-width: 90%;
        padding: 0 9px;
        position: absolute;
        top: 50%;
        z-index: 99;
        transform: translate(-50%,-50%);
        box-shadow: 0 1px 3px 0 rgb(212, 209, 209);
        transition: all .4s ease;
        >div{
            float: left;
            margin-left: 18px;
            margin-top: 13px;
            font-size: 14px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            transition: all .4s ease;
        }
        >div:first-child{
           &::before{
             content: "\f002";
             
           }
           &:hover{
             color: #3d78ff;
           }
            
        }
        >div:nth-child(2){
          font-size: 12px;
           &::before{
             content: "\f004";
             
           }
           &:hover{
             color: #3d78ff;
           }
        }
        >div:last-child{
           &::before{
             content: "\f07a";
             
           }
           &:hover{
             color: #3d78ff;
           }
        }

      }
      
      > .info {
        padding: 20px 15px 25px;
        text-align: center;
        
        > .name {
          color: #000;
          display: block;
          font-size: 15px;
          font-weight: 500;
          transition: all .4s ease;
        &:hover{
            color: rgb(15, 136, 26);
        }
        }
        > .price {
          color: #555;
          font-size: 14px;
          margin-top: 10px;   
          text-align: center;  
          transition: all .4s ease;
          opacity: 1;
        }
        >.details{
         opacity: 0;
        left: 50%;
        margin-right: -50%;
        position: absolute;
        bottom: 20px;
        font-size: 14px;
        z-index: 99;
        color: #000;
        transform: translate(-50%,-50%);
        transition: all .4s ease;
        &:hover{
            color: #3d78ff;
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
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 4,
      };
    },
    arr() {
      return this.group(this.newsList, 8);
    },
  },
  components: {},
  data() {
    return {
      newsList: [
      ],
      data:{},
      Visible:false,
      key:1,
      tableForm:{
        pageSize:999,
        pageNum:1,
        id:13
      }
    };
  },
  created() {},
  methods: {
    // 切割数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },
    liked(item) {
      this.$http
        .post("mt/shoucang/addOrUpd", {
          shangpinid: item.id,
          type: 1,
          userId: localStorage.getItem("id"),
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "收藏成功",
              type: "success",
            });
          } else {
            this.$notify({
              title: "失败",
              message: "收藏失败",
              type: "error",
            });
          }
        });
    },
     getProduct() {
      this.$http
        .get("mt/yaopin/findAll", {
          params: this.tableForm,
        })
        .then((res) => {
          if (res.data.code == 200) {
            res.data.data.rows.forEach((item, index) => {
              item.addr = JSON.parse(item.addr);
            });
            this.newsList = res.data.data.rows;
            
          }
        });
    },
    addCart(item) {
      this.$http
        .post("mt/gouwuche/addOrUpd", {
          shangpinid: item.id,
          type: 1,
          userId: localStorage.getItem("id"),
          num: 1,
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
   checkDetail(item) {
      this.Visible = true;
      this.data = item
    },
    // 跳转至详情页
    jump(item){
            this.$router.push({path:'/Product-details'})
            sessionStorage.setItem("product",JSON.stringify(item))
        },
    async back(item) {
            if(item == false){
                this.Visible = false;
            }
        },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
