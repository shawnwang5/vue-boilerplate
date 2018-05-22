<template>
    <div class="component" v-show="isShow">
        <div class="layer-shade"></div>
        <div class="layer">
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class Toast extends Vue {
        static componentName = 'my-toast'

        @Prop() autoCloseTime!: number

        isShow = false

        mounted () {
        }

        show () {
            this.isShow = true
            window.setTimeout(() => this.hide(), this.autoCloseTime)
        }

        hide () {
            this.isShow = false
        }
    }
</script>
<style scoped lang="scss">
    .component {
        .layer-shade {
            background-color: transparent;
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
            line-height: 0.4rem;

            & > .content {
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 4rem;
                height: 1rem;
                background-color: rgba(0, 0, 0, 0.8);
                border-radius: 0.1rem;
                font-size: 0.34rem;
                color: #FFFFFF;

            }
        }
    }
</style>
