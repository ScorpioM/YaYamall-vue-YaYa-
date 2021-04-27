<template>
  <div class="PersonalCenter">
    <div class="container">
      <div class="column">
        <div class="userImg">
          <img src="../assets/img/Index/comment/1.jpg" alt />
          <img
            @click="columnIndex = 4"
            src="../assets/img/Personal-Center/edit.png"
            alt=""
          />
        </div>
        <div class="userName">
          {{user.name| username }}
        </div>
        <ul>
          <li
            :class="columnIndex == index ? 'li_active' : ''"
            v-for="(item, index) in columnList"
            :key="index"
            @click="columnIndexActive(index)"
          >
            <div>
              <img
                :src="
                  columnIndex == index
                    ? require('../assets/img/Personal-Center/' +
                        't-0' +
                        (index + 1) +
                        '.png')
                    : require('../assets/img/Personal-Center/' +
                        'f-0' +
                        (index + 1) +
                        '.png')
                "
                alt=""
              />
              {{ item }}
            </div>
          </li>
        </ul>
      </div>
      <Infomation v-if="columnIndex == 0" />
      <Address  v-else-if="columnIndex == 1"/>
      <Order  v-else-if="columnIndex == 2"/>
      <Collection  v-else-if="columnIndex == 3"/>
      <Cart  v-else-if="columnIndex == 4"/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/common/Header2";
import Footer from "../components/common/Footer";
import Infomation from "../components/Personal-Center/infomation"; // 我的课程
import Address from "../components/Personal-Center/address"; // 我的课程
import Order from "../components/Personal-Center/order"; // 我的课程
import Collection from "../components/Personal-Center/collection"; // 我的课程
import Cart from "../components/Personal-Center/cart"; // 我的课程
export default {
  name: "Personal-Center",
  components: {
    Header,
    Footer,
    Infomation,
    Address,
    Order,
    Collection,
    Cart
  },
  data() {
    return {
      columnIndex: 0,
      user:{
        name:'',
        phone:'',
        pictureAddr:'',
        nick:''
      },
      columnList: [
        "个人信息",
        "收货地址",
        "订单管理",
        "我的收藏",
        "我的购物车",
        "退出登录",
      ],
    };
  },
  created() {
    
  },
  methods: {
    // 栏目选中索引
    columnIndexActive(index) {
      if (this.columnList.length - 1 !== index || index ==4 || index == 0) {
        this.columnIndex = index;
      }
      else {
        window.localStorage.clear();
        window.sessionStorage.clear();
        this.$store.state.menuIndex = 0;
        this.$router.push("/Login");
      }
      
    },
    getUser(){
        
      }
  },
  mounted() {
    this.user.name=localStorage.getItem("name")
    this.user.phone=localStorage.getItem("phone")
    this.user.id=localStorage.getItem("id")
    this.user.pictureAddr=localStorage.getItem("pictureAddr")
    console.log(this.$store.getters.isLogin)
    // 栏目选中索引
    if (this.$route.query.columnIndex) {
      this.columnIndexActive(this.$route.query.columnIndex);
    }
  },
  watch: {
    $route(to, form) {
      if (to.name == "PersonalCenter") {
        this.columnIndexActive(this.$route.query.columnIndex);
      }
    },
  },
  filters: {
    username(val) {
      if (val) {
        if (val.length > 8) {
          return `${val.substring(0, 8)}...`;
        } else {
          return val;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.PersonalCenter {
  min-height: 100vh;
  background: #f4f5f9;
  > .container {
    padding-top: 35px;
    .column {
      margin-right: 9px;
      float: left;
      width: 210px;
      height: 650px;
      background: #ffffff;
      border-radius: 4px;
      > .userImg {
        position: relative;
        > img:nth-child(1) {
          display: block;
          margin: 23px auto 13px auto;
          width: 86px;
          height: 86px;
          border-radius: 50%;
        }
        > img:nth-child(2) {
          cursor: pointer;
          position: absolute;
          right: 60px;
          bottom: -5px;
          width: 29px;
          height: 29px;
        }
      }
      > .userName {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: #3d3d3d;
      }
      > ul {
        margin-top: 33px;
        > li {
          cursor: pointer;
          margin-bottom: 20px;
          line-height: 50px;
          font-weight: 500;
          text-align: center;
          color: #18191a;
          > div {
            margin: 0 auto;
            width: 132px;
            > img {
              vertical-align: middle;
              width: 18px;
              height: 18px;
              transform: translateY(-1px);
            }
          }
        }
        > .li_active {
          color: #3d78ff;
          > div {
            border-radius: 13px;
            box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          }
        }
        > li:nth-last-child(1) {
          > div {
            color: #999999;
            padding-top: 10px;
            border-top: 1px solid #dedede;
          }
        }
      }
    }
  }
}
</style>