<template>
  <div
    :class="$style.root" 
    :style="rootStyle"
    vusion-slot-name="default">
    <slot></slot>
  </div>
</template>

<script>
  const verticalTypes = [null, 180, 0];
  const horizontalTypes = [-90, 90];

  export default {
    name: 'lcap-h5-horizontal-screen',
    data() {
      return {
        rootStyle: {
          width: '100%',
          height: '100%',
        },
      }
    },
    created() {
      if (this.$env.VUE_APP_DESIGNER) {
        
      } else {
        this.resize()
      }
    },
    mounted() {
      window.addEventListener('resize', this.resize, false);
      // 监听orientation变化
      if ("onorientationchange" in window) {
        window.addEventListener('orientationchange', this.resize, false);
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.resize, false);
      if ("onorientationchange" in window) {
        window.removeEventListener('orientationchange', this.resize, false);
      }
    },
    methods: {
      resize() {
        // 获取当前文档宽高
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        // 让body作为旋转节点是为了让 ‘消息提示’ 等组件正常展示
        const bodyDom = document.querySelector('body');

        //竖屏状态, 强制旋转
        if (verticalTypes.indexOf(window.orientation) !== -1) {
          bodyDom.style.width = `${height}px`
          bodyDom.style.height = `${width}px`
          bodyDom.style.transform = `rotate(${90}deg)`
          bodyDom.style.transformOrigin = `${width / 2}px ${width / 2}px`

          this.rootStyle = {
            width: `${height}px`,
            height: `${width}px`,
            overflowY: 'scroll',
          }
        } else if (horizontalTypes.indexOf(window.orientation) !== -1) {
          bodyDom.style.width = `${width}px`
          bodyDom.style.height = `${height}px`
          bodyDom.style.transform = 'none'
          bodyDom.style.transformOrigin = 'none'

          this.rootStyle = {
            width: `${width}px`,
            height: `${height}px`,
          }
        }
      }
    }
  };
</script>

<style module>
  .root {
    min-height: 100px;
  }
</style>
