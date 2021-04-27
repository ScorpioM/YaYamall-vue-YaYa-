<template>
  <div class="home">
    <div class="container" >
      <div class="left_box">
        <!-- 产品类别 -->
        <div class="category">
          <div class="title">产品类别</div>
          <el-radio-group v-model="radio" @change="categoryChange">
            <div v-for="(item, index) in tab" :key="index" class="radio">
              <el-radio :label="item.id"
                >{{ item.name }}
                <span class="num">({{ item.num }})</span></el-radio
              >
            </div>
          </el-radio-group>
        </div>

        <!-- 价格筛选 -->
        <div class="price">
          <div class="title">按价格筛选</div>
          <el-slider v-model="value" range show-stops :max="500"> </el-slider>
          <div class="label">
            <div>价格：{{ "￥" + value[0] + "~" + "￥" + value[1] }}</div>
            <div @click="priceSelect">筛选</div>
          </div>
        </div>

        <!-- 推荐产品 -->
        <div class="recommend">
          <div class="title">推荐产品</div>
          <div class="product">
            <div v-for="(item, index) in recommends" :key="index">
              <img :src="item.pic" alt="" />
              <div>
                <div class="name">{{ item.name }}</div>
                <el-rate v-model="value1"></el-rate>
                <div class="price">￥{{ item.price }}.00</div>
              </div>
            </div>
          </div>
        </div>
        <img src="" alt="" />
      </div>
      <div class="right_box">
        <!-- banner -->
        <div class="banner">
          <div>Want more?</div>
          <div>Medicine store</div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>药品专区</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- contents -->
        <div class="top">
          <div @click="num = 0" :class="{ add1: num == 0 }"></div>
          <div @click="num = 1" :class="{ add2: num == 1 }"></div>
        </div>
        <ul class="houseHold" v-if="num == 0">
          <li v-for="(item, i) in newsList" :key="i">
            <img :src="item.addr[0]" alt="" />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="price">
                <span v-if="item.zhelv !== 0">￥{{ item.price }}</span> ￥{{
                  item.zhelv == 0 ? item.price : item.price * item.zhelv
                }}
              </div>
              <div class="details" @click="jump(item)">查看详情</div>
            </div>
            <div class="speacil" v-if="item.zhelv !== 0">特价!</div>
            <div class="move">
              <div class="fa" @click="checkDetail(item)"></div>
              <div class="fa" @click="liked(item)"></div>
              <div class="fa" @click="addCart(item)"></div>
            </div>
          </li>
        </ul>
        <ul class="vertical" v-if="num == 1">
          <li v-for="(item, i) in newsList" :key="i" >
            <div class="pic" @click="jump(item)" >
              <img :src="item.addr[0]" alt="" />
              <div class="speacil" v-if="item.zhelv !== 0">特价!</div>
            </div>

            <div class="info">
              <div class="name">{{ item.name }}</div>
              <p>{{ item.miaoshu }}</p>
              <div class="price">
                <span v-if="item.zhelv !== 0">￥{{ item.price }}</span> ￥{{
                  item.zhelv == 0 ? item.price : item.price * item.zhelv
                }}
              </div>
              <div class="carts">
                <div class="cart">加入购物车</div>
                <div class="move">
                 <div class="fa" @click="checkDetail(item)"></div>
              <div class="fa" @click="liked(item)"></div>
              <div class="fa" @click="addCart(item)"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="tableForm.pageSize"
            layout="prev, pager, next, jumper"
            :total="tableForm.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <Dialog @back="back($event)" v-if="Visible" :Visible="Visible" :data="data" :key="key" />
    <Footer />
  </div>
