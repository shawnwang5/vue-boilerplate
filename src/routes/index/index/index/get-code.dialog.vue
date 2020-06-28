<template>
    <div class="component" :class="{ hidden: !isShow }">
        <div class="layer-shade"></div>
        <div class="layer">
            <div class="title">填写手机号</div>
            <div class="content">
                <div class="form-group">
                    <input
                        class="form-control"
                        @blur="inputBlur()"
                        @input="clearErrorText()"
                        v-model="formData.phone"
                        type="text"
                        title="input"
                        placeholder="请输入手机号"
                        maxlength="11"
                    />
                </div>
                <div class="form-group msg-code">
                    <input
                        class="form-control"
                        @blur="inputBlur()"
                        @input="clearErrorText()"
                        v-model="formData.msgCode"
                        type="text"
                        title="input"
                        placeholder="请输入短信验证码"
                        maxlength="6"
                    />
                    <button
                        class="get-msg-code btn"
                        :class="{ disable: msgCodeBtnDisable }"
                        @click="getMsgCode()"
                    >
                        {{
                        msgCodeBtnText }}
                    </button>
                </div>
                <p class="text-error" v-show="formData.errorText">{{ formData.errorText }}</p>
            </div>
            <footer>
                <button
                    class="btn primary"
                    :class="{ disable: isSubmitting }"
                    @click="okBtnClick()"
                >
                    {{ submitBtnText
                    }}
                </button>
                <button class="btn close" @click="hide()"></button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { ValidatorUtils } from '@/utils/validator'
import ParentVue from '@/routes/mixins/parent.ts'

@Component({})
export default class GetCodeDialog extends mixins(ParentVue) {
    isShow = false
    isSubmitting = false
    formData: any = {
        phone: '',
        msgCode: '',
        errorText: '',
    }
    defaultCountDownNo = 60
    msgCodeCountDown = {
        countdownNo: this.defaultCountDownNo,
        countdownTimer: -1,
    }

    get msgCodeBtnDisable(): boolean {
        return this.msgCodeBtnText !== '获取验证码'
    }

    get msgCodeBtnText(): string {
        const countdownNo = this.msgCodeCountDown.countdownNo
        return countdownNo === this.defaultCountDownNo
            ? '获取验证码'
            : countdownNo + ' s'
    }

    get submitBtnText(): string {
        return this.isSubmitting ? '请稍候......' : '确定'
    }

    async mounted() {}

    show() {
        this.isShow = true
    }

    hide() {
        this.isShow = false
        this.clearState()
    }

    clearState() {
        this.isSubmitting = false
        this.clearCountdownTimer()
        this.formData = {
            phone: '',
            msgCode: '',
            errorText: '',
        }
    }

    inputBlur() {
        document.body.scrollTop = 0
    }

    clearErrorText() {
        this.formData.errorText = ''
    }

    startCountdownTimer() {
        --this.msgCodeCountDown.countdownNo
        this.msgCodeCountDown.countdownTimer = window.setInterval(() => {
            --this.msgCodeCountDown.countdownNo
            if (this.msgCodeCountDown.countdownNo === 0) {
                this.clearCountdownTimer()
            }
        }, 1000)
    }

    clearCountdownTimer() {
        this.msgCodeCountDown.countdownNo = this.defaultCountDownNo
        window.clearInterval(this.msgCodeCountDown.countdownTimer)
    }

    getMsgCode() {
        if (this.msgCodeBtnDisable) {
            return
        }
        if (!ValidatorUtils.isPhone(this.formData.phone)) {
            this.formData.errorText = '请输入正确的手机号'
            return
        }
        this.startCountdownTimer()
    }

    okBtnClick() {
        if (!ValidatorUtils.isPhone(this.formData.phone)) {
            this.formData.errorText = '请输入正确的手机号'
            return
        }
        if (this.formData.msgCode.trim().length === 0) {
            this.formData.errorText = '请输入验证码'
            return
        }
        this.isSubmitting = true
        setTimeout(() => (this.isSubmitting = false), 2000)
    }
}
</script>
<style scoped lang="scss">
.component {
    .layer-shade {
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
    }

    .layer {
        font-size: 16px;
        border-radius: 0.1rem;
        width: 80%;
        text-align: center;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        background-color: #fff;
        line-height: 0.44rem;

        & > .title {
            font-size: 0.4rem;
            position: relative;
            color: #2bb9e6;
            line-height: 0.6rem;
            padding: 0.4rem 0.16rem;

            & > .icon.close {
                position: absolute;
                top: 0.2rem;
                right: 0.2rem;
                width: 0.25rem;
                height: 0.25rem;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAANNJREFUSA21losNgzAMBaNOAftPUJagG9Bt0vdK3FIrDXYcIln5yLmDYAEp57wgHog5DWpkFeY9YbAi2J6IsISMwkKXVwomxMYZWkiC/Uc4mdP7UDhAhCR/4XLsEckpPCIxw3skbrhH0g1vSPaKQEIYriQsXTb2rLZ6Kcomb1+gR4mMv3Xuhep8JcF0vxudV5vfaouGtWzIsaWoq+fxyBGx/zx4G01lFfjPKwRrYx5yDS7+sKQFD0ss8G6JB+6W9MDNkgj8VDIC3pRAcPlH/8rfluUF6HDwqQDDZ6EAAAAASUVORK5CYII=)
                    center / 100% 100% no-repeat;
            }
        }

        & > .content {
            position: relative;
            padding: 0 0.48rem;

            .form-group {
                margin-bottom: 0.2rem;
                display: flex;
                align-items: center;

                &.msg-code {
                    border: 0.02rem solid #cccccc;

                    .form-control {
                        border: none;
                    }
                }

                .form-control {
                    font-size: 0.28rem;
                    flex: 1;
                    text-indent: 0.2rem;
                    width: 100%;
                    padding: 0.14rem 0;
                    line-height: 0.6rem;
                    border: 0.02rem solid #cccccc;
                    border-radius: 0.06rem;
                }

                .get-msg-code.btn {
                    flex: 0 0 2rem;
                    background-color: transparent;
                    color: #1a97ff;
                    font-size: 0.28rem;

                    &.disable {
                        color: #999999;
                    }
                }
            }

            .text-error {
                color: #f43531;
                font-size: 0.22rem;
            }
        }

        & > footer {
            padding: 0.2rem 0.48rem 0.5rem;
            display: flex;
            position: relative;

            .btn.primary {
                flex: 1;
                background: #2bb9e6;
                border-radius: 1rem;
                font-size: 0.36rem;
                color: #ffffff;

                &.disable {
                    background-color: #999;
                }
            }

            .btn.close {
                transform: translateX(-50%);
                position: absolute;
                top: 2.1rem;
                left: 50%;
                width: 0.6rem;
                height: 0.6rem;
                background: transparent
                    url('../../../../assets/images/common-icon/close.png')
                    center / 100% 100% no-repeat;
            }
        }
    }
}
</style>
