<template>
  <div class="print-view" v-show="$env.VUE_APP_DESIGNER || isShowPrint">
    <div class="print-room" vusion-slot-name="default" ref="print-room">
      <slot></slot>
      <div v-if="!$slots.default" style="color: #ccccccd0; padding: 3px">
        请将打印的内容拖入这块区域
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import printJS from "print-js";
export default {
  name: "cw-multi-page-print-view",
  props: {
    value: {
      type: String,
      default: "请在这里编写代码",
    },
    isShowPrint: {
      type: Boolean,
      default: false,
    },
    // 页间重叠高度（CSS 像素），0~50，默认 0。
    // 为 0 时不做分页切片，直接输出一张长图交给浏览器分页。
    overlapHeight: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    async print() {
      const container = this.$refs["print-room"];
      if (!container) return;

      // 直接整页长截图 → print.js 打印单张图片（浏览器负责分页）
      const canvas = await html2canvas(container, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: container.scrollWidth,
        windowHeight: container.scrollHeight,
        logging: false,
        removeContainer: true,
        willReadFrequently: true,
      });

      // 计算 A4 可打印区域尺寸（减去 @page margin），单位：CSS px
      const mmToPx = (mm) => (mm * 96) / 25.4;
      const pageWidthPx = mmToPx(210);
      const pageHeightPx = mmToPx(297);
      const marginPx = mmToPx(12);
      const printableWidthPx = pageWidthPx - marginPx * 2;
      const printableHeightPx = pageHeightPx - marginPx * 2;

      // 归一化重叠高度（0~50px）
      const normalizedOverlapHeight = Math.min(50, Math.max(0, Number(this.overlapHeight) || 0));

      // 如果 overlap 为 0，则不做分页切片，直接输出一张长图
      if (normalizedOverlapHeight === 0) {
        const dataUrl = canvas.toDataURL("image/png");
        const html = `
          <div style="width:100%;box-sizing:border-box;">
            <img src="${dataUrl}" style="width:calc(210mm - 24mm);height:auto;display:block;margin:0;" />
          </div>
        `;
        printJS({
          printable: html,
          type: "raw-html",
          scanStyles: false,
          documentTitle: '',
          style: "@page { size: A4 portrait; margin: 12mm; } html,body{margin:0;padding:0;} img{width:calc(210mm - 24mm) !important;height:auto;display:block;margin:0;}"
        });
        return;
      }

      // 计算在画布坐标下每页应裁切的高度，以及重叠高度（同样折算到画布坐标）
      // 减少 2px 以避免四舍五入导致的溢出从而产生空白页
      const canvasPerPageHeight = Math.max(
        1,
        Math.floor(printableHeightPx * (canvas.width / printableWidthPx)) - 2
      );
      const canvasOverlap = Math.floor(normalizedOverlapHeight * (canvas.width / printableWidthPx));

      // 按页裁切生成多张图片（带 20px 重叠）
      const dataUrls = [];
      let y = 0;
      while (y < canvas.height) {
        const sliceHeight = Math.min(canvasPerPageHeight, canvas.height - y);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          y,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );
        dataUrls.push(pageCanvas.toDataURL("image/png"));
        if (y + sliceHeight >= canvas.height) break;
        y += canvasPerPageHeight - canvasOverlap;
      }

      // 组装 raw-html：显式控制宽度为可打印宽度，第二页起强制新页
      const html = `
        <div style="width:100%;box-sizing:border-box;">
          ${dataUrls
            .map(
              (src, i) =>
                `<img src="${src}" style="width:calc(210mm - 24mm);height:auto;display:block;margin:0;${
                  i > 0 ? "page-break-before:always;" : ""
                }" />`
            )
            .join("")}
        </div>
      `;
      printJS({
        printable: html,
        type: "raw-html",
        scanStyles: false,
        documentTitle: '',
        style: "@page { size: A4 portrait; margin: 12mm; } html,body{margin:0;padding:0;} img{width:calc(210mm - 24mm) !important;height:auto;display:block;margin:0;}"
      });
    },
    getCanvas(el, path = "", promises) {
      const children = el.childNodes;
      children.forEach((item, index) => {
        if (item.childNodes.length > 0) {
          this.getCanvas(item, (path += item.tagName), promises);
        } else {
          if (item.tagName === "CANVAS") {
            const source = this.$refs["print-room"].querySelector(
              `${path.toLowerCase()} ${item.tagName.toLowerCase()}:nth-child(${
                index + 1
              })`
            );
            promises.push(this.copyCanvasData(item, source));
          }
        }
      });
    },
    copyCanvasData(target, source) {
      return new Promise((resolve, reject) => {
        const data = source.toDataURL("image/png");
        const img = new Image();
        img.src = data;
        img.onload = () => {
          const ctx = target.getContext("2d");
          ctx.drawImage(img, 0, 0, source.width, source.height);
          resolve(true);
        };
        img.onerror = () => {
          reject(false);
        };
      });
    },
  },
};
</script>
<style>
.print-block-room {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 9000;
}

.print-view {
  min-height: 200px;
  border: 1px #ccc dashed;
  position: relative;
  background: transparent;
}

@media print {
  [column="auto"] {
    page-break-inside: auto;
  }
  [class^="l-root__"],
  body > div:first-of-type,
  [class^="u-drawer_drawer__"],
  [class^="u-modal_dialog__"] {
    display: none;
  }
  [class^="u-info-list_item__"]{
    display: flex !important;
  }
  .print-block-room {
    display: block;
  }
}
</style>
