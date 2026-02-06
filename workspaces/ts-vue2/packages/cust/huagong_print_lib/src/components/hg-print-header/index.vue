<template>
<div :class="$style.root" data-hg-print-header>
  <div vusion-slot-name="default" :class="$style.slot">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  name: 'hg-print-header',
  props: {},
};
</script>
<style module>
.root {
  display: block;
  box-sizing: border-box;
  min-height: 10px;
}

.slot {
  display: block;
}
</style>
