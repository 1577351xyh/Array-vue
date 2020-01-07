<template>
  <div class="itemp">
    <div v-for="item in arr">
      <item :choice="true"></item>
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
        ></el-input-number>
        <p>倍</p>
      </div>
      <div class="margin_l">
        <p>共{{ price }}元</p>
      </div>
    </div>

    <!--    内容确定选项-->
    <div></div>

    <el-button type="success" @click="submit">马上投注</el-button>
  </div>
</template>

<script>
import item from './item'

export default {
  name: '',
  data() {
    return {
      price: '1',
      nums: '1',
      num: 1,
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      str: '',
      childerArr: [],
      BetArr: [],
      BetNub: ''
    }
  },
  components: {
    item
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    submit() {
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === 'items'
      )
      for (let i = 0; i < this.childerArr.length; i++) {
        let vm = this.$children[i]
        this.forin(vm.activeItem, i)
      }
      this.str = this.str.substr(0, this.str.length - 1)
      //当前注数
      let strs = this.str
      let bet = this.BetArr.length
      console.log(`当前注${bet}`)
      console.log(`当前选中:${strs}`)
      //清空
      this.delete(this.childerArr)
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
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.itemp {
  margin: 10px 0;
}

.flex {
  display: flex;
  align-items: center;
}

.margin_l {
  margin-left: 15px;
}
</style>
