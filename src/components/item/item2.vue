<template>
    <div class="item">
        <div
                v-if="choice||!item.type"
                v-for="(childer,index) in item"
                :class="childer.active ==1?'active':''"
                class="item-childer"
                @click.stop="onClick(childer)"
                ref="content"
        >
            <p class="childer-text">{{ childer.arr.name }}</p>
            <div class="item-childer-2">赔率{{childer.arr.odds_id}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'items',
        props: {
            choice: {
                type: Boolean
            },
            item: {
                type: Array
            },
            Pindex:{
                type: Number
            }
        },
        data() {
            return {
                activeItem: [],
                activeObj: [],
                activeItems:[],
                indexs: undefined,
                itemArray:[]
            }
        },

        methods: {
            onClick(item) {
                if(item.active==0){
                    item.active=1;
                }else {
                    item.active=0
                }
                console.log(item);
                return false;
                this.indexs = index;
                console.log(this.$refs.content[index])
                let content = this.$refs.content[index].innerText.slice(0,1); //龙
                if (this.activeItem.indexOf(content) > -1 || this.activeItems.indexOf(content) > -1) {
                    let contentIndex = this.getArrayIndex(this.activeItem, content);
                    //存高亮的
                    this.activeItem.splice(contentIndex, 1);
                    //存当前点击的
                    this.activeItems.splice(contentIndex, 1);
                    this.activeObj.splice(contentIndex, 1)
                    this.$parent.ItemDelete('',content);
                } else {
                    this.activeItem.push(this.item[index].arr.name);
                    this.activeItems.push(this.item[index].arr.name);
                    this.activeObj.push({name: this.item[index].arr.name, odds_id: this.item[index].arr.odds_id});
                }
                //清空其他兄弟组件的activeitem
                this.itemArray =this.$parent.$children.filter(
                    vm => vm.$options.name === 'items'
                );
                this.itemArray.forEach((vm,i)=>{
                    if(i!==this.Pindex){
                        vm.activeItem = []
                    }
                });
                this.$parent.onChange(content,this.Pindex,index);
            },
            getArrayIndex(arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return i;
                    }
                }
                return -1
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .item {
        /*display: flex;*/
        width: 600px;
        margin: 10px 0;
        margin-bottom: 35px;
        display: flex;

        .item-flex {
            display: flex;
            justify-content: flex-start;
            margin: 30px 0;

        }
        .childer-text{
            padding: 0;
            margin: 0;
        }
        .item-childer {
            width: 40px;
            color: #000000;
            height: 40px;
            background-color: #fff;
            border: 1px solid #c0c5d2;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            position: relative;
            margin-right: 35px;
        }

        .item-childer-2 {
            font-size: 14px;
            height: 15px;
            width: 200%;
            text-align: center;
            position: absolute;
            top: 90%;
            left: 50%;
            transform: translateX(-50%);
        }

        .active {
            background-color: #d24c10;
            color: #ffffff;

            .item-childer-2 {
                color: #d24c10;
            }
        }
    }

</style>
