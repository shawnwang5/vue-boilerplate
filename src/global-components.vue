<template>
    <div class="global-components" ref="gVnode">
        <my-alert-dialog
                :isShowOkBtn="gCS.alertDialog.isShowOkBtn"
                @okBtnClick="alterOkBtnClick"
                ref="alertDialog">
            <span slot="title">{{ gCS.alertDialog.title }}</span>
            <span slot="content">{{ gCS.alertDialog.content }}</span>
        </my-alert-dialog>

        <my-confirm-dialog
                :okBtnText="gCS.confirmDialog.okBtnText"
                :cancelBtnText="gCS.confirmDialog.cancelBtnText"
                @okBtnClick="confirmOkBtnClick"
                ref="confirmDialog">
            <span slot="title">{{ gCS.confirmDialog.title }}</span>
            <span slot="content">{{ gCS.confirmDialog.content }}</span>
        </my-confirm-dialog>

        <my-loading ref="loading" :tips="gCS.loading.tips"></my-loading>

        <my-select ref="select" @change="selectChange($event)" :initText="gCS.select.initText"
                   :dataList="gCS.select.dataList"></my-select>

        <my-toast ref="toast" :autoCloseTime="gCS.toast.autoCloseTime">
            <span>{{ gCS.toast.content }}</span>
        </my-toast>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { State } from 'vuex-class'
    import {
        ALERT_DIALOG,
        CONFIRM_DIALOG,
        GlobalComponentsState,
        LOADING,
        SELECT,
        TOAST
    } from './store/modules/global-components'

    interface SelectItem {
        text: string,
        value: string
    }

    @Component({})
    export default class GlobalComponents extends Vue {
        @State('globalComponents') gCS!: GlobalComponentsState

        get refs (): any {
            return this.$refs
        }

        mounted () {
            this.initState()
        }

        initState () {
            this.$store.commit(ALERT_DIALOG, { vnode: this.refs.alertDialog })
            this.$store.commit(CONFIRM_DIALOG, { vnode: this.refs.confirmDialog })
            this.$store.commit(LOADING, { vnode: this.refs.loading })
            this.$store.commit(SELECT, { vnode: this.refs.select })
            this.$store.commit(TOAST, { vnode: this.refs.toast })
        }

        alterOkBtnClick ($event: any) {
            if (typeof this.gCS.alertDialog.okBtnFn === 'function') {
                this.gCS.alertDialog.okBtnFn()
            }
        }

        confirmOkBtnClick ($event: any) {
            if (typeof this.gCS.confirmDialog.okBtnFn === 'function') {
                this.gCS.confirmDialog.okBtnFn()
            }
        }

        showAlertDialog (title: string, content: string, isShowOkBtn = true, okBtnFn?: Function) {
            this.$store.commit(ALERT_DIALOG, { title, content, isShowOkBtn, okBtnFn })
            this.$nextTick(() => this.refs.alertDialog.show())
        }

        hideAlertDialog () {
            this.refs.alertDialog.hide()
        }

        showConfirmDialog (title: string, content: string, okBtnFn: Function) {
            this.$store.commit(CONFIRM_DIALOG, { title, content, okBtnFn })
            this.$nextTick(() => this.refs.confirmDialog.show())
        }

        hideConfirmDialog () {
            this.refs.confirmDialog.hide()
        }

        showLoading (tips: string) {
            this.$store.commit(LOADING, { tips })
            this.$nextTick(() => this.refs.loading.show())
        }

        hideLoading () {
            this.refs.loading.hide()
        }

        showSelect (tips: string) {
            this.$nextTick(() => this.refs.select.show())
        }

        hideSelect () {
            this.refs.select.hide()
        }

        selectChange (item: SelectItem) {
            this.$store.commit(SELECT, {
                curSelect: { ...item }
            })
        }

        showToast (content: string, autoCloseTime: number) {
            this.$store.commit(TOAST, { content, autoCloseTime })
            this.$nextTick(() => this.refs.toast.show())
        }
    }
</script>

<style lang="scss">
    .global-components {
    }
</style>