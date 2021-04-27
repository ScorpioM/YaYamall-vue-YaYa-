<template>
  <div class="home">
    <div class="bg">
        </div>
      <div class="container">
        <div class="contents">
          <!-- title -->
          <div class="title">今日特价</div>
          <!-- 特价倒计时 -->
          <div class="time">
            <div v-html="countDownTime"></div>
          </div>
          <el-carousel  arrow="never"  type="card" height="450px">
            <el-carousel-item v-for="(item, index) in newsList" :key="index">
              <div class="product">
                <div class="pic">
                  <img :src="item.addr[0]" alt="" />
                </div>
                <div class="info">
                  <div class="name">{{ item.name }}</div>
                  <div class="price">￥{{ item.price * item.zhelv }}.00</div>
                  <div class="details" @click="jump(item)">查看详情</div>
                </div>
                <div class="move">
                 <div class="fa"  @click="checkDetail(item)" ></div>
                 <div class="fa" @click="liked(item)"></div>
                 <div class="fa" @click="addCart(item)"></div>
                </div> 
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
     <Dialog @back="back($event)" :data="data" v-if="Visible" :Visible="Visible" :key="key" />
  </div>
</template>
<style lang="less" scoped>
.home {
    position: relative;
  > .bg {
    height: 600px;
    margin: 0 50px 170px 50px;
    background-image: url("../../assets/img/Index/dailyspecials/bg.jpg");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(4px);
    }
    
    > .container {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
      padding-top: 120px;
      > .contents {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        > .title {
          font-size: 35px;
          font-family: yesteryear, cursive;
          color: #000;
          margin-bottom: 55px;
        }
        > .time {
          width: 625px;
          position: relative;
          z-index: 999;
          height: 82px;
          opacity: 1;
          > div {
            width: 625px;
            background: #fff;
            margin: 0;
            height: 82px;
            position: relative;
            z-index: 11;
            box-shadow: 0 10px 30px 0 rgb(202, 202, 202);
            color: #555;
            font-size: 46px;
            font-weight: 300;
            min-width: 60px;
            display: inline-block;
            line-height: 82px;
            /deep/ span {
              font-size: 14px;
              margin: 0 15px;
            }
            /deep/ label {
              font-size: 28px;
              color: rgb(156, 154, 154);
              margin-right: 10px;
            }
          }
          &:before {
            left: 6px;
            right: 6px;
            top: 6px;
          }
          &:after,
          &:before {
            content: "";
            display: block;
            height: 100%;
            position: absolute;
            z-index: 2;
            box-shadow: 0 10px 30px 0 rgb(173, 172, 172);
          }
          &:after {
            left: 12px;
            right: 12px;
            top: 12px;
          }
        }

        /deep/ .el-carousel--horizontal{
            width: 100%;
            margin-top: 100px;
            
        }
        /deep/ .el-carousel__container{
            margin-left: 150px;
        }
        /deep/ .el-carousel__mask{
            width: 0;
        }
        /deep/.el-carousel__item--card{
            width: 33%;
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
        .product{
            width: 351px;
            position: relative;
            &:hover{
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
            >.pic{
                width: 351px;
                    height: 351px;
                >img{
                    width: 351px;
                    height: 351px;
                    border-radius: 10px;
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
          margin-top: 15px;   
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
            color: rgb(15, 136, 26);
        }
      }
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
        }
      }
    }
  
}
</style>

<script>
import moment from "moment";
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
      tableForm:{
        pageSize:8,
        pageNum:1,
        zheLv:2
      },
      startTime: "2021-03-31 00:00",
      countDownTime: "",
      timer: null,
      Visible:false,
      key:1
    };
  },
  created() {},
  destroyed() {
    clearInterval(this.timer);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    checkDetail(item) {
      this.Visible = true;
      this.data = item
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
    async back(item) {
            if(item == false){
                this.Visible = false;
            }
        },
    // 切割数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },

 getProduct(){
            this.$http.get('mt/yaopin/findAll',{
                params:this.tableForm
            }).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.rows.forEach((item,index)=>{
                        item.addr = JSON.parse(item.addr)
                    })
                this.newsList = res.data.data.rows;
                }
            });
        },

    submit() {
      const _this = this;
      clearInterval(_this.timer);
      _this.timer = setInterval(() => {
        _this.countDownTime = _this.countDown();
      }, 1000);
    },
    countDown() {
      const seconds = moment().diff(
        moment(this.startTime, "MMMM-MM-DD HH:mm"),
        "seconds"
      );

      if (seconds > 0) {
        clearInterval(this.timer);
        return "今日特价已结束";
      }
      const second = Math.abs(seconds % 60);
      const minutes = Math.abs((seconds - second) / 60);
      const minute = Math.abs(parseInt(minutes % 60));
      const hours = Math.abs(parseInt((minutes - minute) / 60));
      const hour = Math.abs(hours % 24);
      const day = Math.abs((hours - hour) / 24);
      const res =
        day +
        "<span>天</span> <label> :</label>" +
        hour +
        "<span>小时</span><label> : </label>" +
        minute +
        "<span>分钟</span><label> :</label>" +
        second +
        "<span>秒 </span>";
      return res;
    },
  },
  mounted() {
    this.submit();
    this.getProduct();
  },
};
</script>
