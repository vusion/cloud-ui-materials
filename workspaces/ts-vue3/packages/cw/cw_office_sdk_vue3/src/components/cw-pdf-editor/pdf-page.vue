<template>
  <div
    :style="{
      width: canvasWidth,
      height: canvasHeight,
    }"
    @mousedown="selectPage"
    @touchstart="selectPage"
  >
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { PDFPageProxy } from 'pdfjs-dist';

const props = defineProps<{
  page: Promise<PDFPageProxy>;
}>();

const emit = defineEmits<{
  selectPage: [];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref('100%');
const canvasHeight = ref('100%');

function selectPage() {
  emit('selectPage');
}

function getCanvasMeasurement() {
  return {
    canvasWidth: canvas.value?.width ?? 0,
    canvasHeight: canvas.value?.height ?? 0,
  };
}

async function render() {
  const _page = await props.page;
  const canvasEl = canvas.value;
  if (!canvasEl) return;
  const context = canvasEl.getContext('2d');
  if (!context) return;
  const viewport = _page.getViewport({
    scale: 1,
    rotation: 0,
  });
  canvasEl.width = viewport.width;
  canvasEl.height = viewport.height;
  canvasWidth.value = `${viewport.width}px`;
  canvasHeight.value = `${viewport.height}px`;
  await _page.render({
    canvasContext: context,
    viewport,
  }).promise;
}

onMounted(() => {
  render();
});

defineExpose({
  getCanvasMeasurement,
});
</script>
