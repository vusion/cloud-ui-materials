<template>
  <div :class="$style.root" data-hg-print-badge>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'hg-badge-com',
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  }
};
</script>
<style module>
.root {
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  min-height: 20px;
  padding: 2px 6px;
  background-color: red;
  color: #fff;
  font-size: 12px;
  line-height: 1;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
