<template>
    <div class="page">
        <div class="form">
            <div class="form-group">
                <span class="form-label">姓名</span>
                <input class="form-control" type="text" title="input" maxlength="10" v-model="formData.name"
                       placeholder="请输入您的姓名">
            </div>
            <div class="form-group">
                <span class="form-label">手机号</span>
                <input class="form-control" type="tel" title="input" v-model="formData.phoneNo" placeholder="请输入您的手机号"
                       maxlength="11">
            </div>
            <div class="form-group">
                <span class="form-label">性别</span>
                <div class="input-wrapper gender">
                    <my-radio @change="onGenderRadioChange($event)" radioStyleType="circle"
                              radioId="gender1" radioName="gender" radioLabel="男"
                              radioValue="男" :checked="true"></my-radio>
                    <my-radio @change="onGenderRadioChange($event)" radioStyleType="circle"
                              radioId="gender2" radioName="gender" radioLabel="女"
                              radioValue="女" :checked="false"></my-radio>
                </div>
            </div>
        </div>
        <div class="btn-container">
            <button class="btn submit" @click="onSubmit()">{{ submitBtnTxt }}</button>
            <button class="btn submit" @click="showLoading()">显示Loading</button>
            <button class="btn submit" @click="gotoSelectDate()">日期选择</button>
            <button class="btn submit" @click="showGetCodeDialog()">显示弹出框</button>
        </div>
        <get-code-dialog ref="getCodeDialog"></get-code-dialog>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { ValidatorUtils } from '../../../../utils/validator'
    import { LoadingUtils } from '../../../../utils/loading'
    import { ToastUtils } from '../../../../utils/toast'
    import GetCodeDialog from './get-code.dialog.vue'
    import { State } from 'vuex-class'
    import { AppState } from '../../../../store/modules/app'

    @Component({
        components: {
            'get-code-dialog': GetCodeDialog,
        }
    })
    export default class IndexPage extends Vue {

        isSubmitting = false
        formData: any = {
            name: '',
            phoneNo: '',
            gender: 2,
        }

        get refs (): any {
            return this.$refs
        }

        get query (): any {
            return this.$route.query
        }

        get submitBtnTxt () {
            return this.isSubmitting ? '正在提交，请稍候......' : '提交'
        }

        mounted () {
        }

        onGenderRadioChange ($event: any) {
            this.formData.gender = $event.value
        }

        onSubmit () {
            if (this.validate()) {
                this.submit()
            }
        }

        validate () {
            if (!this.formData.name) {
                ToastUtils.show('请输入您的姓名')
                return false
            }
            if (!ValidatorUtils.isPhone(this.formData.phoneNo)) {
                ToastUtils.show('请输入正确的手机号')
                return false
            }
            return true
        }

        submit () {
            this.isSubmitting = true
            setTimeout(() => {
                this.isSubmitting = false
                ToastUtils.show('已提交')
            }, 2000)
        }

        showLoading () {
            LoadingUtils.show('一秒后关闭...')
            setTimeout(() => LoadingUtils.hide(), 1000)
        }

        gotoSelectDate () {
            this.$router.push('/index/index/selectDate')
        }

        showGetCodeDialog (): void {
            this.refs.getCodeDialog.show()
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;

        & > .form {
            font-size: 0.32rem;
            padding: 0 0.4rem;

            & > .form-group {
                display: flex;
                padding: 0.3rem 0;
                border-bottom: 0.02rem solid #e4dbdb;

                & > .form-label {
                    text-align: left;
                }

                .form-control {
                    font-size: 0.32rem;
                    flex: 1;
                    text-align: right;
                }

                .input-wrapper {
                    flex: 1;

                    &.gender {
                        display: flex;
                        justify-content: flex-end;

                        .radio.circle label > .icon.circle {

                        }

                        .radio input[type=radio]:checked + label > .icon.circle {

                        }
                    }
                }
            }
        }

        & > .btn-container {
            flex: 0 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 0.4rem;

            & > .btn {
                color: #FFF;
                margin-top: 0.4rem;
                flex: 0 0 0.88rem;

                &.submit {
                    color: #FFF;
                }
            }
        }
    }
</style>