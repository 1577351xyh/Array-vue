<template>
  <div class="item">
    <div class="item1">
      <div
        v-if="item1"
        v-for="(childer, index) in item1"
        :class="{ active: childer.active == 1 }"
        class="item-childer"
        @click.stop="onClick1(childer, index)"
        ref="content"
      >
        <p class="childer-text">{{ childer.play_name }}</p>
        <div class="item-childer-2">赔率{{ childer.odds }}</div>
      </div>
    </div>

    <div class="item2">
      <div
        v-if="item2"
        v-for="(childer, index) in item2"
        :class="{ active: childer.active == 1 }"
        @click.stop="onClick2(childer, index)"
        class="item-childer"
        ref="content"
      >
        <p class="childer-text">{{ childer.play_name }}</p>
        <div class="item-childer-2">赔率{{ childer.odds }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "items",
  props: {
    item2: {
      type: Array
    },
    item1: {
      type: Array
    },
    chooseType:{
        type:Number
    },
  },
  data() {
    return {
      activeItem: [],
      activeObj: [],
      activeItems: [],
      itemArray: []
    };
  },
  methods: {
    onClick1(item) {
      console.log(item)
      if (item.active == 0 && this.chooseType != 1) {
        item.active = 1;
        this.activeItem.push(item.play_name);
        this.$parent.onChange(item);
      } else {
        let index = this.activeItem.indexOf(item.name);
        this.activeItem.splice(index, 1);
        item.active = 0;
        this.$parent.ItemDelete("", "", item);
      }
    },
    onClick2(item) {
      console.log(item)
      if (item.active == 0 && this.chooseType != 1) {
        item.active = 1;
        this.activeItem.push(item.play_name);
        this.$parent.onChange(item);
      } else {
        let index = this.activeItem.indexOf(item.name);
        this.activeItem.splice(index, 1);
        item.active = 0;
        this.$parent.ItemDelete("", "", item);
      }
    }
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.item {
  width: 100%;
  margin: 10px 0;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  .item1,
  .item2 {
    display: flex;
    flex-wrap: wrap;
  }
  .item2{
      margin-top: 40px;
      .item-childer{
        margin-bottom: 40px;
      }
  }
  .item-flex {
    display: flex;
    justify-content: flex-start;
    margin: 30px 0;
  }
  .childer-text {
    padding: 0;
    margin: 0;
  }
  .item-childer {
    width: 40px;
    color: #000000;
    height: 40px;
    background-color: #fff;
    border: 1px solid #c0c5d2;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    position: relative;
    margin-right: 35px;
  }

  .item-childer-2 {
    font-size: 14px;
    height: 15px;
    width: 200%;
    text-align: center;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
  }

  .active {
    background-color: #d24c10;
    color: #ffffff;

    .item-childer-2 {
      color: #d24c10;
    }
  }
}
</style>
