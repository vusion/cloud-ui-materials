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
import { computed, ref, useSlots } from 'vue';

export interface CwPrintViewProps {
  value?: string;
  isShowPrint?: boolean;
}

const props = withDefaults(defineProps<CwPrintViewProps>(), {
  value: '请在这里编写代码',
  isShowPrint: false,
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
  const historyEl = document.querySelector('.print-block-room');
  if (historyEl) {
    historyEl.remove();
  }

  const printRoom = printRoomRef.value;
  if (!printRoom) return;

  const el = printRoom.cloneNode(true) as HTMLElement;
  el.classList.add('print-block-room');
  document.body.appendChild(el);
  console.log('el', el);
  const promises: Promise<boolean>[] = [];
  getCanvas(el, '', promises, printRoom);
  console.log('Promises:', promises);

  try {
    await Promise.all(promises);
    console.log('All canvas data copied successfully');
    window.print();
  } catch (error) {
    console.error('Error during canvas data copying:', error);
  }
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
