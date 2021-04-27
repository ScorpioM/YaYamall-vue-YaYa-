<template>
  <div class="home">
    <div class="container">
        <div class="title">发送实时评论</div>
        <textarea name="" id="" v-model="pinglun" placeholder="请输入您宝贵的评价，我们一定会及时改正" ></textarea>
        <div class="fa btn" @click="addComment">
            发送
        </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
    .title{
        margin-top: 120px;
        font-size: 35px;
    font-family: 'Yesteryear', cursive;
    margin-bottom: 40px;
    }
    textarea{
       
background: #fff;
    border-bottom: 1px solid #e5e5e5;
    color: #666;
    display: block;
    float: left;
    font-size: 1em;
    height: 88px;
    line-height: 48px;
    max-width: 100%;
    padding: 0 10px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    width: 435px;
    border-radius: 4px;
    margin-left: 340px;
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
    margin-top:20px;
    margin-left:-150px;
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
export default {
  name: "home",
  computed: {
    
  },
  components: {},
  data() {
    return {
      pinglun:''
    };
  },
  created() {},
  methods: {
   addComment(){
     this.$http.post('mt/xitongliuyan/addOrUpd',{
          pinglun:this.pinglun,
          userId:localStorage.getItem("id")
     }).then((res) => {
       if(res.data.code == 200){
          this.$notify({
                            title: '成功',
                            message: '已发送至审核',
                            type: 'success'
                        });
                        this.pinglun=""
                        
       }
                })
   },
  },
  mounted() {},
};
</script>
