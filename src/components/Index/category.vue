<template>
  <div class="home">
    <div class="container">
      <!-- title -->
      <div class="title">
        <div>最佳收藏</div>
        <div>按类别购买</div>
      </div>
    </div>
    <div class="contents">
      <div class="left_box" @click="huxiJump(huxi)">
        <img :src="huxi.addr" alt=""  />
        <div>
          <div>{{huxi.name}}</div>
          <div>{{huxi.num}}项</div>
        </div>
      </div>
      <div class="right_box">
        <div v-for="(item, index) in categorys" :key="index" @click="jump(item)">
          <img
            :src="item.addr"
            alt=""
            :class="{
              first: index == 0,
              second: index == 1,
              third: index == 2,
              fourth: index == 3,
            }"
          />
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.num }}项</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  .title {
    margin-top: 115px;
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
        margin-left: -60px;
      }
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        border-top: 1px solid #abd373;
        top: 5px;
        left: 50%;
        margin-left: 30px;
      }
    }
    > div:last-child {
      font-size: 35px;
      color: #000;
      font-family: yesteryear, cursive;
      margin-top: 20px;
    }
  }
  .contents {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 50px;
    margin-top: 55px;
    > .left_box {
      position: relative;
     cursor: pointer;
     transition: all 0.3s ease-in-out;
      > img {
        width: 635px;
        height: 500px;
      }
      > div {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 90px;
        height: 50px;
        margin-left: -45px;
        margin-top: -25px;
        background-color: #fff;
        line-height: 24px;
        border-radius: 5px;
            -webkit-transition: all .3s ease;
    transition: all .3s ease;
        > div:first-child {
          color: rgb(0, 0, 0);
          font-size: 15px;
          font-weight: 500;
        }
        > div:last-child {
          color: #3d78ff;
          font-size: 11px;
        }
      }
      &:hover{
box-shadow: 0px 10px 30px 0px rgb(190, 188, 188);
>div{
  background-color: #3d78ff;
  >div{
    color: #fff;
  }
  
}
      }
    }
    > .right_box {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-start;
      > div {
        position: relative;
        margin: 0 15px;
        height: 230px;
        
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        > img {
        }
        > .first {
          width: 407px;
          height: 230px;
        }
        > .second {
          width: 306px;
          height: 230px;
        }
        > .third {
          width: 288px;
          height: 230px;
        }
        > .fourth {
          width: 435px;
          height: 230px;
        }
        > div {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 50px;
          margin-left: -45px;
          margin-top: -25px;
          background-color: #fff;
          border-radius: 5px;
          line-height: 24px;
              -webkit-transition: all .3s ease;
    transition: all .3s ease;
          > div:first-child {
            color: rgb(0, 0, 0);
            font-size: 15px;
            font-weight: 500;
          }
          > div:last-child {
            color: #3d78ff;
            font-size: 11px;
          }
        }
        
      &:hover{
box-shadow: 0px 10px 30px 0px rgb(190, 188, 188);
>div{
  background-color: #3d78ff;
  >div{
    color: #fff;
  }
  
}
      }
      }
    }
  }
}
</style>

<script>
export default {
  name: "home",
  computed: {},
  components: {},
  data() {
    return {
      huxi:{},
      categorys: [
        
      ],
    };
  },
  created() {},
  methods: {
    getCategory(){
      this.$http.get('mt/yaopin/findTypeAll',{
        params:{id:0}
      }).then(res=>{
        this.huxi = res.data.data[0]
        this.categorys = res.data.data.slice(1,5);
      })
    },
    huxiJump(item){
         this.$router.push({path:'/Drug',query:{id:JSON.stringify(item.id)}})
    },
    jump(item){
  this.$router.push({path:'/Drug',query:{id:JSON.stringify(item.id)}})
  
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>
