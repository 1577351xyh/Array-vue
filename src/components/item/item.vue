<template>
    <div class="item">
        <div
                v-if="choice && item.length>0"
                v-for="(childer, index) in item"
                :class="{ active: childer.active == 1 }"
                class="item-childer"
                @click.stop="onChange(childer)"
        >
            {{ childer.name }}
        </div>

        <div
                v-if="!choice && item.length>0"
                v-for="(childer, index) in item"
                class="item-childer"
                :class="{ active: childer.active == 1 }"
                @click.stop="onChange(childer)"
                ref="content"
        >
            {{ childer.name }}
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
            chooseType: {
                type: Number
            }
        },
        data() {
            return {
                activeItem: [],
                indexs: undefined
            }
        },

        methods: {
            onChange(item) {
                if (item.active == 0 && this.chooseType != 1) {
                    item.active = 1;
                    this.activeItem.push(item.name);
                    this.$parent.onChange(item)
                } else {
                    let index = this.activeItem.indexOf(item.name);
                    this.activeItem.splice(index, 1)
                    item.active = 0;
                    this.$parent.onChange(item)
                }
            },
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin: 10px 0;

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
        }

        .active {
            background-color: #d24c10;
            color: #ffffff;
        }
    }
</style>
