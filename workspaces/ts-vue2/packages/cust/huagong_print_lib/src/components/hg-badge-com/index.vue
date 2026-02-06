<template>
  <div data-hg-print-badge :data-hg-print-badge-x="x" :data-hg-print-badge-y="y">
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
  
}
</style>
