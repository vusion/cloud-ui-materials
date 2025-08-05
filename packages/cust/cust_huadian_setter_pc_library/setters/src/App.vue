<script setup lang="ts">
import { ref } from 'vue';
import ExIconSetter from './setters/ExIconSetter.vue';
import ExImageSetter from './setters/ExImageSetter.vue';

const value = ref('');
const change = (e: any) => {
  value.value = e;
};
</script>

<template>
  <div class="root">
    <span>value: {{ value }}</span>
    <ExIconSetter :value="value" @change="change" />
    <ExImageSetter :value="value" @change="change" />
  </div>
</template>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 50vh;
  background-color: #fff;
  color: #333;
}
</style>
