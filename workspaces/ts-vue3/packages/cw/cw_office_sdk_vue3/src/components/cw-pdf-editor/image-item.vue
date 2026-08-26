<template>
  <div
    :class="$style.absoluteStyle"
    :style="{
      width: `${width + dw}px`,
      height: `${Math.round((width + dw) / ratio)}px`,
      transform: `translate(${x + dx}px, ${y + dy}px)`,
    }"
  >
    <div
      :class="[
        $style.imgMoveContainer,
        operation === 'move' ? $style.cursorGrabbing : '',
        operation ? $style.operation : '',
      ]"
      @mousedown="handlePanStart"
      @touchstart="handlePanStart"
    >
      <div
        v-if="!fixSize"
        data-direction="left-top"
        :class="[$style.absoluteStyle, $style.selector, $style.cursorResize]"
        :style="{ top: '0%', left: '0%' }"
      />
      <div
        v-if="!fixSize"
        data-direction="right-top"
        :class="[$style.absoluteStyle, $style.selector, $style.cursorResize]"
        :style="{ top: '0%', left: '100%' }"
      />
      <div
        v-if="!fixSize"
        data-direction="left-bottom"
        :class="[$style.absoluteStyle, $style.selector, $style.cursorResize]"
        :style="{ top: '100%', left: '0%' }"
      />
      <div
        v-if="!fixSize"
        data-direction="right-bottom"
        :class="[$style.absoluteStyle, $style.selector, $style.cursorResize]"
        :style="{ top: '100%', left: '100%' }"
      />
    </div>
    <div
      v-if="!fixSize"
      :class="[$style.absoluteStyle, $style.cursorGrabbing, $style.delete]"
      :style="{ top: '0%', left: '50%' }"
      @click="onDelete"
    >
      <img src="./assets/close.png" alt="delete object" />
    </div>
    <canvas ref="imgCanvas" :class="$style.imgCanvasView" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  payload: CanvasImageSource;
  file: Blob | File;
  width: number;
  height: number;
  originWidth: number;
  originHeight: number;
  x: number;
  y: number;
  fixSize?: boolean;
}>();

const emit = defineEmits<{
  onUpdate: [payload: Record<string, unknown>];
  onDelete: [];
}>();

const imgCanvas = ref<HTMLCanvasElement | null>(null);
const operation = ref('');
const directions = ref<string[]>([]);
const dx = ref(0);
const dy = ref(0);
const dw = ref(0);
const dh = ref(0);
const startX = ref<number | null>(null);
const startY = ref<number | null>(null);
const xMixin = ref<number | null>(null);
const yMixin = ref<number | null>(null);

const ratio = computed(() => props.originWidth / props.originHeight);

async function render() {
  const canvas = imgCanvas.value;
  if (!canvas) return;
  canvas.width = props.originWidth;
  canvas.height = props.originHeight;
  canvas.getContext('2d')?.drawImage(props.payload, 0, 0);
  let scale = 1;
  const MAX_TARGET = 500;
  if (props.width > MAX_TARGET) {
    scale = MAX_TARGET / props.width;
  }
  if (props.height > MAX_TARGET) {
    scale = Math.min(scale, MAX_TARGET / props.height);
  }
  emit('onUpdate', {
    width: props.width * scale,
    height: props.height * scale,
  });
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(props.file.type)) {
    canvas.toBlob((blob) => {
      emit('onUpdate', { file: blob });
    });
  }
}

function handlePanMove(event: MouseEvent | TouchEvent) {
  let coordinate;
  if (event.type === 'mousemove') {
    coordinate = handleMousemove(event as MouseEvent);
  }
  if (event.type === 'touchmove') {
    coordinate = handleTouchmove(event as TouchEvent);
  }
  if (!coordinate) return console.log('ERROR');

  const _dx = coordinate.detail.x - (startX.value ?? 0);
  const _dy = coordinate.detail.y - (startY.value ?? 0);
  if (operation.value === 'move') {
    dx.value = _dx;
    dy.value = _dy;
  } else if (operation.value === 'scale') {
    if (directions.value.includes('left')) {
      dx.value = _dx;
      dw.value = -_dx;
    }
    if (directions.value.includes('top')) {
      dy.value = _dy;
      dh.value = -_dy;
    }
    if (directions.value.includes('right')) {
      dw.value = _dx;
    }
    if (directions.value.includes('bottom')) {
      dh.value = _dy;
    }
  }
}

