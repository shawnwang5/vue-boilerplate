<template>
    <div class="component alert" v-show="isShow">
        <div class="layer-shade"></div>
        <div class="layer">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <footer :class="{ hidden: !isShowOkBtn }">
                <button class="btn btn-primary" @click="onOkBtnClick()">确定</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class AlertDialog extends Vue {
        static componentName = 'my-alert-dialog'

        @Prop() isShowOkBtn!: boolean

        isShow = false

        mounted () {
        }

        show () {
            this.isShow = true
        }

        hide () {
            this.isShow = false
        }

        onOkBtnClick () {
            this.hide()
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
            overflow: hidden;
            border-radius: 0.16rem;
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
                padding: 0.3rem 0.16rem;
            }

            & > footer {
                margin-top: 0.2rem;
                display: flex;

                .btn {
                    background-color: #FFF;
                    flex: 1;
                    border-top: 0.02rem solid #CDCFD2;
                    color: #c0873b;
                }
            }
        }
    }
</style>
