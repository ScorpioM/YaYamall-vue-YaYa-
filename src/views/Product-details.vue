<template>
  <div class="home">
      <div class="container">
          <div class="banner">
                <div>Want more?</div>
                <div>Medicine store</div>
                <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>药品详情</el-breadcrumb-item>
            </el-breadcrumb>
            </div>
             <div class="dia">
        <div class="left-box">
            <el-image 
                            style="width: 445px; height: 445px"
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
            <el-rate v-model="value1"></el-rate>
          <div class="price">￥{{ product.price }}.00</div>
          <div class="fa inventory">
                库存150件
              </div>
          <div class="buy">
              
            <div class="num">
            <span @click="add">+</span>
            <input type="text" v-model="this.form.num" />
            <span @click="reduction">-</span>
          </div>
          <div class="cart" @click="addCart">
            加入购物车
          </div>
          </div>
          
          <p class="info">{{ product.miaoshu }}</p>
          <div class="category">
             <span>分类:</span>
             {{product.fname}}
          </div>
          <div class="share">
            <div class="title">分享这个产品:</div>
            <div class="icon">
              <div v-for="(item,index) in icons" :key="index" :class="{blue:index==0,green:index==1,lightblue:index==2}">
                <img class="unselect" :src="item.unselect" alt="">
                <img  class="select" :src="item.select" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
            <div class="middle">
                    <span @click="num=0" :class="{add:num==0}">描述</span>
                    <span @click="num=1" :class="{add:num==1}">评论({{comment_num}})</span>
            </div>
            <!-- contents -->
            <p class="desc" v-if="num==0">
                {{product.miaoshu}}
            </p>
            <div class="comments" v-if="num==1">

                    <div class="title">共计（{{comment_num}}）条评论</div>
                    <div class="contents_box">
                      <div class="contents" v-for="(item,index) in comments" :key="index"> 
                    <img :src="item.pictureAddr" alt="">
                    <div class="comment" >
                          <el-rate v-model="value1"></el-rate>
                          <div class="monster">
                              <span>{{item.name}}-</span>2021-03-07
                          </div>
                          <div >{{item.pinglun}}</div>
                    </div>
                </div>
                    </div>

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
                

                    <div>添加评论</div>
                    <div>您的评分 <el-rate v-model="value1"></el-rate></div>
                    <textarea name="" v-model="comment" placeholder="请填写您对本商品的评价"></textarea>
                    <div class="submit" @click="addComment">提交评论</div>
            </div>

            <div class="need">
                    <div class="title">
                        您可能还需要....
                    </div>
                    <el-carousel trigger="click" height="388px">
        <el-carousel-item v-for="(item, index) in arr" :key="index">
          <ul class="houseHold">
            <li v-for="(item2, i) in item" :key="i">
              <img :src="item2.pic" alt="" />
              <div class="info">
                <div class="name">{{ item2.name }}</div>
                <div class="price">￥{{ item2.price }}.00</div>
                <div class="details">查看详情</div>
              </div>
              
              <div class="move">
                    <div @click="checkDetail"></div>
                    <div></div>
                    <div></div>
              </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>

            </div>
            <div class="recommend">
                    <div class="title">
                        相关产品
                    </div>
                    <el-carousel trigger="click" height="388px">
        <el-carousel-item v-for="(item, index) in arr2" :key="index">
          <ul class="houseHold">
            <li v-for="(item2, i) in item" :key="i">
              <img :src="item2.pic" alt="" />
              <div class="info">
                <div class="name">{{ item2.name }}</div>
                <div class="price">￥{{ item2.price }}.00</div>
                <div class="details">查看详情</div>
              </div>
              
              <div class="move">
                    <div @click="checkDetail"></div>
                    <div></div>
                    <div></div>
                    <!-- <img src="../../assets/img/Index/household/search.png" alt="">
                    <img src="../../assets/img/Index/household/like.png" alt="">
                    <img src="../../assets/img/Index/household/cart.png" alt=""> -->
              </div>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>

            </div>
      </div>
      <Footer />
  </div>
