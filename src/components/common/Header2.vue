<template>
  <div class="home">

    <div :class="{hasFixed:needFixed == true,containers:needFixed == false}">
      <div>
        <img class="logo" src="../../assets/img/login/logo2.png" alt="" />
        <ul>
          <li v-for="(item, index) in nav" :key="index"  :class="{ add: num == index }" @click="jump(item.path)">{{ item.name }}</li>
        </ul>
        <div class="cart-box">
         <div class="cart">
              <el-badge :value="cartNum" class="item">
                <img src="../../assets/img/header/cart.png" alt="" />
              </el-badge>
              <div class="price">
                <div>您的购物车</div>
                <div>${{this.sum}}</div>
              </div>
            </div>
          
              <div class="cart-product">
                <div v-for="(item,index) in tableData" :key="index" >
                <img :src="item.type == 1?item.yaopin.addr[0]:item.qixie.addr[0]" alt="" />
                <div class="info">
                  <div>{{ item.type == 1?item.yaopin.name:item.qixie.name }}</div>
                  <div>{{ item.type == 1?item.yaopin.price:item.qixie.price + "×" + item.num }}</div>
                </div>
                <div class="fa delete" @click="delCart(item)"></div>
              </div>
              <div class="prices">
                <span>总价</span>
                <span>￥{{this.sum}}</span>
              </div>
              <div class="join-cart" @click="jumpto(4)">
                查看购物车
              </div>
              </div>
              
       </div>
        <!-- 搜索 -->
        <div class="search">
          <img src="../../assets/img/header/search.png" alt="" />
        </div>

        <!-- 我的信息 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- <img
                            class="avatar"
                            :src="$store.getters.userInformation.headImgUrl"
                            alt=""
                            /> -->
            <img
              class="avatar"
              src="../../assets/img/header/avator.png"
              alt=""
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-shopping-cart-full">
              <span  @click="jumpto(4)">购物车</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-user-solid">
              <span  @click="jumpto(0)">我的账户</span>
            </el-dropdown-item>
            <el-dropdown-item icon="el-icon-back">
              <span  @click="jumpto(null)">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  >.hasFixed{
    background-color: #fff;
    > div:first-child {
      position: fixed;
    top: 0;
    background-color: #fff;
    left: 0;
    right: 0;
      width: 100%;
      height: 63px;
      padding: 10px 15px;
      display: flex;

      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      z-index: 5;
      box-shadow: 0 10px 30px 0 rgb(221, 220, 220);
      > .logo {
        width: 156px;
        height: 40px;
        margin-left: 30px;
      }
      > ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-left: 500px;
        width: 500px;
        > .add {
          font-weight: 700;
          color: #3d78ff;
          background: #ffffff;
          &::before {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 0;
            right: 0;
            background: #3d78ff;
            display: block;
            width: 100%;
            height: 2px;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }
        }
        > li {
          font-size: 15px;
          font-weight: 500;
          padding: 0 6px;
          color: #434343;
          cursor: pointer;
          position: relative;
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
          &::before {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 50%;
            right: 50%;
            background: #3d78ff;
            display: block;
            width: 0;
            height: 2px;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }
          &:hover {
            color: #3d78ff;
            &::before {
              left: 0;
              right: 0;
              width: 100%;
            }
          }
        }
      }
      .cart-box{
        position: relative;
        &:hover{
          .cart-product{
            display: block;
          }
        }
      .cart {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-left: 20px;
        img {
          width: 18px;
          height: 17px;
        }
        .item {
          margin-top: 10px;
          margin-right: 40px;
        }
        .price {
          margin-left: -20px;
          width: 65px;
          > div {
            font-size: 13px;
            font-weight: 500;
            text-align: left;
          }
        }
      }

      
      .cart-product {
        display: none;
        background-color: #fff;
        width: 308px;
        padding: 30px 25px 15px 25px;
        position: absolute;
        z-index: 999;
        top: 30px;
        right: 0;
        border: 1px solid #e5e5e5;
    box-shadow: 0px 1px 3px 0px rgb(184, 184, 184);
    border-radius: 5px;
    &:hover{
       display: block;
    }
        >div{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
         img {
          width: 75px;
          height: 75px;
        }
        >.delete{
          &:hover{
            color: rgb(190, 22, 22);
            font-size: 20px;
          }
          &::before{
            content: "\f00d";
            font-size: 18px;
            cursor: pointer;
          }
        }
        > .info {
          > div:first-child {
            font-family: "Poppins", sans-serif;
            transition: all 0.3s ease-out 0s;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          }
          > div:last-child {
            display: block;
            margin-top: 8px;
            text-align: left;
            font-size: 14px;
            font-weight: 400;
            color: #555;
          }
        }
      }
      }
       .prices{
            border-top: 1px solid #e5e5e5;
    color: #555;
    font-size: 16px;
    font-weight: 400;
    padding: 15px 0;
    text-align: left;
    margin: 0;
    >span:last-child{
      float: right;
    }
      }
      .join-cart{
        text-align: center;
        border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 80px;
    margin: 20px 0;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    float: right;
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
      > .search {
          margin-left: 40px;
        > img {
          width: 18px;
          height: 17px;
        }
      }
      .avatar {
          margin-left: 40px;
        width: 24px;
        height: 24px;
      }
    }
  }
  > .containers {
    position: relative;
    > div {
      width: 100%;
      height: 63px;
      padding: 10px 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 10px 30px 0 rgb(221, 220, 220);
      > .logo {
        width: 156px;
        height: 40px;
        margin-left: 80px;
      }
      > ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        margin-left: 400px;
        width: 500px;
        > .add {
          font-weight: 700;
          color: #3d78ff;
          background: #ffffff;
          &::before {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 0;
            right: 0;
            background: #3d78ff;
            display: block;
            width: 100%;
            height: 2px;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }
        }
        > li {
          font-size: 15px;
          font-weight: 500;
          padding: 0 6px;
          color: #434343;
          cursor: pointer;
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
          position: relative;
          &::before {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 50%;
            right: 50%;
            background: #3d78ff;
            display: block;
            width: 0;
            height: 2px;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }
          &:hover {
            color: #3d78ff;
            &::before {
              left: 0;
              right: 0;
              width: 100%;
            }
          }
        }
      }
  .cart-box{
        position: relative;
        &:hover{
          .cart-product{
            display: block;
          }
        }
      .cart {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-left: 20px;
        img {
          width: 18px;
          height: 17px;
        }
        .item {
          margin-top: 10px;
          margin-right: 40px;
        }
        .price {
          margin-left: -20px;
          width: 65px;
          > div {
            font-size: 13px;
            font-weight: 500;
            text-align: left;
          }
        }
      }

      
      .cart-product {
        z-index: 999;
        display: none;
        background-color: #fff;
        width: 308px;
        padding: 30px 25px 15px 25px;
        position: absolute;
        top: 30px;
        right: 0;
        border: 1px solid #e5e5e5;
    box-shadow: 0px 1px 3px 0px rgb(184, 184, 184);
    border-radius: 5px;
    &:hover{
       display: block;
    }
        >div{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
         img {
          width: 75px;
          height: 75px;
        }
        >.delete{
          &:hover{
            color: rgb(190, 22, 22);
            font-size: 20px;
          }
          &::before{
            content: "\f00d";
            font-size: 18px;
            cursor: pointer;
          }
        }
        > .info {
          > div:first-child {
            font-family: "Poppins", sans-serif;
            transition: all 0.3s ease-out 0s;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          }
          > div:last-child {
            display: block;
            margin-top: 8px;
            text-align: left;
            font-size: 14px;
            font-weight: 400;
            color: #555;
          }
        }
      }
      }
       .prices{
            border-top: 1px solid #e5e5e5;
    color: #555;
    font-size: 16px;
    font-weight: 400;
    padding: 15px 0;
    text-align: left;
    margin: 0;
    >span:last-child{
      float: right;
    }
      }
      .join-cart{
        text-align: center;
        border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 80px;
    margin: 20px 0;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    float: right;
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
      > .search {
          margin-left: 40px;
        > img {
          width: 18px;
          height: 17px;
        }
      }
      .avatar {
          margin-left: 40px;
        width: 24px;
        height: 24px;
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
       num: 1,
      needFixed: false,
      newsList: [
        {
          pic: require("../../assets/img/Index/household/1.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
          num: 3,
        },
        {
          pic: require("../../assets/img/Index/household/2.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
          num: 6,
        },
      ],
      cartNum:'',
      nav: [
        {
          path: "/",
          name: "首页",
          index: 0,
        },
        {
          path: "/Drug",
          name: "药品专区",
          index: 1,
        },
        {
          path: "/Instrument",
          name: "器械专区",
          index: 2,
        },
        {
          path: "/Pain",
          name: "病痛百科",
          index: 3,
        },
        {
          path: "/Personal-Center",
          name: "个人中心",
          index: 4,
        },
      ],
      tableData:[],
       sum:0,
      tableForm:{
        pageSize:8,
        pageNum:1,
        id:localStorage.getItem("id"),
      },
    };
  },
  watch: {
    $route(to, from) {
      this.nav.forEach((item, index) => {
        this.num = to.path == item.path ? item.index : this.num;
      });
    },
  },
  created() {},
  methods: {
    jumpto(index){
      if(index!==null){
        this.$router.push({path:'/Personal-Center',query:{columnIndex:index}})
      }
      else{
        window.localStorage.clear();
        this.$router.push({path:'/login'})
      }
    },
    getCart() {
            this.$http.get('mt/gouwuche/findAll', { params: this.tableForm }).then((res) => {
              let sum = 0;
               res.data.data.rows.forEach((item,index)=>{
                 if(item.type == 1){
                   item.yaopin.addr = JSON.parse(item.yaopin.addr)
                   sum+=item.yaopin.price
                 }
                 if(item.type == 2){
                   item.qixie.addr = JSON.parse(item.qixie.addr)
                    sum+=item.qixie.price
                 }
                 
               })
               this.cartNum = res.data.data.total;
                this.sum = sum;
                this.tableData = res.data.data.rows;
               
            });
        },
        delCart(item){
              this.$http.get('mt/gouwuche/del', { params: {
                userId:localStorage.getItem('id'),
                spId:item.shangpinid
              } }).then((res) => {
             
               
               
               
            });
        },
    handleScroll(){
      let self = this;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop >20){
        self.needFixed = true

      }else{
        self.needFixed = false;
      }
    },
    jump(path){
        this.$router.push({path:path})
    }
  },
  mounted() {
    this.getCart();
    window.addEventListener("scroll",this.handleScroll)
  },
};
</script>
