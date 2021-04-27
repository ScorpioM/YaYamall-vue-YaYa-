<template>
  <div class="home">
    <div class="title">我的购物车/My Cart</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" > </el-table-column>
      <el-table-column prop="date" label="商品" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            @click="srcList.push(scope.row.type == 1?scope.row.yaopin.addr[0]:scope.row.qixie.addr[0])"
            :src="scope.row.type == 1?scope.row.yaopin.addr[0]:scope.row.qixie.addr[0]"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
        <template slot-scope="scope">
         {{scope.row.type == 1?scope.row.yaopin.name:scope.row.qixie.name}}
        </template>
         </el-table-column>
      <el-table-column prop="price" label="单价">
        <template slot-scope="scope">
         {{scope.row.type == 1?scope.row.yaopin.price:scope.row.qixie.price}}
        </template> </el-table-column>
      <el-table-column prop="num" label="数量"> </el-table-column>
      <el-table-column label="总价">
        <template slot-scope="scope">
          ￥{{ scope.row.num * scope.row.type == 1?scope.row.yaopin.price:scope.row.qixie.price }}
        </template>
      </el-table-column>
       <el-table-column label="操作" width="200"  fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini"  icon="el-icon-edit" type="danger" plain @click="delCart(scope.$index, scope.row)">移出购物车</el-button>
                   
                </template>
            </el-table-column>
    </el-table>

    <div class="all-price">
      <div class="title">购物车总计</div>
      <div>
        <span>已选商品数量</span>
        <span v-if="selectInfo.num">{{selectInfo.num}}</span>
      </div>
      <div>
        <span>总额</span>
        <span v-if="JSON.stringify(selectInfo)!=='{}'">￥{{selectInfo.num * selectInfo.type==1?selectInfo.yaopin.price:selectInfo.qixie.price}}</span>
      </div>
      <div class="btn" @click="dialogVisible = true">进行结算</div>
    </div>

    <el-dialog
  title="请确认您的信息"
  :visible.sync="dialogVisible"
  width="60%">
   <el-dialog
      width="35%"
      :visible.sync="innerVisible"
      append-to-body>
      <img  src="../../assets/img/Personal-Center/cart/pay.jpg"  alt="">
    </el-dialog>
        <div class="dialog-body">
            <div class="title">选择您的收货地址</div>
            <div class="address">
            <ul>
                <li v-for="(item,index) in address" :key="index" @click="num = index" :class="{add:num == index}">
                
                <div>
                    <span class="fa name">{{item.shouhuoren}}</span>
                    <span class="fa phone">{{item.tel}}</span>
                </div>
                <!-- <span @click="item.moRen=1" :class="{isdefault:item.moRen==1}">{{item.moRen==1?'默认':'设为默认'}}</span> -->
                <div class="fa address">
                    地址：{{item.dizhi + item.xxidizhi}}
                </div>
            </li>
            </ul>
            </div>
            <!-- <div class="title">支付方式</div>
            <div class="pay">
                <div class="fa wx" @click="fangShi = 1" :class="{wxTrue:fangShi==1}">微信支付</div>
                <div class="fa zfb" @click="fangShi = 2" :class="{zfbTrue:fangShi==2}">支付宝支付</div>
            </div> -->
        </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit" >提交</el-button>
  </span>
