<template>
  <span class="rating" :rating="rating" :size="size">
      <i class="star" :style="{ width: starWidth + 'px'}">
          <img v-for="n in 5" :key="n" :style="{ width: size + 'px' }"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABGdBTUEAALGPC/xhBQAAAg5JREFUSA3NVs1KW0EU/o4EoWjprkJXil5DheDCRX2IPkXbvS4aXSgESrtpFo1boaWP0MeoC8FFN9GohVJLsxNiCzHJ9DuTCPcmZ5K5gYIDh5x75vuZvzs3wH1t7gwvGC//6/jcOUruFD0fzPOYzeQBo4tdOIgPzXM0icW6SyyijTPiCwNOB7NIZAnfYzTiZ9RGOWWi2gUav44xUUzUjFwDj9HjyB0eZIQFfzGDRVlBM1M3HuJm5LA1YqJiaqx9ES04I56wR+igyBFvcDZVas0F9G6IKRNzzMWsyzKuLZw3chcUvMVzEoocYZFA/V2wCBNrgt/E1LkpdZrXqflFEpz3jU5xQuH1iSLTAATfZBWl/h4JPk+jEcURfFKcN+LUaswqUcQ8IGpS+4NSMoeBV8tbLuFeHq0gVvCOS7Z/158x0iLN3tNMX87pm6BKk520wIiRdtKsRrOo9yMt5nPBAU22h+umkYJo9pVmz4YJY58FRzTZtDDjboYLizChFuSMM3o6QdTqDnJMI+f8sdcbIm8rDrgjPNMIDSxxf7I39QjVKChHuUazjRyCS8A3r+HDEPOlANc2AtYMnSsu6CskvHA1NAeuDJzF9XthYDNGLaIqeMjPdoKPIuj5YK413we0UiI5jBx+cXm6jEPo/4IEb+QJ/qTEfKo17VOMx/Y5P4dxwWeeHHE/8h8G18R8SPQfDo2DhD5ncGIAAAAASUVORK5CYII=">
      </i>
      <i class="base">
          <img v-for="n in 5" :key="n" :style="{ width: size + 'px' }"
               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAWlBMVEUAAAD47NTz6tH////06ND06dH06dH06dHz6dH06tH16dD06dH079P/+eH06dL16tH06NHz6dH06dH06dDz6dD06dH06dL16dH169D27NX06NL/7t316tDz6NCO4WH9AAAAHXRSTlMAIoUC9tHFpZqSfnIXColj9PPo5dugdmlMNi0PYvx+HZcAAACpSURBVCjPjZFJEoQgDEVVEBGc56Fz/2u2NF0QU7HKtyHkLQj5yUs+7ZM5AI4HVQAUvEnhImVV6VTJmUo6JStGZfAjo/1zXzuvunU/w+tWqwFuDEpbN08OLPmlLK9scmE4Y8JsETJnQ02DFxGhK1HYKLL0AF1/Tr4UERIrKWhUHhra5lvT5M8NqcU1xlaIdnTVgtQM0JvaVbXpAWakGtBVSFvf4hR1gvhfvnAvH1WiSqxcAAAAAElFTkSuQmCC">
      </i>
  </span>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    @Component({})
    export default class StarRating extends Vue {
        static componentName = 'my-star-rating'

        @Prop() rating!: string

        size: string = '14'

        get starWidth (): string {
            return (parseFloat(this.rating) * (parseInt(this.size) + 2)).toString()
        }

        mounted () {
        }

    }
</script>

<style scoped lang="scss">
    .rating {
        position: relative;

        & > .star {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            overflow: hidden;

            & > img {
                width: 0.28rem;
                margin: 0 0.02rem;
            }
        }

        & > .base {
            display: flex;
            align-items: center;

            & > img {
                width: 0.28rem;
                margin: 0 0.02rem;
            }
        }
    }

</style>
