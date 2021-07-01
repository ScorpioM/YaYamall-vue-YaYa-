<template>
  <div class="home">
    <div class="carousel">
      <el-carousel height="100vh">
        <el-carousel-item
          :style="{
            backgroundImage: 'url(' + item.picture[0] + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 100%',
            backgroundSize: '100% 100%',
            cursor: 'pointer',
          }"
          v-for="(item, index) in carousel"
          :key="index"
        >
          <div>
            <div class="carouse-box">
              <div
                class="name"
                data-aos="fade-up"
                :data-aos-once="false"
                :data-aos-delay="50"
                :data-aos-duration="2000"
              >
                {{ item.name }}
              </div>
              <div
                class="line"
                data-aos="flip-left"
                data-aos-anchor-placement="center-bottom"
                :data-aos-once="false"
                :data-aos-delay="100"
                :data-aos-duration="2000"
              ></div>
              <div
                class="info"
                data-aos="fade-up"
                :data-aos-once="false"
                :data-aos-delay="150"
                :data-aos-duration="2000"
              >
                {{ item.info }}
              </div>
              <div class="fa btn"
              data-aos="fade-up"
                :data-aos-once="false"
                :data-aos-delay="200"
                :data-aos-duration="2000"
                @click="jump(item)"
              >
                前往查看
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Header
      style="position: absolute; top: 60px; left: 50%; margin-left: -570px"
    />
    <History />
    <Category />
    <Household />
    <Dailyspecials />
    <NutritionTonic />
    <Comment />
    <Evaluate />
    <Footer />
  </div>
</template>
<style lang="less" scoped>
.home {
  .carouse-box {
    text-align: left;
  }
  .name {
    text-align: left;
    font-size: 80px;
    line-height: 80px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    margin-top: 260px;
    margin-left: 50px;
    transition: all 0.6s ease;
    &:hover {
      margin-bottom: 5px;
      color: #3d78ff;
    }
  }
  .line {
    text-align: left;
    background-color: #000;
    line-height: 55px;
    min-height: 5px;
    min-width: 122px;
    max-height: 5px;
    max-width: 122px;
    margin: 35px 0;
    display: inline-block;
    margin: 80px 0 50px 50px;
  }
  .info {
    font-weight: 700;
    text-align: left;
    font-size: 16px;
    line-height: 28px;
    max-width: 655px;
    font-family: "Open Sans", sans-serif;
    margin-left: 50px;
    transition: all 0.6s ease;
    &:hover {
      margin-top: -5px;
      color: #3d78ff;
    }
  }
  .btn{
     text-align: center;
         border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 80px;
    margin: 5px 0;
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
    margin-left: 50px;
    margin-top: 50px;
    &::after{
      content: "\f054";
      color: #fff;
    }
    &:hover{
      background: #3d78ff;
    color: #fff;
    }  
  }
}
</style>

<script>
import Header from "../components/common/Header";
import Household from "../components/Index/household";
import NutritionTonic from "../components/Index/nutritionTonic";
import Dailyspecials from "../components/Index/dailyspecials";
import History from "../components/Index/history";
import Category from "../components/Index/category";
import Comment from "../components/Index/comment";
import Evaluate from "../components/Index/evaluate";
import Footer from "../components/common/Footer";
export default {
  name: "home",
  components: {
    Header,
    Household,
    NutritionTonic,
    Dailyspecials,
    History,
    Category,
    Comment,
    Evaluate,
    Footer,
  },
  data() {
    return {
      carousel: [
        {
          pic: require("../assets/img/banner/1.jpg"),
          name: "轻微皮外伤应该如何处理",
          info:
            "骨折是指骨头或骨头的结构完全或部分断裂。多见于儿童及老年人，中青年也时有发生",
        },
        {
          pic: require("../assets/img/banner/2.jpg"),
          name: "轻微皮外伤应该如何处理",
          info:
            "骨折是指骨头或骨头的结构完全或部分断裂。多见于儿童及老年人，中青年也时有发生",
        },
        {
          pic: require("../assets/img/banner/3.jpg"),
          name: "轻微皮外伤应该如何处理",
          info:
            "骨折是指骨头或骨头的结构完全或部分断裂。多见于儿童及老年人，中青年也时有发生",
        },
        {
          pic: require("../assets/img/banner/4.jpg"),
          name: "轻微皮外伤应该如何处理",
          info:
            "骨折是指骨头或骨头的结构完全或部分断裂。多见于儿童及老年人，中青年也时有发生",
        },
      ],
             tableForm:{
                pageSize:4,
                pageNum:1,
                total:0
            },
    };
  },
  created() {},
  methods: {

    getWikipedia(){
            this.$http.get('mt/baike/findAll',{
                params:this.tableForm
            }).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.rows.forEach((item,index)=>{
                        item.yufangaddr = JSON.parse(item.yufangaddr)
                        item.picture = JSON.parse(item.picture)
                    })
                this.carousel = res.data.data.rows;
                // this.tableForm.total = res.data.data.total;
                }
            });
        },
        jump(item){

          // sessionStorage.setItem("details",JSON.stringify(item))
          this.$router.push({path:'/Pain-details',query:{details:JSON.stringify(item)}})
           
      },
  },
  mounted() {
    this.getWikipedia();
  },
};
</script>
