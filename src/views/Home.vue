<template>
  <div class="container">
    <div class="container-top">
      <div class="flex size24">{{ this.activeName }}</div>
      <div class="flex-2">
        <div class="flex">
          距
          <p style="color:red">{{ nowlssue.issue }}</p>期投注截止还有
        </div>
        <div class="time">{{ time }}</div>
      </div>
      <div class="flex-2">
        <div class="flex">
          第
          <p style="color:red">{{ prevSue.issue }}</p>期开奖号码
        </div>
        {{lottery_time}}
        <div class="roundNo">
          <div v-for="o in prevSue.content">{{o}}</div>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <div class="row-left w1200">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="北京pk" name="北京pk">
            <tab1></tab1>
          </el-tab-pane>
          <el-tab-pane label="幸运飞艇" name="幸运飞艇" lazy>
            <tab1></tab1>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="row-right">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>近10期开奖记录</span>
          </div>
          <div class="text item felx">
            <p>期号</p>
            <p>开奖号</p>
            <p>开奖时间</p>
          </div>
          <div v-for="(item, index) in resulu" class="text item">
            <p>{{ item.issue }}</p>
            <p class="issueContent">{{ item.content }}</p>
            <p>{{ item.updated_at }}</p>
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>投注记录</span>
          </div>
          <div class="text item felx">
            <p>期号</p>
            <p>金额</p>
            <p>投注内容</p>
            <p>奖金</p>
          </div>
          <div v-for="(item, index) in betLog" class="text item">
            <p>{{ item.issue }}</p>
            <p>{{ item.play_score }}</p>
            <p class="issueContent">{{ item.content }}</p>
            <p v-if="item.status == 1">{{ item.win_score }}</p>
            <p v-else-if="item.status == 2">进行中</p>
            <p v-else-if="item.status == 3">未中奖</p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
const tab1 = () => import("../components/tabs/tab1");
import http from "../hppt/api";
import moment from "moment";
import "moment/locale/zh-cn";
import { clearInterval } from "timers";
import { async } from 'q';
moment.locale("zh-cn");

