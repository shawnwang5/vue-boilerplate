<template>
    <div class="component confirm" v-show="isShow">
        <div class="layer-shade"></div>
        <div class="layer">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <footer>
                <a href="javascript: void(0)" class="btn" @click="hide()">{{ cancelBtnText }}</a>
                <a href="javascript: void(0)" class="btn" @click="onOkBtnClick()">{{ okBtnText }}</a>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class ConfirmDialog extends Vue {
        static componentName = 'my-confirm-dialog'

        @Prop() okBtnText!: string
        @Prop() cancelBtnText!: string

        isShow = false

        mounted () {
        }

        hide () {
            this.isShow = false
        }

        show () {
            this.isShow = true
        }

        onOkBtnClick () {
            this.$emit('okBtnClick')
        }
    }
</script>

<style scoped lang="scss">
    .component {
        .layer-shade {
            background-color: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            height: 100%;
        }

        .layer {
            font-size: 0.32rem;
            border-radius: 0.16rem;
            overflow: hidden;
            width: 80%;
            text-align: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background-color: #FFF;
            line-height: 0.88rem;

            & > .title {
                line-height: 0.6rem;
                padding: 0.2rem 0;
            }

            & > .list-group {
            }

            & > footer {
                margin-top: 0.2rem;
                display: flex;
                border-top: 0.02rem solid #CDCFD2;

                .btn {
                    background-color: #FFF;
                    flex: 1;
                    color: #c0873b;
                    border-radius: 0;

                    &:nth-of-type(1) {
                        border-right: 0.02rem solid #CDCFD2;
                    }
                }
            }
        }
    }
</style>
