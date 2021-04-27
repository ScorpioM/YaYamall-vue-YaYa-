<template>
  <div class="home">
    <div class="title">我的收藏 / My Collection</div>
      <ul class="houseHold" >
            <li v-for="(item, i) in newsList" :key="i">
              <img :src="item.type==1?item.yaopin.addr[0]:item.qixie.addr[0]"  alt="" />
              <div class="info">
                <div class="name">{{ item.type==1?item.yaopin.name:item.qixie.name }}</div>
                <div class="price">￥{{ item.type==1?item.yaopin.price:item.qixie.price }}</div>
                <div class="details" @click="cancel(item)">取消收藏</div>
              </div>
            <div class="move">
              <div class="fa" @click="checkDetail(item)"></div>
              <div class="fa" @click="liked(item)"></div>
              <div class="fa" @click="addCart(item)"></div>
            </div>
            </li>
          </ul>
          <Dialog @back="back($event)" :data="data" v-if="Visible" :Visible="Visible" :key="key" />
  </div>
</template>
<style lang="less" scoped>
.home {
  width: 904px;
  height: 650px;
  background-color: #fff;
  float: left;
  padding: 0 20px;
  overflow: scroll;
 &::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
  > .title {
    font-family: "Yesteryear", cursive;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid rgb(247, 247, 247);
    padding: 20px 0;
    margin-bottom: 20px;
  }
   ul.houseHold {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    > li {
      margin: 15px 15px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
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
        width: 186px;
        height: 186px;
      } >.speacil{
              width: 86px;
              height: 86px;
              background: #abd373;
            box-shadow: none;
            color: #ffffff;
            font-size: 15px;
            line-height: 10;
            font-weight: 500;
            height: 100px;
            position: absolute;
            right: -55px;
            top:-40px;
            transform: rotate(
45deg
) translateZ(0) scale(1.0,1.0);
          }
     > .move {
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
            transform: translate(-50%, -50%);
            box-shadow: 0 1px 3px 0 rgb(212, 209, 209);
            transition: all 0.4s ease;
            > div {
              float: left;
              margin-left: 18px;
              margin-top: 13px;
              font-size: 14px;
              width: 20px;
              height: 20px;
              cursor: pointer;
              transition: all 0.4s ease;
            }
            > div:first-child {
              &::before {
                content: "\f002";
              }
              &:hover {
                color: #3d78ff;
              }
            }
            > div:nth-child(2) {
              font-size: 12px;
              &::before {
                content: "\f004";
              }
              &:hover {
                color: #3d78ff;
              }
            }
            > div:last-child {
              &::before {
                content: "\f07a";
              }
              &:hover {
                color: #3d78ff;
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
            color: rgb(15, 136, 26);
        }
        }
        > .price {
          color: #555;
          font-size: 14px;
          margin-top: 10px;   
          text-align: center;  
          transition: all .4s ease;
          opacity: 1;
          >span{
                color: rgb(158, 158, 158);
          font-size: 14px;
          margin-top: 10px;   
          text-align: center;  
          transition: all .4s ease;
          opacity: 1;
              text-decoration:line-through
          }
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
         newsList: [
      ],
      tableForm:{
        pageSize:999,
        pageNum:1,
        id:localStorage.getItem("id"),
      },

      Visible:false,
      data:{},
      key:1,
    };
  },
  created() {},
  methods: {
    addCart(item) {
      this.$http
        .post("mt/gouwuche/addOrUpd", {
          shangpinid: item.shangpinid,
          type: item.type,
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
      liked(item) {
      this.$http
        .post("mt/shoucang/addOrUpd", {
          shangpinid: item.shangpinid,
          type: item.type,
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
   checkDetail(item) {
     console.log(item)
      this.Visible = true;
      this.data = item
    },
    async back(item) {
            if(item == false){
                this.Visible = false;
            }
        },
        
        getCollection() {
            this.$http.get('mt/shoucang/findAll', { params: this.tableForm }).then((res) => {
               res.data.data.rows.forEach((item,index)=>{
                 if(item.type == 1){
                   item.yaopin.addr = JSON.parse(item.yaopin.addr)
                 }
                 if(item.type == 2){
                   item.qixie.addr = JSON.parse(item.qixie.addr)
                 }
               })
               
                this.newsList = res.data.data.rows;
                console.log( this.newsList)
               
            });
        },
        cancel(item){
              this.$http.get('mt/shoucang/del', { params: {
                userId:localStorage.getItem("id"),
                spId:item.shangpinid
              } }).then((res) => {
                if(res.data.code==200){
                   this.$notify({
              title: "成功",
              message: "移除成功",
              type: "success",
            });
                }
             
            });
        },
  },
  mounted() {
    this.getCollection();
  },
};
</script>
