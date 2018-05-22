<template>
    <div class="tabBar">
        <ul>
            <li v-for="tabItem in tabBarList" :key="tabItem.tabText" @click="onTabClick(tabItem)"
                :class="[ tabItem.isActive ? 'active': '' ]">
                <i class="icon"
                   :style="[ tabItem.style, tabItem.isActive ? tabItem.activeStyle : {} ]"></i>
                <span>{{ tabItem.tabText }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { tabBarDataList, TabItem } from './consts'

    @Component({})
    export default class TabBar extends Vue {
        static componentName = 'my-tab-bar'

        tabBarList: TabItem[] = tabBarDataList
        currActiveTab = this.tabBarList[ 0 ]

        onTabClick (tabItem: TabItem) {
            this.setCurrActiveTabByPagePath(tabItem.pagePath)
            this.$router.push(tabItem.pagePath)
        }

        mounted () {
            this.setCurrActiveTabByPagePath(this.$route.fullPath)
        }

        setCurrActiveTabByPagePath (pagePath: string) {
            const activeTabItem = this.tabBarList.find((tabItem: TabItem) => pagePath === tabItem.pagePath) || this.currActiveTab
            this.currActiveTab.isActive = false
            this.currActiveTab = activeTabItem
            this.currActiveTab.isActive = true
        }
    }
</script>

<style lang="scss" scoped>
    .tabBar {
        background: #f7feff;
        height: 0.98rem;
        width: 100%;
        max-width: 750px;
        position: fixed;
        bottom: 0;

        & > ul {
            display: flex;

            & > li {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 0.2rem;

                &.active {
                    color: #53abe2;
                }

                & > .icon {
                    width: 0.4rem;
                    height: 0.4rem;
                    background: center / 100% 100% no-repeat;
                }

                & > span {
                    transform: scale(0.83);
                }
            }
        }
    }
</style>