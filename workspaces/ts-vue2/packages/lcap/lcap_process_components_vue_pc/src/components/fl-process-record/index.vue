<template>
  <div :class="$style.root">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'fl-process-record',
  props: {
  }
};
</script>
<style module>
.root {
  width: 100%;
}
</style>
