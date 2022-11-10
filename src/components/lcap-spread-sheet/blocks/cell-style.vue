<template>
<!--  <Border></Border>-->
  <Underline :spread="spread"></Underline>
</template>

<script>
import Border from '../items/border';
import Underline from "../items/underline";
export default {
  name: "cell-style",
  components: {Underline, Border },
  props: {
    spread: Object,
  },
}
</script>

<style scoped>

</style>
