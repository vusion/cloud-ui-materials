<template>
  <div :class="$style.printView" ref="printBlock"  v-show="$env.VUE_APP_DESIGNER || isShowPrint" :style="{
    width: isRate ? '100%' : this.pagerDimension['width'],
    padding: yBorder + 'pt ' + xBorder + 'pt'
  }">
    <div vusion-slot-name="header"  v-if="$env.VUE_APP_DESIGNER || showHeader" s-empty="true" :class="[$style.printHeader, {
      [$style.splitBorder]: $env.VUE_APP_DESIGNER 
    }]" ref="printHeader">
      <slot name="header"></slot>
    </div>
    <div :class="$style.printRoom" vusion-slot-name="content" ref="printContent" s-empty="true">
      <slot name="content"></slot>
    </div>
    <div vusion-slot-name="footer" v-if="$env.VUE_APP_DESIGNER || showFooter" ref="printFooter" s-empty="true" :class="[$style.printFooter, {
      [$style.footerBorder]: $env.VUE_APP_DESIGNER 
    }]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import HTML2PRINT from './html2print.js';
import { mmToPt } from './utils.js';
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
export default {
  name: "cw-print-designer",
  props: {
    paperSize: {
      type: String,
      default: 'a4'
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    pageDirection: {
      type: String,
      default: 'v'
    },
    isRate: {
      type: Boolean,
      default: false
    },

    isShowPrint: {
      type: Boolean,
      default: true
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
      default: 0
    },
    yBorder: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pagerDimension: function () {
      if (PAGER_SIZE[this.paperSize]) {
        const { width, height } = PAGER_SIZE[this.paperSize]
        return {
          width: this.pageDirection === 'v' ? width : height,
          height: this.pageDirection === 'v' ? height : width,
        }
      }
      return {
        width: this.pageDirection === 'v' ? this.pageWidth + 'mm' : this.pageHeight + 'mm',
        height: this.pageDirection === 'v' ? this.pageHeight + 'mm' : this.pageWidth + 'mm',
      }
    },
    pageFormat: function () {
      if (PAGER_SIZE[this.paperSize]) {
        return this.paperSize;
      }
      
      return [this.mmStringToPt(this.pagerDimension.width), this.mmStringToPt(this.pagerDimension.height)]
    }
  },
  methods: {
    print(...args) {
      const params = this.generatePrintParams(...args);

      const printObj = new HTML2PRINT(this.$refs.printContent, params);
      printObj.print();
    },
    mmStringToPt(mm) {
      return mmToPt(+mm.replace(/[^\d]/g, ''), DEFAULT_DPI);
    },
    generatePrintParams(pagerInHeader, pagerSizeInHeader, pagerSizeInFooter, pagerInFooter, itemElement) {
      const params = {
        direction: this.pageDirection,
        format: this.pageFormat,
        pagerWidth: this.mmStringToPt(this.pagerDimension['width']),
        pagerHeight: this.mmStringToPt(this.pagerDimension['height']),
        baseY: this.yBorder,
        baseX: this.xBorder,
      }
      const pageContext = this.$vnode.context;
      if (pagerInHeader && this.showHeader && pageContext.$refs[pagerInHeader]) {
        pageContext.$refs[pagerInHeader].$el.classList.add('print-header-page');
      }
      if (pagerInFooter && this.showFooter && pageContext.$refs[pagerInFooter] ) {
        pageContext.$refs[pagerInFooter].$el.classList.add('print-footer-page');
      }

      if (pagerSizeInHeader && this.showHeader && pageContext.$refs[pagerSizeInHeader]) {
        pageContext.$refs[pagerSizeInHeader].$el.classList.add('print-header-page-size');
      }

      if (pagerSizeInFooter && this.showFooter && pageContext.$refs[pagerSizeInFooter]) {
        pageContext.$refs[pagerSizeInFooter].$el.classList.add('print-footer-page-size');
      }
      if (this.showFooter) {
        params.footer = this.$refs.printFooter;
      }

      if (this.showHeader) {
        params.header = this.$refs.printHeader;
      }
      if (pagerInFooter) {
        params.pagerInFooter = pagerInFooter;
      }

      if (itemElement) {
        const compName = itemElement.split(';');
        compName.forEach(item => {
          const refName = Object.keys(pageContext.$refs).filter(_ => _.startsWith(item));
          refName.forEach(_ => {
            pageContext.$refs[_].$el.classList.add('print-view-split');
          })
        })
      }
      return params;
    }
  }
}
</script>

<style module>
.printView {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}
.contentTip {
  color: #ccccccd0;
  padding: 3px;
  min-height: 50px;
}
.printRoom {
  flex: 1 1 auto;
  box-sizing: border-box;
  position: relative;
}
.printFooter,
.printHeader {
  box-sizing: border-box;
  flex: 0 0 auto;
}

.splitBorder {
  border-bottom: 1px dashed #e8e8e8;
}
.footerBorder {
  border-top: 1px dashed #e8e8e8;
}

.printView > div[s-empty]:empty {
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

.printView > div[s-empty]:empty::before {
  content: "+";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

.printView > .printRoom[s-empty]:empty::before {
  content: "+请添加打印内容";
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}
</style>

