<template>
  <div>
     <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="北京PK10" name="first">
      <tab1></tab1>
    </el-tab-pane>
    <el-tab-pane label="大发PK10" name="second">
       <tab2></tab2>
    </el-tab-pane>
    <el-tab-pane label="5分PK10" name="third">5分PK10</el-tab-pane>
    <el-tab-pane label="3分PK10" name="fourth">3分PK10</el-tab-pane>
    <el-tab-pane label="幸运飞艇" name="fourth1">幸运飞艇</el-tab-pane>
  </el-tabs>


  </div>

</template>
<script>
  import tab1 from  '../components/tabs/tab1'
  import tab2 from  '../components/tabs/tab2'


  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    components:{
      tab1,
      tab2,

    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
