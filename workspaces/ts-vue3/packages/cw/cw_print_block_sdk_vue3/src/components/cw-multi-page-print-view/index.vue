<template>
  <div class="print-view" v-show="isDesigner || isShowPrint">
    <div class="print-room" vusion-slot-name="default" ref="printRoomRef">
      <slot></slot>
      <div v-if="!hasDefaultSlot" style="color: #ccccccd0; padding: 3px">
        请将打印的内容拖入这块区域
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas';
import printJS from 'print-js';
import { computed, ref, useSlots } from 'vue';

export interface CwMultiPagePrintViewProps {
  value?: string;
  isShowPrint?: boolean;
  overlapHeight?: number;
}

const props = withDefaults(defineProps<CwMultiPagePrintViewProps>(), {
  value: '请在这里编写代码',
  isShowPrint: false,
  overlapHeight: 0,
});

const slots = useSlots();
const printRoomRef = ref<HTMLElement | null>(null);
const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;
const hasDefaultSlot = computed(() => !!slots.default);

function getCanvas(el: Node, path: string, promises: Promise<boolean>[], printRoom: HTMLElement) {
  const children = el.childNodes;
  children.forEach((item, index) => {
    if (item.childNodes.length > 0) {
      getCanvas(item, (path += (item as HTMLElement).tagName), promises, printRoom);
    } else if ((item as HTMLElement).tagName === 'CANVAS') {
      const source = printRoom.querySelector(
        `${path.toLowerCase()} canvas:nth-child(${index + 1})`,
      ) as HTMLCanvasElement | null;
      if (source) {
        promises.push(copyCanvasData(item as HTMLCanvasElement, source));
      }
    }
  });
}

function copyCanvasData(target: HTMLCanvasElement, source: HTMLCanvasElement) {
  return new Promise<boolean>((resolve, reject) => {
    const data = source.toDataURL('image/png');
    const img = new Image();
    img.src = data;
    img.onload = () => {
      const ctx = target.getContext('2d');
      ctx?.drawImage(img, 0, 0, source.width, source.height);
      resolve(true);
    };
    img.onerror = () => {
      reject(false);
    };
  });
}

async function print() {
  const container = printRoomRef.value;
  if (!container) return;

  const canvas = await html2canvas(container, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight,
    logging: false,
    removeContainer: true,
    willReadFrequently: true,
  });

  const mmToPx = (mm: number) => (mm * 96) / 25.4;
  const pageWidthPx = mmToPx(210);
  const pageHeightPx = mmToPx(297);
  const marginPx = mmToPx(12);
  const printableWidthPx = pageWidthPx - marginPx * 2;
  const printableHeightPx = pageHeightPx - marginPx * 2;

  const normalizedOverlapHeight = Math.min(50, Math.max(0, Number(props.overlapHeight) || 0));

  if (normalizedOverlapHeight === 0) {
    const dataUrl = canvas.toDataURL('image/png');
    const html = `
          <div style="width:100%;box-sizing:border-box;">
            <img src="${dataUrl}" style="width:calc(210mm - 24mm);height:auto;display:block;margin:0;" />
          </div>
        `;
    printJS({
      printable: html,
      type: 'raw-html',
      scanStyles: false,
      documentTitle: '',
      style:
        '@page { size: A4 portrait; margin: 12mm; } html,body{margin:0;padding:0;} img{width:calc(210mm - 24mm) !important;height:auto;display:block;margin:0;}',
    });
    return;
  }

  const canvasPerPageHeight = Math.max(
    1,
    Math.floor(printableHeightPx * (canvas.width / printableWidthPx)) - 2,
  );
  const canvasOverlap = Math.floor(normalizedOverlapHeight * (canvas.width / printableWidthPx));

  const dataUrls: string[] = [];
  let y = 0;
  while (y < canvas.height) {
    const sliceHeight = Math.min(canvasPerPageHeight, canvas.height - y);
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, y, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
    }
    dataUrls.push(pageCanvas.toDataURL('image/png'));
    if (y + sliceHeight >= canvas.height) break;
    y += canvasPerPageHeight - canvasOverlap;
  }

  const html = `
        <div style="width:100%;box-sizing:border-box;">
          ${dataUrls
            .map(
              (src, i) =>
                `<img src="${src}" style="width:calc(210mm - 24mm);height:auto;display:block;margin:0;${
                  i > 0 ? 'page-break-before:always;' : ''
                }" />`,
            )
            .join('')}
        </div>
      `;
  printJS({
    printable: html,
    type: 'raw-html',
    scanStyles: false,
    documentTitle: '',
    style:
      '@page { size: A4 portrait; margin: 12mm; } html,body{margin:0;padding:0;} img{width:calc(210mm - 24mm) !important;height:auto;display:block;margin:0;}',
  });
}

defineExpose({ print });
</script>

<style>
.print-block-room {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 9000;
}

.print-view {
  min-height: 200px;
  border: 1px #ccc dashed;
  position: relative;
  background: transparent;
}

@media print {
  [column='auto'] {
    page-break-inside: auto;
  }
  [class^='l-root__'],
  body > div:first-of-type,
  [class^='u-drawer_drawer__'],
  [class^='u-modal_dialog__'] {
    display: none;
  }
  [class^='u-info-list_item__'] {
    display: flex !important;
  }
  .print-block-room {
    display: block;
  }
}
</style>
