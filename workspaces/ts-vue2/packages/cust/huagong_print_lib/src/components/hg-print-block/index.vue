<template>
  <div :class="[$style.printView, hideOnScreen && !$env?.VUE_APP_DESIGNER ? $style.printViewHidden : '']"
    ref="printBlock" :style="rootStyle">
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
// A4 纸张：竖向宽 210mm，高 297mm；横向反之
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

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
    rootStyle() {
      // 将边距和宽度统一按 mm 解释，使设计时就以实际纸张尺寸为准
      const yMm = Number(this.yBorder);
      const xMm = Number(this.xBorder);
      const safeYMm = Math.max(0, Number.isNaN(yMm) ? 10 : yMm);
      const safeXMm = Math.max(0, Number.isNaN(xMm) ? 10 : xMm);

      // 根据横向/竖向限定可视宽度：整体为 A4 宽度减去两侧边距（单位 mm）
      const isLandscape = this.printDirection === 'horizontal';
      const pageWidthMm = isLandscape ? A4_HEIGHT_MM : A4_WIDTH_MM;
      const contentWidthMm = pageWidthMm - 2 * safeXMm;

      return {
        // 这里使用 mm，让浏览器在打印模式下按实际物理尺寸渲染
        padding: `${safeYMm}mm ${safeXMm}mm`,
        width: `${contentWidthMm}mm`,
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
