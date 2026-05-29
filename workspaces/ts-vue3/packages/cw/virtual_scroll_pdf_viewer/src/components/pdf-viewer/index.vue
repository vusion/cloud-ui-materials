<template>
  <div
    ref="wrapperRef"
    :class="$style.wrapper"
    :style="wrapperInlineStyle"
  >
    <div v-if="status === 'loading'" :class="$style.hint">加载中…</div>
    <div v-else-if="status === 'error'" :class="$style.hint">{{ message }}</div>
    <div v-else-if="status === 'empty'" :class="$style.hint">请配置 pdf 链接</div>
    <div
      v-else
      ref="scrollerRef"
      :class="$style.scroller"
      @scroll.passive="onScroll"
    >
      <div :class="$style.track" :style="{ height: `${totalHeight}px` }">
        <div
          v-for="pageNum in activePages"
          :key="pageNum"
          :class="$style.pageWrap"
          :style="pageWrapStyle(pageNum)"
        >
          <canvas :ref="(el) => bindCanvas(pageNum, el)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

defineOptions({ name: 'pdf-viewer' });

export interface PdfViewerProps {
  value?: string;
  enableZoom?: boolean;
}

const props = withDefaults(defineProps<PdfViewerProps>(), {
  value: '',
  enableZoom: false,
});

const PAGE_GAP = 8;
const BUFFER = 1;

const wrapperRef = ref<HTMLElement | null>(null);
const scrollerRef = ref<HTMLElement | null>(null);

const status = ref<'empty' | 'loading' | 'ready' | 'error'>('empty');
const message = ref('');
const scale = ref(1);
const numPages = ref(0);
const pageHeights = ref<number[]>([]);
const pageTops = ref<number[]>([]);
const totalHeight = ref(0);
const visible = ref({ start: 1, end: 1 });

const activePages = computed(() => {
  const n = numPages.value;
  if (n === 0) return [];
  const { start, end } = visible.value;
  const a = Math.max(1, start - BUFFER);
  const b = Math.min(n, end + BUFFER);
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
});

const wrapperInlineStyle = computed(() => ({
  touchAction: props.enableZoom ? 'auto' : 'pan-y',
}));

let doc: PDFDocumentProxy | null = null;
let loadToken = 0;
let layoutToken = 0;
const canvasByPage = new Map<number, HTMLCanvasElement>();
const painted = new Set<number>();
/** 同一 canvas 上禁止并发 render；将每页的绘制串成链 */
const paintChains = new Map<number, Promise<void>>();
const wrapperStyleWidth = ref(0);

function pageWrapStyle(pageNum: number) {
  const i = pageNum - 1;
  const h = pageHeights.value[i] ?? 0;
  const t = pageTops.value[i] ?? 0;
  return {
    top: `${t}px`,
    height: `${h}px`,
  };
}

function onScroll() {
  updateVisibleWindow();
}

function updateVisibleWindow() {
  const el = scrollerRef.value;
  const n = numPages.value;
  if (!el || n === 0) return;

  const top = el.scrollTop;
  const bottom = top + el.clientHeight;

  let start = n;
  for (let i = 0; i < n; i++) {
    const pt = pageTops.value[i];
    const ph = pageHeights.value[i];
    if (pt + ph > top) {
      start = i + 1;
      break;
    }
  }
  start = Math.min(Math.max(1, start), n);

  let end = 1;
  for (let i = 0; i < n; i++) {
    if (pageTops.value[i] < bottom) {
      end = i + 1;
    }
  }
  end = Math.max(start, Math.min(n, end));

  visible.value = { start, end };
}

function bindCanvas(pageNum: number, el: unknown) {
  if (!el || !(el instanceof HTMLCanvasElement)) {
    canvasByPage.delete(pageNum);
    return;
  }
  const prev = canvasByPage.get(pageNum);
  if (prev !== el) {
    canvasByPage.set(pageNum, el);
    void paintPage(pageNum, { force: true });
    return;
  }
  canvasByPage.set(pageNum, el);
  void paintPage(pageNum);
}

async function paintPage(pageNum: number, opts: { force?: boolean } = {}) {
  const myLoad = loadToken;
  const tail = paintChains.get(pageNum) ?? Promise.resolve();
  const next = tail.then(() => runPaintPage(pageNum, opts, myLoad)).catch(() => {});
  paintChains.set(pageNum, next);
  await next;
}

