<template>
<div ref="demo" :class="$style.root">
  <button @click="click">click</button>
</div>
</template>
<script>
import { htmlPrint } from '../../logics/index';
export default {
  name: 'demo',
  props: {
    text: {
      type: String,
      default: 'Hello'
    }
  },
  created() {
    console.log('create', $)
  },
  methods: {
    click() {
      const content = this.$refs.demo;      // 随机生成一个id，前缀为print
      htmlPrint(content);
    },
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
../../logics/jquery.jqprint-0.3.js