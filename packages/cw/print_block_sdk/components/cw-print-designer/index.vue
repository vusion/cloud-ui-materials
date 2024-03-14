<template>
  <div :class="$style.printView" ref="printBlock"  v-show="$env.VUE_APP_DESIGNER || isShowPrint" :style="{
    width: isRate ? '100%' : this.pagerDimension['width'],
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
import { mmToPt, pxToPt } from './utils.js';
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
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    pageDirection: {
      type: String,
      default: 'v'
    },
    isRate: {
      type: Boolean,
      default: false
    },
    headerHeight: {
      type: Number,
      default: 0
    },
    footerHeight: {
      type: Number,
      default: 0
    },
    showHeaderPage: {
      type: Boolean,
      default: true
    },
    showFooterPage: {
      type: Boolean,
      default: true
    },
    pagerType: {
      type: String,
      default: 'number'
    },
    isShowPrint: {
      type: Boolean,
      default: true
    },
    pageWidth: {
      type: Number,
      default: 300
    },
    pageHeight: {
      type: Number,
      default: 150
    }
  },
  computed: {
    pagerDimension: function () {
      if (PAGER_SIZE[this.paperSize]) {
        const { width, height } = PAGER_SIZE[this.paperSize]
        return {
          width: this.pageDirection === 'v' ? width : height,
          height: this.pageDirection === 'v' ? height : width
        }
      }
      return {
        width: this.pageDirection === 'v' ? this.pageWidth + 'mm' : this.pageHeight + 'mm',
        height: this.pageDirection === 'v' ? this.pageHeight + 'mm' : this.pageWidth + 'mm'
      }
    },
    pageFormat: function () {
      if (PAGER_SIZE[this.paperSize]) {
        return this.paperSize;
      }
      
      return [this.mmStringToPt(this.pagerDimension.width), this.mmStringToPt(this.pagerDimension.height)]
    },
    headerHeightPt: function () {
      return this.mmStringToPt(this.headerHeight + 'mm');
    },
    footerHeightPt: function () {
      return this.mmStringToPt(this.footerHeight + 'mm');
    }
  },
  methods: {
    print(pagerInHeader, pagerSizeInHeader, pagerSizeInFooter, pagerInFooter, itemClass) {
      const params = {
        direction: this.pageDirection,
        format: this.pageFormat,
        pagerWidth: this.mmStringToPt(this.pagerDimension['width']),
        pagerHeight: this.mmStringToPt(this.pagerDimension['height']),
        baseY: 2
      }
      if (pagerInHeader && this.showHeader && this.$vnode.context.$refs[pagerInHeader]) {
        this.$vnode.context.$refs[pagerInHeader].$el.classList.add('print-header-page');
      }
      if (pagerInFooter && this.showFooter && this.$vnode.context.$refs[pagerInFooter] ) {
        this.$vnode.context.$refs[pagerInFooter].$el.classList.add('print-footer-page');
      }

      if (pagerSizeInHeader && this.showHeader && this.$vnode.context.$refs[pagerSizeInHeader]) {
        this.$vnode.context.$refs[pagerSizeInHeader].$el.classList.add('print-header-page-size');
      }

      if (pagerSizeInFooter && this.showFooter && this.$vnode.context.$refs[pagerSizeInFooter]) {
        this.$vnode.context.$refs[pagerSizeInFooter].$el.classList.add('print-footer-page-size');
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

      if (itemClass) {
        params.itemClass = itemClass;
      }

      if (!this.isRate) {
        params.contentWidth = pxToPt(this.$refs.printContent.clientWidth),
        params.contentHeight = pxToPt(this.$refs.printContent.clientHeight)
      }
      const printObj = new HTML2PRINT(this.$refs.printContent, params);
      printObj.print();
    },
    mmStringToPt(mm) {
      return mmToPt(+mm.replace(/[^\d]/g, ''), DEFAULT_DPI);
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

