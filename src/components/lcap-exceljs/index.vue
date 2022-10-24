<template>
<div :class="$style.root">
  <Excel />
</div>
</template>

<script>
import Excel from "@/components/Excel";

export default {
    name: 'lcap-exceljs',
    components: {
      Excel
  },
};
</script>

<style module>
.root {}
</style>
