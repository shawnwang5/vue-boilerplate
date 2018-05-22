import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/router'
import VueRouter from 'vue-router'
import { store } from './store'
import { MyComponents } from './components'
import { RemResponsiveUtils } from './utils/rem-responsive'
import { StatisticUtils } from './utils/statistic'
import MuseUI from 'muse-ui'

import './assets/scss/app.scss'

Vue.config.productionTip = false

StatisticUtils.init()
RemResponsiveUtils.init()

Vue.use(VueRouter)
Vue.use(MyComponents)
Vue.use(MuseUI)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
