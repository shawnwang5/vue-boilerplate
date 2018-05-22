import { VNode } from 'vue'

export const ALERT_DIALOG = 'ALERT_DIALOG'
export const CONFIRM_DIALOG = 'CONFIRM_DIALOG'
export const LOADING = 'LOADING'
export const SELECT = 'SELECT'
export const TOAST = 'TOAST'
export const GVNODE = 'GVNODE'

export interface GlobalComponentsState {
    alertDialog: any
    confirmDialog: any
    loading: any
    select: any
    toast: any
    gVnode: VNode | null
}

const state: GlobalComponentsState = {
    alertDialog: {
        title: '标题',
        content: '内容',
        isShowOkBtn: true,
        okBtnFn: null,
        vnode: null,
    },
    confirmDialog: {
        title: '标题',
        content: '内容',
        okBtnText: '确定',
        cancelBtnText: '取消',
        okBtnFn: null,
        vnode: null,
    },
    loading: {
        tips: '请等待...',
        vnode: null,
    },
    select: {
        curSelect: null,
        initText: '',
        dataList: [
            { text: '男', value: '1', },
            { text: '女', value: '2', },
        ],
        vnode: null,
    },
    toast: {
        content: '提示',
        autoCloseTime: 2000,
        vnode: null,
    },
    gVnode: null,
}

const getters = {}

const mutations = {
    [ ALERT_DIALOG ] (state: GlobalComponentsState, payload: any) {
        state.alertDialog = { ...state.alertDialog, ...payload }
    },
    [ CONFIRM_DIALOG ] (state: GlobalComponentsState, payload: any) {
        state.confirmDialog = { ...state.confirmDialog, ...payload }
    },
    [ LOADING ] (state: GlobalComponentsState, payload: any) {
        state.loading = { ...state.loading, ...payload }
    },
    [ SELECT ] (state: GlobalComponentsState, payload: any) {
        state.select = { ...state.select, ...payload }
    },
    [ TOAST ] (state: GlobalComponentsState, payload: any) {
        state.toast = { ...state.toast, ...payload }
    },
    [ GVNODE ] (state: GlobalComponentsState, payload: any) {
        state.gVnode = payload
    },
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions
}
