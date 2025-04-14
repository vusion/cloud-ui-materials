<template>
  <span :class="$style.root">
    <slot></slot>
  </span>
</template>
<script>
export default {
  name: 'fl-process-task-box',
  props: {},
};
</script>
<style module>
.root {
  display: inline-block;
  width: 60px;
  height: 60px;
}
</style>