async function runPaintPage(pageNum: number, opts: { force?: boolean }, myLoad: number) {
  if (myLoad !== loadToken) return;
  const canvas = canvasByPage.get(pageNum);
  if (!canvas || !doc) return;
  if (!opts.force && painted.has(pageNum)) return;

  const page = await doc.getPage(pageNum);
  if (myLoad !== loadToken) return;

  const viewport = page.getViewport({ scale: scale.value });
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(viewport.width * dpr);
  canvas.height = Math.floor(viewport.height * dpr);
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  await page.render({ canvasContext: ctx, viewport, canvas }).promise;
  if (myLoad !== loadToken) return;
  painted.add(pageNum);
}

async function buildPageMetrics(documentProxy: PDFDocumentProxy, currentLayout: number) {
  const w = wrapperStyleWidth.value || wrapperRef.value?.clientWidth || 600;
  const first = await documentProxy.getPage(1);
  if (currentLayout !== layoutToken) return;

  const unit = first.getViewport({ scale: 1 });
  const s = w / unit.width;
  scale.value = s;

  const tops: number[] = [];
  const heights: number[] = [];
  let acc = 0;
  const total = documentProxy.numPages;

  for (let i = 1; i <= total; i++) {
    const p = await documentProxy.getPage(i);
    if (currentLayout !== layoutToken) return;
    const vp = p.getViewport({ scale: s });
    tops.push(acc);
    heights.push(vp.height);
    acc += vp.height + PAGE_GAP;
  }

  pageTops.value = tops;
  pageHeights.value = heights;
  totalHeight.value = acc;
  numPages.value = total;
}

function resetSurfaces() {
  canvasByPage.clear();
  painted.clear();
  paintChains.clear();
}

async function openPdf(url: string) {
  const myLoad = ++loadToken;
  status.value = 'loading';
  message.value = '';
  resetSurfaces();
  doc = null;
  numPages.value = 0;
  pageHeights.value = [];
  pageTops.value = [];
  totalHeight.value = 0;

  try {
    const task = pdfjs.getDocument({ url, withCredentials: false });
    const documentProxy = await task.promise;
    if (myLoad !== loadToken) return;

    doc = documentProxy;

    const myLayout = ++layoutToken;
    await buildPageMetrics(documentProxy, myLayout);
    if (myLoad !== loadToken || myLayout !== layoutToken) return;

    status.value = 'ready';
    await nextTick();
    updateVisibleWindow();
    await Promise.all(activePages.value.map((p) => paintPage(p, { force: true })));
  } catch (e) {
    if (myLoad !== loadToken) return;
    status.value = 'error';
    message.value = e instanceof Error ? e.message : 'PDF 加载失败';
  }
}

watch(
  () => props.value,
  (v) => {
    const url = (v || '').trim();
    if (!url) {
      loadToken++;
      layoutToken++;
      doc = null;
      resetSurfaces();
      status.value = 'empty';
      numPages.value = 0;
      totalHeight.value = 0;
      return;
    }
    void openPdf(url);
  },
  { immediate: true },
);

watch(activePages, async () => {
  await nextTick();
  await Promise.all(activePages.value.map((p) => paintPage(p)));
});

let ro: ResizeObserver | null = null;

onMounted(() => {
  ro = new ResizeObserver((entries) => {
    const w = entries[0]?.contentRect?.width;
    if (w && w > 0) {
      wrapperStyleWidth.value = w;
      if (doc && props.value?.trim()) {
        layoutToken++;
        const myLayout = ++layoutToken;
        void (async () => {
          painted.clear();
          await buildPageMetrics(doc as PDFDocumentProxy, myLayout);
          if (myLayout !== layoutToken) return;
          await nextTick();
          updateVisibleWindow();
          await Promise.all(activePages.value.map((p) => paintPage(p, { force: true })));
        })();
      }
    }
  });
  if (wrapperRef.value) {
    ro.observe(wrapperRef.value);
    wrapperStyleWidth.value = wrapperRef.value.clientWidth;
  }
});

onBeforeUnmount(() => {
  ro?.disconnect();
  loadToken++;
  layoutToken++;
  doc = null;
  paintChains.clear();
});
</script>

<style module>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 320px;
  box-sizing: border-box;
}

.scroller {
  width: 100%;
  height: 100%;
  overflow: auto;
  overscroll-behavior: contain;
}

.track {
  position: relative;
  width: 100%;
}

.pageWrap {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.pageWrap canvas {
  display: block;
  max-width: 100%;
  height: auto;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

.hint {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  color: #666;
  font-size: 14px;
}
</style>
