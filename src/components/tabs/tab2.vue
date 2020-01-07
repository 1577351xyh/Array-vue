<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="定位胆" name="first">1</el-tab-pane>
    <el-tab-pane label="猜前五" name="second">2</el-tab-pane>
    <el-tab-pane label="猜前四" name="third">3</el-tab-pane>
    <el-tab-pane label="猜前三" name="fourth">4</el-tab-pane>
    <el-tab-pane label="猜前二" name="fives">5</el-tab-pane>
    <el-tab-pane label="猜冠军" name="six">6</el-tab-pane>
    <el-tab-pane label="双面盘" name="seven">7</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
