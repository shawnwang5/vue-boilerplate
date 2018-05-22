<template>
    <div class="page index--select-date">
        <div class="page-content">
            <div class="form">
                <div class="search form-group">
                    <div class="input-wrapper">
                        <input class="form-control" type="text" title="input" v-model="formData.channel"
                               placeholder="请输入渠道码">
                        <i class="icon clear" @click="onClearBtnClick"></i>
                    </div>
                    <button class="search btn" @click="search()">搜索</button>
                </div>
                <div class="space-between form-group datepicker">
                    <span class="label">开始日期</span>
                    <mu-date-input v-model="formData.startDate" container="dialog" label=""
                                   :label-float="true" @change="dateChange"></mu-date-input>
                </div>
                <div class="space-between form-group datepicker">
                    <span class="label">结束日期</span>
                    <mu-date-input v-model="formData.endDate" container="dialog" label=""
                                   @change="dateChange"></mu-date-input>
                </div>
                <div class="space-between form-group">
                    <span class="label">类型</span>
                    <p @click="onCardTypeClick()">{{ formData.cardType.text }}<i class="icon arrow"></i></p>
                </div>
            </div>
        </div>
        <my-select ref="cardTypeSelect" @change="onCardTypeChange($event)" initText="全部"
                   :dataList="cardTypeList"></my-select>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { LoadingUtils } from '../../../utils/loading'
    import { debounce } from 'throttle-debounce'
    import { ToastUtils } from '../../../utils/toast'

    const moment = require('moment')

    @Component({})
    export default class MyComponent extends Vue {
        formData: any = {
            channel: '',
            startDate: new Date().toISOString().replace(/\d{2}T/, '01T'),
            endDate: new Date().toISOString(),
            cardType: { text: '全部', value: '0' },
        }
        search: Function = () => {
        }
        cardTypeList: { text: string, value: string }[] = [
            { text: '全部', value: '0' },
            { text: '类型1', value: '1' },
            { text: '类型2', value: '2' },
        ]

        get refs (): any {
            return this.$refs
        }

        get query (): any {
            return this.$route.query
        }

        mounted () {
            this.search = debounce(300, this._search)
        }

        onDatePickerShow () {
        }

        onDatePickerHide () {
        }

        onCardTypeChange ($event: any) {
            this.refs.cardTypeSelect.hide()
            this.formData.cardType = { ...$event }
        }

        _search () {
            if (this.validate()) {
            }
        }

        validate () {
            if (!this.formData.channel) {
                ToastUtils.show('请输入渠道码')
                return false
            }
            return true
        }

        onClearBtnClick () {
            this.formData.channel = ''
        }

        onCardTypeClick () {
            this.refs.cardTypeSelect.show()
        }

        showLoading () {
            LoadingUtils.show()
            setTimeout(() => LoadingUtils.hide(), 1000)
        }

        dateChange () {
            const formData = {
                startDate: moment(this.formData.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.formData.endDate).format('YYYY-MM-DD'),
            }
            console.log(JSON.stringify(formData))
        }
    }
</script>

