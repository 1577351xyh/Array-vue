<template>
    <div class="itemp">
        <div v-for="item in arr">
            <item :choice="true"></item>
        </div>

        <div class="inputNumber flex">
            <div class="flex">你选中了<p class="chooseColor">{{ nums }}</p>注</div>
            <div class="flex margin_l">
                <el-input-number
                        v-model="num"
                        @change="handleChange"
                        :min="1"
                        :max="10"
                        label="描述文字"
                        size="small"
                ></el-input-number>
                <p style="margin-left: 15px">倍</p>
            </div>
            <div class="margin_l flex">
                共<p class="chooseColor">{{ priceComputed }}</p>元
            </div>

        </div>
        <div class="buttom">
            <el-button type="success" @click="submit">确定选号</el-button>
            <el-button type="success" @click="buy">确定下注</el-button>
        </div>

        <div>
            <ul class="ul-box">
                <li v-for="(item,index) in chooseArray">
                    <p>{{item.str}}</p>
                    <!--                    <p>详细</p>-->
                    <p>{{item.nums}}注</p>
                    <p>{{item.num}}倍</p>
                    <p>{{item.price}}元</p>
                    <p>可中金额?</p>
                    <p @click="ItemDelete(index)" class="delete">删除</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import item from './item'

    export default {
        name: '',
        props: {
          arr:{
            type:Array
          }
        },
        data() {
            return {
                //注数
                nums: 0,
                //倍数
                num: 1,
                str: '',
                childerArr: [],
                BetArr: [],
                price: undefined,
                chooseArray: []
            }
        },
        components: {
            item
        },
        computed: {
            //价格
            priceComputed() {
                this.price = this.num * 2 * this.nums;
                return this.num * 2 * this.nums;
            }
        },
        methods: {
            buy() {

            },
            handleChange(value) {
                console.log(value)
            },
            submit() {
                //先提交数据
                this.chooseArray.push({
                    str: this.str,
                    price: this.price,
                    nums: this.nums,
                    num: this.num
                });
                this.str = '';
                this.BetArr = [];
                this.num = 0;
                this.childerArr = this.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                //清空
                this.delete(this.childerArr)
            },
            onChange() {
                this.BetArr = [];
                this.str = '';

                this.childerArr = this.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                for (let i = 0; i < this.childerArr.length; i++) {
                    let vm = this.$children[i]
                    this.forin(vm.activeItem, i)
                }
                this.str = this.str.substr(0, this.str.length - 1)
                //当前注数
                let strs = this.str;
                this.nums = this.BetArr.length;
                console.log(`当前注${this.nums}`);
                console.log(`当前选中:${this.str}`)

            },
            forin(arr) {
                if (arr.length === 0) {
                    this.str += '-,'
                } else {
                    for (let j = 0; j < arr.length; j++) {
                        this.str += arr[j] + ','
                        this.BetArr.push(arr[j])
                    }
                }
            },
            //清空
            delete(arr) {
                for (let i = 0; i < arr.length; i++) {
                    let vm = arr[i]
                    vm.activeItem = []
                    vm.indexs = undefined;
                }
                this.BetArr = []
                this.str = ''
            },
            ItemDelete(index) {
                this.chooseArray.splice(index, 1)
            }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .itemp {
        margin: 10px 0;
    }

    .delete {
        cursor: pointer;
    }

    .buttom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .margin_l {
        margin-left: 15px;
    }
</style>
