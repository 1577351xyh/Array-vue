<template>
  <div class="itemp">
       <div v-if="item" class="itemp-tips">{{item.content}}{{item.desc}}</div>
    <div v-for="(item, index) in ObjArr">
      <item2 :choice="true" :item="item" :chooseType="chooseArray.length"></item2>
    </div>
    <div class="buttom">
      <el-button type="success" @click="buy">确定下注</el-button>
    </div>

    <div>
      <ul class="ul-box">
        <li v-for="(item, index) in chooseArray">
          <p>{{ item.str }}</p>
          <p>1注</p>
          <p class="flex">
            每注
            <el-input size="small" v-model="input"></el-input>元
          </p>
          <p>可中金额{{prips}}元</p>
          <p @click="ItemDelete(item,index, '')" class="delete">删除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import item2 from "../item/item2";

export default {
  props: {
    type: Array,
    item: Object
  },
  play_name: "",
  data() {
    return {
      //注数
      input: 1,
      nums: 1,
      ObjArr: [
        [
          { play_name: "大", odds: "1.910", active: 0, id: 1 },
          { play_name: "小", odds: "1.910", active: 0, id: 2 },
          { play_name: "单", odds: "1.910", active: 0, id: 3 },
          { play_name: "双", odds: "1.910", active: 0, id: 4 },
          { play_name: "龙", odds: "1.910", active: 0, id: 5 },
          { play_name: "虎", odds: "1.910", active: 0, id: 6 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 7 },
          { play_name: "小", odds: "1.910", active: 0, id: 8 },
          { play_name: "单", odds: "1.910", active: 0, id: 9 },
          { play_name: "双", odds: "1.910", active: 0, id: 10 },
          { play_name: "龙", odds: "1.910", active: 0, id: 11 },
          { play_name: "虎", odds: "1.910", active: 0, id: 12 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 13 },
          { play_name: "小", odds: "1.910", active: 0, id: 14 },
          { play_name: "单", odds: "1.910", active: 0, id: 15 },
          { play_name: "双", odds: "1.910", active: 0, id: 16 },
          { play_name: "龙", odds: "1.910", active: 0, id: 17 },
          { play_name: "虎", odds: "1.910", active: 0, id: 18 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 19 },
          { play_name: "小", odds: "1.910", active: 0, id: 20 },
          { play_name: "单", odds: "1.910", active: 0, id: 21 },
          { play_name: "双", odds: "1.910", active: 0, id: 22 },
          { play_name: "龙", odds: "1.910", active: 0, id: 23 },
          { play_name: "虎", odds: "1.910", active: 0, id: 24 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 13 },
          { play_name: "小", odds: "1.910", active: 0, id: 14 },
          { play_name: "单", odds: "1.910", active: 0, id: 15 },
          { play_name: "双", odds: "1.910", active: 0, id: 16 },
          { play_name: "龙", odds: "1.910", active: 0, id: 17 },
          { play_name: "虎", odds: "1.910", active: 0, id: 18 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 19 },
          { play_name: "小", odds: "1.910", active: 0, id: 20 },
          { play_name: "单", odds: "1.910", active: 0, id: 21 },
          { play_name: "双", odds: "1.910", active: 0, id: 22 },
          { play_name: "龙", odds: "1.910", active: 0, id: 23 },
          { play_name: "虎", odds: "1.910", active: 0, id: 24 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 25 },
          { play_name: "小", odds: "1.910", active: 0, id: 26 },
          { play_name: "单", odds: "1.910", active: 0, id: 27 },
          { play_name: "双", odds: "1.910", active: 0, id: 28 },
          { play_name: "龙", odds: "1.910", active: 0, id: 29 },
          { play_name: "虎", odds: "1.910", active: 0, id: 24 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 30 },
          { play_name: "小", odds: "1.910", active: 0, id: 31 },
          { play_name: "单", odds: "1.910", active: 0, id: 32 },
          { play_name: "双", odds: "1.910", active: 0, id: 33 },
          { play_name: "龙", odds: "1.910", active: 0, id: 34 },
          { play_name: "虎", odds: "1.910", active: 0, id: 35 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 36 },
          { play_name: "小", odds: "1.910", active: 0, id: 37 },
          { play_name: "单", odds: "1.910", active: 0, id: 38 },
          { play_name: "双", odds: "1.910", active: 0, id: 39 },
          { play_name: "龙", odds: "1.910", active: 0, id: 40 },
          { play_name: "虎", odds: "1.910", active: 0, id: 41 }
        ],
        [
          { play_name: "大", odds: "1.910", active: 0, id: 42 },
          { play_name: "小", odds: "1.910", active: 0, id: 43 },
          { play_name: "单", odds: "1.910", active: 0, id: 44 },
          { play_name: "双", odds: "1.910", active: 0, id: 45 },
          { play_name: "龙", odds: "1.910", active: 0, id: 46 },
          { play_name: "虎", odds: "1.910", active: 0, id: 47 }
        ]
      ],
      str: "",
      odds: 0,
      childerArr: [],
      chooseArray: []
    };
  },
  components: {
    item2
  },
  computed: {
    prips() {
      let s = Math.round(this.input * this.odds * 100) / 100;
      return s;
    }
  },
  methods: {
    buy() {
      //拿到当前选中的元素
      let obj = {
        multiple: 1,
        num: 1,
        content: this.str,
        //描述
        play_desc: this.item.name,
        //赔率
        odds: this.odds,
        money: this.input
      };
      this.$store.dispatch("buy", obj).then(res => {
        if (res.data.code === 200) {
          this.$message({ type: "success", message: res.data.message });
        } else {
          this.$message({ type: "info", message: res.data.message });
        }
      });
      this.ObjArr.forEach(vm => {
        vm.forEach(vms => {
          vms.active = 0;
        });
      });
      this.chooseArray = [];
      this.str = "";
      this.input = 1;
      this.nums = 0;
      this.BetArr = [];
      this.delete();
    },
    oddsfn(item) {
      this.odds = item.id;
      // this.ObjArr.forEach(vm => {
      //   vm.forEach(vms => {
      //     if (vms.id == id) {
      //       this.odds = vms.id;
      //     }
      //   });
      // });
    },
    onChange(item) {
      this.str = "";
      //计算倍率
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === "items"
      );
      for (let i = 0; i < this.childerArr.length; i++) {
        let vm = this.$children[i];
        this.forin(vm.activeItem, i);
      }
      this.str = this.str.substr(0, this.str.length - 1);
      // console.log(`当前选中:${this.str}`);
      this.oddsfn(item);
      this.submit(item);
    },
    submit(item) {
      //先提交数据
      this.chooseArray.push({
        id: item.id,
        str: this.str,
        nums: this.nums
      });
      //清空选项
      this.delete();
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
    delete() {
      this.childerArr = this.$children.filter(
        vm => vm.$options.name === "items"
      );
      for (let i = 0; i < this.childerArr.length; i++) {
        let vm = this.childerArr[i];
        vm.activeItem = [];
        vm.indexs = undefined;
      }
    },
    ItemDelete(items, index, item) {
      if (item) {
        for (let i = 0; i < this.chooseArray.length; i++) {
          if (this.chooseArray[i].id === item.id) {
            this.chooseArray.splice(i, 1);
          }
        }
        return;
      }
      this.chooseArray.splice(index, 1);
      this.childerArr.forEach(vm => {
        vm.activeItem = [];
        vm.item.forEach(vms => {
          if (vms.id === items.id) {
            vms.active = 0;
          }
        });
      });
    }
  }
};
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
