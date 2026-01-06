import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';

/**
 * Html2Pdf - 智能混合排版 (单次横向版)
 * 特性：
 * 1. <div class="print-view-split-line print-view-split-landscape"></div>
 * -> 仅让紧随其后的这一个 content-wrapper 横向打印。
 * 2. 该块结束后，自动恢复竖向打印。
 */
export default class Html2Pdf {
  constructor(element, param = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element配置应为HTMLElement');
    }

    this.element = element;
    this.fileName = param.fileName || '导出的pdf文件';

    // 基础参数
    this.baseX = param.baseX || 0;
    this.baseY = param.baseY || 0;
    this.format = param.format || 'a4';

    // 纸张物理尺寸 (以 A4 为例)
    // 建议传入 595.28 和 841.89
    const pW = param.pagerWidth || 595.28;
    const pH = param.pagerHeight || 841.89;

    // 定义两种方向的物理尺寸
    this.size = {
      p: { width: pW, height: pH }, // 竖向
      l: { width: pH, height: pW }, // 横向
    };

    this.header = param.header;
    this.footer = param.footer;

    // 类名定义
    this.itemClass = 'print-view-split'; // 内容块 (大表格/卡片)
    this.splitLineClass = 'print-view-split-line'; // 分页线
    this.landscapeClass = 'print-view-split-landscape'; // 横向标记
    this.headerClass = 'print-view-split-header'; // 表头元素

    this.pdf = null;
    this.rate = 1;

