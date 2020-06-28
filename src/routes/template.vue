<template>
    <div class="page">$</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class MyComponent extends mixins(ParentVue) {
    async mounted() {
        await this.initProperties()
    }

    async destroyed() {}

    async initProperties() {}
}
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;
}
</style>
