<template>
  <div class="home">
    <div class="container">
      <!-- title -->
      <div class="title">
        <div>最常用</div>
        <div>营养滋补</div>
      </div>

      <el-carousel trigger="click" height="387px" :autoplay="false">
        <el-carousel-item v-for="(item, index) in arr" :key="index">
          <ul class="nutrition">
            <li v-for="(item2, i) in item" :key="i">
              <div class="contents">
                <div class="pic">
                  <img :src="item2.addr[0]" alt="" />
                </div>
                <div class="info">
                  <div class="name">{{ item2.name }}</div>
                  <div class="price"> ￥{{
                  item2.zhelv == 0 ? item2.price : item2.price * item2.zhelv
                }}</div>
                  <div class="cart">添加到购物车</div>
                </div>
              </div>

              <div class="move">
                 <div class="fa" @click="checkDetail(item2)"></div>
                    <div class="fa" @click="liked(item2)" ></div>
                    <div class="fa"  @click="addCart(item)"></div>
              </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Dialog @back="back($event)" :data="data" v-if="Visible" :Visible="Visible" :key="key" />
  </div>
</template>
<style lang="less" scoped>
.home {
  height: 540px;
  margin-top: 280px;
  padding-bottom: 105px;
//   background-color: #f8f8fa;
   
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
  
  .title {
    padding-top: 80px;
    margin-bottom: 60px;
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
  ul.nutrition {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    > li {
      width: 350px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e5e5;
      margin: 0 15px 35px 15px;
      position: relative;
      &:hover {
        > .move {
          opacity: 1;
        }
      }
      .contents {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;

        > .pic {
          > img {
            width: 140px;
            height: 140px;
          }
        }
        > .info {
          padding: 20px 15px;
          > .name {
            color: #000;
            display: block;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.4s ease;
            margin-bottom: 30px;
            cursor: pointer;
            &:hover {
              color: rgb(15, 136, 26);
            }
          }
          > .price {
            color: #555;
            font-size: 14px;
            text-align: left;
            transition: all 0.4s ease;
            margin-bottom: 30px;
            opacity: 1;
          }
          > .cart {
              text-align: left;
            font-size: 11px;
            font-weight: 500;
            transition: all 0.4s ease;
            cursor: pointer;
            &:hover {
              color: rgb(15, 136, 26);
            }
          }
        }
      }

      >.move{
          width:92px;
          height: 40px;
         background: #fff;
         border-radius: 10px;
         opacity: 0;
        left: 20%;
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
            margin-left: 9px;
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
    }
  }
}
</style>

<script>
export default {
  name: "home",
  computed: {
    arr() {
      return this.group(this.newsList, 6);
    },
  },
  components: {},
  data() {
    return {
      newsList: [
      ],
      tableForm:{
        pageSize:999,
        pageNum:1,
        id:32
      },
      data:{},
      Visible:false,
      key:1
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
   checkDetail(item) {
      this.Visible = true;
      this.data = item
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
