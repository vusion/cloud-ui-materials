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
  async mounted() {
    if (this.src) {
      waterMark = await WaterMark.init({
        target: document.body,
        image: this.src,
        cSpace: 100,
        vSpace: 100,
        style: {
          opacity: this.opacity,
        },
      });
      console.log("waterMark", waterMark);
      this.$on("hook:beforeDestroy", () => {
        waterMark.remove();
      });
    }
  },
};
</script>

<style></style>
