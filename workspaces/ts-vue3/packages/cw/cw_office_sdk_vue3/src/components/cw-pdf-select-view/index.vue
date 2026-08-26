<template>
  <div
    id="pdf-preview"
    ref="pdfPreview"
    style="display: flex; flex-direction: column"
    :class="isDesigner && $style.room"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { jsPDF } from 'jspdf';
import readAsPDF from '@/utils/read-as-pdf';

const props = withDefaults(
  defineProps<{
    value?: string;
    access?: string;
  }>(),
  {
    access: 'public',
  },
);

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;
const pdfPreview = ref<HTMLDivElement | null>(null);
const selected = ref<number[]>([]);
let clickCallback: ((e: Event) => void) | null = null;

function getSelected() {
  return selected.value;
}

function arrayBufferToFile(arrayBuffer: ArrayBuffer, fileName: string, mimeType: string) {
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  });
}

async function uploadFile() {
  const doc = new jsPDF();
  const parent = pdfPreview.value;
  if (!parent) return;
  const els = parent.querySelectorAll('canvas');
  selected.value
    .sort((x, y) => x - y)
    .forEach((item, idx) => {
      const canvas = els[item] as HTMLCanvasElement;
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 0, 0);
      if (idx !== selected.value.length - 1) {
        doc.addPage();
      }
    });
  const arrayBuffer = doc.output('arraybuffer');
  const file = arrayBufferToFile(arrayBuffer, 'file.pdf', 'image/png');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('lcapIsCompress', 'false');
  formData.append('viaOriginURL', 'false');
  const res = await fetch('/upload', {
    method: 'post',
    headers: {
      'Lcap-Access': props.access,
    },
    body: formData,
  }).then((r) => r.json());
  return res;
}

async function init() {
  try {
    const pdfUrl = props.value;
    const parent = pdfPreview.value;
    if (!pdfUrl || !parent) {
      throw new Error('无效链接');
    }
    parent.innerHTML = '';
    const pdf = await readAsPDF(pdfUrl);
    const promises = [];
    for (let i = 1; i < pdf.numPages + 1; i++) {
      promises.push(pdf.getPage(i));
    }
    const pages = await Promise.all(promises);
    pages.forEach((page) => {
      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = document.createElement('canvas');
      parent.append(canvas);
      const context = canvas.getContext('2d');
      if (!context) return;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({
        canvasContext: context,
        viewport,
      }).promise;
    });
  } catch (error) {
    console.log(error);
  }
}

watch(
  () => props.value,
  (newVal) => {
    if (newVal) init();
  },
);

onMounted(() => {
  init();
  const parent = pdfPreview.value;
  if (!parent) return;
  clickCallback = (e: Event) => {
    const el = e.target as HTMLCanvasElement;
    const els = [...parent.querySelectorAll('canvas')];
    const idx = els.indexOf(el);
    const sIdx = selected.value.indexOf(idx);
    if (~sIdx) {
      selected.value.splice(sIdx, 1);
    } else {
      selected.value.push(idx);
    }
    els.forEach((item, index) => {
      if (selected.value.includes(index)) {
        item.style.border = '1px solid red';
      } else {
        item.style.border = '1px solid #ccc';
      }
    });
  };
  parent.addEventListener('click', clickCallback);
});

onUnmounted(() => {
  if (pdfPreview.value && clickCallback) {
    pdfPreview.value.removeEventListener('click', clickCallback);
  }
});

defineExpose({
  uploadFile,
  getSelected,
});
</script>

<style module>
.room {
  height: 300px;
  overflow: hidden;
  border: 1px solid #ccc;
}
</style>

<style>
#pdf-preview canvas {
  border: 1px solid #ccc;
}
</style>
