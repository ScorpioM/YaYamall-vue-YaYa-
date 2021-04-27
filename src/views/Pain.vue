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
        <el-breadcrumb-item>病痛百科</el-breadcrumb-item>
      </el-breadcrumb> 
      </div>
      <div class="title">
          病痛百科
      </div>
    <!-- tab -->
      <div class="tab">
            <div v-for="(item,index) in tabs" :key="index" @click="secectTab(item,index)" :class="{add:num == index}">
                {{item.name}}
            </div>
      </div>
    <!-- contents -->
      <div class="contents">
            <div v-for="(item,index) in contents" :key="index" @click="jump(item)">
                <img :src="item.yufangaddr[0]" alt="">
                <div class="time">{{item.time | time}}</div>
                <div class="info">
                    <div class="title2">{{item.name}}</div>
                    <p>{{item.miaoshu | miaoshu}}</p>
                    <div class="keys">关键字:{{item.gjz}}</div>
                </div>
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





    <Footer />
  </div>
</template>
<style lang="less" scoped>
.home {
  .carousel {
    margin-top: 2px;
  }
  .bread{
      margin: 30px 0;
  }
 .title{
      font-size: 24px;
      font-weight: 600px;
      position: relative;
      &::before,&::after{
            content: "";
             position: absolute;
            height: 8px;
            width: 400px;
            border-top: 1px solid #babdb5;
            top: 12px;
            left: 50%;
           
      }
      &::before{
          margin-left: -480px;
            
      }
       &::after{
          margin-left: 80px;
            
      }
  }
  .tab{
      display: flex;
      flex-flow: row nowrap;
       justify-content: center;
      >div{
          border: 1px solid rgb(192, 190, 190);
          color: rgb(192, 190, 190);
          padding: 3px;
          transition: all .4s ease;
          cursor: pointer;
          margin-right: 20px;
          margin-top: 20px;
          margin-bottom: 20px;
          &:hover{
              color: #fff;
              background-color:rgb(240, 45, 45) ;
          }
      }
      >.add{
        color: #fff;
              background-color:rgb(240, 45, 45) ;
      }
  }
  .contents{
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      >div{
          cursor: pointer;
          display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      padding: 20px 0;
        width: 600px;
        border-bottom: 2px solid rgb(221, 219, 219);
        &:hover{
            >.info{
                >.title2{
                    color: rgb(253, 92, 92);
                }
            }
            >img{
                margin-top: -3px;
            }
            >.time{
                background-color: #fff;
              color: rgb(241, 74, 74);
            }
        }
          >img{
                width: 200px;
                height: 150px;
                 transition: all .4s ease;
          }
          >.time{
              background-color: rgb(241, 74, 74);
              color: #fff;
              padding: 5px;
              height: 50px;
              transition: all .4s ease;
          }
          >.info{
                text-align: left;
                margin-left: 20px;
                >.title2{
                    font-size: 18px;
                    font-weight: 600px;
                     transition: all .4s ease;
                }
                >p{
                    padding-right:100px;
                     margin-top: 10px;  
                    color: rgb(182, 178, 178);
font-size: 14px;
                    line-height: 22px;
                }
                >.keys{
                    font-size: 13px;
                  color: rgb(170, 169, 169); 
                  margin-top: 50px;    
                }
          }
      }
  }
  .page{
      margin-top:50px;
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
        contents:[
           
        ],
        num:0,
        tabs:[
            {
                name:'疼痛小百科',
                id:1,
            },
            {
                name:'健康知识',
                id:2,
            },
            {
                name:'急救处理小百科',
                id:3,
            }
        ],
        
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
      currentPage: 1, //
              tableForm:{
                pageSize:6,
                pageNum:1,
                total:0
            },
    };
  },
  created() {},
  methods: {
      jump(item){
          this.$router.push({path:'/Pain-details'})
           sessionStorage.setItem("details",JSON.stringify(item))
      },
      // 分页单击事件
        handleCurrentChange(val) {
            this.tableForm.pageNum=val;
            this.getWikipedia();
            console.log(`当前页: ${val}`);
        },
       getWikipedia(){
            this.$http.get('mt/baike/findAll',{
                params:this.tableForm
            }).then((res) => {
                if (res.data.code == 200) {
                    res.data.data.rows.forEach((item,index)=>{
                        item.yufangaddr = JSON.parse(item.yufangaddr)
                        item.picture = JSON.parse(item.picture)
                    })
                this.contents = res.data.data.rows;
                this.tableForm.total = res.data.data.total;
                }
            });
        },
      

        secectTab(item,index){
            this.num = index;
            this.tableForm.id = item.id;
            this.getWikipedia();
        },
        getCategory(){
      this.$http.get('mt/baike/findTypeAll',{
        params:{id:0}
      }).then(res=>{
        this.tabs = res.data.data;
          this.tabs.unshift({
            id: null,
            name: "全部",
          });
      })
    },
  },
  filters:{
        miaoshu(val) {
            console.log(val)
      if (val) {
        return `${val.substring(0, 70)}...`;
      }
    },
    time(val) {
            console.log(val)
      if (val) {
        return `${val.substring(0, 10)}`;
      }
    },
    },
  mounted() {
    this.getWikipedia();
    this.getCategory();
  },
};
</script>
