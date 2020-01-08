<template>
    <div class="item">
        <div
                v-if="choice"
                v-for="(item, index) in arr"
                :class="{ active: activeItem.indexOf(arr[index]) > -1 }"
                class="item-childer"
                @click.stop="onChange(index)"
        >
            {{ item }}
        </div>

        <div
                v-if="!choice"
                v-for="(item, index) in arr"
                :class="{ active: activeItem.indexOf(arr[index]) > -1 }"
                class="item-childer"
                @click.stop="onChange(index, $event)"
                ref="content"
        >
            {{ item }}
        </div>
    </div>
</template>
<script>
    export default {
        name: 'items',
        props: {
            choice: {
                type: Boolean
            }
        },
        data() {
            return {
                arr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
                activeItem: [],
                indexs: undefined
            }
        },
        methods: {
            onChange(index) {
                this.indexs = index;

                if (!this.choice) {
                    let content = this.$refs.content[index].innerText;
                    if (this.activeItem.indexOf(content) > -1) {
                        let content = this.$refs.content[index].innerText;
                        let contentIndex = this.getArrayIndex(this.activeItem, content);
                        this.activeItem.splice(contentIndex, 1)
                    } else {
                        this.activeItem.push(this.arr[index])
                    }
                    this.$parent.submit();
                } else {
                    this.activeItem.push(this.arr[index]);
                    this.$parent.onChange();
                }
            },
            getArrayIndex(arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return i;
                    }
                }
                return -1
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .item {
        display: flex;
        width: 500px;
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
