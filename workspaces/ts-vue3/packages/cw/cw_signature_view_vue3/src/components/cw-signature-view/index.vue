<template>
  <div :class="$style.root" ref="canvasRoot">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import SmoothSignature from 'smooth-signature';

export interface CwSignatureViewProps {
  bgColor?: string;
  penColor?: string;
  penWidth?: number;
  openSmooth?: boolean;
}

const props = withDefaults(defineProps<CwSignatureViewProps>(), {
  bgColor: '#F8F9FA',
  penColor: 'black',
  penWidth: 2,
  openSmooth: true,
});

const canvasRoot = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const signature = ref<InstanceType<typeof SmoothSignature> | null>(null);

function initSignature() {
  if (!canvasRoot.value || !canvas.value) return;

  const width = canvasRoot.value.clientWidth;
  const height = canvasRoot.value.clientHeight;

  canvas.value.width = width;
  canvas.value.height = height;

  if (signature.value) {
    signature.value.init(canvas.value, {
      bgColor: props.bgColor,
      openSmooth: props.openSmooth,
      penColor: props.penColor,
      minWidth: props.penWidth,
      width,
      height,
    });
  } else {
    signature.value = new SmoothSignature(canvas.value, {
      bgColor: props.bgColor,
      openSmooth: props.openSmooth,
      penColor: props.penColor,
      minWidth: props.penWidth,
      width,
      height,
    });
  }
}

function reloadSignature() {
  nextTick(() => {
    initSignature();
  });
}

function clearSignature() {
  console.log('clear');
  signature.value?.clear();
}

function getSignature() {
  console.log('getSignature');
  return signature.value?.getPNG();
}

function rotateSignature(angle: number) {
  const originalBase64 = signature.value?.getPNG();
  if (!originalBase64) return null;

  const img = new Image();
  img.src = originalBase64;

  return new Promise<string | null>((resolve) => {
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      const width = img.width;
      const height = img.height;
      const radians = (angle * Math.PI) / 180;
      const cos = Math.abs(Math.cos(radians));
      const sin = Math.abs(Math.sin(radians));
      const newWidth = Math.ceil(width * cos + height * sin);
      const newHeight = Math.ceil(width * sin + height * cos);

      tempCanvas.width = newWidth;
      tempCanvas.height = newHeight;

      ctx.fillStyle = props.bgColor;
      ctx.fillRect(0, 0, newWidth, newHeight);
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);

      const rotatedBase64 = tempCanvas.toDataURL('image/png');
      resolve(rotatedBase64);
    };
  });
}

function isEmpty() {
  return signature.value?.isEmpty();
}

onMounted(() => {
  initSignature();
});

onUnmounted(() => {
  signature.value?.removeListener();
});

defineExpose({
  reloadSignature,
  getSignature,
  clearSignature,
  rotateSignature,
  isEmpty,
});
</script>

<style module>
.root {
  display: inline-block;
}
</style>
