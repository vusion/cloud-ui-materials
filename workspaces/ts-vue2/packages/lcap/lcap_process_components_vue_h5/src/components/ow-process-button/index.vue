<template>
  <div :class="$style.root">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ow-process-button',
  props: {},
};
</script>
<style module>
.root {
  width: 100%;
}
</style>
