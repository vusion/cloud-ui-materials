<template>
  <div
    class="sprite-animation"
    :style="{
      backgroundImage: 'url(' + imageUrl + ')',
      height: frameHeight + 'px',
      width: imageWidth + 'px',
    }"
  ></div>
</template>

<script>
export default {
  name: "sprite-animation",
  data() {
    return {
      animationInterval: null,
      currentPosition: 0,
    };
  },
  props: {
    imageWidth: {
      type: Number,
      default: 100,
    },
    frameHeight: {
      type: Number,
      default: 100,
    },
    imageUrl: {
      type: String,
      default:
        "https://utest.21kunpeng.com/public/img/press_sprite.427439e3.png",
    },
    totalFrames: {
      type: Number,
      default: 30,
    },
    animationSpeed: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    startAnimation() {
      this.animationInterval = setInterval(() => {
        this.currentPosition -= this.frameHeight;
        if (this.currentPosition < -this.frameHeight * (this.totalFrames - 1)) {
          clearInterval(this.animationInterval); // 停止动画
        } else {
          this.$el.style.backgroundPosition = `0px ${this.currentPosition}px`;
        }
      }, this.animationSpeed);
    },
    resetAnimationState() {
      clearInterval(this.animationInterval);
      this.currentPosition = -this.frameHeight * (this.totalFrames - 1); // 设置到最后一帧
      this.$el.style.backgroundPosition = `0px ${this.currentPosition}px`;

      let reverseAnimationInterval = setInterval(() => {
        this.currentPosition += this.frameHeight;
        if (this.currentPosition >= 0) {
          clearInterval(reverseAnimationInterval);
          this.currentPosition = 0; // 恢复初始状态
        }
        this.$el.style.backgroundPosition = `0px ${this.currentPosition}px`;
      }, this.animationSpeed);
    },
  },
  beforeDestroy() {
    clearInterval(this.animationInterval);
  },
};
</script>

<style scoped>
.sprite-animation {
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100%;
}
</style>
