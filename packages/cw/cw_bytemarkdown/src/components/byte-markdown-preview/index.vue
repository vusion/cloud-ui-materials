<template>
  <div :class="$style.root">
    <div :class="$style.markdown">
      <Viewer :value="text" :plugins="plugins" />
    </div>
    <div ref="toc" :class="$style.mdToc" v-if="!isIDE" />
    <div id="fixedSelector" hidden v-if="!isIDE" />
  </div>
</template>
<script>
import { Viewer } from '@bytemd/vue'
// 主要css
import test from './test.md?raw';
/**
 * 插件
 */
// 支持缩放图像和中断（没看懂这个中断插件是干啥的）
import breaks from '@bytemd/plugin-breaks'
import mediumZoom from '@bytemd/plugin-medium-zoom'
// 语法解析
import gfm from '@bytemd/plugin-gfm'
// 高亮
import highlight from '@bytemd/plugin-highlight'
// meta信息编辑
import frontmatter from '@bytemd/plugin-frontmatter'
// 数学公式
import math from '@bytemd/plugin-math'
// 流程图
import mermaid from '@bytemd/plugin-mermaid'
// emoji表情
import gemoji from '@bytemd/plugin-gemoji'

import TocHelper from 'toc-helper'

const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  mediumZoom()
]
export default {
  name: 'byte-markdown-preview',
  components: {
    Viewer
  },
  props: {
    text: {
      type: String,
      default: test
    },
  },
  data() {
    return {
      plugins,
      isIDE: this.$env ? this.$env.VUE_APP_DESIGNER : process.env.VUE_APP_DESIGNER
    }
  },
  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          this.initToc()
        })
      },
      immediate: true
    }
  },
  methods: {
    initToc() {
      this.$refs.toc.innerHTML = ''
      const toc = new TocHelper(this.$refs.toc, {
        contentSelector: `.${this.$style.markdown} .markdown-body`,
        fixedSelector: '#fixedSelector',
        scrollSelector: `.${this.$style.markdown}`
      })
      toc.reset()
    }
  }
};
</script>
<style module>
@import url('./bytemd.css');
.root {
  position: relative;
  width: 100%;
  height: 100%;
}

.markdown {
  width: 70%;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
}

.markdown::-webkit-scrollbar {
  display: none;
}



.mdToc {
  position: absolute;
  top: 200px;
  right: 9px;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #5E6D82;
}
</style>

<style>
.bitoc-nav a:hover, .bitoc-nav a.active {
  color: var(--brand-primary-dark) !important;
}

.bitoc-nav a:before {
  display: none;
}
</style>
