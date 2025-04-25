<template>
<div :class="$style.root" v-html="text">
</div>
</template>
<script>
export default {
  name: 'demo',
  props: {
    text: {
      type: String,
      default: 'Hello'
    }
  }
};
</script>
<style module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  width: 600px;
  height: 400px;
  background-color: red;
  color: #fff;
  font-size: 24px;
  border-radius: 12px;
}
</style>
