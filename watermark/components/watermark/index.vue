<template>
  <div></div>
</template>

<script>
import WaterMark from "wybie-watermark";
let waterMark;
export default {
  name: "watermark",
  props: {
    type: {
      type: String,
      default: "image",
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#000",
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    cSpace: {
      type: Number,
      default: 20,
    },
    vSpace: {
      type: Number,
      default: 50,
    },
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
        type: this.type,
        src: this.src,
        opacity: this.opacity,
        text: this.text,
        color: this.color,
        fontSize: this.fontSize,
        cSpace: this.cSpace,
        vSpace: this.vSpace,
      };
    },
  },
  watch: {
    config: {
      handler(config) {
        this.$nextTick(async () => {
          waterMark && waterMark.remove();
          const initConfig = Object.assign(
            {
              target: document.body,
            },
            config.type === "text"
              ? {
                  cSpace: config.cSpace,
                  vSpace: config.vSpace,
                  text: config.text,
                  color: config.color,
                  fontSize: config.fontSize,
                  style: {
                    opacity: config.opacity,
                  },
                }
              : {
                  image: config.src,
                  style: {
                    opacity: config.opacity,
                  },
                }
          );
          waterMark = await WaterMark.init(initConfig);
        });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style></style>
