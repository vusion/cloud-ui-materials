<template>
  <div
    ref="editorContainer"
    :class="[$style.root, { [$style.designer]: isDesigner, [$style.error]: hasError }]"
  >
    <div ref="monacoContainer" :class="$style.editor"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useJsonMonacoEditor, type JsonMonacoEditorProps } from './useJsonMonacoEditor';

const props = withDefaults(defineProps<JsonMonacoEditorProps>(), {
  value: '',
  placeholder: null,
  attrThreshold: 0,
});

const emit = defineEmits<{
  'update:value': [value: string];
  change: [payload: { newValue: string; oldValue: string }];
  error: [errorMessage: string];
  onMaxLength: [];
}>();

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;

const editorContainer = ref<HTMLDivElement | null>(null);
const monacoContainer = ref<HTMLDivElement | null>(null);

const { hasError, loadMonacoEditor } = useJsonMonacoEditor(
  props,
  emit,
  editorContainer,
  monacoContainer,
);

defineExpose({
  loadMonacoEditor,
});
</script>

<style module>
.root {
  position: relative;
  width: 100%;
  min-width: 500px;
}
.editor {
  width: 100%;
  min-width: auto;
  height: auto;
  min-height: 200px;

  [class='overflow-guard'] {
    border: 1px solid #e5e5e5;
  }

  [class='overflow-guard'] [class='margin'] {
    background-color: #e5e5e5;
  }

  [class='minimap-decorations-layer'] {
    border-left: 1px solid #e4e4e4;
  }
}

.error .editor {
  [class='overflow-guard'] {
    border: 1px solid #f24957 !important;
  }
}

.placeholder {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #999;
  pointer-events: none;
  font-style: italic;
  z-index: 1;
}
.designer::before {
  content: '发布预览后使用';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 16px;
  z-index: 1;
  pointer-events: none;
}
</style>
