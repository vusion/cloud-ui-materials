<template>
  <div :class="$style.root">
    <div v-if="label" :class="$style.label">{{ label }}</div>
    <div v-if="!withoutInput" :class="$style.inputRow">
      <input
        v-if="showNativeColorInput"
        :class="$style.nativeColor"
        type="color"
        :value="nativeColorValue"
        @input="onNativeInput"
      />
      <input
        :class="$style.textInput"
        type="text"
        v-model="localText"
        @change="onTextChange"
      />
    </div>
    <div v-if="!hidePalette" :class="$style.palette">
      <button
        v-for="(c, i) in normalizedPalette"
        :key="i"
        type="button"
        :class="$style.swatch"
        :style="{ backgroundColor: c }"
        :title="c"
        @click="pick(c)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const DEFAULT_PALETTE = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#795548',
] as const;

export interface FdddfColorpickerProps {
  value?: string;
  colors?: string[];
  label?: string;
  hidePalette?: boolean;
  withoutInput?: boolean;
}

const props = withDefaults(defineProps<FdddfColorpickerProps>(), {
  value: '#000000',
  colors: () => [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#795548',
  ],
  label: 'ColorPicker',
  hidePalette: false,
  withoutInput: false,
});

const emit = defineEmits<{
  'update:value': [v: string];
  change: [event: { value: string }];
}>();

const localText = ref(props.value ?? '#000000');

watch(
  () => props.value,
  (v) => {
    localText.value = v ?? '#000000';
  },
);

const normalizedPalette = computed(() => {
  const list = props.colors;
  if (!Array.isArray(list) || list.length === 0) {
    return [...DEFAULT_PALETTE];
  }
  return list.filter(Boolean);
});

const showNativeColorInput = computed(() => /^#([0-9a-fA-F]{6})$/.test((localText.value || '').trim()));

const nativeColorValue = computed(() => {
  const m = /^#([0-9a-fA-F]{6})$/.exec((localText.value || '').trim());
  return m ? m[0] : '#000000';
});

function commit(next: string) {
  const v = (next || '').trim() || '#000000';
  localText.value = v;
  emit('update:value', v);
  emit('change', { value: v });
}

function pick(hex: string) {
  commit(hex);
}

function onTextChange() {
  commit(localText.value);
}

function onNativeInput(e: Event) {
  const el = e.target as HTMLInputElement;
  if (el?.value) {
    commit(el.value);
  }
}
</script>

<style module>
.root {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  font-size: 14px;
  color: var(--cw-color-text, #333);
}

.label {
  font-weight: 500;
}

.inputRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nativeColor {
  width: 36px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--cw-color-border, #dcdfe6);
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.textInput {
  flex: 1;
  min-width: 0;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--cw-color-border, #dcdfe6);
  border-radius: 4px;
  outline: none;
}

.textInput:focus {
  border-color: var(--cw-color-primary, #409eff);
}

.palette {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.swatch {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.swatch:focus-visible {
  outline: 2px solid var(--cw-color-primary, #409eff);
  outline-offset: 1px;
}
</style>
