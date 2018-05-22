<template>
    <div class="swipe-left-delete">
        <div class="swipe-left-delete-content"
             @touchstart="onTouchStart($event)"
             @touchmove="onTouchMove($event)"
             @touchend="onTouchEnd($event)"
             @touchcancel="onTouchEnd($event)"
             :style="contentStyle">
            <slot name="content"></slot>
        </div>
        <div class="swipe-left-delete-options" ref="optionsEle">
            <slot name="options"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component } from 'vue-property-decorator'

    @Component({})
    export default class SwipeLeftDelete extends Vue {
        static componentName = 'my-swipe-left-delete'

        startX = 0
        moveX = 0
        translateX = 0
        lastTranslateX = 0
        optionsWidth = 0

        get contentStyle () {
            return {
                transform: 'translateX(' + this.translateX + 'px)'
            }
        }

        onTouchStart (event: any) {
            this.startX = event.touches[ 0 ].pageX
            this.lastTranslateX = this.translateX
            const optionsELe: any = this.$refs.optionsEle
            this.optionsWidth = optionsELe.getBoundingClientRect().width
        }

        onTouchMove (event: any) {
            const optionsEle: any = this.$refs.optionsEle
            optionsEle.style.zIndex = -1
            this.moveX = event.touches[ 0 ].pageX - this.startX
            let isRight = this.moveX > 0
            if (isRight) {
                if (this.translateX >= 0) {
                    this.translateX = 0
                } else {
                    this.translateX = this.lastTranslateX + this.moveX
                }
            } else {
                if (this.moveX <= -this.optionsWidth) {
                    this.translateX = -this.optionsWidth
                } else {
                    this.translateX = this.lastTranslateX + this.moveX
                }
            }
        }

        onTouchEnd (event: any) {
            const optionsEle: any = this.$refs.optionsEle
            if (this.moveX > 0) {
                this.translateX = 0
            } else {
                if (this.translateX <= (-1 * this.optionsWidth)) {
                    optionsEle.style.zIndex = 0
                    this.$emit('showOptions')
                    this.translateX = -this.optionsWidth
                } else {
                    this.translateX = 0
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .swipe-left-delete {
        position: relative;

        .swipe-left-delete-content {
            position: relative;
        }

        .swipe-left-delete-options {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            z-index: -1;
        }
    }
</style>
