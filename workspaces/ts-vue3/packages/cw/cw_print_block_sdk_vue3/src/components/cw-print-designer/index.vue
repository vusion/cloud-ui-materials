<template>
  <div
    :class="$style.printView"
    ref="printBlockRef"
    v-show="isDesigner || isShowPrint"
    :style="{
      width: isRate ? '100%' : pagerDimension.width,
      padding: yBorder + 'pt ' + xBorder + 'pt',
    }"
  >
    <div
      vusion-slot-name="header"
      v-if="isDesigner || showHeader"
      s-empty="true"
      :class="[$style.printHeader, { [$style.splitBorder]: isDesigner }]"
      ref="printHeaderRef"
    >
      <slot name="header"></slot>
    </div>
    <div :class="$style.printRoom" vusion-slot-name="content" ref="printContentRef" s-empty="true">
      <slot name="content"></slot>
    </div>
    <div
      vusion-slot-name="footer"
      v-if="isDesigner || showFooter"
      ref="printFooterRef"
      s-empty="true"
      :class="[$style.printFooter, { [$style.footerBorder]: isDesigner }]"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref, type ComponentPublicInstance } from 'vue';
import HTML2PRINT from './html2print';
import { mmToPt } from './utils';

const DEFAULT_DPI = 96;
const PAGER_SIZE: Record<string, { width: string; height: string }> = {
  a4: {
    width: '210mm',
    height: '297mm',
  },
  a5: {
    width: '148mm',
    height: '210mm',
  },
  a3: {
    width: '297mm',
    height: '420mm',
  },
  b3: {
    width: '353mm',
    height: '500mm',
  },
  b4: {
    width: '250mm',
    height: '353mm',
  },
  b5: {
    width: '176mm',
    height: '250mm',
  },
};

export interface CwPrintDesignerProps {
  paperSize?: 'a3' | 'a4' | 'a5' | 'b3' | 'b4' | 'b5' | 'custom';
  showHeader?: boolean;
  showFooter?: boolean;
  pageDirection?: 'v' | 'h';
  isRate?: boolean;
  isShowPrint?: boolean;
  pageWidth?: number;
  pageHeight?: number;
  xBorder?: number;
  yBorder?: number;
}

const props = withDefaults(defineProps<CwPrintDesignerProps>(), {
  paperSize: 'a4',
  showHeader: false,
  showFooter: false,
  pageDirection: 'v',
  isRate: false,
  isShowPrint: false,
  pageWidth: 794,
  pageHeight: 794,
  xBorder: 0,
  yBorder: 0,
});

const printBlockRef = ref<HTMLElement | null>(null);
const printHeaderRef = ref<HTMLElement | null>(null);
const printContentRef = ref<HTMLElement | null>(null);
const printFooterRef = ref<HTMLElement | null>(null);
const isDesigner = (window as any).$uilibenv?.IDE_DESIGNER === true;

const pagerDimension = computed(() => {
  if (PAGER_SIZE[props.paperSize]) {
    const { width, height } = PAGER_SIZE[props.paperSize];
    return {
      width: props.pageDirection === 'v' ? width : height,
      height: props.pageDirection === 'v' ? height : width,
    };
  }
  return {
    width: props.pageDirection === 'v' ? props.pageWidth + 'mm' : props.pageHeight + 'mm',
    height: props.pageDirection === 'v' ? props.pageHeight + 'mm' : props.pageWidth + 'mm',
  };
});

const pageFormat = computed(() => {
  if (PAGER_SIZE[props.paperSize]) {
    return props.paperSize;
  }

  return [mmStringToPt(pagerDimension.value.width), mmStringToPt(pagerDimension.value.height)];
});

function mmStringToPt(mm: string) {
  return mmToPt(+mm.replace(/[^\d]/g, ''), DEFAULT_DPI);
}

function getRefEl(refValue: unknown): HTMLElement | null {
  if (!refValue) return null;
  if (refValue instanceof HTMLElement) return refValue;
  const vm = refValue as ComponentPublicInstance;
  return (vm.$el as HTMLElement) ?? null;
}

function getPageContext() {
  return getCurrentInstance()?.parent ?? null;
}

function generatePrintParams(
  pagerInHeader?: string,
  pagerSizeInHeader?: string,
  pagerSizeInFooter?: string,
  pagerInFooter?: string,
  itemElement?: string,
) {
  const params: Record<string, unknown> = {
    direction: props.pageDirection,
    format: pageFormat.value,
    pagerWidth: mmStringToPt(pagerDimension.value.width),
    pagerHeight: mmStringToPt(pagerDimension.value.height),
    baseY: props.yBorder,
    baseX: props.xBorder,
  };
  const pageContext = getPageContext();
  if (pagerInHeader && props.showHeader && pageContext?.refs?.[pagerInHeader]) {
    getRefEl(pageContext.refs[pagerInHeader])?.classList.add('print-header-page');
  }
  if (pagerInFooter && props.showFooter && pageContext?.refs?.[pagerInFooter]) {
    getRefEl(pageContext.refs[pagerInFooter])?.classList.add('print-footer-page');
  }

  if (pagerSizeInHeader && props.showHeader && pageContext?.refs?.[pagerSizeInHeader]) {
    getRefEl(pageContext.refs[pagerSizeInHeader])?.classList.add('print-header-page-size');
  }

  if (pagerSizeInFooter && props.showFooter && pageContext?.refs?.[pagerSizeInFooter]) {
    getRefEl(pageContext.refs[pagerSizeInFooter])?.classList.add('print-footer-page-size');
  }
  if (props.showFooter) {
    params.footer = printFooterRef.value;
  }

  if (props.showHeader) {
    params.header = printHeaderRef.value;
  }
  if (pagerInFooter) {
    params.pagerInFooter = pagerInFooter;
  }

  if (itemElement && pageContext?.refs) {
    const compName = itemElement.split(';');
    compName.forEach((item) => {
      const refName = Object.keys(pageContext.refs).filter((_) => _.startsWith(item));
      refName.forEach((_) => {
        getRefEl(pageContext.refs[_])?.classList.add('print-view-split');
      });
    });
  }
  return params;
}

function print(
  pagerInHeader?: string,
  pagerSizeInHeader?: string,
  pagerSizeInFooter?: string,
  pagerInFooter?: string,
  itemElement?: string,
) {
  const params = generatePrintParams(
    pagerInHeader,
    pagerSizeInHeader,
    pagerSizeInFooter,
    pagerInFooter,
    itemElement,
  );

  if (!printContentRef.value) return;
  const printObj = new HTML2PRINT(printContentRef.value, params);
  printObj.print();
}

defineExpose({ print });
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
  content: '+';
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}

.printView > .printRoom[s-empty]:empty::before {
  content: '+请添加打印内容';
  font-size: 20px;
  line-height: 12px;
  display: inline-block;
  margin-bottom: 2px;
}
</style>
