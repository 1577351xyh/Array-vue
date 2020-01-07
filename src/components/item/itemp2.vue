<template>
  <div class="itemp">
    <div v-for="item in arr">
      <item :choice="false"></item>
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
      arr: [1, 2, 3, 4, 5],
      str: '',
      childerArr: [],
      BetNub: '',
      newArray: []
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
        //当前选中的字符串序列
        this.forin(vm.activeItem, i)
        //计算注数
        this.newArray.push(vm.activeItem)
      }
      this.str = this.str.substr(0, this.str.length - 1)
      let strs = this.str
      console.log(`当前选中:${strs}`)
      //当前注数逻辑
      this.Bet()
      //清空
      this.delete(this.childerArr)
    },
    forin(arr) {
      if (arr.length === 0) {
        //没选中的状态,不准下注
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
      let arrangementArray = this.newArray
      let arrangement = this.getArrayByArrays(arrangementArray)
      // console.log(arrangement)
      //拆解数组
      let oneArray = this.Dismantling(arrangement)
      console.log(`${oneArray.length}注`)
    },
    Dismantling(arr) {
      console.log(`传进来的数组`)
      console.log(arr)
      let DismantlingArrs = []
      var strArr = new Array()
      arr.forEach(vm => {
        // console.log(vm[0]);
        //定义一数组
        strArr = vm[0].split(',') //字符分割
        console.log(`去重前的结果${strArr}`)
        let strArrs = this.unique(strArr)
        console.log(`去重后的结果${strArrs}`)
        if (strArrs.length === strArr.length) {
          DismantlingArrs.push(strArrs)
        }
      })
      // eslint-disable-next-line no-undef
      console.log('返回的数组')
      console.log(DismantlingArrs)
      return DismantlingArrs
    },
    unique(arr) {
      const res = new Map()
      return arr.filter(a => !res.has(a) && res.set(a, 1))
    },
    //清空
    delete(arr) {
      for (let i = 0; i < arr.length; i++) {
        let vm = arr[i]
        vm.activeItem = []
      }
      this.str = ''
      this.newArray = [];
      // console.log('删除')
    },
    //二位数组排列组合
    getArrayByArrays(arrays) {
      var arr = ['']
      for (var i = 0; i < arrays.length; i++) {
        arr = this.getValuesByArray(arr, arrays[i])
      }
      return arr
    },
    getValuesByArray(arr1, arr2) {
      var arr = []
      for (var i = 0; i < arr1.length; i++) {
        var v1 = arr1[i]
        for (var j = 0; j < arr2.length; j++) {
          var v2 = arr2[j]
          if (v1 === '') {
            var value = [`${v2}`]
            arr.push(value)
          } else {
            var value = [`${v1},${v2}`]
            arr.push(value)
          }
        }
      }
      return arr
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
