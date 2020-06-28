<template>
    <div class="component my-text-scroll-single">
        <div class="wrapper" :class="[direction]">
            <template v-for="i in dataList">
                <div :style="{ 'animation-duration': animationDuration }" v-html="i" :key="i"></div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class AlertDialog extends Vue {
    static componentName = 'my-text-scroll-single'

    @Prop() direction!: string
    @Prop() speed!: number
    // [ 'text1', 'text2' ]
    @Prop() dataList!: any[]

    directionMap: any = {
        up: 'up',
    }

    get animationDuration() {
        return (this.speed || 2) + 's'
    }

    mounted() {
        if (!this.directionMap[this.direction]) {
            throw new Error('direction is null or undefined')
        }
    }
}
</script>
<style  lang="scss">
.component.my-text-scroll-single {
    $lineHeight: 22px;

    font-size: 14px;
    overflow: hidden;
    height: $lineHeight;
    line-height: $lineHeight;
    overflow: hidden;

    .up > div {
        animation: 2s up-single infinite linear;
    }

    @keyframes up-single {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100%);
        }
    }
}
</style>
