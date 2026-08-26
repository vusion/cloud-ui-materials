<template>
  <div ref="verifyRoomRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { GVerify } from '../../lib/verifyCode';

export interface CwVerifycodeViewProps {
  value?: string;
  type?: string;
}

const props = withDefaults(defineProps<CwVerifycodeViewProps>(), {
  type: 'number',
});

const verifyRoomRef = ref<HTMLDivElement | null>(null);
const verifyCode = ref<GVerify | null>(null);

function validate() {
  return verifyCode.value?.validate(props.value ?? '');
}

function refresh() {
  verifyCode.value?.refresh();
}

onMounted(() => {
  const el = verifyRoomRef.value;
  if (!el) return;
  const width = el.clientWidth || 80;
  const height = el.clientHeight || 30;
  const id = new Date().valueOf().toString();
  el.id = id;
  console.log(props.type);
  verifyCode.value = new GVerify({
    id,
    width,
    height,
    type: props.type as 'blend' | 'number' | 'letter',
  });
});

onUnmounted(() => {
  const el = verifyRoomRef.value;
  if (el) {
    el.innerHTML = '';
    el.removeAttribute('id');
  }
  verifyCode.value = null;
});

defineExpose({
  validate,
  refresh,
});
</script>

<style></style>