</template>
<style lang="less" scoped>
.home {
  .page{
    margin: 20px 0;
  }
    .banner{
          width: 100%;
          height: 300px;
          background-image: url('../assets/img/productDetails/bg3.jpg');
          background-position: 100% 100%;
          background-size: 100% 100%;
          text-align: left;
          >div{
              margin-left: 40px;
              margin-top: 50px;
          }
          >div:first-child{
                font-size: 20px;
                color: #fff;
                padding-top: 40px;
          }
          >div:nth-child(2){
font-size: 40px;
                color: #fff;
          }
      }
       .dia {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin-top: 50px;
    > .left-box {
      padding: 0 15px;
      > img {
        width: 445px;
        height: 445px;
      }
    }
    > .right-box {
      width: 740px;
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
        margin-top:20px;
      }
      >.inventory{
              color: #666666;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 5px;
          &::before{
                  color: #81ca33;
    content: '\f058';
    float: left;
    font-family: FontAwesome;
    font-size: 14px;
    margin: 2px 8px 0 0;
          }
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
          border: 1px solid rgb(128, 125, 125);
          padding: 3px 6px;
          cursor: pointer;
        }
        > input {
          width: 28px;
          height: 20px;
          border-radius: 0;
          outline: none;
          border: 1px solid rgb(128, 125, 125);
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
      >.category{
          color: #666;
    font-weight: 400;
    margin: 30px 0;
          >span{
              color: #555;
    font-size: 14px;
    font-weight: 700;
          }
      }
      >.share{
           display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
        >.title{color: #555;
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
        }
        >.icon{
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          >div{
            font-size: 18px;
    color: #808080;
    width: 20px;
    height: 20px;
    display: block;
    text-align: center;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    position: relative;
    cursor: pointer;
    margin-right: 20px;
    margin-left: 5px;
    &:hover{
      >.select{
              opacity: 1;
              display: block;
            }
            >.unselect{
              opacity: 0;
              display: none;
            }
          
           
    }
    >img{
        vertical-align: middle;
        transition: all 0.3s ease-out 0s;
      
    }
            >.select{
              opacity: 0;
              display: none;
            }
            >.unselect{
              opacity: 1;
            }
          }
        }
      }
    }
  }
  .middle{
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 10px;
    >span{
            font-size: 18px;
    color: #000;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    }    
    >.add{
       border-bottom: 2px solid #3f9bf1;
          padding-bottom: 9px; 
    }  

  }
  .desc{
      text-align: left;
      margin-top: 45px;
      font-size: 14px;
    line-height: 28px;
    color: #666;
    
  }
  .comments{
      text-align: left;
      >.title{
          font-size: 16px;
    font-weight: 700;
    text-align: left;
    margin: 20px 0;
      }
      >.contents_box{
          display: flex;
          flex-flow: column nowrap;
      }
      .contents{
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          text-align: left;
          >img{
              width: 60px;
              height: 60px;
          }
          >.comment{
              border: 1px solid #ededed;
                border-radius: 3px;
                width: 998px;
                margin-left: 30px;
                position: relative;
                padding: 15px 15px 0;
                position: relative;
                >.monster{
                    margin: 15px 0;
                    >span{
                        font-size: 17px;
    line-height: 31px;
    font-weight: 700;
    color: #777;
                    }
                }
                &::before{
                    background: #fff;
    border-bottom: 1px solid #ededed;
    border-left: 1px solid #ededed;
    content: '';
    display: block;
    height: 10px;
    left: -6px;
    position: absolute;
    top: 10px;
    -webkit-transform: rotate(
45deg
);
    transform: rotate(
45deg
);
    width: 10px;
                }
          }
          
      }
          >div:nth-child(3){
              font-size: 17px;
    line-height: 31px;
    font-weight: 700;
    color: #777;
    padding-bottom: 5px;
    border-bottom:1px solid rgb(170, 169, 169);
    margin: 20px 0;
          }
          >div:nth-child(4){
              font-size: 17px;
            line-height: 31px;
            font-weight: 700;
            color: #777;
          }
          >textarea{
              border: 1px solid #ededed;
    border-radius: 0;
    height: 125px;
    padding: 10px;
    width: 100%;
    background: #f5f5f5;
          }
          >.submit{
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
    text-align: center;
    padding: 0 25px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;
    margin: 20px 0;
    &:hover{
      background: #3d78ff;
    color: #fff;
    }
          }
  }
  .need{
      >.title{
          font-size: 35px;
    font-family: 'Yesteryear', cursive;
    margin: 60px 0 40px 0;
      }
  
  ul.houseHold {
    display: flex;
    flex-flow: row nowrap;
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
            margin-top: 10px;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        >div:first-child{
            background:url('../assets/img/icon/search-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/search-true.png') no-repeat;
            }
            
        }
        >div:nth-child(2){
            margin-top: 12px;
            background:url('../assets/img/icon/like-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/like-true.png') no-repeat;
            }
        }
        >div:last-child{
            background:url('../assets/img/icon/cart-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/cart-true.png') no-repeat;
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
            color: #3d78ff;
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
  .recommend{
      >.title{
          font-size: 35px;
    font-family: 'Yesteryear', cursive;
    margin: 60px 0 40px 0;
      }
  
  ul.houseHold {
    display: flex;
    flex-flow: row nowrap;
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
            margin-top: 10px;
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
        >div:first-child{
            background:url('../assets/img/icon/search-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/search-true.png') no-repeat;
            }
            
        }
        >div:nth-child(2){
            margin-top: 12px;
            background:url('../assets/img/icon/like-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/like-true.png') no-repeat;
            }
        }
        >div:last-child{
            background:url('../assets/img/icon/cart-false.png') no-repeat;
            &:hover{
                background:url('../assets/img/icon/cart-true.png') no-repeat;
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
            color: #3d78ff;
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
  .seamless-warp2 {
    overflow: hidden;
    height: 83px;
    width: 445px;
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
import Header from "../components/common/Header2";
import Footer from "../components/common/Footer";
export default {
  name: "home",
  components: {
    Header,
    Footer
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        step: 0.5,
      };
    },
    arr() {
      return this.group(this.newsList, 4);
    },
    arr2(){
      return this.group(this.newsList2, 4);
    }
  },
  data() {
    return {
        num:0,
        product:JSON.parse(sessionStorage.getItem('product')),
        changeImg:JSON.parse(sessionStorage.getItem('product')).addr[0],
        value1:5,
        comment:'',
        srcList:[],
        comment_num:'',
        head:localStorage.getItem("pictureAddr"),
        // name:this.$route.query.name,
      icons:[
        {
          unselect: require("../assets/img/dialog/qq-false.png"),
          select: require("../assets/img/dialog/qq2-true.png"),
        },
        {
          unselect: require("../assets/img/dialog/wx-false.png"),
          select: require("../assets/img/dialog/wx2-true.png"),
        },
        {
          unselect: require("../assets/img/dialog/dd-false.png"),
          select: require("../assets/img/dialog/dd2-true.png"),
        },
      ],
      comments:[

      ],
      type:1,
      tableForm:{
        pageSize:4,
        pageNum:1,
        spId:JSON.parse(sessionStorage.getItem('product')).id,
        type:this.type
      },
      currentPage: 1, //
      form: {
        num: 1,
      },
      newsList2: [
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
          {
          pic:
            "//image.jianke.com/suo/upload/prodimage/201606/2016615102829536!320x320.jpg",
          name: "欧姆龙-智能电子血压计手腕式(HEM-6111",
          price: 124,
          info: "适用全身疼痛，乏力，发热",
          isSpecial: true,
          newPrice: 28.0,
        },
        {
          pic:
            "//image.jianke.com/suo/upload/prodimage/201606/2016615104444771!320x320.jpg",
          name: "欧姆龙电子血压计HEM-7117 (上臂式)",
          price: 227,
          info: "测量血压)",
          isSpecial: true,
          newPrice: 28.0,
        },
        {
          pic:
            "//image.jianke.com/suo/mall/product/202008/9db6fe8a1e6d4770b91e05ad01cca485!320x320.jpg",
          name: "欧姆龙血糖仪(HGM-114)",
          price: 56,
          info: "适用测量血糖",
          isSpecial: true,
          newPrice: 28.0,
        },
        ],
      newsList: [
        {
          pic: require("../assets/img/Index/household/1.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/2.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/3.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/4.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/5.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/6.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/7.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
        {
          pic: require("../assets/img/Index/household/8.jpg"),
          name: "马来酸曲美布汀胶囊",
          price: 25,
        },
      ],
    };
  },
  created() {
    this.product = JSON.parse(sessionStorage.getItem('product'))
  },
  watch:{
    $route(from,to){

     this.product = JSON.parse(sessionStorage.getItem('product'))
     this.changeImg = JSON.parse(sessionStorage.getItem('product')).addr[0]
        // this.product = JSON.parse(to.query.product)
      if(from.path == "/Instrument"){
        this.type = 2
      }else{
        this.type = 1
      }
    }
  },
  methods: {
      group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      console.log(newArray);
      return newArray;
    },
    checkDetail(){
        this.Visible = true;
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
// 分页单击事件
    handleCurrentChange(val) {
      this.tableForm.pageNum = val;
      this.getComment();
      console.log(`当前页: ${val}`);
    },
      getComment(){
            this.$http.get('mt/sppinglun/findAll',{params:this.tableForm}).then(res=>{
                this.comments = res.data.data.rows;
                this.comment_num = res.data.data.total
            })
        },
    addComment(){
       this.$http.post('mt/sppinglun/addOrUpd',{
                  spId:this.product.id,
                  type:this.type,
                  userId:localStorage.getItem("id"),
                  pinglun:this.comment
                
            }).then((res) => {
              if(res.data.code == 200){
                  this.getComment()
                 this.$notify({
                                title: '成功',
                                message: '评论成功',
                                type: 'success'
                            });
              }else{
                this.$notify({
                                title: '失败',
                                message: '评论失败',
                                type: 'error'
                            });
              }
              
            });
    },
    // getProduct() {
    //   this.$http
    //     .get("mt/yaopin/findAll", {
    //       params: {
    //         name:this.name
    //       },
    //     })
    //     .then((res) => {
    //       if (res.data.code == 200) {
    //         res.data.data.rows.forEach((item, index) => {
    //           item.addr = JSON.parse(item.addr);
    //         });
    //         this.product = res.data.data.rows[0];
    //         this.changeImg = res.data.data.rows[0].addr[0];
    //         this.getComment();
    //       }
    //     });
    // },
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
  },
  mounted() {
    console.log(this.product)
    // this.$nextTick(() => {
    //   this.getProduct();
    // })
    this.getComment()
    
  },
};
</script>
