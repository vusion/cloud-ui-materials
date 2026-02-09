<template>
  <div :class="[$style.printView, hideOnScreen && !isDesigner ? $style.printViewHidden : '']" ref="printBlock"
    :style="rootStyle">
    <div v-if="loading" :class="$style.printLoading">
      <span :class="$style.loadingText">正在生成打印内容，请稍候...</span>
    </div>
    <div :class="$style.printRoom" vusion-slot-name="default" ref="printContent" s-empty="true">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import HgHtml2Print from './hg-html2print.js';

const ORIENTATION_MAP = { vertical: 'p', horizontal: 'l' };
// A4 纸张尺寸（pt），与 hg-html2print.js 一致，保证容器与 PDF 宽高比例一致
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
/** 1 CSS px = 0.75 pt（96dpi 下 72pt=96px），与打印逻辑 pxToPt 一致 */
const PT_PER_PX = 0.75;

export default {
  name: 'hg-print-block',
  props: {
    printDirection: {
      type: String,
      default: 'vertical',
    },
    yBorder: {
      type: Number,
      default: 10,
    },
    xBorder: {
      type: Number,
      default: 10,
    },
    hideOnScreen: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { loading: false };
  },
  computed: {
    isDesigner() {
      return false;
    },
    rootStyle() {
      const yPt = Number(this.yBorder);
      const xPt = Number(this.xBorder);
      const safeYPt = Math.max(0, Number.isNaN(yPt) ? 10 : yPt);
      const safeXPt = Math.max(0, Number.isNaN(xPt) ? 10 : xPt);

      const isLandscape = this.printDirection === 'horizontal';
      const pageWidthPt = isLandscape ? A4_HEIGHT_PT : A4_WIDTH_PT;
      // 容器总宽度（px）= 页宽(pt)/PT_PER_PX，使内容区宽度 = (pageWidthPt - 2*safeXPt)/PT_PER_PX，与 PDF 内容区一致
      const totalWidthPx = pageWidthPt / PT_PER_PX;

      return {
        width: `${totalWidthPx}px`,
        padding: `${safeYPt}pt ${safeXPt}pt`,
        margin: '0 auto',
        minHeight: '10px',
        boxSizing: 'border-box',
      };
    },
  },
  methods: {
    async print() {
      const orientation = ORIENTATION_MAP[this.printDirection] || 'p';
      const params = {
        orientation,
        baseX: this.xBorder,
        baseY: this.yBorder,
        debug: this.debug,
      };
      const el = this.$refs.printContent;
      if (!el) return;
      const printer = new HgHtml2Print(el, params);
      try {
        this.loading = true;
        await printer.print();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style module>
.printRoom {
  flex: 1 1 auto;
  box-sizing: border-box;
  position: relative;
}

.printView {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  padding: 10px;
}

.printViewHidden {
  position: fixed;
  left: -10000px;
  top: -10000px;
  pointer-events: none;
  opacity: 0;
  z-index: -1;
}

.printLoading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.loadingText {
  font-size: 14px;
  color: #666;
}

.printView>div[s-empty]:empty {
  position: relative;
  min-height: 60px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.printView>.printRoom[s-empty]:empty::before {
  content: '请添加打印内容';
}
</style>
