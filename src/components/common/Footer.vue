<template>
  <div class="home">
      <div class="container">

      
      <img src="../../assets/img/login/logo2.png" alt="">
      <div class="address">
          <img src="../../assets/img/footer/home.png" alt="">
          <div>地址：xxxxxxxxxxxxxxxxxxxxxx</div>
      </div>
      <div class="email">
          <div>电子邮件：</div>
          <div>xxxxxxxx@qq.com</div>
      </div>
      <div class="phone">
          <img src="../../assets/img/footer/phone.png" alt="">
          <div>电话：
(+86) xxxxxxxxxxxx)</div>
      </div>
      </div>
  </div>
</template>
<style lang="less" scoped>
.home {
    background-color: #000;
    margin-top: 80px;
    >.container{
display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    
  >img{
      width: 156px;
        height: 40px;
        padding: 0 15px;
  }
  >div{
      padding: 0 15px;
      color: #fff;
  }
  >.address{
      display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    >img{
        width: 26px;
        height: 24px;
        margin-right: 15px;
    }
    >div{
        width: 194px;
        text-align: left;
    }
  }
  >.email{
text-align: left;
  }
  >.phone{
      display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    >img{
         margin-right: 15px;
    }
    >div{
       width: 194px; 
       text-align: left;
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
     
    };
  },
  created() {},
  methods: {
   
  },
  mounted() {
  },
};
</script>
