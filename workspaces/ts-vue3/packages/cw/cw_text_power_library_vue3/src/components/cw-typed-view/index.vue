<template>
  <div class="typed-view">
    <div v-if="!inIDE" class="typed-view-room" ref="myTypeRef"></div>
    <div v-else>
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Typed from 'typed.js';

const props = withDefaults(
  defineProps<{
    value?: string;
    showCursor?: boolean;
    typeSpeed?: number;
  }>(),
  {
    value: '请在这里输入内容',
    showCursor: false,
    typeSpeed: 40,
  },
);

const myTypeRef = ref<HTMLElement | null>(null);
let typed: Typed | null = null;

const inIDE = computed(() => (window as any).$uilibenv?.IDE_DESIGNER === true);

onMounted(() => {
  if (!inIDE.value && myTypeRef.value) {
    typed = new Typed(myTypeRef.value, {
      strings: [props.value],
      typeSpeed: props.typeSpeed,
      showCursor: props.showCursor,
    });
  }
});

onUnmounted(() => {
  typed?.destroy();
});
</script>

<style>
.typed-view-room {
  display: inline;
  word-wrap: break-word;
  white-space: normal;
  width: 100%;
}
</style>
