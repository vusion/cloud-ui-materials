<template>
  <div v-if="currentStyle" :class="$style.root" :style="currentStyle">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 's-drag-ghost',
  props: {
    position: Object,
  },
  data() {
    return {
      title: '',
      currentStyle: undefined,
    };
  },
  watch: {
    position: {
      handler(value) {
        if (value) {
          const { left, top, pointerEvents } = value;
          this.currentStyle = {
            left: left + 'px',
            top: top + 'px',
            pointerEvents: pointerEvents,
          };
        } else {
          this.currentStyle = undefined;
          this.title = '';
        }
      },
      deep: true,
    },
  },
  methods: {
    setTitle(title) {
      this.title = title;
    },
  },
};
</script>

<style module>
.root {
  position: fixed;
  background: #fff;
  border: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  padding: 6px 22px;
  width: 100px;
  z-index: 99999;
  /* pointer-events: none; */
  color: #333;
  font-weight: 500;
  opacity: 0.9;
  text-align: center;
}
</style>
