<template>
  <span :class="$style.root">{{ formatted }}</span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

defineOptions({ name: 'cx-countup' });

const props = withDefaults(
  defineProps<{
    start?: number;
    end?: number;
    duration?: number;
    loop?: boolean;
    delay?: number;
    isGroup?: boolean;
  }>(),
  {
    start: 0,
    end: 0,
    duration: 2,
    loop: false,
    delay: 1,
    isGroup: false,
  },
);

const display = ref(props.start);
let rafId = 0;
let delayId = 0;
let animStartMs = 0;

function easeOutQuad(t: number) {
  return 1 - (1 - t) * (1 - t);
}

function formatValue(n: number) {
  if (props.isGroup) {
    return Math.round(n).toLocaleString('zh-CN');
  }
  const r = Math.round(n * 100) / 100;
  if (Number.isInteger(r)) {
    return String(r);
  }
  return String(r);
}

const formatted = computed(() => formatValue(display.value));

function cancelAnim() {
  cancelAnimationFrame(rafId);
  clearTimeout(delayId);
  rafId = 0;
  delayId = 0;
}

function scheduleLoop() {
  if (!props.loop) {
    return;
  }
  const waitMs = Math.max(0, props.delay) * 1000;
  delayId = window.setTimeout(() => {
    delayId = 0;
    display.value = props.start;
    animStartMs = performance.now();
    rafId = requestAnimationFrame(tick);
  }, waitMs);
}

function tick(now: number) {
  const elapsedSec = (now - animStartMs) / 1000;
  const dur = Math.max(0.001, props.duration);
  const t = Math.min(1, elapsedSec / dur);
  const eased = easeOutQuad(t);
  display.value = props.start + (props.end - props.start) * eased;

  if (t < 1) {
    rafId = requestAnimationFrame(tick);
  } else {
    rafId = 0;
    display.value = props.end;
    scheduleLoop();
  }
}

function run() {
  cancelAnim();
  display.value = props.start;
  animStartMs = performance.now();
  rafId = requestAnimationFrame(tick);
}

watch(
  () => [props.start, props.end, props.duration, props.loop, props.delay],
  run,
  { immediate: true },
);

</script>

<style module>
.root {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
}
</style>
