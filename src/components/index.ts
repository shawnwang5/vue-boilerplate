import Vue from 'vue'
import Radio from './radio/index.vue'
import TabBar from './tab-bar/index.vue'
import Select from './select/index.vue'
import Checkbox from './checkbox/index.vue'
import ConfirmDialog from './confirm-dialog/index.vue'
import AlertDialog from './alert-dialog/index.vue'
import StarRating from './star-rating/index.vue'
import SwipeLeftDelete from './swipe-left-delete/index.vue'
import SwitchBtn from './switch-btn/index.vue'
import Toast from './toast/index.vue'
import Loading from './loading/index.vue'

const components: any[] = [
    Radio,
    Checkbox,
    Select,
    AlertDialog,
    ConfirmDialog,
    StarRating,
    SwipeLeftDelete,
    Toast,
    TabBar,
    SwitchBtn,
    Loading,
]

export class MyComponents {
    static install () {
        components.forEach(component => {
            Vue.component(component.componentName, component)
        })
    }
}
