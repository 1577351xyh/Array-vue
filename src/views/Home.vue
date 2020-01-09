<template>
    <div class="container">
        <div class="container-top">
            <div class="flex size24">{{this.activeName}}</div>
            <div class="flex-2">
                <div class="flex">距{{nowlssue.issue}}期投注截止还有</div>
                <count-down
                        v-on:start_callback="countDownS_cb(1)"
                        v-on:end_callback="countDownE_cb(1)"
                        :currentTime="currentTime"
                        :startTime="startTime"
                        :endTime="endTime"
                        :tipText="'距离开始文字1'"
                        :tipTextEnd="'距离结束文字1'"
                        :endText="'结束自定义文字2'"
                        :dayTxt="':'"
                        :hourTxt="':'"
                        :minutesTxt="':'"
                        :secondsTxt="''">

                </count-down>
            </div>
            <div class="flex-2">
                <div class="flex">第{{xxx}}期开奖号码</div>
                <div>

                </div>
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
                        <li v-for="(item,index) in resulu" class="flex-li">
                            <p>{{item.issue}}</p>
                            <p>{{item.status}}</p>
                            <p>{{item.play_score}}</p>
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
                        <li v-for="(item,index) in betLogArr" class="flex-li">
                            <p>{{item.issue}}</p>
                            <p>{{item.play_score}}</p>
                            <p>{{item.content}}</p>
                            <p v-if="item.status==1">{{item.win_score}}</p>
                            <p v-else-if="item.status==2">进行中</p>
                            <p v-else-if="item.status==3">未中奖</p>
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
    import http from '../hppt/api';
    import CountDown from 'vue2-countdown'

    export default {
        data() {
            return {
                currentTime: 0,
                startTime: 0,
                endTime: 0,
                xxx: '1111',
                activeName: '北京pk',
                data: [
                    {id: 9, name: '北京pk'},
                    {id: 10, name: '幸运飞艇'},
                ],
                //10期开奖
                resulu: [],
                //当前期号
                nowlssue: {},
                //房间
                roomArr: [],
                //投注记录
                betLogArr:[],
            };
        },
        components: {
            tab1,
            tab2,
            CountDown,
        },
        created() {
            //房间号
            this.getPlayList();
            this.getbetLog()
        },
        methods: {
            countDownS_cb: function (x) {
                // console.log(x)
                //开始倒计时结束之后的回调方法
            },
            countDownE_cb: function (x) {
                console.log('倒计时结束')
                //活动倒计时结束之后的回调方法
            },
            handleClick(tab, event) {
                let index = tab.index;
                if (index == 0) {
                    let id = this.roomArr[index].room_info[1].id;
                    this.$store.commit('setTab1id', id)
                    this.getnowIssue(id)
                } else if (index == 1) {
                    let ids = this.roomArr[index].room_info[1].id;
                    this.$store.commit('setTab1id', ids)
                    this.getnowIssue(ids)
                }
            },
            async getPlayList() {
                let res = await http.gameList();
                if(res.status == 200) {
                    this.roomArr = res.data;
                    //最近十期记录
                    this.result(this.roomArr[0].room_info[1].id);
                    this.getnowIssue(this.roomArr[0].room_info[1].id);
                }
            },
            async result(id) {
                let res = await http.oddsInfoList(id);
                if (res.status == 200) {
                    this.resulu = res.data.data;
                }
            },
            //当前期号
            async getnowIssue(id) {
                let res = await http.nowIssue(id);
                if (res.status==200) {
                    this.nowlssue = res.data;
                }
                console.log(res.data.start)
                // this.startTime = Date.parse(new Date(res.data.start));
                // this.endTime = Date.parse(new Date(res.data.end));
                this.currentTime = new Date().getTime();
                console.log(this.startTime)
                console.log(this.endTime)
                console.log(this.currentTime)

            },
            async getbetLog(id){
                let res = await http.betLog(24);
                console.log('投注记录');
                if(res.status==200){
                    this.betLogArr = res.data.data;
                    console.log(res)
                }
            },
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

        > p {
            width: 32%;
            display: flex;
            justify-content: center;
            font-size: 12px;
            align-items: center;
        }
    }
</style>