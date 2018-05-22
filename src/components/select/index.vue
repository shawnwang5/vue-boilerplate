<template>
    <div class="select" :class="[ isShow ? '' : 'hidden' ]">
        <div class="layer-shade" @click="hide"></div>
        <div class="layer">
            <ul class="select-ul">
                <li :class="{ active: currText === item.text }" v-for="item in dataList" :key="item.value"
                    @click="handleItemClick(item)">{{ item.text }}
                </li>
            </ul>
            <button class="btn cancel" @click="hide()">取消</button>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    export interface SelectDataItem {
        text: string
        value: string
    }

    @Component({})
    export default class Select extends Vue {
        static componentName = 'my-select'

        @Prop() initText!: string
        @Prop() dataList!: SelectDataItem[]

        isShow = false
        currText = ''

        mounted () {
            this.currText = this.initText
        }

        show () {
            this.isShow = true
        }

        hide () {
            this.isShow = false
        }

        handleItemClick (item: SelectDataItem) {
            this.currText = item.text
            this.$emit('change', item)
        }
    }
</script>

<style scoped lang="scss">
    .select {
        & > .layer-shade {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.5);
        }

        & > .layer {
            z-index: 10000;
            width: 90%;
            max-height: 80%;
            overflow: auto;
            position: fixed;
            bottom: 0;
            left: 5%;

            $lineHeight: 0.88rem;

            & > .select-ul {
                max-height: 400px;
                overflow: auto;
                line-height: $lineHeight;
                border-radius: 0.1rem;
                padding: 0 0.3rem;
                background: #FFFFFF;
                font-size: 0.32rem;
                color: #242424;

                & > li {
                    border-bottom: 0.02rem solid #D5D5D5;
                    height: 0.88rem;
                    box-sizing: border-box;

                    &:last-child {
                        border: none;
                    }

                    &.active {
                        color: #ec5926;
                    }
                }
            }

            & > .btn.cancel {
                line-height: $lineHeight;
                font-size: 0.32rem;
                color: #242424;
                width: 100%;
                margin: 0.2rem 0;
                background: #FFFFFF;
                border-radius: 0.1rem;
            }
        }
    }
</style>
