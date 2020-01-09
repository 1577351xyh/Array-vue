<template>
    <div class="itemp">
        <div v-if="item">{{item.content}}{{item.desc}}</div>
        <div v-for="item in arr">
            <item :choice="false" :item ="item" :chooseType="chooseArray.length"></item>
        </div>

        <div class="inputNumber flex">
            <div>你选中了{{ nums }}注</div>
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
            <div class="margin_l">
                <p>共{{ priceComputed }}元</p>
            </div>
        </div>
        <div class="buttom">
            <el-button type="primary" @click="onSbmit" v-if="chooseArray.length==0">确定选号</el-button>
            <el-button type="success" @click="buy" v-else>确定下注</el-button>
        </div>

        <div>
            <ul class="ul-box">
                <li v-for="(item,index) in chooseArray">
                    <p>{{item.str}}</p>
                    <p>{{item.nums}}注</p>
                    <p>{{item.num}}倍</p>
                    <p>{{item.price}}元</p>
                    <p>可中金额{{oddNum*item.num}}</p>
                    <p @click="ItemDelete(index)" class="delete">删除</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import item from '../item/item'

    export default {
        name: '',
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                price: 0,
                num: '1',
                nums: 0,
                str: '',
                childerArr: [],
                BetNub: '',
                newArray: [],
                chooseArray: [],
                arr:[]
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
         created(){
            // 生成数组arr
            for (let i = 0; i < 2; i++) {
                this.arr.push([]);
                for (let j = 0; j < 10; j++) {
                    if(j==9){
                        this.arr[i].push({name:parseInt(1+j),active:0,id:Math.floor(Math.random()*1000000000+1)})
                    }else {
                        let s = '0'+(j+1);
                        this.arr[i].push({name:s,active:0,id:Math.floor(Math.random()*10000000000+1)})
                    }
                }
            }
        },
        methods: {
            buy() {

            },
            handleChange(value) {
                console.log(value)
            },
            onSbmit() {
                //提交数据
                if (this.price !== 0) {
                    this.chooseArray.push({
                        str: this.str,
                        price: this.price,
                        nums: this.nums,
                        num: this.num
                    });
                } else {
                    this.$notify.info({
                        title: '消息',
                        message: '当前注为0,请投注'
                    });
                }
                this.childerArr = this.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                this.delete(this.childerArr)
            },
            onChange() {
                //每次计算前,先清空数据
                this.newArray = [];
                this.str = '';
                this.childerArr = this.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                for (let i = 0; i < this.childerArr.length; i++) {
                    let vm = this.$children[i];
                    //当前选中的字符串序列
                    this.forin(vm.activeItem, i);
                    //计算注数
                    this.newArray.push(vm.activeItem)
                }
                this.str = this.str.substr(0, this.str.length - 1);
                let strs = this.str;
                console.log(`当前选中:${strs}`);
                //当前注数逻辑
                this.Bet();
            },
            forin(arr) {
                if (arr.length === 0) {
                    return;
                } else {
                    for (let j = 0; j < arr.length; j++) {
                        if (j + 1 === arr.length) {
                            this.str += arr[j] + ','
                        } else {
                            this.str += arr[j] + ' '
                        }
                    }
                }
            },
            Bet() {
                let arrangementArray = this.newArray;
                let arrangement = this.getArrayByArrays(arrangementArray)
                //拆解数组
                let oneArray = this.Dismantling(arrangement);
                this.nums = oneArray.length;
            },
            Dismantling(arr) {
                let DismantlingArrs = [];
                var strArr = new Array();
                arr.forEach(vm => {
                    //定义一数组
                    strArr = vm[0].split(',') //字符分割
                    // console.log(`去重前的结果所有排列组合`)
                    let strArrs = this.unique(strArr)
                    // console.log(`去重后的结果${strArrs}`)
                    if (strArrs.length === strArr.length) {
                        DismantlingArrs.push(strArrs)
                    }
                });
                return DismantlingArrs
            },
            unique(arr) {
                const res = new Map();
                return arr.filter(a => !res.has(a) && res.set(a, 1))
            },
            //清空
            delete(arr) {
                for (let i = 0; i < arr.length; i++) {
                    let vm = arr[i];
                    vm.activeItem = []
                    vm.item.forEach(vms=>{
                        vms.active = 0
                    });
                }
                this.str = '';
                this.newArray = [];
                this.nums = 0;
                this.num = 1;
            },
            //二维数组排列组合
            getArrayByArrays(arrays) {
                var arr = ['']
                for (var i = 0; i < arrays.length; i++) {
                    arr = this.getValuesByArray(arr, arrays[i])
                }
                return arr
            },
            getValuesByArray(arr1, arr2) {
                var arr = [];
                for (var i = 0; i < arr1.length; i++) {
                    var v1 = arr1[i];
                    for (var j = 0; j < arr2.length; j++) {
                        var v2 = arr2[j]
                        if (v1 === '') {
                            var value = [`${v2}`];
                            arr.push(value)
                        } else {
                            var value = [`${v1},${v2}`];
                            arr.push(value)
                        }
                    }
                }
                return arr
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

    .flex {
        display: flex;
        align-items: center;
    }

    .margin_l {
        margin-left: 15px;
    }

    .buttom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

</style>
