<template>
  <div class="component my-text-scroll-multi">
    <div
      class="wrapper"
      :class="[direction, isPaused ? 'paused' : 'running']"
      :style="{ 'animation-duration': animationDuration }"
    >
      <template v-for="i in dataList">
        <div v-html="i" :key="i"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({})
export default class AlertDialog extends Vue {
  static componentName = "my-text-scroll-multi";

  @Prop() direction!: string;
  // [ 'text1', 'text2' ]
  @Prop() dataList!: any[];
  @Prop() speed!: number;
  @Prop() isPaused!: boolean;

  directionMap: any = {
    up: "up",
  };

  get animationDuration() {
    return this.dataList.length * (this.speed || 2) + "s";
  }

  mounted() {
    if (!this.directionMap[this.direction]) {
      throw new Error("direction is null or undefined");
    }
  }
}
</script>
<style lang="scss">
.component.my-text-scroll-multi {
  $lineHeight: 22px;

  font-size: 14px;
  overflow: hidden;
  line-height: $lineHeight;
  overflow: hidden;

  .paused {
    animation-play-state: paused;
  }
  .running {
    animation-play-state: running;
  }

  .up {
    animation: 2s up-multi infinite linear;
  }

  @keyframes up-multi {
    0% {
      transform: translateY(0);
    }
    49.99% {
      transform: translateY(-90%);
    }
    50% {
      transform: translateY(99%);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
