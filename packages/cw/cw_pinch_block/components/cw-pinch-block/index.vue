<template>
  <v-scaler :max-scale="maxScale" :min-scale="minScale"
    :aspect-ratio="aspectRatio"
    vusion-slot-name="default"
    ref="pinchBlock"
    :class="$style.pinchBlock" :disabledZoom="$env.VUE_APP_DESIGNER">
    <slot></slot>
    <div v-if="!$slots.default" style="color:#ccccccd0;padding: 5px;">
      请将需要缩放的容器拖入这块区域
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
      aspectRatio: 1
    }
  },
  mounted() {
    this.initAspectRatio()
  },
  methods: {
    initAspectRatio() {
      const containerHeight = this.$refs.pinchBlock.clientHeight;
      const containerWidth = this.$refs.pinchBlock.clientWidth;
      
      this.aspectRatio = containerWidth / containerHeight
    }
  }
}
</script>
<style module>
.pinchBlock {
  width: 300px;
  height: 200px;
  position: relative;
}
</style>