</template>
<style lang="less" scoped>
.home {
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    .left_box {
      width: 255px;
      padding: 0 15px;
      > .category {
        text-align: left;
        > .title {
          font-family: yesteryear, cursive;
          font-size: 35px;
          text-align: left;
          font-weight: 400;
          margin: 30px 0 20px 0;
        }
        /deep/ .el-radio {
          margin-bottom: 10px;
        }
        /deep/ .el-radio__inner {
          border-radius: 0;
        }
        /deep/ .el-radio__input.is-checked .el-radio__inner {
          border-color: #3d78ff;
          background: #3d78ff;
        }
        /deep/ .el-radio__input.is-checked + .el-radio__label {
          color: #3d78ff;
        }
        /deep/ .el-radio__label {
          width: 52px;
          font-size: 13px;
          margin-left: 24px;
          color: #555;
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
          &:hover {
            color: #3d78ff;
          }
        }
        .radio {
          .num {
            margin-left: 150px;
          }
        }
      }
      > .price {
        > .title {
          font-family: yesteryear, cursive;
          font-size: 35px;
          text-align: left;
          font-weight: 400;
          margin: 30px 0 20px 0;
        }
        > .label {
          height: 35px;
          text-align: left;
          margin-top: 20px;
          > div {
            float: left;
            line-height: 35px;
            color: #555;
            font-size: 14px;
          }
          > div:last-child {
            background: #999;
            color: #fff;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            height: 35px;
            margin-left: 80px;
            padding: 0 15px;
            -webkit-transition: all 0.3s ease-out 0s;
            transition: all 0.3s ease-out 0s;
            &:hover {
              background: #3d78ff;
              color: #fff;
            }
          }
        }
      }
      > .recommend {
        > .title {
          font-family: yesteryear, cursive;
          font-size: 35px;
          text-align: left;
          font-weight: 400;
          margin: 30px 0 20px 0;
        }
        > .product {
          > div {
            width: 223px;
            height: 75px;
            padding: 10px 15px;
            border: 1px solid #e5e5e5;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            cursor: pointer;
            &:hover {
              > img {
                transform: scale(1.05);
              }
              > div {
                > .name {
                  color: #3d78ff;
                }
              }
            }
            > img {
              width: 66px;
              height: 66px;
              -webkit-transition: all 0.3s ease-in-out;
              transition: all 0.3s ease-in-out;
            }
            > div {
              text-align: left;
              margin-left: 5px;
              > .name {
                color: #434343;
                -webkit-transition: all 0.3s ease-out 0s;
                transition: all 0.3s ease-out 0s;
                font-size: 14px;
                font-weight: 600;
                margin-top: 5px;
                margin-bottom: 10px;
              }
              > .price {
                color: #999;
                font-size: 14px;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
    .right_box {
      width: 871px;
      > .banner {
        width: 871px;
        height: 260px;
        background-image: url("../assets/img/drug/bg.png");
        background-position: 100% 100%;
        background-size: 100% 100%;
        text-align: left;
        > div {
          margin-left: 40px;
          margin-top: 50px;
        }
        > div:first-child {
          font-size: 20px;
          color: #fff;
          padding-top: 40px;
        }
        > div:nth-child(2) {
          font-size: 40px;
          color: #fff;
        }
      }
      > .top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-top: 150px;
        border-bottom: 2px solid rgb(238, 238, 238);
        padding-bottom: 10px;
        > .add1 {
          width: 36px;
          height: 36px;
          background: url("../assets/img/drug/category2-false.png") no-repeat !important;
          background-color: #3d78ff !important;
          background-position: 50% 50% !important;
          background-size: 24px 24px !important;
          border-radius: 50% !important;
        }
        > .add2 {
          background: url("../assets/img/drug/category1-false.png") no-repeat !important;
          background-color: #3d78ff !important;
          background-position: 50% 50% !important;
          background-size: 24px 24px !important;
          border-radius: 50% !important;
        }
        > div:first-child {
          width: 36px;
          height: 36px;
          background: url("../assets/img/drug/category2-true.png") no-repeat;
          background-position: 50% 50%;
          background-size: 24px 24px;
          -webkit-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:hover {
            background: url("../assets/img/drug/category2-false.png") no-repeat;
            background-color: #3d78ff;
            background-position: 50% 50%;
            background-size: 24px 24px;
            border-radius: 50%;
          }
        }
        > div:last-child {
          width: 36px;
          height: 36px;
          background: url("../assets/img/drug/category1-true.png") no-repeat;
          background-position: 50% 50%;
          background-size: 24px 24px;
          -webkit-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
          margin-left: 20px;
          cursor: pointer;
          &:hover {
            background: url("../assets/img/drug/category1-false.png") no-repeat;
            background-color: #3d78ff;
            background-position: 50% 50%;
            background-size: 24px 24px;
            border-radius: 50%;
          }
        }
      }
      ul.houseHold {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        > li {
          margin: 15px 15px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          &:hover {
            box-shadow: 0 1px 3px 0 rgb(216, 214, 214);
            > .move {
              opacity: 1;
            }

            > .info {
              > .price {
                opacity: 0;
              }
              > .details {
                opacity: 1;
              }
            }
          }
          > img {
            width: 255px;
            height: 255px;
          }
          > .speacil {
            width: 140px;
            height: 140px;
            background: #3d78ff;
            box-shadow: none;
            color: #ffffff;
            font-size: 15px;
            line-height: 10;
            font-weight: 500;
            height: 100px;
            position: absolute;
            right: -55px;
            top: -40px;
            transform: rotate(45deg) translateZ(0) scale(1, 1);
          }
          > .move {
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
            transform: translate(-50%, -50%);
            box-shadow: 0 1px 3px 0 rgb(212, 209, 209);
            transition: all 0.4s ease;
            > div {
              float: left;
              margin-left: 18px;
              margin-top: 13px;
              font-size: 14px;
              width: 20px;
              height: 20px;
              cursor: pointer;
              transition: all 0.4s ease;
            }
            > div:first-child {
              &::before {
                content: "\f002";
              }
              &:hover {
                color: #3d78ff;
              }
            }
            > div:nth-child(2) {
              font-size: 12px;
              &::before {
                content: "\f004";
              }
              &:hover {
                color: #3d78ff;
              }
            }
            > div:last-child {
              &::before {
                content: "\f07a";
              }
              &:hover {
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
              transition: all 0.4s ease;
              &:hover {
                color: rgb(15, 136, 26);
              }
            }
            > .price {
              color: #555;
              font-size: 14px;
              margin-top: 10px;
              text-align: center;
              transition: all 0.4s ease;
              opacity: 1;
              > span {
                color: rgb(158, 158, 158);
                font-size: 14px;
                margin-top: 10px;
                text-align: center;
                transition: all 0.4s ease;
                opacity: 1;
                text-decoration: line-through;
              }
            }
            > .details {
              opacity: 0;
              left: 50%;
              margin-right: -50%;
              position: absolute;
              bottom: 20px;
              font-size: 14px;
              z-index: 99;
              color: #000;
              transform: translate(-50%, -50%);
              transition: all 0.4s ease;
              &:hover {
                color: #3d78ff;
              }
            }
          }
        }
      }
      ul.vertical {
        > li {
          margin: 15px 15px;
          position: relative;
          cursor: pointer;
          width: 825px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          border-bottom: 1px solid rgb(233, 233, 233);
          padding-bottom: 10px;
          > .pic {
            width: 255px;
            position: relative;
            overflow: hidden;
            > img {
              width: 255px;
              height: 255px;
            }
            > .speacil {
              width: 140px;
              height: 140px;
              background: #3d78ff;
              box-shadow: none;
              color: #ffffff;
              font-size: 15px;
              line-height: 10;
              font-weight: 500;
              height: 100px;
              position: absolute;
              right: -55px;
              top: -40px;
              transform: rotate(45deg) translateZ(0) scale(1, 1);
            }
          }

          > .info {
            padding: 20px 25px 20px;
            text-align: left;
            > .carts {
              display: flex;
              flex-flow: row nowrap;
              justify-content: flex-start;
              > .cart {
                background: #3d78ff;
                color: #fff;
                display: inline-block;
                font-size: 11px;
                text-align: center;
                font-weight: 500;
                height: 40px;
                line-height: 40px;
                padding: 0 25px;
                width: 84px;
                margin-top: 30px;
                margin-right: 18px;
              }
              > .move {
                width: 132px;
                height: 40px;
                background: #fff;
                padding: 0 9px;
                margin-top: 30px;
                box-shadow: 0 2px 3px 0 rgb(180, 179, 179);
                transition: all 0.4s ease;
                > div {
                  float: left;
                  margin-left: 18px;
                  margin-top: 13px;
                  font-size: 14px;
                  width: 20px;
                  height: 20px;
                  cursor: pointer;
                  transition: all 0.4s ease;
                }
                > div:first-child {
                  &::before {
                    content: "\f002";
                  }
                  &:hover {
                    color: #3d78ff;
                  }
                }
                > div:nth-child(2) {
                  font-size: 12px;
                  &::before {
                    content: "\f004";
                  }
                  &:hover {
                    color: #3d78ff;
                  }
                }
                > div:last-child {
                  &::before {
                    content: "\f07a";
                  }
                  &:hover {
                    color: #3d78ff;
                  }
                }
              }
            }

            > .name {
              color: #000;
              display: block;
              font-size: 15px;
              font-weight: 500;
              transition: all 0.4s ease;
              &:hover {
                color: rgb(15, 136, 26);
              }
            }
            > p {
              font-size: 14px;
              line-height: 25px;
              color: #666;
              margin: 35px 0;
              width: 500px;
            }
            > .price {
              color: #555;
              font-size: 14px;
              margin-top: 10px;
              text-align: left;
              transition: all 0.4s ease;
              opacity: 1;

              > span {
                color: rgb(158, 158, 158);
                font-size: 14px;
                margin-top: 10px;
                text-align: left;
                transition: all 0.4s ease;
                opacity: 1;
                text-decoration: line-through;
              }
            }
          }
        }
      }
      .page {
        text-align: right;
      }
    }
  }
}
</style>

<script>
import Header from "../components/common/Header2";
import Footer from "../components/common/Footer";
export default {
  name: "home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      num: 0,

      value1: 5,
      value: [0, 4],
      radio: null,
      Visible: false,
      tab: [
      ],
      id:null,
      currentPage: 1, //
      tableForm: {
        pageSize: 9,
        pageNum: 1,
        total: 0,
      },
      data:{},
      newsList: [
        {
          pic: require("../assets/img/Index/household/8.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
          info:
            "Lorem ipsum dolor坐下来，自私自利。Fusce posuere metus vitae，imperdiet arcu，id aliquet前面的污染物。塞德（Sed）坐着，坐在生命中。",
        },
      ],
      recommends: [
        {
          pic:
            "//img12.360buyimg.com/n7/jfs/t1/154619/29/12418/173032/5fea8df7E4c436d8b/c21b0a5aa299f9cb.jpg",
          name: "大正感帽药冲剂",
          price: 124,
          info: "适用全身疼痛，乏力，发热",
          isSpecial: true,
          newPrice: 28.0,
        },
        {
          pic:
            "//img11.360buyimg.com/n7/jfs/t1/151921/24/13900/267983/5ffe4eaeEb7e25ad0/22225cec46e4d122.jpg",
          name: "三九感冒灵颗粒",
          price: 14,
          info: "适用咽喉肿痛，鼻塞，发热...",
          isSpecial: true,
          newPrice: 28.0,
        },
        {
          pic:
            "//img14.360buyimg.com/n7/jfs/t1/102640/11/18337/231330/5e942caaE6b3f5099/22b9e7343d2f1717.jpg",
          name: "快克 复方氨酚烷胺胶囊",
          price: 8,
          info: "适用风寒感冒",
          isSpecial: true,
          newPrice: 28.0,
        },
      ],
    };
  },
  created() {},
  methods: {
    checkDetail(item) {
      this.Visible = true;
      this.data = item
    },
    // 分页单击事件
    handleCurrentChange(val) {
      this.tableForm.pageNum = val;
      this.getProduct();
      console.log(`当前页: ${val}`);
    },
    async back(item) {
      if (item == false) {
        this.Visible = false;
      }
    },
    // 价格筛选
    priceSelect() {
      this.tableForm.pageNum = 1;
      this.tableForm.price1 = this.value[0];
      this.tableForm.price2 = this.value[1];
      this.getProduct();
    },
    // 分类选择
    categoryChange(val) {
      this.tableForm.pageNum = 1;
      console.log(val);
      delete this.tableForm.price1;
      delete this.tableForm.price2;
      this.tableForm.id = val;
      this.getProduct();
    },
    jump(item) {
      this.$router.push({path:'/Product-details'})
      sessionStorage.setItem("product",JSON.stringify(item))
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
              type: "warning",
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
    // 商品分类
    getCategory() {
      this.$http
        .get("mt/yaopin/findTypeAll", {
          params: { id: 0 },
        })
        .then((res) => {
          this.tab = res.data.data;
          let count = 0;
          this.tab.forEach((element) => {
            count += element.num;
          });
          this.tab.unshift({
            id: null,
            name: "全部",
            num: count,
          });
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
            this.tableForm.total = res.data.data.total;
          }
        });
    },
  },
  mounted() {
    this.value=[0,20]
      
      if (this.$route.query.id) {
        this.radio = JSON.parse(this.$route.query.id);
        this.tableForm.id = JSON.parse(this.$route.query.id);
        this.getProduct();
      }
    this.getCategory();
        this.getProduct();
  },
  watch: {
    $route(from,to){
     
         this.radio = JSON.parse(this.$route.query.id);
         this.tableForm.id = JSON.parse(this.$route.query.id);
          this.getCategory();
         this.getProduct();
    }
  },
};
</script>
