<template>
    <div id="app-root" :class="appRootClass" :style="appRootStyle">
        <transition :name="pageTransition.name" :duration="pageTransition.duration">
            <router-view></router-view>
        </transition>
        <my-tab-bar ref="tabBar" v-show="appState.hasTabBar"></my-tab-bar>
        <global-components ref="gVnode"></global-components>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { AppState, PageTransition, TAB_BAR } from './store/modules/app'
import Component from 'vue-class-component'
import GlobalComponents from '@/global-components.vue'
import { GVNODE } from '@/store/modules/global-components'
import { LocalStorageUtils } from '@/utils/storage/local'

@Component({
    components: {
        'global-components': GlobalComponents,
    },
})
export default class App extends Vue {
    @State('app') appState!: AppState

    get refs(): any {
        return this.$refs
    }

    get pageTransition(): PageTransition {
        return this.appState.pageTransition
    }

    get appRootClass(): any {
        return {
            'has-tab-bar': this.appState.hasTabBar,
            'no-transition': this.pageTransition.duration === 0,
        }
    }

    get appRootStyle(): any {
        return {
            height: this.appState.appHeight,
        }
    }

    mounted() {
        this.$store.commit(TAB_BAR, this.$refs.tabBar)
        this.$store.commit(GVNODE, this.refs.gVnode)
        this.setFirstUseFlag()
    }

    setFirstUseFlag() {
        this.$nextTick(() => {})
        let firstUseFlag: null | string | boolean = LocalStorageUtils.read(
            'firstUseFlag'
        )
        if (firstUseFlag !== 'false') {
            LocalStorageUtils.write('firstUseFlag', 'false')
        }
    }
}
</script>

<style lang="scss" scoped>
#app-root {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    &.has-tab-bar {
        height: 100%;
        padding-bottom: 0.98rem;
    }
}
</style>
