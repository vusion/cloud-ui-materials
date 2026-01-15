<template>
  <div :class="[$style.printView, (hideOnScreen && !$env.VUE_APP_DESIGNER) ? $style.printViewHidden : '']"
    ref="printBlock" :style="{
      'min-height': '10px',
      padding: yBorder + 'pt ' + xBorder + 'pt'
    }">
    <div v-if="loading" :class="$style.printLoading">
      <svg :class="$style.spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
      </svg>
      <span :class="$style.loadingText">正在生成打印内容，请稍候...</span>
    </div>
    <div :class="$style.printRoom" vusion-slot-name="default" ref="printContent" s-empty="true">
      <slot></slot>
    </div>
  </div>
</template>
<script>
function px2mm(px, dpi) {
  let radio = 4;
  if (px == null) return 0;
  dpi = dpi || printParams.dpi;
  const ret = parseFloat(`${(px * 254) / (dpi * 10)}`);
  radio = 10 ** radio;
  return Math.ceil(Math.floor(ret * radio) / radio);
}


const getDeviceDPI = () => {
  return (window.devicePixelRatio * 2 || 2) * 72;
};

function mmToPx(mm, dpi = getDeviceDPI()) {
  return Math.ceil(mm * 2.83);
}

function mmToPt(mm) {
  return mm / 25.4 * 72;
}

function pxToPt(px) {
  return px * 72 / 96;
}

const DEFAULT_DPI = 96;
const PAGER_SIZE = {
  a4: {
    width: '210mm',
    height: '297mm'
  },
  a5: {
    width: '148mm',
    height: '210mm'
  },
  a3: {
    width: '297mm',
    height: '420mm'
  },
  b3: {
    width: '353mm',
    height: '500mm'
  },
  b4: {
    width: '250mm',
    height: '353mm'
  },
  b5: {
    width: '176mm',
    height: '250mm'
  }
}


import HTML2PRINT from './html2print.js';
export default {
  name: 'pagination-print-block',
  props: {
    paperSize: {
      type: String,
      default: 'a4'
    },
    pageWidth: {
      type: Number,
      default: 210
    },
    pageHeight: {
      type: Number,
      default: 297
    },
    xBorder: {
      type: Number,
      default: 10
    },
    yBorder: {
      type: Number,
      default: 10
    },
    isRate: {
      type: Boolean,
      default: false
    },
    hideOnScreen: {
      type: Boolean,
      default: false
    },
    printDirection: {
      type: String,
      default: 'vertical'
    },
    debug: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    viewWidth() {
      return this.isRate ? '100%' : this.pageWidth + 'mm';
    },
    viewHeight() {
      return this.isRate ? '100%' : this.pageHeight + 'mm';
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async print() {
      const params = this.generatePrintParams();
      const printObj = new HTML2PRINT(this.$refs.printContent, params);
      try {
        this.loading = true;
        await printObj.print();
      } finally {
        this.loading = false;
      }
    },
    generatePrintParams() {
      // 映射 printDirection ('vertical'/'horizontal') 到 defaultOrientation ('p'/'l')
      const orientationMap = {
        'vertical': 'p',
        'horizontal': 'l'
      };
      const defaultOrientation = orientationMap[this.printDirection] || 'p';

      const params = {
        defaultOrientation: defaultOrientation,
        format: this.pageFormat,
        pagerWidth: mmToPt(this.pageWidth, DEFAULT_DPI),
        pagerHeight: mmToPt(this.pageHeight, DEFAULT_DPI),
        baseY: this.yBorder,
        baseX: this.xBorder,
        debug: this.debug,
      }
      return params;
    }
  }
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
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
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
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
}

.loadingText {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}

.spinner {
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
}

.spinner .path {
  stroke: #409EFF;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.printView>div[s-empty]:empty {
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  text-align: left;
  background: #fff;
  line-height: 1.4;
  padding: 10px 18px 10px 10px;
  text-align: center;
  width: 100%;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
}

.printView>div[s-empty]:empty::before {
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

.printView>.printRoom[s-empty]:empty::before {
  content: "+请添加打印内容";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}
</style>