<style lang="scss">
    .page.index--select-date {
        .datepicker {
            .mu-input {
                min-height: auto;
                width: 100%;
                margin: 0;
                padding: 0;

                input {
                    text-align: right;
                    height: 0.4rem;
                    line-height: 0.4rem;
                }
            }

            .mu-input-line, .mu-input-focus-line {
                background-color: transparent;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .page {
        height: 100%;
        display: flex;
        flex-direction: column;

        & > .page-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: auto;

            & > .form {
                & > .search.form-group {
                    display: flex;
                    padding: 0.16rem;
                    line-height: 0.6rem;

                    & > .input-wrapper {
                        flex: 1;
                        position: relative;

                        & > .form-control {
                            vertical-align: top;
                            width: 100%;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            border: 0.02rem solid #E6E6EA;
                            border-radius: 0.1rem;
                            text-indent: 0.55rem;
                            text-align: left;
                            background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAAqpJREFUSA21lc9uElEUxssAC0Jc1pAmdqHdGFzyAmg0BopSn6ErNURio49gLKZL44IXcKEl8qchxnZrE5bVnUnjAiE8AKHyx983zpDJzB0LCd5kuPee833nu+f+OUTWDK3T6cR7vV5xNpsVcWfoN+hnkUjkF32HvpZKpWqZTOa3gR4wRfyWRqPxiKAVvut+n3eO0A/me4VCoea1m8aWaySohUBlOp1+kABBzviexWKx9BWnaWxZVhnONzA3+A7r9fprcd04pn6eiSOwB+iCr8wK3yEyNZEUFPxjfAeM4+D2wb80YWWzRbRFyoD5BSu9v729fRJG8NrJ4g7zI0doJ2zrLB0yoIpDLi8qIDxBv5DFc40VQ7E09jer3+/vALDPQFvkB1w2z+fzb8F859vqdrsPTHiLbXroOKphZ2AiujY4E8ZVZ64rH2i6FRlZo9Ho54B3QQPnaHMRtGP5aRZbpYe2lkgkfvqdi84Rcbl2LD/vn/fbDw6bx+Nx+5ay4PmT8GItUuzKMBwON72OZcaj0eia8MTqmXjKpCMHF+CeCbCIjQxsLv2pCa9M7NqDyC6gpbcPTpTAuwrO2XwyiqiaIqRil3ZKhQkXaoPzBKGbAM55Mx9NQMsp16pZagdOqfg7u+S32WzeBfJGMBZa4tObCTR7e1RzAOyzIpWFI4SeOtsQIMggH5gSW9wUB+6Ad/bVCMY4v3KAVVlf0b9wwCoVVT009x0QdBO/Dlnnpy1SBgPG6/RnCN3O5XID2b1tLuIaWaH+EVUwt1xbSH9O4JIyGI/HqtrpMKGAiAKqmjrFrghRpWIDYYaRHv2pblEymTzMZrNj4dvt9lXeyjFDo5BRRMRlW6vVWp9MJscs4pY/o5WJaFFhQisVCRNauYgr5LkMJ/9FxBXijN5zPqU/L/lSLaHMnrAAAAAASUVORK5CYII=') 0.15rem center / 0.25rem no-repeat;
                        }

                        & > .icon.clear {
                            position: absolute;
                            top: 0.15rem;
                            right: 0.15rem;
                            width: 0.3rem;
                            height: 0.3rem;
                            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAA7xJREFUSA3FV0tPE1EUPnPbJjxEBORNIUIkRmFFovGBUsqj7kzUEBd170IT42/QnTHxH0AXSsQEd7zaEjUYHyxEo5GFBitPRUHkIbQznu/WGdrSgamCnqS9Z+4993xz7nncMwpZIE3ThM9375hK6hkWr1OISnjEDzSh8Y/HYUGi2+s9P6QoiipXNvljHeYUDAbTQqGZKxqp1zSNCswl11cUhWYUEjedzoLbLpdrZX0lnjMF9vk6z0ZU7RaR5ozfYvVJCdmEctXrbbufbIdInORjVdrbO69HVLXrz0GhVXNCB3RBZyJO3AQEOnydd3hsSxT8m2f2eedFb9sFHjkcomTTGYyVlQeva6Rdip3bJr5m5OUbR3d3V0DXZ1gc9SmOd+fIJsQ53efSx4jeaCDtHCg0AwNY4CUwUsYskHL2ZFN9/VHaw+NWJISgAwf2E/YkJ80ZxWJgDiSBPE0uSFRYVECV+yqotcVF2dm7zcQIoC7XCTpyuI5qag+aykVrgiZsVVWHjjP4ZTPJr1/nKC8vh3Jzc6i8vIxCoXFaXV2NE7fZbNTkPkmlJcW0srJCQ0+e8/gzTibmIfPVyNsB8bsMxszHs6qqUjD4mCYnpygjI11anpmZaQjZ7XZqbmqg4uIiWlpapp7eAM3NzRvryRhgwsd1yRZj5wDuDzyi6enPBFAce0Z6OjkcDmphvrAwnxYXFxnUT/Pz32O3mvF1SnvH3Xd81NVmErHzsA5A+XvzJEA4HJFuWFj4Qb19QQkeK2/GcyEZhcX6LWMmZ8yHw2Hq7x+k2dlvMtDge1jY0+O3DPpbWYlMJ0OzBcbBVtvt6wUPVq/xC6VCfNNpAMZdaongX4/HLa2F1bAWVjc3N/DL2C3pgBBfnZOcw9aAs7J20WlPI2H8/GWWfRqgPvYr/AufN7lPEdLKCgETFg9vJYzC4Wl1y4hGZANwbW2NlpaXjaBCZLsb62Uh2UqfoikvuN6I7s0EUSo9rY0yh5HL/QODhCDTCWmEiEYOI5dRvVDFNiOO6gci2iPRjJlgLZe/tLQ0+jQ+QQP+hxSJRDaI4rj7+oOyapWVllB1ddUGGX0CrREwBaOr6JH0hcTx9as39PTZsKxeKCRmhECD5e8/jNH0lKkdBKwoJmvCVTX2cXrU7IYyA0t9XglVlBdWowmUzgCDxix1RantAIbeeRpRgM6Aj+FGaqqsS0O33n1gl9H64IFr9j9r9gyL5VtwFyi7wW20HJYmdpgSC3/JaKcb+rijTnyB//IJE/sS6Mu2+6PtFzpGqlD2G9T5AAAAAElFTkSuQmCC') center / 100% 100% no-repeat;
                        }
                    }

                    & > .search.btn {
                        line-height: 0.6rem;
                        flex: 0 0 0.9rem;
                        font-size: 0.24rem;
                        background-color: transparent;
                        color: #E94822;
                    }
                }

                & > .space-between.form-group {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.16rem 0;
                    margin: 0 0.3rem;
                    line-height: 0.6rem;
                    border-bottom: 0.02rem solid rgba(0, 0, 0, 0.12);

                    & > .label {
                        text-align: left;
                        flex: 0 0 1.5rem;
                    }

                    & > p {
                        line-height: 0.48rem;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        flex: 1;

                        i.icon.arrow {
                            margin-left: 0.2rem;
                        }
                    }
                }
            }
        }
    }
</style>