export default {
  data() {
    return {
      timeArr: ["01", "02", "03", "04", "05", "06", "06", "08", "09", "10"],
      currentTime: 0,
      startTime: 0,
      endTime: 0,
      xxx: "1111",
      activeName: "北京pk",
      time: "0",
      data: [{ id: 9, name: "北京pk" }, { id: 10, name: "幸运飞艇" }],
      //10期开奖
      resulu: [],
      //当前期号
      nowlssue: {},
      //房间
      roomArr: [],
      //投注记录
      betLogArr: [],
      //上一期
      prevSue: {},
      timeIds: null,
      lottery_time: ""
    };
  },
  components: {
    tab1
  },
  computed: {
    betLog() {
      return this.$store.state.betLog;
    }
  },
  created() {
    //初始值
    this.init();
  },
  methods: {
    async init() {
      //玩法
      let a = await this.getPlayList();
      let id = this.roomArr[0].room_info[1].id;
      //最近十期记录
      let b = await this.result(id);
      // 获取当前时间
      let c = await this.getNewTime();
      //当前期号
      let d = await this.getnowIssue(id);
      //获取上一期
      let e = await this.getPrev(id);
      //投注记录
      this.$store.dispatch("getbetLog");
    },
    handleClick(tab) {
      if (this.timeId) {
        window.clearInterval(this.timeId);
      }
      this.timeId = null;
      let index = tab.index;
      if (tab.name == "北京pk") {
        let id = this.roomArr[index].room_info[1].id;
        this.itemFn(id)
      } else if (tab.name == "幸运飞艇") {
        let ids = this.roomArr[index].room_info[0].id;
        this.itemFn(ids)
      }
    },
    itemFn(id){
      //房间id
        this.$store.commit("SET_TABID", id);
        //获取当前期号
        this.getnowIssue(id);
        //获取近10期
        this.result(id);
        //获取上一期
        this.getPrev(id);
    },
    async getPlayList() {
      let res = await http.gameList();
      this.roomArr = res.data;
    },
    async result(id) {
      let res = await http.Result(id);
      this.resulu = res.data.data;
    },
    //获取上一期
    async getPrev(id) {
      let res = await http.getPrev(id);
      res.data.content = res.data.content.split(",");
      this.prevSue = res.data;
    },
    //获取当前时间
    async getNewTime() {
      let res = await http.getTime();
      this.newtime = res.data;
    },
    //当前期号
    async getnowIssue(id) {
      let res = await http.nowIssue(id);
      console.log(res.data);
      this.nowlssue = res.data;
      //当前期号
      this.$store.commit("SET_ISSUE", res.data.issue);
      //time
      let newtime = Number(moment(this.newtime).format("x"));
      let endTime = Number(moment(res.data.end).format("x"));
      let startTime = Number(moment(res.data.start).format("x"));
      //开奖时间
      let lottery_time = moment(res.data.lottery_time).format("x");
      if (newtime < startTime) {
        //未开始
        this.time = "未开始";
        return;
      } else if (startTime < newtime && newtime < endTime) {
        //进行时间 进入倒计时
        this.Countdown(res.data.end, this.newtime, res.data.lottery_time);
        return;
      } else if (endTime < newtime && newtime < endTime) {
        //结束-开奖时间
        this.lottery_time = "正在开奖";
        return;
      } else if (newtime > endTime) {
        //已结束
        this.time = "已结束";
      }
    },
    //倒计时
    Countdown(end, newtime, lottery_time) {
      //时间戳转化
      let ends = moment(end);
      let news = moment(newtime);
      let lottery_times = moment(lottery_time);
      var du = moment.duration(ends - news, "ms");
      let hours = du.get("hours");
      let mins = du.get("minutes");
      let ss = du.get("seconds");
      let sumTime = hours * 3600 + mins * 60 + ss;
      if (this.timeId) {
        window.clearInterval(this.timeId);
        this.timeId = null;
      }
      if (this.timeIds) {
        window.clearTimeout(this.timeIds);
        this.timeIds = null;
      }
      this.timeId = setInterval( async () => {
        if (sumTime == 0) {
          window.clearInterval(this.timeId);
          this.timeId = null;
          //重新请求当前时间
          let i = await this.getNewTime();
          //重新请求当前期
          let j = await this.getnowIssue(this.$store.state.oddsid);
          this.lottery_time = "正在开奖";
          this.timeIds = setTimeout(() => {
            //抽奖结果
            this.getPrev(this.$store.state.oddsid);
            //开奖记录
            this.result(this.$store.state.oddsid);
            this.lottery_time = "";
          }, 13000);
          return;
        }
        sumTime--;
        this.time = this.formatSeconds(sumTime);
      }, 1000);
    },
    //拼接倒计时字符串
    formatSeconds(value) {
      let result = parseInt(value);
      var h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      var m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      var s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      return (result = h + ":" + m + ":" + s);
    }
  }
};
</script>
<style type="text/scss" lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  height: auto;
  display: flex;
  flex-direction: column;

  .container-top {
    height: 150px;
    display: flex;
    justify-content: space-between;

    > div {
      width: 31%;
      background-color: #f0f1f4;
      border-radius: 15px;
    }

    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .flex-2 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .time {
        color: #fff;
        font-size: 38px;
        height: 52px;
        font-family: Microsoft Yahei;
        width: 60%;
        background: #455467;
        border-radius: 3px;
        text-shadow: 0 1px 1px #000;
      }
    }

    .size24 {
      font-size: 24px;
    }
  }

  .container-bottom {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .row-right {
    width: 34%;
  }

  .row-left {
    width: 60%;

    .ul-box {
      border: 1px solid #ddd;
      padding: 0 10px;
      height: 188px;
      overflow-y: auto;
      margin-top: 40px;
      background: #fff;

      li {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
      }
    }

    .chooseColor {
      color: #ea6a31;
    }
  }
}

.flex-ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
}

.flex-li {
  width: 100%;
  display: flex;
  list-style: none;

  justify-content: space-between;
  > p {
    width: 32%;
    display: flex;
    justify-content: center;
    font-size: 12px;
    align-items: center;
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }
}
.itemp-tips {
  font-size: 14px;
  color: #000;
  text-align: left;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  p {
    flex: 1;
  }
  .issueContent {
    // text-overflow: ellipsis !important;
    // justify-content: flex-start;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis !important;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 40px;
}
el-card {
  margin-bottom: 30px !important;
}
.el-tabs__content {
  overflow: inherit !important;
  position: relative;
}
.el-card__body {
  max-height: 400px;
  overflow-y: scroll;
}
.roundNo {
  height: auto;
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
  }
}
</style>
