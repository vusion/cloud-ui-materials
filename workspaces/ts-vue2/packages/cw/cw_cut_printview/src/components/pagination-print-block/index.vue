<template>
  <div :class="[$style.printView, (hideOnScreen && !$env.VUE_APP_DESIGNER) ? $style.printViewHidden : '']" ref="printBlock" :style="{
    width: viewWidth,
    'min-height': '10px',
    padding: yBorder + 'pt ' + xBorder + 'pt'
  }">
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
  },
  computed: {
    viewWidth() {
      return this.isRate ? '100%' : this.pageWidth + 'mm';
    },
    viewHeight() {
      return this.isRate ? '100%' : this.pageHeight + 'mm';
    },
  },
  methods: {
    print() {
      const params = this.generatePrintParams();
      const printObj = new HTML2PRINT(this.$refs.printContent, params);
      printObj.print();
    },
    generatePrintParams() {
      const params = {
        direction: this.pageDirection,
        format: this.pageFormat,
        pagerWidth: mmToPt(this.pageWidth, DEFAULT_DPI),
        pagerHeight: mmToPt(this.pageHeight, DEFAULT_DPI),
        baseY: this.yBorder,
        baseX: this.xBorder,
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
}

.printViewHidden {
  position: fixed;
  left: -10000px;
  top: -10000px;
  pointer-events: none;
  opacity: 0;
  z-index: -1;
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
