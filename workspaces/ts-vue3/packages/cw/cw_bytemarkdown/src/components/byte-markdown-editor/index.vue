<template>
  <Editor
    class="byte-md-editor-root"
    :locale="zhHans"
    :value="value"
    :plugins="editorPlugins"
    :uploadImages="uploadImage"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import axios from 'axios';
import cookie from 'js-cookie';
import 'bytemd/dist/index.css';
import { Editor } from '@bytemd/vue-next';
import zhHans from 'bytemd/locales/zh_Hans.json';
import breaks from '@bytemd/plugin-breaks';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';
import { onMounted } from 'vue';

defineOptions({ name: 'byte-markdown-editor' });

const editorPlugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  mediumZoom(),
];

const props = withDefaults(
  defineProps<{
    value?: string;
    uploadUrl?: string;
  }>(),
  {
    value: '',
    uploadUrl: '/gateway/lowcode/api/v1/app/upload',
  },
);

const emit = defineEmits<{
  'update:value': [string];
  change: [string];
}>();

async function upload(file: File) {
  const authorization = cookie.get('authorization');
  const headers: Record<string, string> = authorization
    ? { Authorization: authorization }
    : {};
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(props.uploadUrl, formData, {
    headers,
  });
  return response.data;
}

async function uploadImage(files: File[]) {
  try {
    const responses = await Promise.all(files.map((file) => upload(file)));
    return responses.map((res) => ({
      title: res.filePath,
      url: res.filePath,
    }));
  } catch (error) {
    console.error('Error uploading images:', error);
    return [];
  }
}

function handleChange(v: string) {
  emit('change', v);
  emit('update:value', v);
}

onMounted(() => {
  const root = document.querySelector('.byte-md-editor-root');
  if (root) {
    const sourceEl = root.querySelector(".bytemd-toolbar-right [bytemd-tippy-path='5']");
    if (sourceEl instanceof HTMLElement) {
      sourceEl.style.display = 'none';
    }
  }
});
</script>

<style lang="less">
.bytemd {
  height: 100%;
}
.bytemd-status{
  height: 24px;
  border: none;
}

/* 右侧预览区背景 */
.byte-md-editor-root {
  .bytemd-preview,
  .bytemd-preview .markdown-body {
    background-color: var(--cw-style-background-color, #fff);
  }
}

.markdown-body {
  pre {
    position: relative;

    &:hover {
      .operate-btn {
        position: absolute;
        top: 2px;
        right: 2px;
        display: inline-flex;
        padding: 5px;

        .lang-btn {
          background-color: white;
          margin-right: 5px;
          padding: 2px;
        }

        .copy-btn {
          &.copy-success {
            background-color: aquamarine;
          }

          background-color: white;
          padding: 2px;
          display: inline-flex;
          cursor: pointer;
        }
      }
    }

    .operate-btn {
      position: absolute;
      top: 2px;
      right: 2px;
      padding: 5px;

      .copy-btn {
        display: none;
      }

      .lang-btn {
        background-color: white;
        margin-right: 5px;
        padding: 2px;
      }
    }
  }
}

.bytemd-fullscreen.bytemd {
  z-index: 1000;
}
</style>
