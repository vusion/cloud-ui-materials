<template>
  <div class="lottie-container">
    <div v-if="!hideLottie && interSected">
      <lottie
        ref="lottie"
        @hook:mounted="lottieMounded"
        :options="lottieOptions"
      />
    </div>
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
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      interSected: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nextTick(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.interSected = true;
                observer.disconnect();
              }
            });
          },
          { threshold: 0.01 }
        ); // 设置交叉比例为1%
        observer.observe(this.$el); // 开始观察每一个元素
      });
    });
  },
  computed: {
    lottieOptions() {
      return {
        animationData: this.animationData, // 传入解析后的动画数据
        loop: true, // 是否循环播放
        autoplay: false, //this.autoplay, // 是否自动播放
      };
    },
    hideLottie() {
      return (
        Object.keys(this.animationData).length === 0 ||
        (this.animationData.assets && this.animationData.assets.length === 0)
      );
    },
  },
  methods: {
    lottieMounded() {
      this.$refs.lottie.anim.onLoopComplete = this.handleAnimationComplete;
      this.$nextTick(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                var styles = window.getComputedStyle(entry.target);
                var display = styles.getPropertyValue("display");
                var visibility = styles.getPropertyValue("visibility");
                var opacity = styles.getPropertyValue("opacity");

                if (
                  display !== "none" &&
                  visibility !== "hidden" &&
                  opacity > 0
                ) {
                  this.lottiePlay();
                } else {
                  this.lottiePause();
                }
              } else {
                // 元素离开视窗
                this.lottiePause();
              }
            });
          },
          { threshold: 0.01 }
        ); // 设置交叉比例为1%
        observer.observe(this.$el); // 开始观察每一个元素
        this.$on("hook:beforeDestroy", () => {
          observer.disconnect();
        });
      });
    },
    lottiePlay() {
      this.$refs.lottie.anim.play();
    },
    lottieStop() {
      this.$refs.lottie.anim.stop();
    },
    lottiePause() {
      this.$refs.lottie.anim.pause();
    },
    handleAnimationComplete() {
      this.$emit("handleAnimationComplete");
    },
    hasAncestorWithOpacityZero(element) {
      if (!element) {
        return false;
      }

      var parentElement = element.parentElement;
      if (!parentElement) {
        return false;
      }

      var opacity = window
        .getComputedStyle(parentElement)
        .getPropertyValue("opacity");
      if (opacity === "0") {
        return true;
      } else {
        return hasAncestorWithOpacityZero(parentElement);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lottie-container {
  div {
    border-radius: inherit;
  }
}
</style>
