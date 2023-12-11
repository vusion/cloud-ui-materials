<template>
  <div></div>
</template>

<script>
import WaterMark from "wybie-watermark";
let waterMark;
export default {
  name: "watermark",
  props: {
    opacity: {
      type: Number,
      default: 0.1,
    },
    src: {
      type: String,
      default: "",
    },
  },
  beforeDestroy() {
    waterMark.remove();
  },
  computed: {
    config() {
      return {
        src: this.src,
        opacity: this.opacity,
      };
    },
  },
  watch: {
    config: {
      handler(config) {
        if (config.src) {
          waterMark && waterMark.remove();
          this.$nextTick(async () => {
            waterMark = await WaterMark.init({
              target: document.body,
              image: config.src,
              cSpace: 100,
              vSpace: 100,
              style: {
                opacity: config.opacity,
              },
            });
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style></style>
