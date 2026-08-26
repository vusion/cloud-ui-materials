<template>
  <div></div>
</template>

<script setup lang="ts">
import WaterMark from 'wybie-watermark';
import { computed, nextTick, onBeforeUnmount, watch } from 'vue';

let waterMark: any;

export interface CwWatermarkProps {
  type?: string;
  text?: string;
  color?: string;
  fontSize?: number;
  cSpace?: number;
  vSpace?: number;
  opacity?: number;
  src?: string;
}

const props = withDefaults(defineProps<CwWatermarkProps>(), {
  type: 'image',
  text: '',
  color: '#000',
  fontSize: 16,
  cSpace: 20,
  vSpace: 50,
  opacity: 0.1,
  src: '',
});

const config = computed(() => ({
  type: props.type,
  src: props.src,
  opacity: props.opacity,
  text: props.text,
  color: props.color,
  fontSize: props.fontSize,
  cSpace: props.cSpace,
  vSpace: props.vSpace,
}));

watch(
  config,
  (configVal) => {
    nextTick(async () => {
      waterMark && waterMark.remove();
      const initConfig = Object.assign(
        {
          target: document.body,
        },
        configVal.type === 'text'
          ? {
              cSpace: configVal.cSpace,
              vSpace: configVal.vSpace,
              text: configVal.text,
              color: configVal.color,
              fontSize: configVal.fontSize,
              style: {
                opacity: configVal.opacity,
              },
            }
          : {
              image: configVal.src,
              style: {
                opacity: configVal.opacity,
              },
            },
      );
      waterMark = await WaterMark.init(initConfig);
    });
  },
  { immediate: true, deep: true },
);

onBeforeUnmount(() => {
  waterMark.remove();
});
</script>

<style></style>
