<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="定位胆" name="first">
                <item :arr="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></item>
            </el-tab-pane>
            <el-tab-pane label="猜前五" name="second">
                <item2 :arr="[1,2,3,4,5]"></item2>
            </el-tab-pane>
            <el-tab-pane label="猜前四" name="third">
                <item2 :arr="[1,2,3,4]"></item2>
            </el-tab-pane>
            <el-tab-pane label="猜前三" name="fourth">
                <item2 :arr="[1,2,3]"></item2>
            </el-tab-pane>
            <el-tab-pane label="猜前二" name="fives">
                <item2 :arr="[1,2]"></item2>
            </el-tab-pane>
            <el-tab-pane label="猜冠军" name="six">
                <item :arr="[1]"></item>
            </el-tab-pane>
            <el-tab-pane label="冠亚军" name="seven">
                <item-events></item-events>
            </el-tab-pane>
            <el-tab-pane label="双面盘" name="night">
                <item-event></item-event>
            </el-tab-pane>
        </el-tabs>
    </div>


</template>
<script>

    import item from '../item/itempar1'
    import item2 from '../item/itempar2'
    import itemEvent from '../item/itempar3'
    import itemEvents from '../item/itempar4'

    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        components: {
            item,
            item2,
            itemEvent,
            itemEvents
        },

        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            async getPlayList(){
                let ret  = await http.playList();
                console.log(ret)
            }
        }
    };
</script>
