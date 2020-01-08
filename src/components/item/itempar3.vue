<template>
    <div class="itemp">
        <div v-for="(item,index) in ObjArr">
            <item2 :choice="true" :item="item" :Pindex="index"></item2>
        </div>
        <!--        <div class="inputNumber flex">-->
        <!--            <div>你选中了注</div>-->
        <!--            <div class="flex margin_l">-->
        <!--                <el-input-number-->
        <!--                        v-model="num"-->
        <!--                        @change="handleChange"-->
        <!--                        :min="1"-->
        <!--                        :max="10"-->
        <!--                        label="描述文字"-->
        <!--                        size="small"-->
        <!--                ></el-input-number>-->
        <!--                <p style="margin-left: 15px">倍</p>-->
        <!--            </div>-->
        <!--            <div class="margin_l">-->
        <!--                <p>共{{ priceComputed }}元</p>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="buttom">
            <el-button type="success">确定下注</el-button>
        </div>

        <div>
            <ul class="ul-box">
                <li v-for="(item,index) in chooseArray">
                    <p>{{item.str}}</p>
                    <p>1注</p>
                    <p class="flex">每注<el-input size="small" v-model="input" placeholder="请输入内容"></el-input>元</p>
                    <p>可中金额?</p>
                    <p @click="ItemDelete(index,'')" class="delete">删除</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import item2 from './item2'

    export default {
        name: '',
        data() {
            return {
                //注数
                input: '',
                nums: 1,
                ObjArr: [
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                        {arr: {name: '龙', odds_id: '1.910'}},
                        {arr: {name: '虎', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                        {arr: {name: '龙', odds_id: '1.910'}},
                        {arr: {name: '虎', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                        {arr: {name: '龙', odds_id: '1.910'}},
                        {arr: {name: '虎', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                        {arr: {name: '龙', odds_id: '1.910'}},
                        {arr: {name: '虎', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                        {arr: {name: '龙', odds_id: '1.910'}},
                        {arr: {name: '虎', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                    ],
                    [
                        {arr: {name: '大', odds_id: '1.910'}},
                        {arr: {name: '小', odds_id: '1.910'}},
                        {arr: {name: '单', odds_id: '1.910'}},
                        {arr: {name: '双', odds_id: '1.910'}},
                    ]
                ],
                str: '',
                childerArr: [],
                // BetArr: [],
                // price: undefined,
                chooseArray: []
            }
        },
        components: {
            item2
        },
        computed: {
            //价格
            // priceComputed() {
            //     this.price = this.num * 2 * this.nums;
            //     return this.num * 2 * this.nums;
            // }
        },
        methods: {
            buy() {

            },
            handleChange(value) {
                console.log(value)
            },
            onChange(content) {
                console.log(content)
                this.str = '';
                this.childerArr = this.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                for (let i = 0; i < this.childerArr.length; i++) {
                    let vm = this.$children[i];
                    //当前选中的字符串序列
                    this.forin(vm.activeItem, i);
                }
                this.str = this.str.substr(0, this.str.length - 1);
                let strs = this.str;
                console.log(`当前选中:${strs}`);
                this.submit()
            },
            submit() {
                //先提交数据
                if (this.str !== '-,-,-,-,-,-,-,-,-,-') {
                    this.chooseArray.push({
                        str: this.str,
                        nums: this.nums,
                    });
                    this.str = '';
                    this.nums = 0;
                    this.childerArr = this.$children.filter(
                        vm => vm.$options.name === 'items'
                    );
                    //清空
                    this.delete(this.childerArr)
                }

            },
            forin(arr) {
                if (arr.length === 0) {
                    this.str += '-,'
                } else {
                    for (let j = 0; j < arr.length; j++) {
                        this.str += arr[j] + ','
                        // this.BetArr.push(arr[j])
                    }
                }
            },
            // //清空
            delete(arr) {
                for (let i = 0; i < arr.length; i++) {
                    let vm = arr[i];
                    vm.activeItem = [];
                    vm.indexs = undefined;
                }
                this.BetArr = [];
                this.str = ''
            },
            ItemDelete(index,contentIndex) {
                if(contentIndex){
                    for (let i=0; i<this.chooseArray.length-1;i++) {
                        if(this.chooseArray[i].str.indexOf(contentIndex)>-1){
                            console.log(i)
                            this.chooseArray.splice(i, 1);
                            return false;
                        }
                    }
                    return;
                }
                this.chooseArray.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
    .itemp {
        padding: 30px;
        padding-top: 0px;
    }
    .flex{
        display: flex;
        align-items: center;

    }
    .el-input{
        width: 50%;
    }
</style>