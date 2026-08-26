<template>
  <div :class="$style.rootRecord">
    <div v-if="isShowWave" ref="canvasParentRef" :class="$style.canvasParent">
      <canvas ref="audioCanvasRef"></canvas>
    </div>
    <div :class="$style.customToolbar" vusion-slot-name="default">
      <slot></slot>
      <div v-if="!$slots.default && isDesigner" style="color:#ccccccd0;padding: 5px;">
        请拖入需要的工具按钮
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import Recorder from 'js-audio-recorder';
import { onMounted, onUnmounted, ref } from 'vue';
import { convertToMp3 } from './utils';

export interface CwAudioRecordProps {
  isShowWave?: boolean;
  sampleRateOptions?: number;
  sampleBitOptions?: number;
  channelOptions?: number;
  maxFileSize?: number;
  uploadUrl?: string;
  waveColor?: string;
  waveBgColor?: string;
}

const props = withDefaults(defineProps<CwAudioRecordProps>(), {
  isShowWave: true,
  sampleRateOptions: 16000,
  sampleBitOptions: 16,
  channelOptions: 1,
  maxFileSize: 10,
  uploadUrl: '/gateway/lowcode/api/v1/app/upload',
  waveColor: 'rgb(0, 0, 0)',
  waveBgColor: 'rgb(200, 200, 200)',
});

const emit = defineEmits<{
  onUploadSuccess: [value: unknown];
  onUploadError: [value: string];
}>();

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;

const canvasParentRef = ref<HTMLDivElement | null>(null);
const audioCanvasRef = ref<HTMLCanvasElement | null>(null);
const canvasCtx = ref<CanvasRenderingContext2D | null>(null);
const drawRecordId = ref<number | null>(null);
const isRecording = ref(false);
const duration = ref(0);
const fileSize = ref(0);
const recorder = ref<InstanceType<typeof Recorder> | null>(null);

function initCanvas() {
  if (drawRecordId.value) {
    cancelAnimationFrame(drawRecordId.value);
  }
  configCanvas();
}

function configCanvas() {
  const parentElement = canvasParentRef.value;
  const canvas = audioCanvasRef.value;
  if (!parentElement || !canvas) return;

  canvas.width = parentElement.clientWidth;
  canvas.height = parentElement.clientHeight;
  canvasCtx.value = canvas.getContext('2d');
  if (!canvasCtx.value) return;

  canvasCtx.value.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.value.fillStyle = props.waveBgColor;
  canvasCtx.value.fillRect(0, 0, canvas.width, canvas.height);
  canvasCtx.value.lineWidth = 2;
  canvasCtx.value.strokeStyle = props.waveColor;
  canvasCtx.value.beginPath();
}

async function deleteRecord() {
  if (recorder.value) {
    await recorder.value.destroy();
    recorder.value = null;
    if (drawRecordId.value) {
      cancelAnimationFrame(drawRecordId.value);
    }
  }
}

async function startRecord() {
  const config = {
    sampleRate: props.sampleRateOptions,
    sampleBit: props.sampleBitOptions,
    channelCount: props.channelOptions,
  };
  if (recorder.value) {
    await deleteRecord();
  }
  recorder.value = new Recorder(config);
  recorder.value.start().then(
    () => {
      isRecording.value = true;
    },
    (error: Error) => {
      console.log(`异常了,${error.name}:${error.message}`);
    },
  );

  recorder.value.onprogress = (params: { duration: number; fileSize: number }) => {
    duration.value = Number(params.duration.toFixed(2));
    fileSize.value = params.fileSize;
    if (fileSize.value >= props.maxFileSize * 1024 * 1024) {
      stopRecord();
      console.log('录音文件超过最大限制');
    }
  };

  drawRecord();
}

async function uploadRecord(type = 'wav') {
  if (recorder.value && !isRecording.value && props.uploadUrl) {
    const authorization = getCookie('authorization');
    const formData = new FormData();
    const blob = getAudioData(type);
    const file = new File([blob], `recordFile_${new Date().getTime()}.${type}`, { type });
    formData.append('file', file);
    const headers = authorization
      ? { Authorization: authorization, 'Content-Type': `multipart/form-data; boundary=${(formData as any)._boundary}` }
      : {};
    const r = await axios.post(props.uploadUrl || '/gateway/lowcode/api/v1/app/upload', formData, { headers });
    if (r.data.code === 200) {
      emit('onUploadSuccess', r.data.result);
    } else {
      emit('onUploadError', r.data.message);
    }
  }
}

function getAudioData(type: string) {
  if (!recorder.value) return new Blob();
  const map: Record<string, Blob> = {
    wav: recorder.value.getWAVBlob(),
    pcm: recorder.value.getPCMBlob(),
    mp3: convertToMp3(recorder.value.getWAV(), recorder.value),
  };
  return map[type];
}

function pauseRecord() {
  if (recorder.value) {
    recorder.value.pause();
    isRecording.value = false;
    if (drawRecordId.value) {
      cancelAnimationFrame(drawRecordId.value);
    }
    drawRecordId.value = null;
  }
}

function resumeRecord() {
  if (recorder.value) {
    recorder.value.resume();
    isRecording.value = true;
    drawRecord();
  }
}

function stopRecord() {
  if (recorder.value) {
    recorder.value.stop();
    isRecording.value = false;
    if (drawRecordId.value) {
      cancelAnimationFrame(drawRecordId.value);
    }
    drawRecordId.value = null;
  }
}

function downloadRecord(type = 'wav') {
  if (isRecording.value) {
    return;
  }
  const map: Record<string, () => void> = {
    wav: downloadWAV,
    pcm: downloadPCM,
    mp3: downloadMP3,
  };

  if (map[type]) {
    map[type]();
  } else {
    console.log('不支持的下载类型');
  }
}

function downloadWAV() {
  if (isRecording.value) {
    return;
  }
  recorder.value?.downloadWAV();
}

function downloadPCM() {
  if (isRecording.value) {
    return;
  }
  recorder.value?.downloadPCM();
}

function getCookie(cname: string) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function downloadMP3() {
  if (isRecording.value) {
    return;
  }
  if (recorder.value) {
    const mp3Blob = convertToMp3(recorder.value.getWAV(), recorder.value);
    recorder.value.download(mp3Blob, 'recorder', 'mp3');
  }
}

function drawRecord() {
  const oCanvas = audioCanvasRef.value;
  if (!oCanvas || !recorder.value || !canvasCtx.value) return;

  configCanvas();
  const dataArray = recorder.value.getRecordAnalyseData();
  const bufferLength = dataArray.length;
  const sliceWidth = (oCanvas.width * 1.0) / bufferLength;
  let x = 0;
  drawRecordId.value = requestAnimationFrame(drawRecord);

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * oCanvas.height) / 2;

    if (i === 0) {
      canvasCtx.value.moveTo(x, y);
    } else {
      canvasCtx.value.lineTo(x, y);
    }
    x += sliceWidth;
  }

  canvasCtx.value.lineTo(oCanvas.width, oCanvas.height / 2);
  canvasCtx.value.stroke();
}

onMounted(() => {
  if (props.isShowWave) {
    initCanvas();
  }
});

onUnmounted(() => {
  deleteRecord();
});

defineExpose({
  startRecord,
  stopRecord,
  pauseRecord,
  resumeRecord,
  uploadRecord,
  downloadRecord,
  downloadWAV,
  downloadPCM,
  downloadMP3,
  deleteRecord,
});
</script>

<style module>
.rootRecord {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.canvasParent {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.customToolbar {
  min-width: 100%;
}
</style>
