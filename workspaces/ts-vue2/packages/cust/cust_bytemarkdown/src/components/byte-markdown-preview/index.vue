<template>
  <div :class="['markdown-preview-wrapper', { 'has-toc': showToc }]">
    <Viewer :value="text" :plugins="plugins" :sanitize="sanitize" />
  </div>
</template>
<script>
import { Viewer } from '@bytemd/vue'
// 主要css
import 'bytemd/dist/index.css'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'
import test from './test.md?raw';

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
import { modifyHrefTargetPlugin, codeBlockPlugin, tocPlugin } from './plugin'

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
    showToc: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    plugins() {
      const plugins = [
        gfm(),
        highlight(),
        frontmatter(),
        math(),
        mermaid(),
        gemoji(),
        breaks(),
        // mediumZoom(),
        modifyHrefTargetPlugin(),
        codeBlockPlugin(),
      ];

      if (this.showToc) {
        plugins.push(tocPlugin());
      }

      return plugins;
    }
  },
  data() {
    return {
      sanitize: {
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
      },
      isIDE: this.$env ? this.$env.VUE_APP_DESIGNER : process.env.VUE_APP_DESIGNER
    }
  }
};
</script>


<style>
/* 容器布局 */
.markdown-preview-wrapper {
  position: relative;
  width: 100%;
}

/* 核心修复：给 markdown-body 设置相对定位和 padding */
.markdown-preview-wrapper.has-toc .markdown-body {
  padding-right: 220px !important; /* 强制留出目录宽度 */
  position: relative !important;
}

/* 移除之前不生效的子元素 margin 限制 */
.markdown-preview-wrapper.has-toc .markdown-body > *:not(.toc-container) {
  margin-right: 0 !important;
}

/* 目录容器样式 */
.toc-container {
  position: absolute !important;
  right: 0 !important;
  top: 0;
  width: 200px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 0 16px 16px 16px;
  border-left: 1px solid #e8e8e8;
  font-size: 14px;
  background-color: #fff !important; /* 使用实色白色背景遮挡底层横线 */
  z-index: 10;
}

/* 目录标题 */
.toc-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

/* 目录列表样式 */
.toc-container nav.toc ul {
  list-style: none;
  padding-left: 12px;
  margin: 0;
}

.toc-container nav.toc > ul {
  padding-left: 0;
}

.toc-container nav.toc li {
  margin-bottom: 8px;
}

.toc-container nav.toc a {
  text-decoration: none;
  color: #007bff; /* 蓝色链接 */
  display: block;
  line-height: 1.4;
}

.toc-container nav.toc a:hover {
  text-decoration: underline;
}

/* 覆盖 github-markdown-css 默认白色背景，保持预览区透明 */
.markdown-body {
  background-color: transparent !important;
}

/* 若容器使用了 bytemd 相关包裹，也保持透明 */
.bytemd,
.bytemd-preview {
  background-color: transparent !important;
}
</style>
