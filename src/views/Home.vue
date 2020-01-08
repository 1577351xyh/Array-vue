<template>
    <div class="w1200">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="北京PK10" name="first">
                <tab1></tab1>
            </el-tab-pane>
            <el-tab-pane label="大发PK10" name="second">
                <tab2></tab2>
            </el-tab-pane>
            <el-tab-pane label="5分PK10" name="third">5分PK10</el-tab-pane>
            <el-tab-pane label="3分PK10" name="fourth">3分PK10</el-tab-pane>
            <el-tab-pane label="幸运飞艇" name="fourth1">幸运飞艇</el-tab-pane>
        </el-tabs>


    </div>

</template>s
<script>
    import tab1 from '../components/tabs/tab1'
    import tab2 from '../components/tabs/tab2'
    import http from '../hppt/api';


    export default {
        data() {
            return {
                activeName: 'first',
                data:{}
            };
        },
        components: {
            tab1,
            tab2,
        },
        created() {
            this.getPlayList()
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            async getPlayList() {
                let ret = await http.playList();
                console.log(ret)
                // if(ret.status===200){
                //     this.data =  ret.data;
                // }
            }
        }
    };
</script>
<style type="text/scss" lang="scss">
    .w1200 {
        max-width: 1200px;
        margin: 0 auto;

        .ul-box {
            border: 1px solid #ddd;
            padding: 0 10px;
            height: 288px;
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
</style>