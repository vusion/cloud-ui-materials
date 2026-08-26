<template>
  <div ref="container" class="doc-preview-container">
    <div ref="docPreviewContent" class="doc-preview-content">
      <div>{{ emptyText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { renderAsync } from 'docx-preview';
import panzoom from 'panzoom';

const props = withDefaults(
  defineProps<{
    value?: string;
    panZoom?: boolean;
    emptyText?: string;
    ignoreWidth?: boolean;
    ignoreHeight?: boolean;
  }>(),
  {
    value: '请在这里编写代码',
    panZoom: false,
    emptyText: '文件加载中',
    ignoreWidth: false,
    ignoreHeight: false,
  },
);

const container = ref<HTMLDivElement | null>(null);
const docPreviewContent = ref<HTMLDivElement | null>(null);

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;
const PLACEHOLDER_VALUE = '请在这里编写代码';

function isFetchableUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed || trimmed === PLACEHOLDER_VALUE) return false;
  return /^https?:\/\//i.test(trimmed);
}

const docxOptions = {
  className: 'kaimo-docx',
  inWrapper: true,
  ignoreWidth: props.ignoreWidth,
  ignoreHeight: props.ignoreHeight,
  ignoreFonts: false,
  breakPages: true,
  ignoreLastRenderedPageBreak: true,
  experimental: false,
  trimXmlDeclaration: true,
  useBase64URL: false,
  useMathMLPolyfill: false,
  showChanges: false,
  debug: false,
};

function updateScale() {
  const containerEl = container.value;
  const contentEl = docPreviewContent.value;
  if (containerEl && contentEl) {
    const containerWidth = containerEl.clientWidth;
    const containerHeight = containerEl.clientHeight;
    const contentWidth = contentEl.scrollWidth;
    const contentHeight = contentEl.scrollHeight;
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;
    const scale = Math.min(scaleX, scaleY);
    contentEl.style.transform = `scale(${scale})`;
    contentEl.style.transformOrigin = 'top left';
  }
}

async function getData(url: string) {
  if (typeof url !== 'string' || !isFetchableUrl(url)) return;
  try {
    const buf = await fetch(url).then((r) => r.arrayBuffer());
    docxRender(buf);
  } catch (e) {
    console.log(e);
  }
}

function docxRender(buffer: ArrayBuffer) {
  const bodyContainer = docPreviewContent.value;
  if (!bodyContainer) return;
  renderAsync(buffer, bodyContainer, undefined, docxOptions).then((res) => {
    console.log('res---->', res);
    updateScale();
  });
}

watch(
  () => props.value,
  (val) => {
    getData(val || '');
  },
);

onMounted(() => {
  getData(props.value || '');
  updateScale();
  window.addEventListener('resize', updateScale);

  if (!isDesigner && props.panZoom && container.value) {
    panzoom(container.value, {
      bounds: true,
      boundsPadding: 0.1,
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScale);
});
</script>

<style scoped>
.doc-preview-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.doc-preview-content {
  transform-origin: top left;
}
</style>

<style>
.kaimo-docx-wrapper {
  padding: 0 !important;
  display: block !important;
  background-color: transparent !important;
}
</style>
