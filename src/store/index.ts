import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import globalComponents from './modules/global-components'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        app,
        globalComponents,
    }
})
