<template>
    <div class="radio" :class="[ checked ? 'selected' : '', radioStyleType ]">
        <input title="radio" type="radio" :id="radioId" :name="radioName" :value="radioValue" :checked="checked"
               @change="onRadioChange()">
        <label :for="radioId"><i class="icon" :class="[ radioStyleType ]"></i>{{ radioLabel }}</label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class Radio extends Vue {
        static componentName = 'my-radio'

        @Prop() radioStyleType!: string
        @Prop() radioId!: string
        @Prop() radioName!: string
        @Prop() radioLabel!: string
        @Prop() radioValue!: string
        @Prop() radioData!: any
        @Prop() checked!: boolean

        mounted () {
        }

        onRadioChange () {
            this.$emit('change', {
                value: this.radioValue,
                radioData: this.radioData,
            })
        }
    }
</script>

<style lang="scss" scoped>
    .radio {
        display: inline-block;
        vertical-align: top;

        & + .radio {
            margin-left: 0.2rem;
        }

        &.circle {
            label > .icon.circle {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
                border-radius: 0.36rem;
                position: relative;
                box-sizing: border-box;
                vertical-align: top;
                margin-right: 0.2rem;
                background: url('../../assets/images/common-icon/icon_radio.png') center / 100% 100% no-repeat;

                &::after {
                    border: none;
                    width: 0;
                }
            }
        }

        label {
            font-size: 0.32rem;
            display: flex;
            align-items: center;
            cursor: pointer;

            & > .icon {
                width: 0.4rem;
                height: 0.4rem;
                display: inline-block;
                vertical-align: top;
                position: relative;
                border: 0.02rem solid #cccccc;
                border-radius: 0.08rem;
                cursor: pointer;
                box-sizing: border-box;
                margin-right: 0.18rem;

                &::after {
                    content: '';
                    width: 0.18rem;
                    height: 0.1rem;
                    position: absolute;
                    top: 0.06rem;
                    left: 0.06rem;
                    border: 0.06rem solid transparent;
                    border-top: none;
                    border-right: none;
                    background: transparent;
                    opacity: 1;
                    transform: rotate(-45deg);
                }
            }
        }

        input[type=radio] {
            display: none;

            &:checked + label {
                & > .icon {
                    background-color: #3399cc;
                    border-color: #3399cc;

                    &::after {
                        border-left-color: #FFF;
                        border-bottom-color: #FFF;
                    }
                }

                & > .icon.circle {
                    background: transparent url('../../assets/images/common-icon/icon_radio_checked.png') center / 100% 100% no-repeat;
                    border: none;

                    &::before, &::after {
                        width: 0;
                        border: none;
                    }
                }
            }
        }
    }
</style>