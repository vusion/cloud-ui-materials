<template>
  <div>
    <lottie :options="lottieOptions" />
  </div>
</template>

<script>
import Lottie from "vue-lottie";

export default {
  name: "animated-composition",
  components: {
    Lottie,
  },
  props: {
    animationData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    lottieOptions() {
      return {
        animationData: this.animationData, // 传入解析后的动画数据
        loop: true, // 是否循环播放
        autoplay: true, // 是否自动播放
      };
    },
  },
};
</script>

<style></style>
