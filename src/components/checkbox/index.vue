<template>
    <div class="component checkbox">
        <input title="checkbox" v-model="checked" :id="checkboxId" type="checkbox" @change="onCheckboxChange($event)"/>
        <label :for="checkboxId"><i class="icon"></i>{{ checkboxLabel }}</label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class Checkbox extends Vue {
        static componentName = 'my-checkbox'

        @Prop() checkboxId!: string
        @Prop() checkboxLabel!: string
        @Prop() checkboxData!: any
        @Prop() initChecked!: boolean

        checked = false

        mounted () {
            this.checked = this.initChecked
        }

        onCheckboxChange ($event: any) {
            $event.preventDefault()
            $event.stopPropagation()
            this.$emit('change', {
                checked: $event.target.checked,
                data: this.checkboxData,
            })
        }
    }
</script>

<style lang="scss" scoped>
    .component.checkbox {
        display: flex;
        font-size: 0.32rem;

        label {
            cursor: pointer;
            flex: 1;
            display: flex;
            align-items: center;
            text-align: left;

            & > i.icon {
                flex: 0 0 0.4rem;
                height: 0.4rem;
                display: inline-block;
                vertical-align: text-bottom;
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

        input[type=checkbox] {
            display: none;

            &:checked + label {
                & > i.icon {
                    background-color: #2BB9E6;
                    border-color: #2BB9E6;

                    &::after {
                        border-left-color: #FFF;
                        border-bottom-color: #FFF;
                    }
                }
            }
        }
    }
</style>