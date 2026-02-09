/**
 * 化工打印：单方向 A4 分页，支持 data-hg-print-item 不可截断块、data-hg-print-header 每页表头
 * 依赖：html2canvas, jspdf, print-js
 * 宽高比例：1 CSS px = 0.75 pt，与 hg-print-block 容器 rootStyle 中 PT_PER_PX 一致，保证屏幕与 PDF 一致
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';

const DATA_PRINT_ITEM = 'data-hg-print-item';
const DATA_PRINT_HEADER = 'data-hg-print-header';
const DATA_PRINT_BADGE = 'data-hg-print-badge';
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
/** 与 index.vue 中 PT_PER_PX 一致：1 px = 0.75 pt，保证容器与 PDF 宽高比例一致 */
const PT_PER_PX = 0.75;
/** 徽章默认在页面底部时，距底边的距离（pt），与页码区分开 */
const BADGE_DEFAULT_BOTTOM_GAP = 20;
/** 表头在 PDF 上的最小 top（pt），避免贴边被裁切 */
const HEADER_MIN_TOP_PT = 2;
/** 浏览器 canvas 单轴常见上限，超过则分块截图 */
const MAX_CANVAS_HEIGHT_PX = 16384;

export default class HgHtml2Print {
  constructor(element, param = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element 应为 HTMLElement');
    }
    this.element = element;
    // 边距单位统一为 pt，与 PDF 纸张单位一致
    // baseX/baseY 直接作为 pt 值使用，不再做单位转换
    this.baseX = param.baseX != null ? param.baseX : 10;
    this.baseY = param.baseY != null ? param.baseY : 10;
    this.orientation = param.orientation || 'p'; // 'p' | 'l'
    this.debug = param.debug || false;
    this._imgCache = new Map();
  }

  _log(...args) {
    if (this.debug) console.log('[huagong_print]', ...args);
  }

  /**
   * 复制源元素关键计算样式到克隆节点，使克隆在离屏容器内渲染与 this.element 完全一致
   * 仿照 cw_cut_printview 的打印复制节点逻辑，保证截图样式一致
   */
  copyComputedStylesToClone(source, clone) {
    if (!source || !clone || !window.getComputedStyle) return;
    const cs = window.getComputedStyle(source);
    const style = clone.style;
    const toKebab = (s) => s.replace(/([A-Z])/g, '-$1').toLowerCase();
    // 布局相关：宽高、盒模型，避免克隆在离屏容器内变形
    const layoutProps = [
      'width',
      'minWidth',
      'maxWidth',
      'boxSizing',
      'padding',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'margin',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'border',
      'borderWidth',
      'borderStyle',
      'borderColor',
    ];
    layoutProps.forEach((prop) => {
      const name = toKebab(prop);
      const v = cs.getPropertyValue(name);
      if (v) style.setProperty(name, v);
    });
    // 字体与颜色，避免继承自 body 导致与 this.element 不一致
    const fontProps = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'lineHeight', 'color', 'backgroundColor'];
    fontProps.forEach((prop) => {
      const v = cs[prop];
      if (v) style[prop] = v;
    });
  }

  /**
   * 创建打印用临时容器并复制 this.element 内容，保持与 cw_cut_printview 一致的容器样式和节点复制逻辑
   * 保证 this.element 的样式和生成的截图的样式完全一致。
   * 加上配置的页面边距（baseX/baseY）作为容器的 padding，避免生成的图片底部/边缘被裁切。
   */
  createPrintContainer() {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.background = '#fff';
    container.style.overflow = 'visible';
    container.style.width = 'auto';
    container.style.zIndex = '9999999999';
    container.style.minWidth = '0';
    container.style.boxSizing = 'content-box';

    // 配置的页面边距（pt）转 px：1 px = 0.75 pt
    const baseXPx = this.baseX / PT_PER_PX;
    const baseYPx = this.baseY / PT_PER_PX;
    container.style.padding = `${baseYPx}px ${baseXPx}px`;

    const sourceRect = this.element.getBoundingClientRect();
    if (sourceRect && sourceRect.width > 0) {
      container.style.width = sourceRect.width + 'px';
    }

    const clone = this.element.cloneNode(true);
    container.appendChild(clone);
    document.body.appendChild(container);
    return container;
  }

  /**
   * 获取容器实际渲染宽度（与 cw_cut_printview processNormalSection 中 actualWidth 计算一致）
   */
  getActualWidth(container) {
    const scrollWidth = container.scrollWidth || 0;
    const offsetWidth = container.offsetWidth || 0;
    const clientWidth = container.clientWidth || 0;
    let firstChildWidth = 0;
    if (container.firstElementChild) {
      const firstChild = container.firstElementChild;
      firstChildWidth = Math.max(firstChild.scrollWidth || 0, firstChild.offsetWidth || 0, firstChild.getBoundingClientRect().width || 0);
    }
    return Math.max(scrollWidth, offsetWidth, clientWidth, firstChildWidth);
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

  /** 从长图按区域裁剪；入参为 canvas 像素 (sx,sy,sw,sh)，由容器 px × scale 得到 */
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

  /** 将 DOM 转为整图；主流程用于长容器一次截图 + 表头预渲染 */
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
    return container.querySelector(`[${DATA_PRINT_HEADER}]`) || null;
    // const children = Array.from(container.children || []);
    // return children.find((el) => el.nodeType === 1 && el.hasAttribute && el.hasAttribute(DATA_PRINT_HEADER)) || null;
  }

  /**
   * 收集最内层带 data-hg-print-item 的节点（自身有属性且无后代带该属性），用于作为独立原子块。
   */
  getInnermostPrintItemNodes(root) {
    const all = root.querySelectorAll(`[${DATA_PRINT_ITEM}]`);
    return Array.from(all).filter((node) => {
      if (!node.hasAttribute || !node.hasAttribute(DATA_PRINT_ITEM)) return false;
      const descendantsWithAttr = node.querySelectorAll(`[${DATA_PRINT_ITEM}]`);
      return Array.from(descendantsWithAttr).every((el) => el === node);
    });
  }

  /**
   * 收集块：支持嵌套原子行。直接子节点（H）按内部最内层 data-hg-print-item（A）切分为不重叠块；
   * 每块含 node（来自 container 克隆）、sourceOffsetY、noBreak，按 top 排序后赋 index。
   * @returns {{ blocks: Array<{index, node, top, height, bottom, noBreak, sourceOffsetY?}>, headerElement: HTMLElement|null, badgeElement: HTMLElement|null }}
   */
  analyzeBlocks(container) {
    const contentRoot = container.firstElementChild;
    if (!contentRoot) return { blocks: [], headerElement: null, badgeElement: null };

    const headerElement = this.getHeaderElement(container);
    const badgeElement = container.querySelector(`[${DATA_PRINT_BADGE}]`) || null;
    const rect = container.getBoundingClientRect();

    const isHeaderOrContains = (el) => el === headerElement || (headerElement && el.contains && el.contains(headerElement));
    const isBadgeOrContains = (el) => el === badgeElement || (badgeElement && el.contains && el.contains(badgeElement));
    const hasPrintItem = (el) =>
      (el && el.hasAttribute && el.hasAttribute(DATA_PRINT_ITEM)) || (el.querySelector && !!el.querySelector(`[${DATA_PRINT_ITEM}]`));

    const atomicNodes = this.getInnermostPrintItemNodes(contentRoot);
    const allBlocks = [];

    const children = Array.from(contentRoot.children || []);
    children.forEach((child) => {
      if (isHeaderOrContains(child) || isBadgeOrContains(child)) return;

      const hRect = child.getBoundingClientRect();
      const hTop = hRect.top - rect.top;
      const hBottom = hRect.bottom - rect.top;
      const hHeight = hRect.height;

      const atomsInH = atomicNodes.filter((a) => child.contains(a));
      if (atomsInH.length === 0) {
        allBlocks.push({
          node: child,
          top: hTop,
          height: hHeight,
          bottom: hBottom,
          noBreak: !!hasPrintItem(child),
          sourceOffsetY: 0,
        });
        return;
      }

      const atomsWithRect = atomsInH.map((a) => {
        const r = a.getBoundingClientRect();
        return { node: a, top: r.top - rect.top, bottom: r.bottom - rect.top, height: r.height };
      });
      atomsWithRect.sort((x, y) => x.top - y.top);

      const firstTop = atomsWithRect[0].top;
      const lastBottom = atomsWithRect[atomsWithRect.length - 1].bottom;

      if (hTop < firstTop - 0.5) {
        const sliceH = Math.max(0, firstTop - hTop);
        allBlocks.push({
          node: child,
          top: hTop,
          height: sliceH,
          bottom: hTop + sliceH,
          noBreak: false,
          sourceOffsetY: 0,
        });
      }

      atomsWithRect.forEach((a) => {
        allBlocks.push({
          node: a.node,
          top: a.top,
          height: a.height,
          bottom: a.bottom,
          noBreak: true,
          sourceOffsetY: 0,
        });
      });

      for (let i = 0; i < atomsWithRect.length - 1; i++) {
        const aBottom = atomsWithRect[i].bottom;
        const nextTop = atomsWithRect[i + 1].top;
        if (nextTop - aBottom > 0.5) {
          const sliceH = nextTop - aBottom;
          const sourceOffsetY = aBottom - hTop;
          allBlocks.push({
            node: child,
            top: aBottom,
            height: sliceH,
            bottom: nextTop,
            noBreak: false,
            sourceOffsetY,
          });
        }
      }

      if (lastBottom < hBottom - 0.5) {
        const sliceH = Math.max(0, hBottom - lastBottom);
        const sourceOffsetY = lastBottom - hTop;
        allBlocks.push({
          node: child,
          top: lastBottom,
          height: sliceH,
          bottom: hBottom,
          noBreak: false,
          sourceOffsetY,
        });
      }
    });

    allBlocks.sort((a, b) => a.top - b.top);
    allBlocks.forEach((b, i) => {
      b.index = i;
    });
    return { blocks: allBlocks, headerElement, badgeElement };
  }

  /**
   * 按每页可用高度将 blocks 分成 segments 并分配到页；第一页不显示表头，每页底部预留徽章。
   * @param {Array<{index, top, height, noBreak}>} blocks
   * @param {{ firstPageContentHPx: number, otherPageContentHPx: number }} options
   * @returns {Array<{ showHeader: boolean, segments: Array<{ blockIndex, offsetY, height }>, showBadge: boolean }>}
   */
  generatePageStructures(blocks, options) {
    const { firstPageContentHPx, otherPageContentHPx } = options;
    const sortedBlocks = [...blocks].sort((a, b) => a.top - b.top);
    const segments = [];
    sortedBlocks.forEach((b) => {
      if (b.noBreak) {
        segments.push({ blockIndex: b.index, offsetY: 0, height: b.height });
      } else if (b.height > otherPageContentHPx) {
        let y = 0;
        while (y < b.height) {
          const segH = Math.min(otherPageContentHPx, b.height - y);
          segments.push({ blockIndex: b.index, offsetY: y, height: segH });
          y += segH;
        }
      } else {
        segments.push({ blockIndex: b.index, offsetY: 0, height: b.height });
      }
    });

    const pages = [];
    let currentPage = { showHeader: false, segments: [], showBadge: true };
    let availableH = firstPageContentHPx;

    for (const seg of segments) {
      // 本段放不下当前页时先翻页再放入，保证原子块不侵入徽章预留区、不与其他段重叠
      if (seg.height > availableH) {
        pages.push(currentPage);
        currentPage = { showHeader: true, segments: [], showBadge: true };
        availableH = otherPageContentHPx;
      }
      currentPage.segments.push(seg);
      availableH = availableH - seg.height;
    }
    if (currentPage.segments.length > 0) pages.push(currentPage);
    return pages;
  }

  /**
   * 为单页创建独立 DOM 容器：表头（可选）+ 内容块/切片 + 徽章（可选）。
   * 主流程已改为长图 + clip，此方法保留供预览或后续扩展使用。
   * @param {{ showHeader: boolean, segments: Array<{ blockIndex, offsetY, height }>, showBadge: boolean }} pageStructure
   * @param {{ headerElement: HTMLElement|null, badgeElement: HTMLElement|null, blockElements: HTMLElement[], blocks: Array<{height}> }, pageWidthPx: number, pageHeightPx: number, contentHeightPx: number, baseXPx: number, baseYPx: number }} options
   */
  createPageDOM(pageStructure, options) {
    const { headerElement, badgeElement, blockElements, blocks, pageWidthPx, pageHeightPx, contentHeightPx, baseXPx, baseYPx } = options;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.background = '#fff';
    container.style.width = pageWidthPx + 'px';
    container.style.height = pageHeightPx + 'px';
    container.style.boxSizing = 'content-box';
    container.style.padding = `${baseYPx}px ${baseXPx}px`;
    container.style.overflow = 'hidden';
    container.style.zIndex = '9999999999';

    if (pageStructure.showHeader && headerElement) {
      const headerClone = headerElement.cloneNode(true);
      this.copyComputedStylesToClone(headerElement, headerClone);
      container.appendChild(headerClone);
    }

    const contentWrap = document.createElement('div');
    contentWrap.style.overflow = 'hidden';
    contentWrap.style.height = contentHeightPx + 'px';
    contentWrap.style.minHeight = contentHeightPx + 'px';

    for (const seg of pageStructure.segments) {
      const blockEl = blockElements[seg.blockIndex];
      const blockMeta = blocks[seg.blockIndex];
      if (!blockEl) continue;
      const clone = blockEl.cloneNode(true);
      this.copyComputedStylesToClone(blockEl, clone);
      const sourceOffsetY = (blockMeta && blockMeta.sourceOffsetY) || 0;
      const effectiveOffsetY = sourceOffsetY + seg.offsetY;
      const isSlice = effectiveOffsetY > 0 || (blockMeta && seg.height < blockMeta.height - 0.5);
      if (isSlice) {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.height = seg.height + 'px';
        wrap.style.minHeight = seg.height + 'px';
        clone.style.marginTop = -effectiveOffsetY + 'px';
        wrap.appendChild(clone);
        contentWrap.appendChild(wrap);
      } else {
        contentWrap.appendChild(clone);
      }
    }
    container.appendChild(contentWrap);

    if (pageStructure.showBadge && badgeElement) {
      const badgeClone = badgeElement.cloneNode(true);
      this.copyComputedStylesToClone(badgeElement, badgeClone);
      container.appendChild(badgeClone);
    }

    return container;
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

      const atBottom = badgeClone.getAttribute('data-hg-print-badge-at-bottom');
      const useDefaultPosition = atBottom !== 'false' && pdfXPt == null && pdfYPt == null;

      return {
        data: imgData,
        xPx,
        yPx,
        widthPx: canvas.width,
        heightPx: canvas.height,
        pdfXPt,
        pdfYPt,
        useDefaultPosition,
      };
    } catch (e) {
      this._log('提取徽章失败', e);
      return null;
    }
  }

  /**
   * @param {string} [uploadUrl='/upload'] 生成 PDF 后上传到该接口地址，传空则不上传
   */
  async print(uploadUrl = '/upload') {
    const isLandscape = this.orientation === 'l';
    const pageWidthPt = isLandscape ? A4_HEIGHT_PT : A4_WIDTH_PT;
    const pageHeightPt = isLandscape ? A4_WIDTH_PT : A4_HEIGHT_PT;

    const baseXPx = this.baseX / PT_PER_PX;
    const baseYPx = this.baseY / PT_PER_PX;
    const pageWidthPx = pageWidthPt / PT_PER_PX;
    const pageHeightPx = pageHeightPt / PT_PER_PX;

    const container = this.createPrintContainer();
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => requestAnimationFrame(r));

    const actualWidth = this.getActualWidth(container);
    const badgeInfo = await this.extractBadgeInfo(container);

    const headerElement = this.getHeaderElement(container);
    let headerHeightPt = 0;
    if (headerElement) {
      const origOverflow = headerElement.style.overflow;
      const origHeight = headerElement.style.height;
      const origMaxHeight = headerElement.style.maxHeight;
      headerElement.style.overflow = 'visible';
      headerElement.style.height = 'auto';
      headerElement.style.maxHeight = 'none';
      const headerRect = headerElement.getBoundingClientRect();
      headerHeightPt = (headerRect.height || 0) * PT_PER_PX;
      headerElement.style.overflow = origOverflow;
      headerElement.style.height = origHeight;
      headerElement.style.maxHeight = origMaxHeight;
      this._log('表头高度(pt):', headerHeightPt);
    }

    const useBadgeAtBottom = badgeInfo && (badgeInfo.useDefaultPosition === true || (badgeInfo.pdfXPt == null && badgeInfo.pdfYPt == null));
    const badgeElForOpts = container.querySelector(`[${DATA_PRINT_BADGE}]`);
    const badgeInline = badgeElForOpts && badgeElForOpts.getAttribute('data-hg-print-badge-inline') === 'true';
    const dprForBadge = (typeof window !== 'undefined' && window.devicePixelRatio) || 2;
    // inline 模式下必须预留底部区域，避免 body 与徽章重叠；高度与绘制时一致 (heightPx 为 canvas 像素)
    const badgeReservedPt =
      badgeInline && badgeInfo && badgeInfo.data ? (badgeInfo.heightPx / dprForBadge) * PT_PER_PX + BADGE_DEFAULT_BOTTOM_GAP : 0;
    // 内联模式下每页内容区高度已扣除徽章预留，body 不会排入徽章区；表头不参与分页，每页顶部单独绘制，故首页与其它页 body 可用高一致
    const bodyAvailablePageHPt = Math.max(0, pageHeightPt - 2 * this.baseY - headerHeightPt - badgeReservedPt);
    const firstPageContentHPx = bodyAvailablePageHPt / PT_PER_PX;
    const otherPageContentHPx = bodyAvailablePageHPt / PT_PER_PX;

    const { blocks, headerElement: _headerEl, badgeElement: _badgeEl } = this.analyzeBlocks(container);
    const pages = this.generatePageStructures(blocks, { firstPageContentHPx, otherPageContentHPx });

    // 表头预渲染：用于每页（非首页）drawHeader
    let headerImageResult = null;
    if (headerElement && headerHeightPt > 0) {
      headerImageResult = await this.toCanvas(headerElement, actualWidth);
    }

    const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 2;
    const containerHeightPx = (container.getBoundingClientRect && container.getBoundingClientRect().height) || container.scrollHeight || 0;
    const useChunked = containerHeightPx * dpr > MAX_CANVAS_HEIGHT_PX;

    let baseResult = null;
    let chunks = null;
    let scale;
    let chunkHeightPx = 0;

    if (!useChunked) {
      // 一次长图：容器 px 与 scale 用于后续 clip；得到后立即移除 DOM
      baseResult = await this.toCanvas(container, actualWidth);
      document.body.removeChild(container);
      if (!baseResult || !baseResult.data) {
        this._log('toCanvas 未得到有效结果');
        return;
      }
      scale = baseResult.scale;
    } else {
      // 分块截图：视口包装容器，按块 toCanvas，避免超大 canvas
      chunkHeightPx = Math.floor(MAX_CANVAS_HEIGHT_PX / dpr);
      const numChunks = Math.ceil(containerHeightPx / chunkHeightPx);
      const viewport = document.createElement('div');
      viewport.style.position = 'absolute';
      viewport.style.left = '-9999px';
      viewport.style.top = '0';
      viewport.style.width = actualWidth + 'px';
      viewport.style.height = chunkHeightPx + 'px';
      viewport.style.overflow = 'hidden';
      viewport.style.background = '#fff';
      viewport.style.zIndex = '9999999999';
      container.style.position = 'absolute';
      container.style.left = '0';
      container.style.top = '0';
      document.body.removeChild(container);
      viewport.appendChild(container);
      document.body.appendChild(viewport);

      chunks = [];
      for (let k = 0; k < numChunks; k++) {
        const offsetPx = k * chunkHeightPx;
        container.style.transform = `translateY(-${offsetPx}px)`;
        await new Promise((r) => requestAnimationFrame(r));
        const result = await this.toCanvas(viewport, actualWidth);
        if (result && result.data) {
          chunks.push({
            data: result.data,
            scale: result.scale,
            chunkTopPx: offsetPx,
            chunkHeightPx,
          });
        }
        await new Promise((r) => requestAnimationFrame(r));
      }
      viewport.remove();
      if (!chunks.length || !chunks[0].data) {
        this._log('分块 toCanvas 未得到有效结果');
        return;
      }
      scale = chunks[0].scale;
    }

    // 统一 px/pt：DOM·容器用 px，PDF 用 pt，换算仅经 PT_PER_PX
    const contentWidthPx = Math.max(0, actualWidth - 2 * baseXPx);
    const contentWidthPt = contentWidthPx * PT_PER_PX;
    const pxToPt = (px) => px * PT_PER_PX;

    const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: this.orientation });
    const contentStartY = this.baseY + headerHeightPt;

    const drawHeader = () => {
      if (headerImageResult && headerImageResult.data && headerHeightPt > 0) {
        pdf.addImage(headerImageResult.data, 'PNG', this.baseX, this.baseY, contentWidthPt, headerHeightPt);
      }
    };

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage('a4', this.orientation);
      drawHeader();
      let currentPdfY = contentStartY;

      for (const seg of pages[i].segments) {
        const segmentTopPx = blocks[seg.blockIndex].top + seg.offsetY;
        let sourceData;
        let clipSy;
        if (useChunked) {
          const chunkIndex = Math.floor(segmentTopPx / chunkHeightPx);
          const localTopPx = segmentTopPx - chunkIndex * chunkHeightPx;
          sourceData = chunks[chunkIndex] ? chunks[chunkIndex].data : chunks[chunks.length - 1].data;
          clipSy = localTopPx * scale;
        } else {
          sourceData = baseResult.data;
          clipSy = segmentTopPx * scale;
        }
        const clipped = await this.clipImage(sourceData, baseXPx * scale, clipSy, contentWidthPx * scale, seg.height * scale);
        const segHPt = pxToPt(seg.height);
        pdf.addImage(clipped, 'PNG', this.baseX, currentPdfY, contentWidthPt, segHPt);
        currentPdfY += segHPt;
      }
    }

    // 徽章占用固定区域：该区域先铺白底再绘徽章，其他内容不在此区域展示；默认位置为每页底部居中
    if (badgeInfo && badgeInfo.data) {
      const totalPages = pdf.internal.getNumberOfPages();
      const badgeWPt = (badgeInfo.widthPx / dpr) * PT_PER_PX;
      const badgeHPt = (badgeInfo.heightPx / dpr) * PT_PER_PX;

      const useDefaultPosition = badgeInfo.useDefaultPosition === true || (badgeInfo.pdfXPt == null && badgeInfo.pdfYPt == null);

      for (let page = 1; page <= totalPages; page++) {
        pdf.setPage(page);
        let badgeXPt;
        let badgeYPt;
        if (useDefaultPosition) {
          badgeXPt = this.baseX + (contentWidthPt - badgeWPt) / 2;
          badgeYPt = pageHeightPt - this.baseY - badgeHPt - BADGE_DEFAULT_BOTTOM_GAP;
        } else {
          const hasPdfCoord = badgeInfo.pdfXPt != null && badgeInfo.pdfYPt != null;
          const scalePxToPt = PT_PER_PX;
          badgeXPt = hasPdfCoord ? this.baseX + badgeInfo.pdfXPt : this.baseX + badgeInfo.xPx * scalePxToPt;
          badgeYPt = hasPdfCoord ? contentStartY + badgeInfo.pdfYPt : contentStartY + badgeInfo.yPx * scalePxToPt;
        }
        pdf.setFillColor(255, 255, 255);
        pdf.rect(badgeXPt, badgeYPt, badgeWPt, badgeHPt, 'F');
        pdf.addImage(badgeInfo.data, 'PNG', badgeXPt, badgeYPt, badgeWPt, badgeHPt);
      }
    }

    // 在所有页面底部居中绘制页码，例如 "- 1 / 3 -"
    const totalPagesForNumber = pdf.internal.getNumberOfPages();
    const pageNumberY = pageHeightPt - 20; // 距离底部约 20pt
    const centerX = pageWidthPt / 2;
    pdf.setFontSize(10);
    for (let page = 1; page <= totalPagesForNumber; page++) {
      pdf.setPage(page);
      const label = `- ${page} / ${totalPagesForNumber} -`;
      // 使用 align: 'center' 以中心点为对齐参考
      pdf.text(label, centerX, pageNumberY, { align: 'center' });
    }

    const blob = pdf.output('blob');
    let uploadResult = null;
    if (uploadUrl && typeof fetch === 'function') {
      try {
        const formData = new FormData();
        formData.append('file', new File([blob], 'print.pdf', { type: 'application/pdf' }));
        formData.append('lcapIsCompress', false);
        formData.append('viaOriginURL', false);
        uploadResult = await fetch(uploadUrl, { method: 'POST', body: formData }).then((r) => r.json());
        this._log('PDF 上传结果', uploadResult);
      } catch (e) {
        this._log('PDF 上传失败', e);
      }
    }
    const blobUrl = URL.createObjectURL(blob);
    try {
      printJS({ printable: blobUrl, type: 'pdf', showModal: true });
    } catch (e) {
      window.open(blobUrl, '_blank');
    }
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    return { filePath: uploadResult?.filePath, size: blob.size, url: uploadResult?.url };
  }
}
