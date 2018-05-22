import IndexPage from '../index/index/index/index.vue'
import AboutPage from '../index/about.vue'
import SelectDatePage from '../index/index/select-date.vue'

export const indexRoutes: any[ ] = [
    {
        path: '/index/index',
        component: IndexPage,
        meta: { appHeight: '100%', needTabBar: true, limitHeight: true, }
    },
    {
        path: '/index/index/selectDate',
        component: SelectDatePage,
        meta: { appHeight: '100%', needTabBar: true, noPageAnim: false, }
    },
    { path: '/index/about', component: AboutPage, meta: { appHeight: '100%', needTabBar: true } },
]
