<template>
  <div class="home">
    <div class="container">
      
      <div class="card">
        <div v-for="(item, index) in labels" :key="index">
          <img :src="item.pic" alt="" />
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.label }}</div>
          </div>
        </div>
      </div>
<!-- title -->
      <div class="title">
        <div>我们的文化</div>
        <div>关于我们的文化</div>
      </div>
      <!-- 内容 -->
      <div class="contents">
            <div v-for="(item,index) in culture " :key="index">
                <div>{{item.title}}</div>
                <p>{{item.contents}}</p>
            </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  .card {
      display: flex;
      flex-flow: row nowrap;
      justify-content:center;
      margin-top: 120px;
    > div {
      padding: 50px 35px;
      background-color: #fff; 
      box-shadow: 0px 1px 3px 0px rgb(235, 233, 233);  
      transition: all 0.3s ease-in-out;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin-right: 30px;
      &:hover{
box-shadow: 0px 10px 30px 0px rgb(235, 233, 233);
 >img{
            animation: crFlipX 2s ease-in-out infinite backwards;
          }
      }
      @keyframes crFlipX {
        0% {
    -webkit-transform: rotateY(0);
    transform: rotateY(0);
}
50% {
    -webkit-transform: rotateY(
180deg
);
    transform: rotateY(
180deg
);
}
100% {
    -webkit-transform: rotateY(
360deg
);
    transform: rotateY(
360deg
);
}
      }
      > img {
        width: 60px;
        height: 60px;
      }
      > div {
          text-align: left;
          margin-left:40px;
        > div:first-child {
          font-size: 15px;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          margin-bottom: 6px;
        }
        > div:last-child {
          color: #484848;
          font-size: 11px;
        }
      }
    }
  }
  .title{
      margin-top: 85px;
      >div:first-child{
          font-size: 35px;
    font-family: 'Yesteryear', cursive;
    margin-bottom: 20px;
      }
      >div:last-child{
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
        margin-left: -90px;
      }
      &::after {
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        border-top: 1px solid #abd373;
        top: 5px;
        left: 50%;
        margin-left: 55px;
      }
      }
  }
.contents{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin-top: 35px;
    >div{
        margin: 0 15px;
        padding: 10px 5px;
        width:300px;
        box-shadow: 0px 1px 3px 0px rgb(235, 233, 233); 
        >div{
font-size: 16px;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          margin-bottom: 6px;
        }
        >p{
color: #484848;
          font-size: 12px;
    line-height: 33px;

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
      labels: [
        {
          pic: require("../../assets/img/Index/history/fire.png"),
          name: "免运费",
          label: "所有订单超过100$",
        },
        {
          pic: require("../../assets/img/Index/history/new.png"),
          name: "24小时服务",
          label: "+86 18174582826$",
        },
        {
          pic: require("../../assets/img/Index/history/call.png"),
          name: "退款",
          label: "如果购买产品不符合需求",
        },
      ],
      culture:[
          {
              title:'制度文化',
              contents:'重视“沉淀”和“传承”，敢于“革新”。对所有尝试及创新的想法，在经过思考和测试，尤其是已经较为稳定的认知价值观、行为准则、业务规范、工作流程、作业标准，以建设、优化制度作为主要方式，统一思想、建立团队共同的知识背景和判断准则，结合企业发展阶段，秉承企业宗旨，不断完善、敢于革新迭代。'
          },
          {
              title:'会议文化',
              contents:'重视“总结”和“高效”，旨在“解决”。对个人及部门的日常工作通过积极的思考和书写总结，通过会议汇报、交流、辩证，快速形成个人及部门企业的经验习得。通过会议，以参会人不断成长的总结能力、表达能力、沟通交流能力，提高会议效率，打造“逢会必可解决问题、必能形成决议”文化。'
          },
          {
              title:'交流文化',
              contents:'重视“共同价值观”和“个性发展”，勇于“面对”。对企业战略发展、经营方向、业务目标、人才培育和员工职业规划等工作，通过各种交流方式，聆听心声、认识每一名员工同事，发现困难发现问题，指导引导、帮助成长，通过用心沟通，寻找员工闪光点和潜质，发挥员工同事个人最大价值。'
          },
          {
              title:'活动文化',
              contents:'重视“快乐”和“疏导”，致力“幸福”。对所有努力工作、辛勤奋斗的团队，通过各式活动为其放松身心、缓解压力，创造社交环境、展示机会，营造温馨气息、有爱注入的团队氛围。'
          },


      ]
    };
  },
  created() {},
  methods: {},
  mounted() {},
};
</script>
