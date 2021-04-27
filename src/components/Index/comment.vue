<template>
  <div class="home">
    <div class="container">
      <!-- title -->
      <div class="title">
        <div>我们爱我们的客户</div>
        <div>他们在说什么</div>
      </div>
 <el-carousel trigger="click" height="319px">
        <el-carousel-item v-for="(item, index) in comments" :key="index">
            <div class="comment">
                <img :src="item.pictureAddr" alt="">
                <p>{{item.pinglun}}</p>
                <div>{{item.nick}}<span> - 客户</span></div>
            </div>
        </el-carousel-item>
      </el-carousel>
     
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  
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
        margin-left: -95px;
      }
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        border-top: 1px solid #abd373;
        top: 5px;
        left: 50%;
        margin-left: 65px;
      }
    }
    > div:last-child {
      font-size: 35px;
      color: #000;
      font-family: yesteryear, cursive;
      margin-top: 20px;
    }
  }
  .comment{
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      >img{
          width: 150px;
          height: 150px;
          border-radius: 50%;
          box-shadow: 0px 10px 30px 0px rgb(240, 237, 237);
          
      }
      >p{
          font-family: 'Poppins', sans-serif;
    font-weight: 400;   
     font-size: 20px;
    line-height: 32px;
    padding: 0 80px;
    margin-top: 45px;
    margin-bottom: 25px;
      }
      >div{
              color: #abd373;
    font-size: 14px;
    font-weight: 500;
    >span{
        color: #555;
    }
      }
  }
}
</style>

<script>
export default {
  name: "home",
  computed: {
    
  },
  components: {},
  data() {
    return {
      comments:[
          {
              avator:require('../../assets/img/Index/comment/1.jpg'),
              label:'这些家伙绝对是杰出的。完美的主题和最好的一切，您可以选择很多选择！有史以来最好的支持团队！响应速度非常快！非常感谢你！我强烈推荐这个主题以及这些人！',
              name:'凯瑟琳·沙利文（Katherine Sullivan）'
          },
          {
              avator:require('../../assets/img/Index/comment/2.jpg'),
              label:'这些家伙绝对是杰出的。完美的主题和最好的一切，您可以选择很多选择！有史以来最好的支持团队！响应速度非常快！非常感谢你！我强烈推荐这个主题以及这些人！',
              name:'凯瑟琳·沙利文（Katherine Sullivan）'
          },
          {
              avator:require('../../assets/img/Index/comment/3.jpg'),
              label:'这些家伙绝对是杰出的。完美的主题和最好的一切，您可以选择很多选择！有史以来最好的支持团队！响应速度非常快！非常感谢你！我强烈推荐这个主题以及这些人！',
              name:'凯瑟琳·沙利文（Katherine Sullivan）'
          },
          {
              avator:require('../../assets/img/Index/comment/4.jpg'),
              label:'这些家伙绝对是杰出的。完美的主题和最好的一切，您可以选择很多选择！有史以来最好的支持团队！响应速度非常快！非常感谢你！我强烈推荐这个主题以及这些人！',
              name:'凯瑟琳·沙利文（Katherine Sullivan）'
          },
      ]
    };
  },
  created() {},
  methods: {
   getComment(){
            this.$http.get('mt/xitongliuyan/findAll?id=2').then(res=>{
                this.comments = res.data.data.rows;
                
            })
        },
  },
  mounted() {
    this.getComment();
  },
};
</script>
