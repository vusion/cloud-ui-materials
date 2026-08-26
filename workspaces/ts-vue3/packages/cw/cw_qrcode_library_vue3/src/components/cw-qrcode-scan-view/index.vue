<template>
  <div :class="[$style.qrcodeView, isDesigner && $style.preview]" data-testid="cw-qrcode-scan-view">
    <div v-if="!isDesigner" id="reader">{{ message }}</div>
    <div :class="$style.qrcodeRender">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

defineOptions({ name: 'cw-qrcode-scan-view' });

const emit = defineEmits<{
  scan: [event: string];
}>();

const currentInstance = getCurrentInstance();
const env = (
  (currentInstance?.proxy as { $env?: { VUE_APP_DESIGNER?: boolean } } | undefined)?.$env ??
  currentInstance?.appContext.config.globalProperties.$env
) as { VUE_APP_DESIGNER?: boolean } | undefined;

const isDesigner = Boolean(
  env?.VUE_APP_DESIGNER ??
    (typeof window !== 'undefined' && (window as Window & { $uilibenv?: { IDE_DESIGNER?: boolean } }).$uilibenv?.IDE_DESIGNER) ??
    import.meta.env.VUE_APP_DESIGNER === 'true',
);

const message = ref<unknown>('');
const html5QrCode = shallowRef<Html5Qrcode | null>(null);
const loading = ref(false);
let clearTimer: number | undefined;

function start() {
  const config = {
    fps: 30,
    qrbox: { width: 250, height: 250 },
    aspectRatio: 1.777778,
    experimentalFeatures: {
      useBarCodeDetectorIfSupported: true,
    },
    videoConstraints: {
      facingMode: 'environment',
      focusMode: 'continuous',
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 720, max: 1080 },
    },
  };

  html5QrCode.value
    ?.start(
      { facingMode: 'environment' },
      config,
      (decodedText: string, decodedResult: unknown) => {
        emit('scan', decodedText);
        const activeQrcode = html5QrCode.value;
        activeQrcode
          ?.stop()
          .then(() => {
            activeQrcode.clear();
          })
          .catch((error: unknown) => {
            console.log('Failed to stop/clear', error);
          });
        console.log('decodedText', decodedText);
        console.log('decodedResult', decodedResult);
      },
    )
    .catch((error: unknown) => {
      alert(error);
      console.log('扫码错误信息', error);
      if (typeof error === 'string') {
        // 与 Vue2 源码一致：字符串错误只 alert 一次。
      } else {
        alert(error);
      }
    });
}

function getCameras() {
  loading.value = true;
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        html5QrCode.value = new Html5Qrcode('reader');
        start();
      }
    })
    .catch((error: unknown) => {
      message.value = error;
      loading.value = false;
    });
}

onMounted(() => {
  if (isDesigner) {
    message.value = '二维码扫码组件';
  }

  if (html5QrCode.value) {
    const existingQrcode = html5QrCode.value;
    existingQrcode.stop();
    clearTimer = window.setTimeout(() => {
      existingQrcode.clear();
      html5QrCode.value = null;
      if (!isDesigner) {
        getCameras();
      }
    }, 500);
  } else if (!isDesigner) {
    getCameras();
  }
});

onBeforeUnmount(() => {
  const activeQrcode = html5QrCode.value;
  activeQrcode?.stop();
  if (clearTimer !== undefined) {
    window.clearTimeout(clearTimer);
  }
  clearTimer = window.setTimeout(() => {
    activeQrcode?.clear();
    if (html5QrCode.value === activeQrcode) {
      html5QrCode.value = null;
    }
  }, 500);
});

defineExpose({
  start,
  getCameras,
});
</script>

<style module>
.qrcodeView {
  width: var(--cw-qrcode-width, 100vw);
  height: var(--cw-qrcode-height, 100vh);
  overflow: hidden;
}

.preview {
  height: var(--cw-qrcode-height, 100vh);
}

.qrcodeRender {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.qrcodeView :global(#reader) {
  width: 100%;
  height: 100%;
}

.qrcodeView :global(video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>





