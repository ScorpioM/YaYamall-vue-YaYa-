<template>
  <div class="Swiper">
    <!-- 轮播图 -->
    <el-carousel indicator-position="outside" :interval="6000" height="100vh">
      <el-carousel-item v-for="(item, index) in img" :key="index">
        <img style="width: 100%; height: 100%" :src="item.url" alt />
        <div class="meng"></div>
        <div class="box clearfix">
          <div class="details" v-html="item.details"></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  data() {
    return {
      img: [
        {
          title: "———— 李时珍 《本草纲目》————",
          details:
            "人之一身，贪心动则津生，</br>哀心动则泪生，.魄心动则汗生，</br>欲心动则精生。",
          url: require("../../assets/img/banner/1.jpg"),
        },
        {
          title: "———— 张仲景 《伤寒杂病论》  ————",
          details:
            "天布五行，以运万类，</br>人票五常，以有五藏，经络府俞，</br>阴阳会通，玄冥幽微，变化难极，</br>自非才高识妙，岂能探其理致哉!",
           url: require("../../assets/img/banner/2.jpg"),
        },
        {
          title: "————  神农 《神农本草经》 ————",
          details:
            "儒者不必以医名，而知医之理，</br>则莫过于儒者。春秋时，和与缓，</br>神于医者也。其通（周易），辩皿虫之义，</br>医也而实儒也。世之言医者，必首推神农。",
           url: require("../../assets/img/banner/3.jpg"),
        },
        {
          title: "————  扁鹊 《难经》 ————",
          details:
            "疾之居膝理也，汤熨之所及也;在血脉，</br>针石之所及也;其在肠胃，酒醛之所及也</br>:其在骨髓，虽司命无奈之何。</br>今在骨随，臣是以无请也。",
           url: require("../../assets/img/banner/4.jpg"),
        },
        
      ],
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  filters: {},
};
</script>

<style lang="less">
.Swiper {
  min-height: 100vh;
  min-width: 100vw;
  position: relative;

  .Layout {
    width: 1200px;
    margin: 0 auto;
  }

  // 轮播图
  .el-carousel {
    position: absolute;
    top: 0;
    min-width: 100vw;
    min-height: 100vh;

    .meng {
      position: absolute;
      top: 0;
      width: 100%;
      min-height: 100vh;
      background: rgba(0, 0, 0, 0.42);
    }

    img {
      width: 100%;
      min-height: 100vh;
    }

    // 箭头
    .carousel__arrow {
      display: none;
    }

    .el-carousel__button {
      width: 20px !important;
      height: 3px !important;
      // border-radius: 50% !important;
      // border: 1px solid #1f62d5;
      background: rgba(255, 255, 255, 0.46);
    }

    .is-active .el-carousel__button {
      background-color: #f43d05;
    }

    .el-carousel__indicators--outside button {
      opacity: 1;
    }

    .el-carousel__indicators--outside {
      position: absolute;
      bottom: 8%;
      left: 50%;
      min-width: 1200px;
      transform: translate(-50%, -60px);
    }

    .el-carousel__indicator--horizontal {
      display: inline-block;
      padding: 12px 4px;
      float: left;
      transform: translate(200px, 0);
    }

    .box {
      position: absolute;
      bottom: 21%;
      min-width: 1200px;
      left: 50%;
      transform: translate(-33%, 0);
      text-align: left;
      > div {
        font-size: 16px;
        color: #fff;
      }

      > .details {
        width: 345px;
        line-height: 23px;
        color: #fff;
      }

      > .title {
        line-height: 48px;
      }
    }
  }
}
</style>