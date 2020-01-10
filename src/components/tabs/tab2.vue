<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" :name="item.name" v-for="(item, index) in playListArr">
        <itemPar1 :item="item" :oddNum="oddNum" v-if="item.id == 59"></itemPar1>
        <itemPar2 :item="item" :oddNum="oddNum" v-else-if="item.id == 60"></itemPar2>
        <itemPar3 :item="item" :oddNum="oddNum" v-else-if="item.id == 61"></itemPar3>
        <itemPar4 :item="item" :oddNum="oddNum" v-else-if="item.id == 62"></itemPar4>
        <itemPar5 :item="item" :oddNum="oddNum" v-else-if="item.id == 63"></itemPar5>
        <itemPar6 :item="item" :oddNum="oddNum" v-else-if="item.id == 64"></itemPar6>
        <itemPar7 ref="mychild" :item="item" v-else-if="item.id == 65"></itemPar7>
        <itemPar8 :item="item" v-else-if="item.id == 66"></itemPar8>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import itemPar1 from "../itemParent/itempar1";
import itemPar2 from "../itemParent/itempar2";
import itemPar3 from "../itemParent/itempar3";
import itemPar4 from "../itemParent/itempar4";
import itemPar5 from "../itemParent/itempar5";
import itemPar6 from "../itemParent/itempar6";
import itemPar7 from "../itemParent/itempar7";
import itemPar8 from "../itemParent/itempar8";
import http from "../../hppt/api";

export default {
  data() {
    return {
      activeName: "定位胆",
      playListArr: [],
      oddNum: 0
    };
  },
  components: {
    itemPar8,
    itemPar7,
    itemPar6,
    itemPar5,
    itemPar4,
    itemPar3,
    itemPar2,
    itemPar1
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const a = await this.getPlayList();
      const b = await this.oddsInfoList(this.playListArr[0].id);
    },
    async handleClick(tab) {
      let index = tab.index;
      //获取玩法id
      let play_id = this.playListArr[index].id;
      //更新赔率列表
      const res1 = await this.oddsInfoList(play_id);
      //赔率拼接
      const res2 = await this.addObj(index, this.oddNum);
    },
    async getPlayList() {
      let id = this.$store.state.oddsid;
      //tab2的列表,按照id渲染
      let res = await http.playList(id);
      this.playListArr = res.data;
    },
    //赔率列表
    async oddsInfoList(play_id) {
      let res = await http.oddsInfoList(play_id);
      if (res.data.length > 1) {
        this.$refs.mychild[0].getArr(res.data);
      }
      this.oddNum = res.data[0].odds;
      this.addObj(0, this.oddNum);
    },
    async addObj(index, oddNum) {
      this.playListArr[index].oddNum = oddNum;
    }
  }
};
</script>
