<template>
    <div class="component switch-btn">
        <input @change="onSwitchBtnChange($event)" v-model="checked" title="switch"
               class="switch-input switch-input-light" :id="switchBtnId" type="checkbox">
        <label class="switch-input-btn" :for="switchBtnId"></label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class SwitchBtn extends Vue {
        static componentName = 'my-switch-btn'

        @Prop() switchBtnId!: string
        @Prop() initChecked!: boolean

        checked = false

        mounted () {
            this.checked = this.initChecked
        }

        onSwitchBtnChange (event: any) {
            this.$emit('change', event.target.checked)
        }
    }
</script>
<style scoped lang="scss">
    .component {
        .switch-input {
            display: none;

            + .switch-input-btn {
                outline: 0;
                display: block;
                width: 0.8rem;
                height: 0.44rem;
                position: relative;
                cursor: pointer;
                user-select: none;

                &:after,
                &:before {
                    position: relative;
                    display: block;
                    content: "";
                    width: 50%;
                    height: 100%;
                }

                &:after {
                    left: 0;
                }

                &:before {
                    display: none;
                }
            }

            &:checked + .switch-input-btn:after {
                left: 50%;
            }
        }

        .switch-input-light {
            + .switch-input-btn {
                background: #D5D5D5;
                border-radius: 2em;
                padding: 0.04rem;
                transition: all .4s ease;

                &:after {
                    border-radius: 50%;
                    background: #fff;
                    transition: all .2s ease;
                }
            }

            &:checked + .switch-input-btn {
                background: #FFD900;
            }
        }
    }
</style>
