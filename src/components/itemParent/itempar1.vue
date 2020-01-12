<template>
  <div class="itemp">
    <div v-if="item" class="itemp-tips">{{item.content}}{{item.desc}}</div>
    <div v-for="item in arr">
      <item :choice="true" :item="item" :chooseType="chooseArray.length"></item>
    </div>

    <div class="inputNumber flex">
      <div class="flex">
        你选中了
        <p class="chooseColor">{{ nums }}</p>注
      </div>
      <div class="flex margin_l">
        <el-input-number
          v-model="num"
          @change="handleChange"
          :min="1"
          :max="99"
          label="描述文字"
          size="small"
        ></el-input-number>
        <p style="margin-left: 15px">倍</p>
      </div>
      <div class="margin_l flex">
        共
        <p class="chooseColor">{{ priceComputed }}</p>元
      </div>
    </div>
    <div class="buttom">
      <el-button type="primary" @click="submit" v-if="chooseArray.length==0">确定选号</el-button>
      <el-button type="success" @click="buy" v-else>确定下注</el-button>
    </div>

    <div>
      <ul class="ul-box">
        <li v-for="(item,index) in chooseArray">
          <p>{{item.str}}</p>
          <p>{{item.nums}}注</p>
          <p>{{item.num}}倍</p>
          <p>{{item.price}}元</p>
          <p>可中金额{{(item.price * 1.91).toFixed(2)}}</p>
          <p @click="ItemDelete(index)" class="delete">删除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import item from "../item/item";

export default {
  name: "",
  props: {
    item: {
      type: Object
    },
    oddNum: {
      type: Number
    }
  },
  data() {
    return {
      //注数
      arr: [],
      nums: 0,
      //倍数
      num: 1,
      str: "",
      childerArr: [],
      price: undefined,
      chooseArray: [],
      timeId:null
    };
  },
  created() {
    // 生成数组arr
    for (let i = 0; i < 10; i++) {
      this.arr.push([]);
      for (let j = 0; j < 10; j++) {
        if (j == 9) {
          this.arr[i].push({
            name: parseInt(1 + j),
            active: 0,
            id: Math.floor(Math.random() * 1000000000 + 1)
          });
        } else {
          let s = "0" + (j + 1);
          this.arr[i].push({
            name: s,
            active: 0,
            id: Math.floor(Math.random() * 10000000000 + 1)
          });
        }
      }
    }
  },
  components: {
    item
  },
  computed: {
    //价格
    priceComputed() {
      this.price = (this.num * 2 * this.nums).toFixed(2);
      return this.num * 2 * this.nums;
    }
  },
  methods: {
    
    buy() {
      if (this.timeId) {
        window.clearTimeout(this.timeId)
        this.timeId = null;
      }
      let obj = {
        multiple: this.chooseArray[0].num,
        num: this.chooseArray[0].nums,
        content: this.str,
        //描述
        play_desc: this.item.name,
        //赔率
        odds_id: this.oddNum,
        money: 2
      };
      this.$store.dispatch("buy", obj).then(res => {
        if (res.data.code === 200) {
          console.log(res)
          this.$message({ type: "success", message: res.data.data });
          this.timeId = setTimeout(()=>{
            this.$store.dispatch("getbetLog");
          },2000)
        } else {
          this.$message({ type: "info", message: res.data.message });
        }
      });
      this.chooseArray = [];
      this.str = "";
      this.nums = 0;
    },
    handleChange(value) {
      console.log(value);
    },
    submit() {
      //先提交数据
      if (this.str == "-,-,-,-,-,-,-,-,-,-"||this.str=='') {
        this.$notify.info({
          title: "消息",
          message: "当前注为0,请投注"
        });
        return;
      }
      this.chooseArray.push({
        str: this.str,
        price: this.price,
        nums: this.nums,
        num: this.num
      });
      this.num = 0;
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === "items"
      );
      //清空
      this.delete(this.childerArr);
    },
    onChange(item) {
       if(this.chooseArray.length>=1){
        return;
      }
      this.str = "";
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === "items"
      );
      let s = "";
      for (let i = 0; i < this.childerArr.length; i++) {
        let vm = this.$children[i];
        this.forin(vm.activeItem, i);
        vm.item.forEach(vm => {
          if (vm.active == 1) {
            s++;
          }
        });
      }
      this.nums = s;
      this.str = this.str.substr(0, this.str.length - 1);
      //当前注数
      let strs = this.str;
    },
    forin(arr) {
      if (arr.length === 0) {
        this.str += "-,";
      } else {
        for (let j = 0; j < arr.length; j++) {
          this.str += arr[j] + ",";
        }
      }
    },
    //清空
    delete(arr) {
      for (let i = 0; i < arr.length; i++) {
        let vm = arr[i];
        vm.activeItem = [];
        vm.item.forEach(vms => {
          vms.active = 0;
        });
      }
    },
    ItemDelete(index) {
      this.chooseArray.splice(index, 1);
      this.str='';
      this.nums = 0;
    },
    handleChange(){}
  }
};
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
