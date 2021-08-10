import Vue from "vue";
import Radio from "@/components/radio/index.vue";
import TabBar from "@/components/tab-bar/index.vue";
import Select from "@/components/select/index.vue";
import Checkbox from "@/components/checkbox/index.vue";
import ConfirmDialog from "@/components/confirm-dialog/index.vue";
import AlertDialog from "@/components/alert-dialog/index.vue";
import StarRating from "@/components/star-rating/index.vue";
import SwipeLeftDelete from "@/components/swipe-left-delete/index.vue";
import SwitchBtn from "@/components/switch-btn/index.vue";
import Toast from "@/components/toast/index.vue";
import Loading from "@/components/loading/index.vue";
import TextScrollMulti from "@/components/text-scroll/multi-line.vue";
import TextScrollSingle from "@/components/text-scroll/single-line.vue";

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
  TextScrollMulti,
  TextScrollSingle,
];

export class MyComponents {
  static install() {
    components.forEach((component) => {
      Vue.component(component.componentName, component);
    });
  }
}
