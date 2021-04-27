<template>
  <div class="home">
    <div class="carousel">
      <el-carousel height="500px">
        <el-carousel-item
          :style="{
            backgroundImage: 'url(' + item.pic + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 100%',
            backgroundSize: '100% 100%',
            cursor: 'pointer',
          }"
          v-for="(item, index) in carousel"
          :key="index"
        >
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/Pain' }"
            >病痛百科</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{details.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- title -->
      <div class="title">
        <div>{{ details.name }}</div>
        <div>
         关键字:{{details.gjz}}
          <span>{{ details.time }}</span>
        </div>
      </div>

      <div class="info">
        <div class="info_title">{{ details.miaoshu }}</div>
        <img :src="details.picture[0]" alt="" />
        <div class="yufang_title">简单预防方法</div>
        <p>{{ details.yufang }}</p>
        <div class="pics">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in details.yufangaddr"
            :key="index"
          />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>
<style lang="less" scoped>
.home {
  .carousel {
    margin-top: 2px;
  }
  .bread {
    margin: 30px 0;
  }

  .title {
      text-align: left;
      border-bottom: 3px solid rgb(221, 221, 221);
      padding-bottom: 10px;
      margin-bottom: 10px;
    > div:first-child {
      font-size: 28px;
      font-weight: 700;
    }
    > div:last-child {
        margin-top: 15px;
        >span{
           color: rgb(122, 122, 122);
           font-size: 14px;
           
        }
      > span:first-child {
        
        &::before {
          content: url("../assets/img/painDetails/label.png");
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      > span:last-child {
          margin-left: 20px;
        &::before {
          content: url("../assets/img/painDetails/clock.png");
          width: 24px;
          height: 24px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }

  .info{
      text-align: left;
      >.info_title{
          text-align: left;
         font-size: 20px;
      font-weight: 400; 
      line-height: 28px;
      }
      >p{
          color: rgb(134, 134, 134);
          line-height: 35px;
           font-size: 16px;
           margin-bottom: 20px;
      }
      >.yufang_title{
          font-size: 26px;
      font-weight: 700; 
      margin: 20px 0;
      }
      >img{
          width: 100%;
          height: 800px;
          margin: 20px;
      }
      >.pics{
            display: flex;
            flex-flow: row wrap;
             justify-content: space-between; 
             >img{
                 width: 200px;
                 height: 150px;
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
      details: JSON.parse(sessionStorage.getItem('details')),
      carousel: [
        {
          pic: require("../assets/img/pain/1.jpg"),
          url: "/Map",
        },
        {
          pic: require("../assets/img/pain/2.jpg"),
        },
        {
          pic: require("../assets/img/pain/3.jpg"),
        },
        {
          pic: require("../assets/img/pain/4.jpg"),
        },
      ],
    };
  },
  created() {},
  methods: {},
  mounted() {},
};
</script>
