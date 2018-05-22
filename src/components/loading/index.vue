<template>
    <div class="component" :class="{ hidden: !isShow }">
        <div class="layer-shade"></div>
        <div class="layer">
            <div class="loading-image"></div>
            <div class="tips">{{ tips || '请等待...' }}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class Loading extends Vue {
        static componentName = 'my-loading'

        @Prop() tips!: string

        isShow = false

        mounted () {
        }

        show () {
            this.isShow = true
        }

        hide () {
            this.isShow = false
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
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;

            & > .loading-image {
                width: 0.6rem;
                height: 0.6rem;
                background: url('../../assets/images/components/loading/loading.gif') center center / 100% no-repeat;
            }

            & > .tips {
                font-size: 0.28rem;
                margin-top: 0.1rem;
                color: #fff;
            }
        }
    }
</style>
