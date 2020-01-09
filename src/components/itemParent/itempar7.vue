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
          <p @click="ItemDelete(item,index,'')" class="delete">删除</p>
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
          { name: '和大', odds_id: '1.910', active: 0, id: 1, type: '1' },
          { name: '和小', odds_id: '1.910', active: 0, id: 2, type: '1' },
          { name: '和单', odds_id: '1.910', active: 0, id: 3, type: '1' },
          { name: '和双', odds_id: '1.910', active: 0, id: 4, type: '1' }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 5, type: '2' },
          { name: '小', odds_id: '1.910', active: 0, id: 6, type: '2' },
          { name: '单', odds_id: '1.910', active: 0, id: 7, type: '2' },
          { name: '双', odds_id: '1.910', active: 0, id: 8, type: '2' },
          { name: '龙', odds_id: '1.910', active: 0, id: 9, type: '2' },
          { name: '虎', odds_id: '1.910', active: 0, id: 10, type: '2' }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 11, type: '2' },
          { name: '小', odds_id: '1.910', active: 0, id: 12, type: '2' },
          { name: '单', odds_id: '1.910', active: 0, id: 13, type: '2' },
          { name: '双', odds_id: '1.910', active: 0, id: 14, type: '2' },
          { name: '龙', odds_id: '1.910', active: 0, id: 15, type: '2' },
          { name: '虎', odds_id: '1.910', active: 0, id: 16, type: '2' }
        ],
        [
          { name: '大', odds_id: '1.910', active: 0, id: 17, type: '2' },
          { name: '小', odds_id: '1.910', active: 0, id: 18, type: '2' },
          { name: '单', odds_id: '1.910', active: 0, id: 19, type: '2' },
          { name: '双', odds_id: '1.910', active: 0, id: 20, type: '2' },
          { name: '龙', odds_id: '1.910', active: 0, id: 21, type: '2' },
          { name: '虎', odds_id: '1.910', active: 0, id: 22, type: '2' }
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
  methods: {
    buy() {},
    handleChange(value) {
      console.log(value)
    },
    //当前选中的值,当前选中的行
    onChange(item) {
      if(this.chooseArray.length>0){
        return;
      }
      this.str = ''
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === 'items'
      )
      this.forin(item)
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
        this.str = '';
        this.nums = 0;
        this.childerArr = this.$children.filter(
          vm => vm.$options.name === 'items'
        )
    },
    forin(item) {
      console.log(item)
      if (item.type == 1) {
        this.str = item.name + ',-'
      } else {
        this.str = '-,' + item.name
      }
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
