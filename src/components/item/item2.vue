<template>
  <div class="item">
    <div
      v-if="choice || !item.type"
      v-for="(childer, index) in item"
      :class="{ active: childer.active == 1 }"
      class="item-childer"
      @click.stop="onClick(childer, index)"
      ref="content"
    >
      <p class="childer-text">{{ childer.name }}</p>
      <div class="item-childer-2">赔率{{ childer.odds_id }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'items',
  props: {
    choice: {
      type: Boolean
    },
    item: {
      type: Array
    },
    chooseType:{
      type:Number
    }
  },
  data() {
    return {
      activeItem: [],
      activeObj: [],
      activeItems: [],
      itemArray: []
    }
  },
  methods: {
    onClick(item) {
      if (item.active == 0 && this.chooseType !=1) {
        item.active = 1
        this.activeItem.push(item.name)
        this.$parent.onChange(item)
      } else {
        item.active = 0
        this.$parent.ItemDelete('','',item)
      }
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.item {
  width: 100%;
  margin: 10px 0;
  margin-bottom: 35px;
  display: flex;

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
