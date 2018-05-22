export const APP_HEIGHT = 'APP_HEIGHT'
export const HAS_TAB_BAR = 'HAS_TAB_BAR'
export const PAGE_TRANSITION = 'PAGE_TRANSITION'
export const TAB_BAR = 'TAB_BAR'

export interface PageTransition {
    name: string
    duration: number
}

export interface AppState {
    appHeight: string
    hasTabBar: boolean
    pageTransition: PageTransition
    tabBar: any
}

const state: AppState = {
    appHeight: 'auto',
    hasTabBar: true,
    pageTransition: {
        name: '',
        duration: 0
    },
    tabBar: {},
}

const getters = {}

const mutations = {
    [ APP_HEIGHT ] (state: AppState, payload: any) {
        state.appHeight = payload || 'auto'
    },
    [ TAB_BAR ] (state: AppState, payload: any) {
        state.tabBar = payload
    },
    [ HAS_TAB_BAR ] (state: AppState, payload: boolean) {
        state.hasTabBar = payload
    },
    [ PAGE_TRANSITION ] (state: AppState, payload: any) {
        state.pageTransition = payload
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}
