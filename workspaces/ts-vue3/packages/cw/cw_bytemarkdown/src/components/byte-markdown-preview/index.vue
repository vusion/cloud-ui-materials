<template>
  <div :class="$style.wrap">
    <Viewer :value="text" :plugins="viewerPlugins" :sanitize="sanitize" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Viewer } from '@bytemd/vue-next';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';
import breaks from '@bytemd/plugin-breaks';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import frontmatter from '@bytemd/plugin-frontmatter';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';
import { codeBlockPlugin, modifyHrefTargetPlugin } from './plugin';

defineOptions({ name: 'byte-markdown-preview' });

const props = withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: '',
  },
);

const viewerPlugins = computed(() => [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  modifyHrefTargetPlugin(),
  codeBlockPlugin(),
]);

const sanitize = {
  tagNames: ['iframe'],
  attributes: {
    iframe: [
      'src',
      'style',
      'title',
      'all',
      'sandbox',
      'scrolling',
      'border',
      'frameborder',
      'framespacing',
      'allowfullscreen',
    ],
  },
};
</script>

<style module>
.wrap {
  position: relative;
  width: 100%;
}
</style>

<style>
.markdown-body {
  background-color: transparent;
}

.bytemd,
.bytemd-preview {
  background-color: transparent;
}
</style>
