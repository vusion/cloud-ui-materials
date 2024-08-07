<template>
  <div :class="$style.root">
    <div :class="$style.markdown">
      <Viewer :value="text" :plugins="plugins" :sanitize="sanitize" />
    </div>
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
import { tocPlugin, modifyHrefTargetPlugin, codeBlockPlugin } from './plugin'

// import TocHelper from 'toc-helper'

const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  mediumZoom(),
  modifyHrefTargetPlugin(),
  codeBlockPlugin(),
  tocPlugin()
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
  mounted() {
    this.$nextTick(() => {
      this.initToc();
    });
  },
  data() {
    return {
      plugins,
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
  },
  methods: {
    initToc() {
      const tocLinks = this.$el.querySelectorAll('nav.toc .toc-link');
      this.headings = this.$el.querySelectorAll(
        '.markdown-body :where(h2, h3, h4, h5, h6)',
      );
      const top = this.$el.getBoundingClientRect().top;

      this.observer = new IntersectionObserver((entries) => {
        let activeLink = null;
        // 每当内容里面的标题元素发生改变时，先把目录重置
        tocLinks.forEach((el) => {
          el.classList.remove('toc-link-active');
        });

        // 从后往前找，找到最后一个 top <= 0的（即不在可视区内）
        // 当前位置的索引即为需要高亮目录的索引，不再往后找了
        for (let i = this.headings.length - 1; i >= 0; i--) {
          if (this.headings[i].getBoundingClientRect().top <= top) {
            tocLinks[i].classList.add('toc-link-active');
            activeLink = i;
            break;
          }
        }

        if (activeLink === null) {
          tocLinks[0].classList.add('toc-link-active');
        }
      }, {
        root: this.$el.querySelector(`.${this.$style.root}`),
      });

      this.headings.forEach((el) => {
        this.observer.observe(el);
      });
    },
    destroyed() {
        if (this.observer) {
          this.headings.forEach((el) => {
            this.observer.unobserve(el);
          });
          this.observer.disconnect();
        }
    },

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



.mdToc {}
</style>

<style>
/* 自动生成目录插件后，自定义目录样式 */

/* 隐藏目录列表项前面的样式 */
.markdown-body>.toc :where(ol):not(:where([class~='not-prose'] *)) {
  list-style-type: none;
}

nav.toc {
  position: absolute;
  top: 80px;
  right: 9px;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #5E6D82;
}

nav.toc .toc-item {
  cursor: pointer;
}

nav.toc .toc-link-active {
  color: var(--brand-primary-dark) !important;
}

nav.toc ol.toc-level {
  padding-left: 1rem;
}

.medium-zoom-image {
  width: 100%;
  height: 100%;
}

.medium-zoom--opened,
.medium-zoom-overlay {
  z-index: 1000;
}

.medium-zoom-image--opened {
  z-index: 1001;
}
</style>
