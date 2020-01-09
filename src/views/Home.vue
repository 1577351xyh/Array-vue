<template>
  <div class="container">
    <div class="container-top">
      <div class="flex size24">{{ this.activeName }}</div>
      <div class="flex-2">
        <div class="flex">距{{ nowlssue.issue }}期投注截止还有</div>
        <div class="time">{{ time }}</div>
      </div>
      <div class="flex-2">
        <div class="flex">第{{ nowlssue.issue - 1 }}期开奖号码</div>
        <div></div>
      </div>
    </div>
    <div class="container-bottom">
      <div class="row-left w1200">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="北京pk" name="北京pk">
            <tab1></tab1>
          </el-tab-pane>
          <el-tab-pane label="幸运飞艇" name="幸运飞艇">
            <tab2></tab2>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="row-right">
        <div>
          <p>最近十期开奖号码</p>
          <ul class="flex-ul">
            <li class="flex-li">
              <p>期号</p>
              <p>开奖号</p>
              <p>开奖时间</p>
            </li>
            <li v-for="(item, index) in resulu" class="flex-li">
              <p>{{ item.issue }}</p>
              <p class="issueContent">{{ item.content }}</p>
              <p>{{ item.updated_at }}</p>
            </li>
          </ul>
        </div>
        <div>
          <p>投注记录</p>
          <ul class="flex-ul">
            <li class="flex-li">
              <p>期号</p>
              <p>金额</p>
              <p>投注内容</p>
              <p>奖金</p>
            </li>
            <li v-for="(item, index) in betLogArr" class="flex-li">
              <p>{{ item.issue }}</p>
              <p>{{ item.play_score }}</p>
              <p>{{ item.content }}</p>
              <p v-if="item.status == 1">{{ item.win_score }}</p>
              <p v-else-if="item.status == 2">进行中</p>
              <p v-else-if="item.status == 3">未中奖</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tab1 from '../components/tabs/tab1'
import tab2 from '../components/tabs/tab2'
import http from '../hppt/api'
import CountDown from 'vue2-countdown'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  data() {
    return {
      currentTime: 0,
      startTime: 0,
      endTime: 0,
      xxx: '1111',
      activeName: '北京pk',
      time: '0',
      data: [
        { id: 9, name: '北京pk' },
        { id: 10, name: '幸运飞艇' }
      ],
      //10期开奖
      resulu: [],
      //当前期号
      nowlssue: {},
      //房间
      roomArr: [],
      //投注记录
      betLogArr: []
    }
  },
  components: {
    tab1,
    tab2,
    CountDown
  },
  created() {
    //房间号
    this.getPlayList()
    //投注记录
    this.getbetLog()
  },
  methods: {
    countDownS_cb: function(x) {
      // console.log(x)
      //开始倒计时结束之后的回调方法
    },
    countDownE_cb: function(x) {
      console.log('倒计时结束')
      //活动倒计时结束之后的回调方法
    },
    handleClick(tab, event) {
      // console.log(tab)
      let index = tab.index
      if (index == 0) {
        let id = this.roomArr[index].room_info[1].id
        // console.log(id)
        this.$store.commit('setTab1id', id)
        this.getnowIssue(id)
        this.result(id)
      } else if (index == 1) {
        let ids = this.roomArr[index].room_info[0].id
        this.$store.commit('setTab1id', ids)
        this.getnowIssue(ids)
        this.result(ids)
      }
    },
    async getPlayList() {
      let res = await http.gameList()
      if (res.status == 200) {
        this.roomArr = res.data
        //最近十期记录
        this.result(this.roomArr[0].room_info[1].id)
        //当前期号
        this.getnowIssue(this.roomArr[0].room_info[1].id)
      }
    },
    async result(id) {
      let res = await http.Result(id)
      if (res.status == 200) {
        this.resulu = res.data.data
        // console.log(res)
      }
    },
    //当前期号
    async getnowIssue(id) {
      let res = await http.nowIssue(id)
      if (res.status == 200) {
        this.nowlssue = res.data;
        //存到vuex
        this.$store.commit('setissue',res.data.issue)
      }

      let m1 = moment(res.data.start)
      let m2 = moment(res.data.end)
      var du = moment.duration(m2 - m1, 'ms')
      let hours = du.get('hours')
      let mins = du.get('minutes')
      let ss = du.get('seconds')
      this.time = hours + ':' + mins + ':' + ss
    },
    //投注记录
    async getbetLog(id) {
      let res = await http.betLog(24)
      if (res.status == 200) {
        this.betLogArr = res.data.data
        // console.log(res)
      }
    }
  }
}
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
    border-radius: 15px;
    border: 1px solid #dddddd;
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

        p {
          flex: 1;
        }
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
  .issueContent {
    text-overflow: ellipsis !important;
    justify-content: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis !important;
  }
}
</style>
