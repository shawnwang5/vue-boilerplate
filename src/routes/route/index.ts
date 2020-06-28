import IndexPage from '@/routes/index/index/index/index.vue'
import AboutPage from '@/routes/index/about.vue'
import SelectDatePage from '@/routes/index/index/select-date.vue'

export const indexRoutes: any[] = [
    {
        path: '/index/index/selectDate',
        component: SelectDatePage,
        meta: {
            appHeight: '100%',
            needTabBar: true,
            noPageAnim: false,
            limitMaxWidth: true,
        },
    },
    {
        path: '/index/index',
        component: IndexPage,
        meta: {
            appHeight: '100%',
            needTabBar: true,
            limitHeight: true,
            limitMaxWidth: true,
        },
    },
    {
        path: '/index/about',
        component: AboutPage,
        meta: { appHeight: '100%', needTabBar: true, limitMaxWidth: true },
    },
]
