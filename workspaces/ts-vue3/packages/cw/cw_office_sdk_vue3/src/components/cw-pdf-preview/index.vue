<template>
  <div
    :class="{
      [$style.container]: true,
      [$style.room]: isDesigner,
    }"
  >
    <div v-if="panZoom" ref="viewport" :class="$style.viewport">
      <div ref="content" :class="$style['zoomable-content']">
        <VuePdfEmbed :source="pdfSource" />
      </div>
    </div>
    <VuePdfEmbed v-else :source="pdfSource" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import VuePdfEmbed, { GlobalWorkerOptions } from 'vue-pdf-embed/dist/index.essential.mjs';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import panzoom from 'panzoom';

// essential 构建使用 pdfjs-dist/legacy，须在同一 legacy 实例上配置 worker
GlobalWorkerOptions.workerSrc = pdfWorker;

const props = withDefaults(
  defineProps<{
    value?: string;
    panZoom?: boolean;
    maxScale?: number;
    minScale?: number;
    cMapUrl?: string;
  }>(),
  {
    panZoom: false,
    maxScale: 3,
    minScale: 1,
    cMapUrl: '',
  },
);

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;
const viewport = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
let panzoomInstance: ReturnType<typeof panzoom> | null = null;

const pdfSource = computed(() => ({
  url: props.value,
  cMapUrl: props.cMapUrl,
  cMapPacked: true,
}));

function initPanzoom() {
  if (isDesigner || !props.panZoom || !viewport.value) return;
  panzoomInstance?.dispose();
  panzoomInstance = panzoom(viewport.value, {
    maxZoom: props.maxScale,
    minZoom: props.minScale,
    bounds: true,
    boundsPadding: 0.1,
  });
}

watch(
  () => props.panZoom,
  () => {
    nextTick(() => initPanzoom());
  },
);

onMounted(() => {
  nextTick(() => initPanzoom());
});

onUnmounted(() => {
  panzoomInstance?.dispose();
  panzoomInstance = null;
});
</script>

<style module>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.viewport {
  width: 100%;
  height: 100%;
  position: relative;
  touch-action: pan-y;
}

.room {
  border: 1px dashed #ccc;
  height: 300px;
}

.zoomable-content {
  transform-origin: top;
}
</style>

<style>
.vue-pdf-embed {
  margin: auto;
}

.vue-pdf-embed canvas {
  width: 100% !important;
  height: auto !important;
}
</style>
