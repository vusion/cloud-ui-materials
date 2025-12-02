<template>
  <div :class="$style.root"></div>
</template>

<script>
export default {
  name: 's-drag-image-ghost',
};
</script>

<style module>
.root {
  position: fixed;
  background: #fff;
  border: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.32);
  border-radius: 4px;
  padding: 6px 22px;
  min-width: 88px;
  z-index: 99999;
  color: #333;
  font-weight: 500;
  text-align: center;
  z-index: -999;
  left: -999999px;
  top: -999999px;
  width: auto;
  white-space: nowrap;
}
</style>
