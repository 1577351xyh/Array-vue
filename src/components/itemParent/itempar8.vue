<template>
  <div class="itemp">
<!--    <div v-if="item">{{item.content}}{{item.desc}}</div>-->
    <div v-for="(item, index) in ObjArr">
      <item2 :choice="true" :item="item" :chooseType="chooseArray.length"></item2>
    </div>
    <div class="buttom">
      <el-button type="success">确定下注</el-button>
    </div>

    <div>
      <ul class="ul-box">
        <li v-for="(item, index) in chooseArray">
          <p>{{ item.str }}</p>
          <p>1注</p>
          <p class="flex">
            每注<el-input
              size="small"
              v-model="input"
            ></el-input
            >元
          </p>
          <p>可中金额?</p>
          <p @click="ItemDelete(item,index, '')" class="delete">删除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import item2 from '../item/item2'

export default {
  name: '',
  data() {
    return {
      //注数
      input: '',
      nums: 1,
      ObjArr: [
        [
          { name: '大', odds_id: '1.910', active: 0, id: 1 },
          { name: '小', odds_id: '1.910', active: 0, id: 2 },
          { name: '单', odds_id: '1.910', active: 0, id: 3 },
          { name: '双', odds_id: '1.910', active: 0, id: 4 },
          { name: '龙', odds_id: '1.910', active: 0, id: 5 },
          { name: '虎', odds_id: '1.910', active: 0, id: 6 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 7 },
          { name: '小', odds_id: '1.910', active: 0, id: 8 },
          { name: '单', odds_id: '1.910', active: 0, id: 9 },
          { name: '双', odds_id: '1.910', active: 0, id: 10 },
          { name: '龙', odds_id: '1.910', active: 0, id: 11 },
          { name: '虎', odds_id: '1.910', active: 0, id: 12 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 13 },
          { name: '小', odds_id: '1.910', active: 0, id: 14 },
          { name: '单', odds_id: '1.910', active: 0, id: 15 },
          { name: '双', odds_id: '1.910', active: 0, id: 16 },
          { name: '龙', odds_id: '1.910', active: 0, id: 17 },
          { name: '虎', odds_id: '1.910', active: 0, id: 18 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 19 },
          { name: '小', odds_id: '1.910', active: 0, id: 20 },
          { name: '单', odds_id: '1.910', active: 0, id: 21 },
          { name: '双', odds_id: '1.910', active: 0, id: 22 },
          { name: '龙', odds_id: '1.910', active: 0, id: 23 },
          { name: '虎', odds_id: '1.910', active: 0, id: 24 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 13 },
          { name: '小', odds_id: '1.910', active: 0, id: 14 },
          { name: '单', odds_id: '1.910', active: 0, id: 15 },
          { name: '双', odds_id: '1.910', active: 0, id: 16 },
          { name: '龙', odds_id: '1.910', active: 0, id: 17 },
          { name: '虎', odds_id: '1.910', active: 0, id: 18 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 19 },
          { name: '小', odds_id: '1.910', active: 0, id: 20 },
          { name: '单', odds_id: '1.910', active: 0, id: 21 },
          { name: '双', odds_id: '1.910', active: 0, id: 22 },
          { name: '龙', odds_id: '1.910', active: 0, id: 23 },
          { name: '虎', odds_id: '1.910', active: 0, id: 24 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 25 },
          { name: '小', odds_id: '1.910', active: 0, id: 26 },
          { name: '单', odds_id: '1.910', active: 0, id: 27 },
          { name: '双', odds_id: '1.910', active: 0, id: 28 },
          { name: '龙', odds_id: '1.910', active: 0, id: 29 },
          { name: '虎', odds_id: '1.910', active: 0, id: 24 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 30 },
          { name: '小', odds_id: '1.910', active: 0, id: 31 },
          { name: '单', odds_id: '1.910', active: 0, id: 32 },
          { name: '双', odds_id: '1.910', active: 0, id: 33 },
          { name: '龙', odds_id: '1.910', active: 0, id: 34 },
          { name: '虎', odds_id: '1.910', active: 0, id: 35 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 36 },
          { name: '小', odds_id: '1.910', active: 0, id: 37 },
          { name: '单', odds_id: '1.910', active: 0, id: 38 },
          { name: '双', odds_id: '1.910', active: 0, id: 39 },
          { name: '龙', odds_id: '1.910', active: 0, id: 40 },
          { name: '虎', odds_id: '1.910', active: 0, id: 41 }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 42 },
          { name: '小', odds_id: '1.910', active: 0, id: 43 },
          { name: '单', odds_id: '1.910', active: 0, id: 44 },
          { name: '双', odds_id: '1.910', active: 0, id: 45 },
          { name: '龙', odds_id: '1.910', active: 0, id: 46 },
          { name: '虎', odds_id: '1.910', active: 0, id: 47 }
        ]
      ],
      str: '',
      childerArr: [],
      chooseArray: []
    }
  },
  components: {
    item2
  },
  methods: {
    buy() {},
    handleChange(value) {
      console.log(value)
    },
    onChange(item) {
      this.str = ''
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === 'items'
      )
      for (let i = 0; i < this.childerArr.length; i++) {
        let vm = this.$children[i]
        //当前选中的字符串序列
        this.forin(vm.activeItem, i)
      }
      this.str = this.str.substr(0, this.str.length - 1)
      let strs = this.str
      console.log(`当前选中:${strs}`)
      this.submit(item)
    },
    submit(item) {
      //先提交数据
        this.chooseArray.push({
          id: item.id,
          str: this.str,
          nums: this.nums
        })
        this.str = ''
        this.nums = 0
        this.childerArr = this.$children.filter(
          vm => vm.$options.name === 'items'
        )
        //清空
        this.delete(this.childerArr)
    },
    forin(arr) {
      if (arr.length === 0) {
        this.str += '-,'
      } else {
        for (let j = 0; j < arr.length; j++) {
          this.str += arr[j] + ','
        }
      }
    },
    // //清空
    delete(arr) {
      for (let i = 0; i < arr.length; i++) {
        let vm = arr[i]
        vm.activeItem = []
        vm.indexs = undefined
      }
      this.BetArr = []
      this.str = ''
    },
    ItemDelete(items,index, item) {
      if (item) {
        for (let i = 0; i < this.chooseArray.length; i++) {
          if (this.chooseArray[i].id === item.id) {
            this.chooseArray.splice(i, 1)
          }
        }
        return
      }
      this.chooseArray.splice(index, 1);
      this.childerArr.forEach(vm=>{
        vm.item.forEach(vms=>{
          if(vms.id === items.id){
            vms.active =0;
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.itemp {
  padding: 30px;
  padding-top: 0px;
}
.flex {
  display: flex;
  align-items: center;
}
.el-input {
  width: 50%;
}
</style>