</el-dialog>
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
  .all-price{
        width: 443px;
       float: right;
        border: 1px solid #ebebeb;
        padding: 10px;
      >.title{
              font-size: 25px;
    font-weight: 700;
    margin-bottom: 20px;
     text-align: left;
      }
      >div:nth-child(2){
           text-align: left;
              list-style: none;
    font-size: 15px;
    color: #252525;
    padding: 10px 30px;
    border: 1px solid #ebebeb;
    font-weight: 700;
    font-family: 'Montserrat',sans-serif;
    >span:last-child{
        float: right;
    }
      }
      >div:nth-child(3){
           text-align: left;
              list-style: none;
    font-size: 15px;
    color: #252525;
    padding: 10px 30px;
    border: 1px solid #ebebeb;
    font-weight: 700;
    font-family: 'Montserrat',sans-serif;
    >span:last-child{
        float: right;
    }
      }
      .btn{
          text-align: center;
         border: none!important;
    height: 48px!important;
    line-height: 48px!important;
    background: #000;
    width: 90px;
    margin: 20px 0;
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
    &:hover{
      background: #3d78ff;
    color: #fff;
    }  
      }
  }
  .dialog-body{
       
       
      >.title{
          font-family: "Yesteryear", cursive;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid rgb(247, 247, 247);
    padding: 20px 0;
    margin-bottom: 20px;
    text-align: left;
      }
      >.address{
          overflow: auto;
          ul{
          width: 1054px;
          display: flex;
          flex-flow: row nowrap;
          >.add{
              background: url('../../assets/img/Personal-Center/address/peraddressbg.png')no-repeat scroll 0% 0% !important;
          }
          li{
    border: none;
    display: block;
    width: 255px;
    height: 150px;
    text-align: left;
    padding-top: 10px;
    background: url('../../assets/img/Personal-Center/address/peraddbg.png')no-repeat scroll 0% 0%;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
    >div{
        margin: 10px;
    }
    >div:first-child{
        >.name{
            color: #6E6E6E;
            font-size: 14px;
            margin-right: 10px;
            &::before{
                content: "\f0f0";
                width: 16px;
                height: 16px;
                margin-right: 5px;

            }
        }
        >.phone{
            font-size: 14px;
            color: #A40000;
&::before{
    color: #6E6E6E;
                content: "\f10a";
                width: 16px;
                height: 16px;
                margin-right: 5px;

            }
        }
    
    }
    >.address{
        color: #6E6E6E;
            font-size: 14px;
            line-height: 20px;
        &::before{
                content: "\f041";
                width: 16px;
                height: 16px;
                margin-right: 5px;  

            }
    }
    >.option{
        margin-left: 120px;
        >span{
            color: #555454;
            font-size: 15px;
            cursor: pointer;
             &:hover{
                color: #A40000;
            }
        }
        >span:first-child{
            &::before{
                content: "\f044";
                width: 16px;
                height: 16px;
                margin-right: 5px;  

            }
            &::after{
                content: " ";
                background: #6E6E6E;
                height: 16px;
                margin-right: 5px;  
                margin-left: 5px;

            }
        }
        >span:last-child{
            &::before{
                content: "\f014";
                width: 16px;
                height: 16px;
                margin-right: 5px;  
            }
        }
    }
          }
      }
      }
    
      .pay{
          text-align: left;
          >div{
              width: 122px;
              height: 32px;
              border:1px solid #000;
              line-height: 32px;
              text-align: center;
              position: relative;
              cursor: pointer;
              margin-right: 5px;
          }
          >.wxTrue{
              border:2px solid rgb(39, 170, 7) !important;
              &::after{
                content: "\f086";
                background: rgb(39, 170, 7);
                width: 30px;
                height: 26px;
                font-size: 14px;
                position: absolute;
                bottom: 0;
                right: 0;
                color: #fff;
              }
          }
          >.zfbTrue{
              border:2px solid rgb(9, 140, 247) !important;
              &::after{
                content: "\f00c";
                background: rgb(9, 140, 247);
                width: 26px;
                height: 24px;
                font-size: 14px;
                position: absolute;
                bottom: 0;
                right: 0;
                color: #fff;
              }
          }
          >.wx{
            
          }
          >.zfb{
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
      srcList: [],
      select:0,
      num:0,
      innerVisible:false,
      dialogVisible:false,
      fangShi:1,
      address:[
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
            {
                name:'小叮当',
                phone:'15897246329',
                address:'湖北省 武汉市 洪山区 雄楚大道666号(中南财经政法大学)',
                isdefault:false
            },
        ],
      tableData: [
        
      ],
      tableForm:{
        pageSize:99,
        pageNum:1,
        id:localStorage.getItem("id"),
      },
      selectInfo:{}
    };
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
    this.selectInfo = val[0]
    this.selectInfo.allPrice=this.selectInfo.type==1?this.selectInfo.yaopin.price:this.selectInfo.qixie.price * this.selectInfo.num
    },

 getAddress(){
          this.$http.get('mt/dizhi/findAll', { params: {
              id:localStorage.getItem("id")
          } }).then((res) => {
                this.address = res.data.data;
                // console.log( this.newsList)
               
            });
      },
    getCart() {
            this.$http.get('mt/gouwuche/findAll', { params: this.tableForm }).then((res) => {
               res.data.data.rows.forEach((item,index)=>{
                 if(item.type == 1){
                   item.yaopin.addr = JSON.parse(item.yaopin.addr)
                 }
                 if(item.type == 2){
                   item.qixie.addr = JSON.parse(item.qixie.addr)
                 }
               })
               
                this.tableData = res.data.data.rows;
                console.log( this.newsList)
               
            });
        },
        submit(){
          this.$http.post('mt/tbOrder/addOrUpd',{
                  num:this.selectInfo.num,
                  price:this.selectInfo.allPrice,
                  fangShi:this.fangShi,//微信
                  type:this.selectInfo.type,//药品，
                  userId:localStorage.getItem("id"),
                  spId:this.selectInfo.shangpinid
            }).then((res) => {
              if(res.data.code == 200){
                 this.$notify({
                                title: '成功',
                                message: '下单成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            
                            this.delCart(1,this.selectInfo);
                            this.getCart()
              }else{
                this.$notify({
                                title: '失败',
                                message: '下单失败',
                                type: 'error'
                            });
              }
              
            });
        },
        delCart(index,item){
              this.$http.get('mt/gouwuche/del', { params: {
                userId:localStorage.getItem("id"),
                spId:item.shangpinid
              } }).then((res) => {
             
               if(res.data.code == 200){
                 this.$notify({
                                title: '成功',
                                message: '商品已成功移出购物车',
                                type: 'success'
                            });
                             this.getCart()
              }
               
               
            });
        },
  },
  mounted() {
    this.getCart();
    this.getAddress();
  },
};
</script>
