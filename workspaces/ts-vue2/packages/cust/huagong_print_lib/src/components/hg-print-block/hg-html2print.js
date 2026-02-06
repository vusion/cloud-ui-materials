/**
 * 化工打印：单方向 A4 分页，支持 data-hg-print-item 不可截断块、data-hg-print-header 每页表头
 * 依赖：html2canvas, jspdf, print-js
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';

const DATA_PRINT_ITEM = 'data-hg-print-item';
const DATA_PRINT_HEADER = 'data-hg-print-header';
const DATA_PRINT_BADGE = 'data-hg-print-badge';
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
const MM_TO_PT = 72 / 25.4; // 1mm = 72/25.4 pt

export default class HgHtml2Print {
  constructor(element, param = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element 应为 HTMLElement');
    }
    this.element = element;
    // 这里将传入的边距按 mm 解释，再统一转换为 pt，和 PDF 纸张单位一致
    const baseXmm = param.baseX != null ? param.baseX : 10;
    const baseYmm = param.baseY != null ? param.baseY : 10;
    this.baseX = baseXmm * MM_TO_PT;
    this.baseY = baseYmm * MM_TO_PT;
    this.orientation = param.orientation || 'p'; // 'p' | 'l'
    this.debug = param.debug || false;
    this._imgCache = new Map();
  }

  _log(...args) {
    if (this.debug) console.log('[huagong_print]', ...args);
  }

  async loadImage(imgData) {
    let p = this._imgCache.get(imgData);
    if (p) return p;
    p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imgData;
    });
    this._imgCache.set(imgData, p);
    return p;
  }

  async clipImage(imgData, sx, sy, sw, sh) {
    const img = await this.loadImage(imgData);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, Math.round(sx), Math.round(sy), Math.round(sw), Math.round(sh), 0, 0, Math.round(sw), Math.round(sh));
    // 使用 PNG 避免文字和线条的 JPEG 压缩损失
    return canvas.toDataURL('image/png', 0.95);
  }

  async toCanvas(element, width) {
    if (!element) return null;
    try {
      // 提高截图分辨率，减小 PDF 模糊
      const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 2;
      const options = {
        scale: dpr,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: width || element.scrollWidth || element.offsetWidth,
      };
      if (width) options.width = width;
      const canvas = await html2canvas(element, options);
      const imgData = canvas.toDataURL('image/png', 0.95);
      // width / height 仍使用 CSS 像素换算为 pt，避免因 scale 放大导致 PDF 再次缩放
      return {
        data: imgData,
        width: (canvas.width / dpr) * 0.75,
        height: (canvas.height / dpr) * 0.75,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        scale: dpr,
      };
    } catch (e) {
      console.error('[huagong_print] toCanvas 失败', e);
      return null;
    }
  }

  /**
   * 取第一个带 data-hg-print-header 的直接子节点作为表头
   */
  getHeaderElement(container) {
    const children = Array.from(container.children || []);
    return children.find((el) => el.nodeType === 1 && el.hasAttribute && el.hasAttribute(DATA_PRINT_HEADER)) || null;
  }

  /**
   * 收集块：直接子节点（排除表头），标记 data-hg-print-item 为不可截断
   * @returns {{ segments: Array<{top,height,bottom}>, headerElement: HTMLElement|null }}
   */
  analyzeBlocks(container, availablePageHPx) {
    const headerElement = this.getHeaderElement(container);
    const rect = container.getBoundingClientRect();
    const blocks = [];
    const children = Array.from(container.children || []);
    children.forEach((child) => {
      if (child === headerElement) return;
      const r = child.getBoundingClientRect();
      const top = r.top - rect.top;
      const height = r.height;
      const bottom = top + height;
      const noBreak = child.hasAttribute && child.hasAttribute(DATA_PRINT_ITEM);
      blocks.push({ top, height, bottom, noBreak });
    });
    blocks.sort((a, b) => a.top - b.top);

    const segments = [];
    blocks.forEach((b) => {
      if (b.noBreak && b.height > availablePageHPx) {
        let y = b.top;
        while (y < b.bottom) {
          const segH = Math.min(availablePageHPx, b.bottom - y);
          segments.push({ top: y, height: segH, bottom: y + segH });
          y += segH;
        }
      } else {
        segments.push({ top: b.top, height: b.height, bottom: b.bottom });
      }
    });
    return { segments, headerElement };
  }

  /**
   * 提取徽章信息：
   *  - 查找带 data-hg-print-badge 的节点
   *  - 优先读取组件提供的 PDF 坐标（data-hg-print-badge-x / y，单位 pt，基于内容区域）
   *  - 否则回退为在容器内的像素坐标
   *  - 将徽章单独渲染为图片
   *  - 在容器克隆中隐藏徽章，避免参与主体截图
   */
  async extractBadgeInfo(container) {
    try {
      const badgeClone = container.querySelector(`[${DATA_PRINT_BADGE}]`);
      if (!badgeClone) return null;

      // 在原始元素上截图，避免克隆过程中的样式抖动
      const sourceBadge = this.element.querySelector(`[${DATA_PRINT_BADGE}]`) || badgeClone;

      // 优先使用组件显式提供的 PDF 坐标（pt）
      let pdfXPt = null;
      let pdfYPt = null;
      const xAttr = badgeClone.getAttribute('data-hg-print-badge-x');
      const yAttr = badgeClone.getAttribute('data-hg-print-badge-y');
      if (xAttr != null && xAttr !== '') {
        const v = Number(xAttr);
        if (!Number.isNaN(v)) pdfXPt = v;
      }
      if (yAttr != null && yAttr !== '') {
        const v = Number(yAttr);
        if (!Number.isNaN(v)) pdfYPt = v;
      }

      // 如果没有显式 PDF 坐标，则退回 DOM 像素坐标
      let xPx = 0;
      let yPx = 0;
      if (pdfXPt == null || pdfYPt == null) {
        const containerRect = container.getBoundingClientRect();
        const badgeRect = badgeClone.getBoundingClientRect();
        xPx = badgeRect.left - containerRect.left;
        yPx = badgeRect.top - containerRect.top;
      }

      const canvas = await html2canvas(sourceBadge, {
        // 徽章通常较小，也按设备像素比渲染，保证文字清晰
        scale: (typeof window !== 'undefined' && window.devicePixelRatio) || 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: sourceBadge.scrollWidth || sourceBadge.offsetWidth || undefined,
      });

      const imgData = canvas.toDataURL('image/png', 0.95);

      // 在主体克隆中隐藏徽章，只作为叠加图使用
      badgeClone.style.visibility = 'hidden';

      return {
        data: imgData,
        xPx,
        yPx,
        widthPx: canvas.width,
        heightPx: canvas.height,
        pdfXPt,
        pdfYPt,
      };
    } catch (e) {
      this._log('提取徽章失败', e);
      return null;
    }
  }

  async print() {
    const isLandscape = this.orientation === 'l';
    const pageWidthPt = isLandscape ? A4_HEIGHT_PT : A4_WIDTH_PT;
    const pageHeightPt = isLandscape ? A4_WIDTH_PT : A4_HEIGHT_PT;
    const contentWidthPt = pageWidthPt - 2 * this.baseX;
    const fullPageAvailableHPt = pageHeightPt - 2 * this.baseY;
    const fullPageAvailableHPx = fullPageAvailableHPt / 0.75;

    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;left:-9999px;top:0;background:#fff;overflow:visible;';
    const clone = this.element.cloneNode(true);
    container.appendChild(clone);
    document.body.appendChild(container);

    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => requestAnimationFrame(r));

    const actualWidth = Math.max(
      container.scrollWidth || 0,
      container.offsetWidth || 0,
      container.firstElementChild ? container.firstElementChild.offsetWidth || 0 : 0
    );

    // 徽章只作为叠加图，不参与主体截图与分页分析
    const badgeInfo = await this.extractBadgeInfo(container);

    const headerElement = this.getHeaderElement(container);
    let headerImageResult = null;
    let headerHeightPt = 0;
    let contentStartY = this.baseY;
    let bodyAvailablePageHPt = fullPageAvailableHPt;
    let bodyAvailablePageHPx = fullPageAvailableHPx;

    if (headerElement) {
      headerImageResult = await this.toCanvas(headerElement, actualWidth);
      if (headerImageResult) {
        headerHeightPt = headerImageResult.height;
        contentStartY = this.baseY + headerHeightPt;
        bodyAvailablePageHPt = fullPageAvailableHPt - headerHeightPt;
        bodyAvailablePageHPx = bodyAvailablePageHPt / 0.75;
        this._log('表头高度(pt):', headerHeightPt);
      }
    }

    const { segments } = this.analyzeBlocks(container, bodyAvailablePageHPx);
    const baseResult = await this.toCanvas(container, actualWidth);
    document.body.removeChild(container);

    if (!baseResult || !baseResult.data) {
      this._log('toCanvas 无结果');
      return;
    }

    const { data: baseImageData, canvasWidth: cwPx, scale: canvasScale = 1 } = baseResult;
    const contentWidthPtUsed = Math.min(contentWidthPt, actualWidth * 0.75);
    const pxToPt = (px) => px * 0.75;

    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: this.orientation,
    });

    let currentPdfY = contentStartY;
    let isFirstPage = true;

    const drawHeader = () => {
      if (headerImageResult && headerImageResult.data) {
        const headerW = Math.min(contentWidthPtUsed, headerImageResult.width);
        pdf.addImage(headerImageResult.data, 'PNG', this.baseX, this.baseY, headerW, headerHeightPt);
      }
    };

    if (headerImageResult) drawHeader();

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const segH = seg.height;
      const segHPt = pxToPt(segH);
      const spaceOnPage = bodyAvailablePageHPt - (currentPdfY - contentStartY);

      if (segHPt > spaceOnPage && !isFirstPage) {
        pdf.addPage('a4', this.orientation);
        drawHeader();
        currentPdfY = contentStartY;
      } else if (segHPt > spaceOnPage && isFirstPage) {
        currentPdfY = contentStartY;
      }

      // clipImage 的坐标需要使用渲染后的像素（考虑 html2canvas 的 scale）
      const clipped = await this.clipImage(baseImageData, 0, seg.top * canvasScale, cwPx, segH * canvasScale);
      const drawW = Math.min(contentWidthPtUsed, pxToPt(cwPx / canvasScale));
      pdf.addImage(clipped, 'PNG', this.baseX, currentPdfY, drawW, segHPt);

      currentPdfY += segHPt;
      isFirstPage = false;
    }

    // 在所有页上覆盖绘制徽章（基于页面内容完成之后，保证在最上层）
    if (badgeInfo && badgeInfo.data) {
      const totalPages = pdf.internal.getNumberOfPages();
      const scaleXPxToPt = cwPx > 0 ? contentWidthPtUsed / cwPx : 0;
      const scaleYPxToPt = 0.75; // 垂直方向按像素到 pt 的固定换算
      const badgeWPt = badgeInfo.widthPx * scaleXPxToPt;
      const badgeHPt = badgeInfo.heightPx * scaleYPxToPt;

      // 如果组件显式提供了 PDF 坐标（单位 pt，基于内容区域左上角），优先使用
      const hasPdfCoord = badgeInfo.pdfXPt != null && badgeInfo.pdfYPt != null;
      const badgeXPt = hasPdfCoord ? this.baseX + badgeInfo.pdfXPt : this.baseX + badgeInfo.xPx * scaleXPxToPt;
      const badgeYPt = hasPdfCoord ? contentStartY + badgeInfo.pdfYPt : contentStartY + badgeInfo.yPx * scaleYPxToPt;

      for (let page = 1; page <= totalPages; page++) {
        pdf.setPage(page);
        pdf.addImage(badgeInfo.data, 'PNG', badgeXPt, badgeYPt, badgeWPt, badgeHPt);
      }
    }

    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    try {
      printJS({ printable: url, type: 'pdf', showModal: true });
    } catch (e) {
      window.open(url, '_blank');
    }
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
