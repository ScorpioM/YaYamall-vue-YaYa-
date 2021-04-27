<template>
  <div class="home">
    <div class="title">订单管理 / Order</div>
    <el-tabs type="border-card" @tab-click="selectTabs">
      <el-tab-pane
        :label="item.label"
        :value="item.id"
        v-for="(item, index) in tabs"
        :key="index"
      >
    <el-table :data="tableData" style="width: 100%" max-height="800">
          <el-table-column prop="pinglun" label="商品名称">
                <template slot-scope="scope">
                    {{ scope.row.type == 1 ? scope.row.yaopin.name : scope.row.qixie.name }}
                </template>
            </el-table-column>
            <el-table-column prop="pinglun" label="商品类别">
                <template slot-scope="scope">
                    {{ scope.row.type == 1 ? '药品' : '器械' }}
                </template>
            </el-table-column>
            <el-table-column label="商品单价">
                <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
            </el-table-column>
            <el-table-column prop="num" label="商品数量"> </el-table-column>
            <el-table-column label="商品总价">
                <template slot-scope="scope"> ￥{{ scope.row.price * scope.row.num }} </template>
            </el-table-column>
            <el-table-column prop="pinglun" label="订单状态">
                <template slot-scope="scope">
                    <el-tag :type=" scope.row.zhuanTai == 1 ? 'warning' : scope.row.zhuanTai == 2 ? 'success' :'success'">{{
                        scope.row.zhuanTai == 1 ? '待付款' : scope.row.zhuanTai == 2 ? '已付款' :'已发货'
                    }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="fangShi" label="支付方式" width="120">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.fangShi == 1 ? 'success' :'primary'" v-if="scope.row.zhuanTai == 2 || scope.row.zhuanTai == 5">{{
                        scope.row.fangShi == 1 ? '微信支付' :'支付宝支付'
                    }}</el-tag>
                    <div v-else>
                        ``````
                    </div>
                </template>
            </el-table-column>
             <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" plain @click="seeDetails(scope.$index, scope.row)">{{scope.row.zhuanTai == 1?'去付款':scope.row.zhuanTai == 2?'催发货':'去评论'}}</el-button>
                   
                </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
  title="请确认您的信息"
  :visible.sync="dialogVisible"
  width="60%">
            <div class="title">请选择您的支付方式</div>
            <div class="pay">
                <div class="fa wx" @click="fangShi = 1" :class="{wxTrue:fangShi==1}">微信支付</div>
                <div class="fa zfb" @click="fangShi = 2" :class="{zfbTrue:fangShi==2}">支付宝支付</div>
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
  overflow: auto;
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
  .el-dialog{
    .title{
      text-align: left;
      margin-bottom: 20px;
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
      }
  // .product{
  //     display: flex;
  //     align-items: center;
  //      font-size: 14px;
  //   font-weight: 600;
  //   >span{
  //       margin-left: 20px;
  //   }
  // }
  // .price{
  //     height: 100px;
  //     line-height: 100px;
  //     color: #f3471c;
  //     font-size: 14px;
  //   font-weight: 600;
  // }
  //  .num{
  //     height: 100px;
  //     line-height: 100px;
  //     font-size: 14px;
  //   font-weight: 600;
  // }
  // .option{
  //     height: 100px;
  //     line-height: 100px;
  //     font-size: 14px;
  //   font-weight: 600;
  // }
  // .prices{
  //     font-size: 18px;
  //   font-weight: 600;
  // }
}
</style>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      fangShi:1,
      dialogVisible:false,
        srcList:[],
        tableData:[],
      tabs: [
        {
          label: "所有订单",
          id:null
        },
        {
          label: "待付款",
          id:1
        
        },
        {
          label: "待发货",
          id:2
         
        },
        {
          label: "已发货",
          id:5
          
        },
      ],
      selectInfo:{},
      tableForm:{
        pageSize:99,
        pageNum:1,
        id:localStorage.getItem("id")
      }
    };
  },
  created() {},
  methods: {

    getOrder() {
            this.$http.get('mt/tbOrder/findAll', { params: this.tableForm }).then((res) => {
                this.tableData = res.data.data.rows;
            });
        },
        selectTabs(tab, event){
          console.log(tab,event)
            this.tableForm.name = tab.$attrs.value;
            this.tableForm.pageNum = 1;
            this.getOrder();
        },
        seeDetails(index,row){
              this.dialogVisible = true;
              this.selectInfo = row
        },

        submit(){
              this.$http.post('mt/tbOrder/addOrUpd',{
                  fangShi:this.fangShi,//微信
                  zhuanTai:2,
                  userId:localStorage.getItem("id"),
                  id:this.selectInfo.id,
                  type:this.selectInfo.type

            }).then((res) => {
              if(res.data.code == 200){
                 this.$notify({
                                title: '成功',
                                message: '商品付款成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.getOrder()
              }else{
                this.$notify({
                                title: '失败',
                                message: '付款失败',
                                type: 'error'
                            });
              }
              
            });
        },  
  },
  mounted() {
    console.log(this.$store.getters.user.id)
    this.getOrder();
  },
};
</script>
