<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="定位胆" name="first">
                <itemPar1 :oddNum="oddNum"></itemPar1>
            </el-tab-pane>
            <el-tab-pane label="猜前五" name="second">
                <itemPar2 :oddNum="oddNum"></itemPar2>
            </el-tab-pane>
            <el-tab-pane label="猜前四" name="third">
                <itemPar3 :oddNum="oddNum"></itemPar3>
            </el-tab-pane>
            <el-tab-pane label="猜前三" name="fourth">
                <itemPar4 :arr="[1,2,3]" :oddNum="oddNum"></itemPar4>
            </el-tab-pane>
            <el-tab-pane label="猜前二" name="fives">
                <itemPar5 :arr="[1,2]" :oddNum="oddNum"></itemPar5>
            </el-tab-pane>
            <el-tab-pane label="猜冠军" name="six">
                <itemPar6 :arr="[1]" :oddNum="oddNum"></itemPar6>
            </el-tab-pane>
            <el-tab-pane label="冠亚军" name="seven">
                <itemPar7></itemPar7>
            </el-tab-pane>
            <el-tab-pane label="双面盘" name="night">
                <itemPar8></itemPar8>
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
                activeName: 'first',
                playListArr: [],
                oddNum: 9999
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
                let index = tab.index;
                // 根据index发送不同的请求
                // 调赔率,传房间id
                // let room_id = this.$store.state.room_id;
                // let res = await http.oddsList(room_id);
                // 调描述
                this.getPlayList();
            },
            async getPlayList() {
                let id = this.$store.state.oddsid;

                //tab2的列表,按照id渲染
                // let res = await http.playList(id);
                // this.playListArr = res.data;
                // this.$store.commit()
            },
            async getOneodd() {
                // let id = this.playListArr[0].odds_info[0].id;
                // let res = await http.playListArr(id);
                //房间id
                // this.$store.commit('getRoomId',res.data.room_id);
            }
        }
    };
</script>
