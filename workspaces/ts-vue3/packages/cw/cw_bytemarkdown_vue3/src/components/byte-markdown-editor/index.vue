<template>
  <Editor
    ref="editorRoot"
    class="editos"
    :class="{ 'event-disabled': isDesigner }"
    :locale="zhHans"
    :value="value"
    :plugins="plugins"
    :upload-images="uploadImage"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { markRaw, onMounted, ref } from 'vue';
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
  change: [event: { value: string }];
  'update:value': [value: string];
}>();

const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;

const plugins = markRaw([
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  mediumZoom(),
]);

const editorRoot = ref<InstanceType<typeof Editor> | null>(null);

async function upload(file: File) {
  const authorization = cookie.get('authorization');
  const headers = authorization
    ? {
        Authorization: authorization,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

  const formData = new FormData();
  formData.append('file', new File([file], file.name, { type: file.type }));

  try {
    const response = await axios.post(props.uploadUrl, formData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

async function uploadImage(files: File[]) {
  try {
    const uploadPromises = files.map((file) => upload(file));
    const responses = await Promise.all(uploadPromises);
    return responses.map((res) => ({
      title: res.filePath,
      url: res.filePath,
    }));
  } catch (error) {
    console.error('Error uploading images:', error);
    return [];
  }
}

function onChange(value: string) {
  console.log('value', value);
  emit('change', { value });
  emit('update:value', value);
}

onMounted(() => {
  const host =
    (editorRoot.value as any)?.$el instanceof HTMLElement
      ? (editorRoot.value as any).$el
      : null;
  if (!host) {
    return;
  }
  const sourceEl = host.querySelector(
    ".bytemd-toolbar-right [bytemd-tippy-path='5']",
  ) as HTMLElement | null;
  if (sourceEl) {
    sourceEl.style.display = 'none';
  }
});
</script>

<style lang="less">
.event-disabled {
  pointer-events: none;
}

.bytemd {
  height: 100%;
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

.event-disabled {
  pointer-events: none;
}
</style>
