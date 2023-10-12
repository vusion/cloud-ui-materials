<template>
  <div
    :class="[$style.html2canvasRoom, $env.VUE_APP_DESIGNER && $style.border]"
  >
    <div ref="html2canvas" vusion-slot-name="default">
      <slot></slot>
      <div v-if="!$slots.default" style="padding:5px" @click="run">
        请将需要生成图片的内容拖入这块区域
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "cw-mk-img-view",
  props: {
    value: {
      type: String,
      default: "请在这里编写代码",
    },
  },
  methods: {
    async run() {
      const result = await html2canvas(this.$refs.html2canvas, {
        useCORS: true, //图片跨域
        allowTaint: false,
      });
      let img = result.toDataURL("image/png");
      // console.log(img);
      // this.$emit("update:value", img) // 传递给父组件
      // console.log(img);
      return img;
    },
  },
};
</script>

<style module>
.html2canvasRoom {
  min-height: 100px;
}
.border {
  border: 1px #ccc dashed;
}
</style>
