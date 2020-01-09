<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.name" :name="item.name" v-for="(item,index) in playListArr">
                <itemPar1 :item="item" v-if="item.id==59"></itemPar1>
                <itemPar2 :item="item" v-else-if="item.id==60"></itemPar2>
                <itemPar3 :item="item" v-else-if="item.id==61"></itemPar3>
                <itemPar4 :item="item" v-else-if="item.id==62"></itemPar4>
                <itemPar5 :item="item" v-else-if="item.id==63"></itemPar5>
                <itemPar6 :item="item" v-else-if="item.id==64"></itemPar6>
                <itemPar7 v-else-if="item.id==65"></itemPar7>
                <itemPar8 v-else-if="item.id==66"></itemPar8>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>

    import itemPar1 from '../itemParent/itempar1'
    import itemPar2 from '../itemParent/itempar2'
    import itemPar3 from '../itemParent/itempar3'
    import itemPar4 from '../itemParent/itempar4'
    import itemPar5 from '../itemParent/itempar5'
    import itemPar6 from '../itemParent/itempar6'
    import itemPar7 from '../itemParent/itempar7'
    import itemPar8 from '../itemParent/itempar8'
    import http from "../../hppt/api";

    export default {
        data() {
            return {
                activeName: '定位胆',
                playListArr: [
                    {
                        "id": 59,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "定位胆",
                        "desc": "奖金 19.10元 ",
                        "content": "从冠、亚、季、四、五、六、七、八、九、十任意位置上任意选择一个或一个以上号码，所选号码与相同位置上的开奖号码相同，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 60,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "猜前五",
                        "desc": "奖金 57758.40元",
                        "content": "从各名次中各选择1个不重复的号码组成一注，竞猜开奖号码的前五位，号码和位置都对应，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 61,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "猜前四",
                        "desc": "奖金 9626.40元",
                        "content": "从各名次中各选择1个不重复的号码组成一注，竞猜开奖号码的前四位，号码和位置都对应，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 62,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "猜前三",
                        "desc": "奖金 1375.20元 ",
                        "content": "从各名次中各选择1个不重复的号码组成一注，竞猜开奖号码的前三位，号码和位置都对应，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 63,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "猜前二",
                        "desc": "奖金 171.90元 ",
                        "content": "从各名次中各选择1个不重复的号码组成一注，竞猜开奖号码的前二位，号码和位置都对应，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 64,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "猜冠军",
                        "desc": "奖金 19.10元",
                        "content": "从1-10中任意选择一个号码进行下注，所选号码与开奖号码的第一位相同，即为中奖。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 65,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "冠亚军",
                        "desc": "冠亚和(一元模式)",
                        "content": "猜冠军和亚军开奖号相加的和，3-11为和小，12-19为和大；奇数为和单，偶数为和双。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    },
                    {
                        "id": 66,
                        "game_id": 3,
                        "room_id": 9,
                        "name": "双面盘",
                        "desc": "双面盘(一元模式)",
                        "content": "可选任意位置投注，开出的号码1-5为小，6-10为大；奇数为单，偶数为双；正数第一名与倒数第一名开出的号码对比，大于为龙，小于为虎，以此类推。",
                        "is_on": 1,
                        "created_at": null,
                        "updated_at": null
                    }
                ],
                oddNum: 11,
            };
        },
        components: {
            itemPar8,
            itemPar7,
            itemPar6,
            itemPar5,
            itemPar4,
            itemPar3,
            itemPar2,
            itemPar1
        },
        created() {
            this.getPlayList();
            // this.getOneodd()
            //请求第一个赔率
        },
        methods: {
            async handleClick(tab, event) {
                // console.log(111)
                let index = tab.index;
                //获取玩法id
                let play_id = this.playListArr[index].id;
                // 根据index发送不同的请求
                // 调赔率,传房间id
                let res = await http.oddsInfoList(play_id);
                let oddNum = res.data[0].odds;
                //拼接对象，返回给子组件
                this.playListArr[index].odds = oddNum;
            },
            async getPlayList() {
                let id = this.$store.state.oddsid;
                //tab2的列表,按照id渲染
                // let res = await http.playList(id);
                // this.playListArr = res.data;
            },
            async getOneodd() {
                // let id = this.playListArr[0].odds_info[0].id;
                // let res = await http.playListArr(id);
                //房间id
                // this.$store.commit('getRoomId',res.data.room_id);
            },

        }
    };
</script>
