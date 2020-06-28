<template>
    <div class="page">
        <p>
            <span>个人邮箱:</span>
            <span>shawnwang05@gmail.com</span>
        </p>
        <p>
            <span>项目说明:</span>
            <span>本项目是 vue 的模板项目，用于快速创建新的项目</span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import { AppState } from '@/store/modules/app'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class AboutPage extends mixins(ParentVue) {
    async mounted() {}
}
</script>

<style lang="scss" scoped>
.page {
    background-color: #fff;
    height: 100%;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    line-height: 0.5rem;

    & > p {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 0.2rem;
        line-height: 0.5rem;

        span {
            &:nth-of-type(1) {
                flex: 0 0 1.4rem;
                text-align: right;
                margin-right: 0.12rem;
            }

            &:nth-of-type(2) {
                flex: 1;
                text-align: left;
            }
        }
    }
}
</style>