function handlePanEnd(event: MouseEvent | TouchEvent) {
  let coordinate;
  if (event.type === 'mouseup') {
    coordinate = handleMouseup(event as MouseEvent);
  }
  if (event.type === 'touchend') {
    coordinate = handleTouchend(event as TouchEvent);
  }
  if (!coordinate) return console.log('ERROR');
  if (operation.value === 'move') {
    emit('onUpdate', {
      x: props.x + dx.value,
      y: props.y + dy.value,
    });
    dx.value = 0;
    dy.value = 0;
  } else if (operation.value === 'scale') {
    emit('onUpdate', {
      x: props.x + dx.value,
      y: props.y + dy.value,
      width: props.width + dw.value,
      height: Math.round((props.width + dw.value) / ratio.value),
    });
    dx.value = 0;
    dy.value = 0;
    dw.value = 0;
    dh.value = 0;
    directions.value = [];
  }
  operation.value = '';
}

function handlePanStart(event: MouseEvent | TouchEvent) {
  if (props.fixSize) return;
  let coordinate;
  if (event.type === 'mousedown') {
    coordinate = handleMousedown(event as MouseEvent);
  }
  if (event.type === 'touchstart') {
    coordinate = handleTouchStart(event as TouchEvent);
  }
  if (!coordinate) return console.log('ERROR');

  startX.value = coordinate.detail.x;
  startY.value = coordinate.detail.y;
  if (coordinate.detail.target === event.currentTarget) {
    operation.value = 'move';
    return;
  }
  operation.value = 'scale';
  directions.value = (coordinate.detail.target as HTMLElement).dataset.direction?.split('-') ?? [];
}

function onDelete() {
  emit('onDelete');
}

function handleMousedown(event: MouseEvent) {
  xMixin.value = event.clientX;
  yMixin.value = event.clientY;
  const target = event.target as HTMLElement;
  window.addEventListener('mousemove', handlePanMove);
  window.addEventListener('mouseup', handlePanEnd);
  return {
    detail: { x: xMixin.value, y: yMixin.value, target },
  };
}

function handleMousemove(event: MouseEvent) {
  xMixin.value = event.clientX;
  yMixin.value = event.clientY;
  return {
    detail: { x: xMixin.value, y: yMixin.value },
  };
}

function handleMouseup(event: MouseEvent) {
  xMixin.value = event.clientX;
  yMixin.value = event.clientY;
  window.removeEventListener('mousemove', handlePanMove);
  window.removeEventListener('mouseup', handlePanEnd);
  return {
    detail: { x: xMixin.value, y: yMixin.value },
  };
}

function handleTouchStart(event: TouchEvent) {
  if (event.touches.length > 1) return;
  const touch = event.touches[0];
  xMixin.value = touch.clientX;
  yMixin.value = touch.clientY;
  const target = touch.target;
  window.addEventListener('touchmove', handlePanMove, { passive: false });
  window.addEventListener('touchend', handlePanEnd);
  return {
    detail: { x: xMixin.value, y: yMixin.value, target },
  };
}

function handleTouchmove(event: TouchEvent) {
  if (event.touches.length > 1) return;
  const touch = event.touches[0];
  xMixin.value = touch.clientX;
  yMixin.value = touch.clientY;
  return {
    detail: { x: xMixin.value, y: yMixin.value },
  };
}

function handleTouchend(event: TouchEvent) {
  const touch = event.changedTouches[0];
  xMixin.value = touch.clientX;
  yMixin.value = touch.clientY;
  window.removeEventListener('touchmove', handlePanMove);
  window.removeEventListener('touchend', handlePanEnd);
  return {
    detail: { x: xMixin.value, y: yMixin.value },
  };
}

watch(
  () => props.file,
  async (value) => {
    if (value) await render();
  },
);

onMounted(async () => {
  await render();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handlePanMove);
  window.removeEventListener('mouseup', handlePanEnd);
  window.removeEventListener('touchmove', handlePanMove);
  window.removeEventListener('touchend', handlePanEnd);
});
</script>

<style module>
.absoluteStyle {
  position: absolute;
  user-select: none;
  top: 0;
  left: 0;
  cursor: grab;
}

.cursorGrabbing {
  cursor: grabbing;
}

.cursorResize {
  cursor: nwse-resize;
}

.operation {
  background-color: rgba(0, 0, 0, 0.3);
}

.selector {
  border-radius: 10px;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  background-color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary);
}

.delete {
  border-radius: 10px;
  width: 18px;
  height: 18px;
  margin-left: -9px;
  margin-top: -9px;
  background-color: var(--el-color-white);
}

.delete img {
  width: 100%;
  height: 100%;
}

.imgCanvasView {
  border: 1px dashed var(--el-color-primary);
  width: 100%;
  height: 100%;
}

.imgMoveContainer {
  position: absolute;
  user-select: none;
  top: 0;
  left: 0;
  cursor: grab;
  width: 100%;
  height: 100%;
}
</style>
