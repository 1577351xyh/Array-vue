<template>
  <div class="itemp">
    <div v-if="item" class="itemp-tips">{{item.content}}{{item.desc}}</div>
    <div v-if="ObjArr1">
      <item3 :choice="true" :item1="ObjArr1" :item2="ObjArr2" :chooseType="chooseArray.length"></item3>
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
          <p>可中金额{{price}}</p>
          <p @click="ItemDelete(item,index,'')" class="delete">删除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import item3 from "../item/item3";

export default {
  props: {
    item: {
      type: Object
    }
  },
  name: "",
  data() {
    return {
      //注数
      input: 1,
      nums: 1,
      ObjArr1: [],
      ObjArr2: [],
      str: "",
      odds: 0,
      chooseArray: [],
      timeId:null,
      oddsnum:0
    };
  },
  components: {
    item3
  },
  computed: {
    price() {
      return this.input * this.oddsnum;
    }
  },
  methods: {
    getArr(arr) {
      //处理数组
      if (this.ObjArr1.length < 1) {
        arr.forEach(vm => {
          if (vm.desc == "冠亚和") {
            vm.active = 0;
            this.ObjArr1.push(vm);
          } else {
            vm.active = 0;
            this.ObjArr2.push(vm);
          }
        });
      }
    },

    buy() {
      if(this.timeId){
        window.clearTimeout(this.timeId);
        this.timeId = null;
      }
      // 计算赔率
      let obj = {
        multiple: 1,
        num: 1,
        content: this.str,
        //描述
        play_desc: this.item.name,
        //赔率
        odds_id: this.odds,
        money: this.input
      };
      this.$store.dispatch("buy", obj).then(res => {
        if (res.data.code === 200) {
          this.$message({type: "success",message: res.data.data});
          this.timeId = setTimeout(()=>{
            this.$store.dispatch("getbetLog");
          },2000)
        } else {
          this.$message({
            type: "info",
            message: res.data.message
          });
        }
      });
      this.chooseArray = [];
      this.str = "";
      this.nums = 0;
      this.odds = 0;
      this.input = 1;
      this.delete();
    },
    //当前选中的值,当前选中的行
    onChange(item) {
       if(this.chooseArray.length>=1){
        return;
      }
      //赔率id
      this.odds = item.id;
      //赔率
      this.oddsnum = item.odds;
      this.str = "";
      this.forin(item);
      let strs = this.str;
      console.log(`当前选中:${strs}`);
      this.submit(item);
    },
    submit(item) {
      //先提交数据
      this.chooseArray.push({
        id: item.id,
        str: this.str,
        nums: this.nums
      });
    },
    //清空
    delete() {
      this.$children[0].item1.forEach(vm => {
        vm.active = 0;
      });
      this.$children[0].item2.forEach(vm => {
        vm.active = 0;
      });
    },
    forin(item) {
      if (item.desc == "冠亚和") {
        this.str = item.play_name + ",-";
      } else {
        this.str = "-," + item.play_name;
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
      this.delete();
    },
    
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