    this.pagesInfo = [];
    this.tableHeaderImg = null; // 表头图片数据
  }

  /**
   * 生成 Canvas
   */
  async toCanvas(element) {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      width: element.scrollWidth,
      height: element.scrollHeight,
      ignoreElements: (e) => {
        if (e.contains(element) || element.contains(e) || ['STYLE', 'LINK', 'HEAD', 'SCRIPT'].includes(e.tagName)) {
          return false;
        }
        return true;
      },
    });
    return { width: canvas.width, height: canvas.height, data: canvas.toDataURL('image/jpeg', 0.95) };
  }

  async print() {
    // 默认起始方向
    const startOrientation = 'p';

    const pdf = new jsPDF({
      unit: 'pt',
      format: this.format,
      orientation: startOrientation,
    });
    this.pdf = pdf;

    // 2. 计算缩放比 (始终以竖向内容宽度为基准，保证字体大小一致)
    const elementOffsetWidth = this.element.offsetWidth;
    const contentWidthP = this.size.p.width - 2 * this.baseX;
    this.rate = contentWidthP / elementOffsetWidth;

    // 3. 预处理页眉页脚
    let pdfHeaderHeight = 0;
    let pdfFooterHeight = 0;

    if (this.header) {
      const hRes = await this.toCanvas(this.header);
      pdfHeaderHeight = hRes.height * (contentWidthP / hRes.width);
      this.__headerImg = hRes;
    }
    if (this.footer) {
      const fRes = await this.toCanvas(this.footer);
      pdfFooterHeight = fRes.height * (contentWidthP / fRes.width);
      this.__footerImg = fRes;
    }

    // 4. 预处理表头（如果存在）
    const headerElement = this.element.querySelector(`.${this.headerClass}`);
    if (headerElement) {
      const headerRes = await this.toCanvas(headerElement);
      this.tableHeaderImg = {
        data: headerRes.data,
        width: headerRes.width,
        height: headerRes.height,
        pdfHeight: headerRes.height * (contentWidthP / headerRes.width),
      };
    }

    // 5. 生成主图
    const { data: mainImgData } = await this.toCanvas(this.element);
    const pdfContentTotalWidth = this.element.scrollWidth * this.rate;
    const pdfContentTotalHeight = this.element.scrollHeight * this.rate;

    // 6. === 核心：遍历节点计算分页 ===
    // 初始第一页
    this.pagesInfo = [{ y: 0, orientation: 'p' }];

    // 记录由于“单次横向”逻辑，当前期望的下一个块的方向
    this.nextBlockOrientation = 'p';

    // 预计算有效内容高度
    // 基础高度（不含表头）：用于第一页和手动分页
    const baseContentHeight = {
      p: this.size.p.height - pdfHeaderHeight - pdfFooterHeight - 2 * this.baseY,
      l: this.size.l.height - pdfHeaderHeight - pdfFooterHeight - 2 * this.baseY,
    };
    // 带表头的高度：用于自动分页的后续页面
    const tableHeaderHeight = this.tableHeaderImg ? this.tableHeaderImg.pdfHeight : 0;
    this.contentHeights = {
      p: baseContentHeight.p - tableHeaderHeight,
      l: baseContentHeight.l - tableHeaderHeight,
    };
    this.baseContentHeights = baseContentHeight; // 保存基础高度，用于手动分页

    // 开始遍历
    this.traversingNodes(this.element.childNodes);

    // 过滤尾部无效页
    const lastPage = this.pagesInfo[this.pagesInfo.length - 1];
    if (lastPage.y >= pdfContentTotalHeight - 5) {
      this.pagesInfo.pop();
    }

    // 7. 循环生成 PDF
    for (let i = 0; i < this.pagesInfo.length; i++) {
      const currentPage = this.pagesInfo[i];
      const nextPageY = i < this.pagesInfo.length - 1 ? this.pagesInfo[i + 1].y : pdfContentTotalHeight;

      // 内容高度校验
      const currentContentHeight = nextPageY - currentPage.y;
      if (currentContentHeight < 1) continue;

      // 获取当前页物理尺寸
      const pageWidth = this.size[currentPage.orientation].width;
      const pageHeight = this.size[currentPage.orientation].height;
      const contentWidth = pageWidth - 2 * this.baseX;

      // 添加新页 (第一页除外)
      if (i > 0) {
        pdf.addPage(this.format, currentPage.orientation);
      }

      // --- 绘制大图 (视口移动) ---
      // 如果当前页需要显示表头，需要调整内容位置，为表头留出空间
      const tableHeaderOffset = i > 0 && currentPage.showTableHeader && this.tableHeaderImg ? this.tableHeaderImg.pdfHeight : 0;
      const imgX = this.baseX;
      const imgY = this.baseY + pdfHeaderHeight + tableHeaderOffset - currentPage.y;

      pdf.addImage(mainImgData, 'JPEG', imgX, imgY, pdfContentTotalWidth, pdfContentTotalHeight);

      // --- 遮罩 Masking (根据当前页尺寸遮挡) ---
      // 计算表头高度（如果当前页需要显示表头）
      const currentTableHeaderHeight = i > 0 && currentPage.showTableHeader && this.tableHeaderImg ? this.tableHeaderImg.pdfHeight : 0;

      // 1. Top
      this.addBlank(0, 0, pageWidth, this.baseY + pdfHeaderHeight, pdf);
      // 2. Bottom
      const footerStartY = pageHeight - this.baseY - pdfFooterHeight;
      this.addBlank(0, footerStartY, pageWidth, this.baseY + pdfFooterHeight, pdf);
      // 3. Middle (内容不足遮挡)
      const contentStartY = this.baseY + pdfHeaderHeight + currentTableHeaderHeight;
      const contentEndAbsY = contentStartY + currentContentHeight;
      if (contentEndAbsY < footerStartY - 1) {
        this.addBlank(0, contentEndAbsY, pageWidth, footerStartY - contentEndAbsY, pdf);
      }
      // 4. Left
      this.addBlank(0, 0, this.baseX, pageHeight, pdf);
      // 5. Right (根据内容宽遮挡右侧)
      this.addBlank(this.baseX + contentWidth, 0, pageWidth - (this.baseX + contentWidth), pageHeight, pdf);

      // --- 页眉页脚 ---
      if (this.__headerImg) {
        const { data, width, height } = this.__headerImg;
        const renderH = height * (contentWidth / width);
        pdf.addImage(data, 'JPEG', this.baseX, this.baseY, contentWidth, renderH);
      }

      // --- 表头（仅在自动分页时显示，且不是第一页） ---
      if (i > 0 && currentPage.showTableHeader && this.tableHeaderImg) {
        const { data, width, height } = this.tableHeaderImg;
        const renderH = height * (contentWidth / width);
        const headerY = this.baseY + pdfHeaderHeight;
        pdf.addImage(data, 'JPEG', this.baseX, headerY, contentWidth, renderH);
      }

      if (this.__footerImg) {
        const { data, width, height } = this.__footerImg;
        const renderH = height * (contentWidth / width);
        pdf.addImage(data, 'JPEG', this.baseX, pageHeight - this.baseY - renderH, contentWidth, renderH);
      }
    }

    try {
      if (/android/i.test(navigator.userAgent)) {
        return this.printNative(pdf);
      } else {
        return this.printFile(pdf);
      }
    } catch (error) {
      console.error('生成PDF异常', error);
    }
  }

  /**
   * 遍历节点 (核心逻辑更新)
   */
  traversingNodes(nodes) {
    for (const element of nodes) {
      if (element.nodeType !== 1) continue;

      // 1. 识别特殊类名
      const isManualSplit = element.classList.contains(this.splitLineClass);
      const isLandscapeTrigger = element.classList.contains(this.landscapeClass);

      const isItem = element.classList.contains(this.itemClass); // 内容块

      const offsetHeight = element.offsetHeight;
      const offsetTop = this.getElementTop(element);

      const top = this.rate * offsetTop;
      const rateOffsetHeight = this.rate * offsetHeight;

      // === 分页线逻辑 ===
      if (isManualSplit) {
        // 检查是否为表头元素（表头也是分页线的一种，但不触发自动表头显示）
        const isHeaderElement = element.classList.contains(this.headerClass);

        if (isLandscapeTrigger) {
          // 遇到 landscape 标记：
          // 1. 告诉系统：下一个块我要横向
          this.nextBlockOrientation = 'l';
          // 2. 立即结束当前页 (无论当前是啥)，新起的一页将是 横向
          // 手动分页不显示表头
          this.addPagePoint(top, 'l', true);
        } else {
          // 普通分页线（包括表头分页线）：
          // 1. 恢复默认竖向 (或者保持现状？根据需求，默认恢复竖向比较安全)
          this.nextBlockOrientation = 'p';
          // 手动分页不显示表头
          this.addPagePoint(top, 'p', true);
        }
        continue;
      }

      // === 内容块逻辑 ===
      // 使用当前暂存的方向 ('l' 或 'p')
      const targetOrientation = this.nextBlockOrientation;

      if (isItem) {
        // 计算表格/卡片位置
        this.updateTablePos(rateOffsetHeight, top, targetOrientation);

        // 【关键点】: 如果当前是横向，消费完这个 item 后，立即恢复竖向
        if (targetOrientation === 'l') {
          this.nextBlockOrientation = 'p';
          // 此时我们不一定非要立刻加分页点。
          // 只有当下一个元素是竖向且当前页剩下的空间不够，或者方向不同时，updateNormalElPos 会自动处理
        }
      } else {
        // 普通元素 (文本等)
        if (element.childNodes && element.childNodes.length > 0) {
          this.traversingNodes(element.childNodes);
        }
        this.updateNormalElPos(top, rateOffsetHeight, targetOrientation);
      }
    }
  }

  /**
   * 添加分页点 (带方向)
   * @param {number} y - 分页位置
   * @param {string} orientation - 页面方向 ('p' 或 'l')
   * @param {boolean} isManualSplit - 是否为手动分页（分页线触发）
   */
  addPagePoint(y, orientation, isManualSplit = false) {
    const lastPage = this.pagesInfo[this.pagesInfo.length - 1];

    // 去重阈值 10px
    if (Math.abs(y - lastPage.y) > 10) {
      this.pagesInfo.push({
        y: y,
        orientation: orientation,
        showTableHeader: !isManualSplit && this.tableHeaderImg !== null, // 自动分页时显示表头
      });
    } else {
      // 如果位置几乎重叠，但方向改变了，更新方向
      if (orientation && lastPage.orientation !== orientation) {
        lastPage.orientation = orientation;
      }
    }
  }

  // 计算内容块分页
  updateTablePos(eHeight, top, orientation) {
    const lastPage = this.pagesInfo[this.pagesInfo.length - 1];

    // 1. 检查方向冲突
    // 如果上一页是竖向，但我现在要求横向 -> 必须强制分页
    // 如果上一页是横向，但我现在恢复了竖向 -> 必须强制分页
    if (lastPage.orientation !== orientation) {
      this.addPagePoint(top, orientation, false); // 方向冲突导致的自动分页
      // 更新 lastPage 为新加的这一页
      return this.updateTablePos(eHeight, top, orientation);
    }

    // 2. 检查高度溢出
    // 判断是否为第一页：第一页不显示表头，使用基础高度；后续自动分页显示表头，使用带表头的高度
    const isFirstPage = this.pagesInfo.length === 1;
    const limit = isFirstPage ? this.baseContentHeights[orientation] : this.contentHeights[orientation];

    // 元素跨页了
    if (top + eHeight - lastPage.y > limit) {
      if (Math.abs(top - lastPage.y) > 5) {
        // 元素前切一刀，新页沿用当前要求的方向（自动分页）
        this.addPagePoint(top, orientation, false);
      } else {
        // 元素太高，硬切（自动分页）
        this.addPagePoint(lastPage.y + limit, orientation, false);
      }
    }
  }

  // 普通元素计算
  updateNormalElPos(top, eleHeight, orientation) {
    const lastPage = this.pagesInfo[this.pagesInfo.length - 1];

    // 1. 检查方向冲突 (自动修正)
    // 场景：横向的大表格打印完了，nextBlockOrientation 变回了 'p'
    // 此时遇到的下一个 div，发现 lastPage 依然是 'l' -> 触发强制分页，新起一张 'p'
    if (lastPage.orientation !== orientation) {
      // 只有当元素高度大于0时才分页，避免空div触发（自动分页）
      if (eleHeight > 1) {
        this.addPagePoint(top, orientation, false);
      }
      return;
    }

    // 判断是否为第一页：第一页不显示表头，使用基础高度；后续自动分页显示表头，使用带表头的高度
    const isFirstPage = this.pagesInfo.length === 1;
    const limit = isFirstPage ? this.baseContentHeights[orientation] : this.contentHeights[orientation];

    if (top - lastPage.y >= limit) {
      // 自动分页
      this.addPagePoint(lastPage.y + limit, orientation, false);
    }
  }

  // ... 辅助方法保持不变 ...
  addBlank(x, y, width, height, pdf) {
    if (width > 0 && height > 0) {
      pdf.setFillColor(255, 255, 255);
      pdf.rect(x, y, Math.ceil(width), Math.ceil(height), 'F');
    }
  }

  getElementTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null && current !== this.element) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  printFile(pdf) {
    const data = pdf.output('blob');
    const blobUrl = URL.createObjectURL(data);
    printJS(blobUrl);
    return { pdfResult: blobUrl };
  }

  printNative(pdf) {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
    return { pdfResult: blobUrl };
  }
}
