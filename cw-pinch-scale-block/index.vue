<template>
  <v-scaler :max-scale="maxScale" :min-scale="minScale"
     :class="[$style.pinchBlock]" :disabledZoom="disabledZoom">
    <div ref="pinchBlock" vusion-slot-name="default">
      <slot></slot>
      <div v-if="!$slots.default" style="color:#ccccccd0;padding: 5px;">
        请将需要缩放的容器拖入这块区域
      </div>
    </div>
  </v-scaler>
</template>

<script>
import vScaler from './scale.vue';

export default {
  name: "cw-pinch-scale-block",
  components: { vScaler },
  props: {
    minScale: {
      type: Number,
      default: 1,
    },
    maxScale: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      disabledZoom: !this.$env.VUE_APP_DESIGNER,
    }
  },
}
</script>

<style module>
.pinchBlock {
  width: 100%;
  height: 100%;
  position: relative;
}

</style>