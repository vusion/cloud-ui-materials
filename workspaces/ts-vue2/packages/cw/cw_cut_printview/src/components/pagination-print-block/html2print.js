import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';

// === 常量定义 ===
const CLS_SPLIT_LINE = 'print-view-split-line'; // 分页线
const CLS_LANDSCAPE = 'print-view-split-landscape'; // 横向标记
const CLS_TABLE = 'u-table-view_table___GNEcUtLJ'; // 表格容器
const CLS_ROW = 'u-table-view_row___GNEcUtLJ'; // 表格行
const CLS_HEAD = 'u-table-view_head___GNEcUtLJ'; // 表格头
const CLS_HEAD_TABLE = 'u-table-view_head-table___GNEcUtLJ'; // 表格头表格元素

/**
 * 核心类：Html2Pdf (分段渲染版)
 * 策略：根据 print-view-split-line 将 DOM 拆分为多个 Section，每个 Section 独立渲染和分页
 */
export default class Html2Pdf {
  constructor(element, param = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element配置应为HTMLElement');
    }
    this.element = element;
    this.baseX = param.baseX || 10;
    this.baseY = param.baseY || 10;
    this.format = param.format || 'a4';

    // 纸张物理尺寸 (单位 pt)
    this.pagerWidth = param.pagerWidth || 595.28; // A4 默认宽
    this.pagerHeight = param.pagerHeight || 841.89; // A4 默认高

    this.header = param.header;
    this.footer = param.footer;
    this.fileName = '导出的pdf文件';

    // 初始方向（兼容旧入参 direction: 'v' | 'h'）
    // 新增入参 defaultOrientation: 'p' | 'l'，用于决定第一个 section 的方向
    this.defaultOrientation = param.defaultOrientation; // 'p' | 'l'
    this.initDirection = param.direction || 'v';

    // 渲染质量参数（可选）
    // renderScale: 0.75 ~ 1 建议，越小越快但越糊；默认 1 保持原画质
    this.renderScale = typeof param.renderScale === 'number' ? param.renderScale : 1;
    // jpegQuality: 0.85 ~ 0.95 建议，越小越快/文件越小；默认 0.95 保持原画质
    this.jpegQuality = typeof param.jpegQuality === 'number' ? param.jpegQuality : 0.95;

    // 图片解码缓存：避免 clipImage 每次都重复 new Image + 解码 base64
    this._imgCache = new Map(); // key: imgData, value: Promise<HTMLImageElement>

    // 性能日志开关
    this.debug = false;
  }

  _log(...args) {
    if (!this.debug) return;
    // eslint-disable-next-line no-console
    console.log('[cw_cut_printview][html2print]', ...args);
  }

  _timeStart(label) {
    if (!this.debug) return;
    // eslint-disable-next-line no-console
    console.time(`[cw_cut_printview][html2print] ${label}`);
  }

  _timeEnd(label) {
    if (!this.debug) return;
    // eslint-disable-next-line no-console
    console.timeEnd(`[cw_cut_printview][html2print] ${label}`);
  }

  async print() {
    this._timeStart('print(total)');
    // 1. 找到所有需要打印的打印视图元素
    // 查找所有 id="print-view" 的元素
    const printViewElements = this.element.querySelectorAll('#print-view');

    // 如果element本身是 print-view，也包含它
    const elementIsPrintView = this.element.id === 'print-view';
    const targetElements = elementIsPrintView
      ? [this.element, ...Array.from(printViewElements).filter((el) => el !== this.element)]
      : Array.from(printViewElements);

    // 如果没找到，使用element本身
    if (targetElements.length === 0) {
      targetElements.push(this.element);
    }

    // 2. 对每个打印视图元素进行拆分，合并所有sections
    this._timeStart('splitDomToSections(total)');
    let allSections = [];
    for (const printViewElement of targetElements) {
      const sections = this.splitDomToSections(printViewElement);
      allSections = allSections.concat(sections);
    }
    this._timeEnd('splitDomToSections(total)');

    // 如果没有任何section，创建一个包含所有元素的section
    if (allSections.length === 0) {
      allSections = [
        {
          nodes: Array.from(this.element.children).filter((node) => node.nodeType === 1),
          orientation: this.initDirection === 'h' ? 'l' : 'p',
        },
      ];
    }

    const firstOrientation =
      (allSections.length > 0 ? allSections[0].orientation : null) || this.defaultOrientation || (this.initDirection === 'h' ? 'l' : 'p');

    // 3. 初始化 PDF（第一页方向由第一个section决定）
    const pdf = new jsPDF({
      unit: 'pt',
      format: this.format,
      orientation: firstOrientation,
    });
    this.pdf = pdf;

    // 4. 预生成页眉页脚图片
    const contentWidthP = this.pagerWidth - 2 * this.baseX;
    this.commonHeaderImg = this.header ? await this.toCanvas(this.header) : null;
    this.commonFooterImg = this.footer ? await this.toCanvas(this.footer) : null;

    // 5. 逐个章节渲染
    let globalPageCount = 0;

    for (let i = 0; i < allSections.length; i++) {
      const section = allSections[i];
      this._log(`section[${i}] start`, { orientation: section.orientation, nodes: section.nodes?.length || 0 });
      this._timeStart(`processSection[${i}]`);
      const sectionPageCount = await this.processSection(pdf, section, globalPageCount, i === 0);
      this._timeEnd(`processSection[${i}]`);
      this._log(`section[${i}] done`, { pages: sectionPageCount });
      globalPageCount += sectionPageCount;
    }

    // 6. 输出
    const out = await this.outputPdf(pdf);
    this._timeEnd('print(total)');
    return out;
  }
  /**
   * 将 DOM 拆分为章节 (基于分割线的分段渲染)
   * 逻辑：
   * 1. 遍历 print-view 的直接子节点
   * 2. 以 .print-view-split-line 元素为界限，将内容拆分为多个"章节（Section）"
   * 3. 遇到 .print-view-split-line 时，前一部分内容结束，立即触发分页
   * 4. .print-view-split-line 本身不应占据 PDF 的任何高度
   * 5. 如果 .print-view-split-line 包含 .print-view-split-landscape 类，则紧随其后的章节使用横向模式
   */
  splitDomToSections(rootElement) {
    const sections = [];
    let currentNodes = [];

    // 初始方向
    let currentOrientation = this.defaultOrientation || (this.initDirection === 'h' ? 'l' : 'p');

    // 1. 获取 print-view 的直接子节点
    const children = Array.from(rootElement.children);

    for (const child of children) {
      // 检查当前 child 是否为分页线
      const isSplitLine = child.classList.contains(CLS_SPLIT_LINE);

      if (isSplitLine) {
        // === 遇到分页线（直接子节点） ===
        // 归档当前页（如果当前页有内容）
        if (currentNodes.length > 0) {
          sections.push({ nodes: [...currentNodes], orientation: currentOrientation });
        }
        currentNodes = [];

        // 确定下一页方向（基于分页线的类名）
        if (child.classList.contains(CLS_LANDSCAPE)) {
          currentOrientation = 'l'; // 横向
        } else {
          currentOrientation = 'p'; // 纵向
        }
        // 注意：分页线本身不加入任何 section，它只是一个标记
        continue;
      }

      // === 普通节点 ===
      // 检查是否包含分页线（递归查找）
      const innerSplitLines = child.querySelectorAll(`.${CLS_SPLIT_LINE}`);

      if (innerSplitLines.length === 0) {
        // 不包含分页线，直接加入当前页
        currentNodes.push(child);
      } else {
        // 包含分页线，需要按分页线拆分
        // 策略：找到所有分页线，按它们在DOM中的顺序拆分内容

        // 递归函数：处理包含分页线的节点
        const processNodeWithSplits = (node) => {
          const result = [];
          let currentGroup = [];
          const wrapper = node.cloneNode(false);

          for (const subChild of Array.from(node.children)) {
            if (subChild.classList.contains(CLS_SPLIT_LINE)) {
              // 遇到分页线
              if (currentGroup.length > 0) {
                // 将当前组的内容添加到wrapper
                currentGroup.forEach((n) => wrapper.appendChild(n.cloneNode(true)));
                result.push({
                  wrapper: wrapper.cloneNode(true),
                  orientation: subChild.classList.contains(CLS_LANDSCAPE) ? 'l' : 'p',
                });
                // 重置
                currentGroup = [];
                wrapper.innerHTML = '';
              } else if (result.length > 0) {
                // 如果当前组为空，只更新方向
                result[result.length - 1].orientation = subChild.classList.contains(CLS_LANDSCAPE) ? 'l' : 'p';
              }
            } else {
              // 检查子节点是否还包含分页线
              if (subChild.querySelector(`.${CLS_SPLIT_LINE}`)) {
                // 递归处理
                const subResult = processNodeWithSplits(subChild);
                if (subResult.length > 0) {
                  // 如果有结果，先提交当前组
                  if (currentGroup.length > 0) {
                    currentGroup.forEach((n) => wrapper.appendChild(n.cloneNode(true)));
                    result.push({
                      wrapper: wrapper.cloneNode(true),
                      orientation: currentOrientation,
                    });
                    currentGroup = [];
                    wrapper.innerHTML = '';
                  }
                  // 添加子节点的结果
                  result.push(...subResult);
                } else {
                  currentGroup.push(subChild);
                }
              } else {
                currentGroup.push(subChild);
              }
            }
          }

          // 处理剩余的组
          if (currentGroup.length > 0) {
            currentGroup.forEach((n) => wrapper.appendChild(n.cloneNode(true)));
            result.push({
              wrapper: wrapper.cloneNode(true),
              orientation: currentOrientation,
            });
          }

          return result;
        };

        const splitResults = processNodeWithSplits(child);

        if (splitResults.length > 0) {
          // 如果有拆分结果，按顺序处理
          for (let i = 0; i < splitResults.length; i++) {
            const splitResult = splitResults[i];

            // 如果这是第一个结果且当前section有内容，先提交当前section
            if (i === 0 && currentNodes.length > 0) {
              sections.push({ nodes: [...currentNodes], orientation: currentOrientation });
              currentNodes = [];
            }

            // 更新方向
            currentOrientation = splitResult.orientation;

            // 添加wrapper到当前section
            currentNodes.push(splitResult.wrapper);

            // 如果不是最后一个，提交当前section
            if (i < splitResults.length - 1) {
              sections.push({ nodes: [...currentNodes], orientation: currentOrientation });
              currentNodes = [];
            }
          }
        } else {
          // 没有拆分结果，直接添加
          currentNodes.push(child);
        }
      }
    }

    // 循环结束，提交剩余内容
    if (currentNodes.length > 0) {
      sections.push({
        nodes: [...currentNodes],
        orientation: currentOrientation,
      });
    }

    return sections;
  }

  /**
   * 处理单个章节：渲染 -> 分页 -> 添加到 PDF
   */
  async processSection(pdf, section, startPageNo, isFirstSection) {
    const isLandscape = section.orientation === 'l';

    // 1. 确定当前章节的物理尺寸
    const pageWidth = isLandscape ? this.pagerHeight : this.pagerWidth;
    const pageHeight = isLandscape ? this.pagerWidth : this.pagerHeight;
    const contentWidth = pageWidth - 2 * this.baseX;

    // 2. 计算页眉页脚高度
    const headerH = this.commonHeaderImg ? this.commonHeaderImg.height : 0;
    const footerH = this.commonFooterImg ? this.commonFooterImg.height : 0;
    const availablePageH = pageHeight - 2 * this.baseY - headerH - footerH;

    // 3. 创建临时容器 (仅用于包裹，不修改元素尺寸)
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.background = '#fff';
    container.style.overflow = 'visible';
    container.style.width = 'auto';
    container.style.minWidth = '0';

    // 复制节点到容器（保持原始尺寸）
    section.nodes.forEach((node) => {
      const clone = node.cloneNode(true);
      container.appendChild(clone);
    });

    document.body.appendChild(container);

    // 等待DOM渲染完成（用 rAF 替代固定 sleep，减少等待时间）
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // 4. 检查是否有 copy_head_ 容器
    const copyHeadContainers = container.querySelectorAll('[id^="copy_head_"]');
    const hasCopyHead = copyHeadContainers.length > 0;

    if (hasCopyHead) {
      // === 使用新的切片状态机逻辑处理 copy_head_ 容器 ===
      this._timeStart('copy_head_(section)');
      const pages = await this.processCopyHeadSection(pdf, container, section, startPageNo, isFirstSection, {
        pageWidth,
        pageHeight,
        contentWidth,
        headerH,
        footerH,
        availablePageH,
      });
      this._timeEnd('copy_head_(section)');
      return pages;
    } else {
      // === 保持原有逻辑处理普通内容 ===
      this._timeStart('normal(section)');
      const pages = await this.processNormalSection(pdf, container, section, startPageNo, isFirstSection, {
        pageWidth,
        pageHeight,
        contentWidth,
        headerH,
        footerH,
        availablePageH,
      });
      this._timeEnd('normal(section)');
      return pages;
    }
  }

  /**
   * 处理 copy_head_ 容器：使用切片状态机逻辑
   */
  async processCopyHeadSection(pdf, container, section, startPageNo, isFirstSection, pageInfo) {
    this._log('copy_head_ section', { startPageNo, isFirstSection, orientation: section.orientation });
    const { pageWidth, pageHeight, contentWidth, headerH, footerH, availablePageH } = pageInfo;
    const isLandscape = section.orientation === 'l';

    // 获取容器实际尺寸
    const actualWidth = Math.max(container.scrollWidth, container.offsetWidth, container.clientWidth);
    const actualHeight = container.scrollHeight;

    // 查找所有 copy_head_ 容器
    const copyHeadContainers = container.querySelectorAll('[id^="copy_head_"]');
    if (copyHeadContainers.length === 0) {
      document.body.removeChild(container);
      return 0;
    }

    // 假设只有一个 copy_head_ 容器（如果多个，需要循环处理）
    const copyHeadContainer = copyHeadContainers[0];

    // 在 copy_head_ 容器内查找表格容器
    const tableElement = copyHeadContainer.querySelector(`.${CLS_TABLE}`);
    if (!tableElement) {
      document.body.removeChild(container);
      return 0;
    }

    // 查找表头元素
    const headerElement = tableElement.querySelector(`.${CLS_HEAD}`);
    if (!headerElement) {
      document.body.removeChild(container);
      return 0;
    }

    // === Preparation (准备) ===

    // 2.1 在渲染前先拿到表头在 copyHeadContainer 内的几何信息（用于从 baseImage 裁剪表头）
    // 说明：html2canvas scale=1 时，getBoundingClientRect 的 px 与 canvas px 对应关系更稳定
    const headerRect = headerElement.getBoundingClientRect();
    const copyHeadRect = copyHeadContainer.getBoundingClientRect();
    const headerTopPx = Math.max(0, Math.round(headerRect.top - copyHeadRect.top));
    const headerHeightPx = Math.max(0, Math.round(headerRect.height));

    // 1. 生成 baseImage (包含整个表格主体)
    this._timeStart('copy_head_.toCanvas(baseImage)');
    const baseImageResult = await this.toCanvas(copyHeadContainer, actualWidth);
    this._timeEnd('copy_head_.toCanvas(baseImage)');
    if (!baseImageResult || !baseImageResult.data) {
      document.body.removeChild(container);
      return 0;
    }

    // 2. 生成 headerImage (仅表头) —— 从 baseImage 裁剪得到，避免第二次 html2canvas 渲染（提速关键点）
    this._timeStart('copy_head_.clip(headerImage)');
    const headerImageData =
      headerHeightPx > 0 ? await this.clipImage(baseImageResult.data, 0, headerTopPx, baseImageResult.canvasWidth, headerHeightPx) : null;
    this._timeEnd('copy_head_.clip(headerImage)');
    const headerImageResult = headerImageData
      ? {
          data: headerImageData,
          width: baseImageResult.width,
          height: headerHeightPx * 0.75, // px -> pt
          canvasWidth: baseImageResult.canvasWidth,
          canvasHeight: headerHeightPx,
        }
      : null;
    if (!headerImageResult || !headerImageResult.data) {
      document.body.removeChild(container);
      return 0;
    }

    // 3. 获取所有行 (rows) 的几何信息
    const containerRect = container.getBoundingClientRect();
    const rows = copyHeadContainer.querySelectorAll(`.${CLS_ROW}`);
    const rowGeometries = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rect = row.getBoundingClientRect();
      const copyHeadRect = copyHeadContainer.getBoundingClientRect();
      const offsetTop = rect.top - copyHeadRect.top; // 相对于 copyHeadContainer 的顶部
      const offsetHeight = rect.height;
      rowGeometries.push({
        element: row,
        offsetTop,
        offsetHeight,
        bottom: offsetTop + offsetHeight,
      });
    }

    // 按 offsetTop 排序
    rowGeometries.sort((a, b) => a.offsetTop - b.offsetTop);

    // 4. 变量初始化
    let sourceY = 0; // 大图上的切割起始点（px）
    let currentPdfY = this.baseY + headerH; // PDF 页面的绘制起始点（pt）
    let pageCount = 0;
    let isFirstPageOfSection = true; // 标记是否为该章节的第一页
    const baseImageHeightPx = baseImageResult.canvasHeight; // baseImage 的总高度（px）
    const headerImageHeightPt = headerImageResult.height; // headerImage 的高度（pt）
    const headerImageHeightPx = headerImageResult.canvasHeight; // headerImage 的高度（px）

    // 转换函数：px -> pt
    const pxToPt = (px) => px * 0.75;
    const ptToPx = (pt) => pt / 0.75;

    // 计算可用高度（pt -> px，用于分页判定）
    const availableHeightPx = ptToPx(availablePageH); // 可用高度（px）

    // 如果这不是整个 PDF 的第一页，需要先添加新页
    if (!isFirstSection) {
      pdf.addPage(this.format, section.orientation);
      pageCount++;
      // 注意：作为新 section 的第一页，不绘制表头（表头在原始位置）
      // isFirstPageOfSection 保持为 true，表示这是该 section 的第一页
      currentPdfY = this.baseY + headerH; // 内容从页眉下方开始
    }

    // === Row Iteration (行遍历循环) ===
    for (let i = 0; i < rowGeometries.length; i++) {
      const row = rowGeometries[i];

      // Calculate Space: 使用 (当前行底边坐标 - 当前页起始 sourceY) > 可用高度 作为分页判定条件
      const rowBottom = row.bottom; // 当前行底边坐标（px）
      const contentHeightFromSourceY = rowBottom - sourceY; // 从 sourceY 到当前行底边的高度（px）

      if (contentHeightFromSourceY > availableHeightPx) {
        // === IF Overflow (溢出换页) ===

        // Step 1 (Flush): 将上一行结束点到当前行开始点之间的内容绘制到 PDF
        const h = row.offsetTop - sourceY; // 高度（px）
        if (h > 0) {
          // 从 baseImage 裁剪指定区域（使用正确的缩放比例）
          const clippedData = await this.clipImage(
            baseImageResult.data,
            0, // sx: 从左边开始
            sourceY, // sy: 从 sourceY 开始
            baseImageResult.canvasWidth, // sw: 完整宽度
            h // sh: 高度
          );

          const hPt = pxToPt(h);
          pdf.addImage(clippedData, 'JPEG', this.baseX, currentPdfY, baseImageResult.width, hPt);
        }

        // 添加页眉页脚到当前页（在换页前）
        const currentPageNo = isFirstPageOfSection && isFirstSection ? startPageNo + 1 : startPageNo + pageCount + 1;
        await this.addCommonHeader(pdf, currentPageNo, contentWidth, headerH);
        await this.addCommonFooter(pdf, currentPageNo, contentWidth, pageHeight, footerH);

        // Step 2 (New Page): 添加新页
        let hasAddedPage = false;
        if (isFirstPageOfSection && isFirstSection) {
          // 第一页已存在，不需要添加，但标记已处理第一页
          isFirstPageOfSection = false;
          pageCount = 1;
          hasAddedPage = false; // 没有执行 addPage
        } else {
          pdf.addPage(this.format, section.orientation);
          pageCount++;
          isFirstPageOfSection = false; // 执行了 addPage，不再是第一页
          hasAddedPage = true; // 执行了 addPage
        }

        // Step 3 (Draw Header): 只有在执行了 addPage() 之后才绘制表头
        if (hasAddedPage) {
          // 执行了 addPage，需要绘制表头
          pdf.addImage(headerImageResult.data, 'JPEG', this.baseX, this.baseY + headerH, headerImageResult.width, headerImageHeightPt);
          // Step 4 (Reset Pointers - 关键!): 更新指针
          currentPdfY = this.baseY + headerH + headerImageHeightPt; // 内容必须接在表头下方
        } else {
          // 第一页，不绘制表头，currentPdfY 保持原值
          // 但如果已经绘制了内容，需要更新 currentPdfY
          if (h > 0) {
            currentPdfY += pxToPt(h);
          }
        }

        // 更新 sourceY 为当前行的 offsetTop（每一页绘制完成后必须更新）
        sourceY = row.offsetTop; // 大图切割点移动到当前行头部
      }
      // ELSE (未溢出): 不执行绘制操作，继续累积内容
    }

    // === Loop End (循环结束 - 修复尾页截断) ===

    // Step 1: 计算剩余高度（将大图中剩余的内容绘制到最后一页）
    const remainH = baseImageHeightPx - sourceY; // px

    if (remainH > 0) {
      // Step 2: 检查剩余部分是否能塞进当前页
      const remainHPt = pxToPt(remainH);
      // 计算当前页剩余可用高度（考虑表头）
      // 如果 isFirstPageOfSection = true，无论是整个 PDF 的第一页还是新 section 的第一页，表头都在原始位置
      const currentPageAvailableHeight = isFirstPageOfSection
        ? availablePageH // 第一页，表头在原始位置，不需要额外空间
        : availablePageH - headerImageHeightPt; // 后续页，需要减去表头高度
      const currentPageAvailableHeightPx = ptToPx(currentPageAvailableHeight);

      const needNewPage = remainH > currentPageAvailableHeightPx;

      if (needNewPage) {
        // 如果当前页有内容，先添加页眉页脚
        if (sourceY > 0 || pageCount > 0) {
          // 当前页有内容，需要添加页眉页脚
          const prevPageNo = isFirstPageOfSection && isFirstSection ? startPageNo + 1 : startPageNo + pageCount + 1;
          await this.addCommonHeader(pdf, prevPageNo, contentWidth, headerH);
          await this.addCommonFooter(pdf, prevPageNo, contentWidth, pageHeight, footerH);
        }

        // 需要新页
        let hasAddedPage = false;
        if (isFirstPageOfSection && isFirstSection) {
          // 第一页已存在，不需要添加，但标记已处理
          isFirstPageOfSection = false;
          pageCount = 1;
          hasAddedPage = false; // 没有执行 addPage
        } else {
          pdf.addPage(this.format, section.orientation);
          pageCount++;
          isFirstPageOfSection = false;
          hasAddedPage = true; // 执行了 addPage
        }

        // 绘制表头（只有在执行了 addPage 之后才绘制）
        if (hasAddedPage) {
          pdf.addImage(headerImageResult.data, 'JPEG', this.baseX, this.baseY + headerH, headerImageResult.width, headerImageHeightPt);
          currentPdfY = this.baseY + headerH + headerImageHeightPt;
        } else {
          currentPdfY = this.baseY + headerH;
        }
      }

      // Step 3 (Final Flush): 绘制剩余内容（尾部数据）
      const clippedData = await this.clipImage(
        baseImageResult.data,
        0, // sx
        sourceY, // sy
        baseImageResult.canvasWidth, // sw
        remainH // sh
      );

      pdf.addImage(clippedData, 'JPEG', this.baseX, currentPdfY, baseImageResult.width, remainHPt);

      // 为最后一页添加页眉页脚
      const finalPageNo = isFirstPageOfSection && isFirstSection ? startPageNo + 1 : startPageNo + pageCount + 1;
      await this.addCommonHeader(pdf, finalPageNo, contentWidth, headerH);
      await this.addCommonFooter(pdf, finalPageNo, contentWidth, pageHeight, footerH);
    } else if (pageCount === 0 && isFirstSection) {
      // 如果没有剩余内容且是第一页（可能所有内容都在第一页，或者没有任何行）
      if (rowGeometries.length === 0) {
        // 没有任何行，只绘制表头
        pdf.addImage(headerImageResult.data, 'JPEG', this.baseX, this.baseY + headerH, headerImageResult.width, headerImageHeightPt);
      }
      await this.addCommonHeader(pdf, startPageNo + 1, contentWidth, headerH);
      await this.addCommonFooter(pdf, startPageNo + 1, contentWidth, pageHeight, footerH);
      pageCount = 1;
    } else if (sourceY > 0 || pageCount > 0) {
      // 如果 sourceY > 0 或 pageCount > 0，说明有内容被绘制，需要为当前页添加页眉页脚
      const finalPageNo = isFirstPageOfSection && isFirstSection ? startPageNo + 1 : startPageNo + pageCount + 1;
      await this.addCommonHeader(pdf, finalPageNo, contentWidth, headerH);
      await this.addCommonFooter(pdf, finalPageNo, contentWidth, pageHeight, footerH);
    }

    document.body.removeChild(container);
    return pageCount > 0 ? pageCount : 1;
  }

  /**
   * 处理普通内容：保持原有逻辑
   */
  async processNormalSection(pdf, container, section, startPageNo, isFirstSection, pageInfo) {
    const { pageWidth, pageHeight, contentWidth, headerH, footerH, availablePageH } = pageInfo;

    // 获取容器实际尺寸
    const scrollWidth = container.scrollWidth;
    const offsetWidth = container.offsetWidth;
    const clientWidth = container.clientWidth;

    let firstChildWidth = 0;
    if (container.firstElementChild) {
      const firstChild = container.firstElementChild;
      firstChildWidth = Math.max(firstChild.scrollWidth || 0, firstChild.offsetWidth || 0, firstChild.getBoundingClientRect().width || 0);
    }

    const actualWidth = Math.max(scrollWidth, offsetWidth, clientWidth, firstChildWidth);
    const actualHeight = container.scrollHeight;
    const actualWidthPt = actualWidth * 0.75;

    // 计算分页点（基于实际尺寸）
    const { splitPoints, tableHeaders } = this.analyzePageBreaks(container, availablePageH);

    // 生成canvas
    this._timeStart('normal.toCanvas(section)');
    const canvasResult = await this.toCanvas(container, actualWidth);
    this._timeEnd('normal.toCanvas(section)');
    document.body.removeChild(container);

    if (!canvasResult || !canvasResult.data) {
      return 0;
    }

    const { data, width: imgW, height: imgH, canvasHeight: canvasHeightPx } = canvasResult;
    const contentWidthPt = Math.min(imgW, actualWidthPt);
    const canvasHeightPt = canvasHeightPx * 0.75;

    // 过滤掉超过canvas高度的分页点，并转换为pt
    const validIndices = [];
    const splitPointsPt = [];
    for (let i = 0; i < splitPoints.length; i++) {
      const pt = splitPoints[i] * 0.75;
      if (pt <= canvasHeightPt) {
        splitPointsPt.push(pt);
        validIndices.push(i);
      }
    }

    const validTableHeaders = validIndices.map((idx) => tableHeaders[idx]);

    if (splitPointsPt.length > 0 && splitPointsPt[splitPointsPt.length - 1] >= canvasHeightPt) {
      splitPointsPt[splitPointsPt.length - 1] = canvasHeightPt;
    }

    // 将长图切割并放入 PDF
    const pageCount = splitPointsPt.length;

    for (let i = 0; i < pageCount; i++) {
      const pageStartYPt = splitPointsPt[i];
      const pageEndYPt = i < pageCount - 1 ? splitPointsPt[i + 1] : canvasHeightPt;
      const pageContentH = pageEndYPt - pageStartYPt;

      if (!isFirstSection || i > 0) {
        pdf.addPage(this.format, section.orientation);
      }

      let drawY = this.baseY + headerH;
      const tableHeader = validTableHeaders[i];
      let tableHeaderHeightPt = 0;

      if (tableHeader && i > 0) {
        tableHeaderHeightPt = tableHeader.height * 0.75;
        drawY = this.baseY + headerH + tableHeaderHeightPt;
      }

      const imgDrawY = drawY - pageStartYPt;
      pdf.addImage(data, 'JPEG', this.baseX, imgDrawY, imgW, imgH);

      if (tableHeader && i > 0) {
        const headSrcYPt = tableHeader.top * 0.75;
        tableHeaderHeightPt = tableHeader.height * 0.75;
        const headDrawY = this.baseY + headerH;
        const headImgDrawY = headDrawY - headSrcYPt;
        pdf.addImage(data, 'JPEG', this.baseX, headImgDrawY, imgW, imgH);
        this.addBlank(pdf, 0, 0, pageWidth, headDrawY);
        const headBottom = headDrawY + tableHeaderHeightPt;
        if (drawY > headBottom) {
          this.addBlank(pdf, 0, headBottom, pageWidth, drawY - headBottom);
        }
      }

      const contentRight = this.baseX + contentWidthPt;
      const rightMaskWidth = pageWidth - contentRight;

      if (tableHeader && i > 0) {
        const headDrawY = this.baseY + headerH;
        const headBottom = headDrawY + tableHeaderHeightPt;
        if (drawY > headBottom) {
          this.addBlank(pdf, 0, headBottom, pageWidth, drawY - headBottom);
        }
        if (rightMaskWidth > 0) {
          this.addBlank(pdf, contentRight, headDrawY, rightMaskWidth, tableHeaderHeightPt);
          this.addBlank(pdf, contentRight, drawY, rightMaskWidth, pageContentH);
        }
      } else {
        this.addBlank(pdf, 0, 0, pageWidth, drawY);
        if (rightMaskWidth > 0) {
          this.addBlank(pdf, contentRight, drawY, rightMaskWidth, pageContentH);
        }
      }

      const contentBottom = drawY + pageContentH;
      if (contentBottom < pageHeight) {
        this.addBlank(pdf, 0, contentBottom, pageWidth, pageHeight - contentBottom);
      }

      const currentPageNo = startPageNo + i + 1;
      await this.addCommonHeader(pdf, currentPageNo, contentWidth, headerH);
      await this.addCommonFooter(pdf, currentPageNo, contentWidth, pageHeight, footerH);
    }

    return pageCount;
  }

  /**
   * 分析 DOM 节点，计算分页位置
   * 实现智能表格分页：行保护（防止截断表格行）和表头重复
   * @param {HTMLElement} container - 容器元素
   * @param {number} pageHeightPt - 每页可用高度（pt单位）
   * @returns {{splitPoints: number[], tableHeaders: Array}} splitPoints和tableHeaders都是px坐标
   */
  analyzePageBreaks(container, pageHeightPt) {
    const splitPoints = [0]; // px坐标，第一个分页点从0开始
    const tableHeaders = [null]; // 每页的表头信息（px坐标），第一页不需要表头
    let currentSplitY = 0; // px坐标，当前分页点的Y坐标

    // 记录每个 copy_head_ 容器对应的表头信息
    const tableHeaderMap = new Map(); // key: copyHeadContainer, value: {top, height, bottom}

    // 将pt转换为px进行比较（1pt = 1.333px at 96dpi，但实际使用0.75作为转换因子）
    const pageHeightPx = pageHeightPt / 0.75;

    // 查找所有 id 以 copy_head_ 开头的元素
    const copyHeadContainers = container.querySelectorAll('[id^="copy_head_"]');

    // 为每个 copy_head_ 容器建立表头映射
    copyHeadContainers.forEach((copyHeadContainer) => {
      // 在 copy_head_ 容器内查找表格容器
      const tableElement = copyHeadContainer.querySelector(`.${CLS_TABLE}`);
      if (!tableElement) return;

      // 在表格容器内查找表头元素（使用 CLS_HEAD）
      const headerElement = tableElement.querySelector(`.${CLS_HEAD}`);
      if (headerElement) {
        const rect = headerElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const top = rect.top - containerRect.top;
        const height = rect.height;
        tableHeaderMap.set(copyHeadContainer, {
          top,
          height,
          bottom: top + height,
        });
      }
    });

    // 获取所有表格行元素（用于行保护）
    // 在 copy_head_ 容器内查找所有表格行（表格行可能在任意层级）
    const elementsToCheck = [];

    const containerRect = container.getBoundingClientRect();
    copyHeadContainers.forEach((copyHeadContainer) => {
      // 直接在 copy_head_ 容器内查找所有表格行（不限制在 tableElement 内）
      // 因为表格行可能在 tbody 中，层级较深
      const rows = copyHeadContainer.querySelectorAll(`.${CLS_ROW}`);
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rect = row.getBoundingClientRect();
        const top = rect.top - containerRect.top;
        const height = rect.height;
        elementsToCheck.push({
          element: row,
          top,
          height,
          bottom: top + height,
          isRow: true,
          copyHeadContainer,
        });
      }
    });

    // 按top位置排序
    elementsToCheck.sort((a, b) => a.top - b.top);

    // 遍历所有元素，计算分页点
    for (const item of elementsToCheck) {
      const { top, height, bottom, isRow, copyHeadContainer } = item;

      if (isRow) {
        // 表格行保护逻辑
        // 获取该表格对应的表头信息
        const tableHeader = copyHeadContainer ? tableHeaderMap.get(copyHeadContainer) : null;

        // 计算当前页的可用高度
        let availableHeight = pageHeightPx;

        // 判断当前分页点所在页面是否需要显示表头
        // 第一页（currentSplitY === 0）：表头在原始位置，需要减去表头高度
        // 后续页：需要重复表头，也需要减去表头高度
        const isFirstPage = currentSplitY === 0;

        // 如果当前页需要显示表头（第一页表头在原始位置，后续页需要重复表头）
        if (tableHeader) {
          // 第一页：如果表头在当前分页点之后（表头在内容中），需要减去表头高度
          // 后续页：需要重复表头，也需要减去表头高度
          if (isFirstPage && currentSplitY < tableHeader.bottom) {
            // 第一页：表头在内容中，可用高度减去表头高度
            availableHeight = pageHeightPx - tableHeader.height;
          } else if (!isFirstPage) {
            // 后续页：需要重复表头，可用高度减去表头高度
            availableHeight = pageHeightPx - tableHeader.height;
          }
        }

        // 计算当前行的底部位置相对于当前分页点的距离
        const distanceFromSplit = bottom - currentSplitY;

        // 如果行会超出当前页，且行的顶部不在当前分页点附近（避免无限循环）
        if (distanceFromSplit > availableHeight && top > currentSplitY + 10) {
          // 触发分页：将分页点设置到当前行的顶部
          currentSplitY = top;
          splitPoints.push(currentSplitY);

          // 如果该表格有表头，在下一页需要重复表头（第二页及以后）
          if (tableHeader) {
            tableHeaders.push({
              top: tableHeader.top,
              height: tableHeader.height,
              bottom: tableHeader.bottom,
            });
          } else {
            tableHeaders.push(null);
          }
        }
      }
    }

    // 确保所有后续页面都有表头信息（如果第一个表格有表头）
    // 如果tableHeaders数组长度小于splitPoints长度，补充表头信息
    if (tableHeaders.length < splitPoints.length) {
      // 获取第一个表格的表头（如果有）
      const firstTableHeader = copyHeadContainers.length > 0 ? tableHeaderMap.get(copyHeadContainers[0]) : null;
      const headerToAdd = firstTableHeader
        ? {
            top: firstTableHeader.top,
            height: firstTableHeader.height,
            bottom: firstTableHeader.bottom,
          }
        : null;
      while (tableHeaders.length < splitPoints.length) {
        tableHeaders.push(headerToAdd);
      }
    }

    return { splitPoints, tableHeaders };
  }

  // === 辅助绘图方法 ===

  /**
   * 从大图中裁剪指定区域并返回新的图片数据
   * @param {string} imgData - 原始图片的 base64 数据
   * @param {number} sx - 源图 X 坐标（px）
   * @param {number} sy - 源图 Y 坐标（px）
   * @param {number} sw - 源图宽度（px）
   * @param {number} sh - 源图高度（px）
   * @returns {Promise<string>} 裁剪后的图片 base64 数据
   */
  async loadImage(imgData) {
    if (!imgData) throw new Error('imgData is required');
    const cached = this._imgCache && this._imgCache.get(imgData);
    if (cached) return cached;

    const p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = imgData;
    });
    if (this._imgCache) this._imgCache.set(imgData, p);
    return p;
  }

  async clipImage(imgData, sx, sy, sw, sh) {
    const img = await this.loadImage(imgData);
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(sw));
    canvas.height = Math.max(1, Math.round(sh));
    const ctx = canvas.getContext('2d');
    // sx/sy/sw/sh 使用 canvas 像素坐标（与 html2canvas scale=1 输出一致）
    ctx.drawImage(img, Math.round(sx), Math.round(sy), Math.round(sw), Math.round(sh), 0, 0, Math.round(sw), Math.round(sh));
    return canvas.toDataURL('image/jpeg', 0.95);
  }

  async toCanvas(element, width) {
    if (!element) return null;
    try {
      // 如果提供了宽度，显式设置以确保完整捕获内容
      // 否则让html2canvas自动捕获元素的实际尺寸
      const options = {
        // 降低 scale 可以减少像素总数，从而加快渲染速度（代价是清晰度降低）
        scale: this.renderScale || 1,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: width || element.scrollWidth || element.offsetWidth,
      };

      // 如果提供了宽度，显式设置
      if (width) {
        options.width = width;
      }

      const canvas = await html2canvas(element, options);

      // 降低 JPEG 质量可以减少编码时间和生成的 base64 体积（代价是轻微压缩痕迹）
      const imgData = canvas.toDataURL('image/jpeg', this.jpegQuality || 0.95);
      // canvas的实际尺寸（px）
      const canvasWidthPx = canvas.width;
      const canvasHeightPx = canvas.height;

      // 将px转换为pt（1px = 0.75pt at 96dpi）
      const widthPt = canvasWidthPx * 0.75;
      const heightPt = canvasHeightPx * 0.75;

      return {
        data: imgData,
        width: widthPt,
        height: heightPt,
        canvasWidth: canvasWidthPx,
        canvasHeight: canvasHeightPx,
      };
    } catch (e) {
      console.error('Canvas生成失败', e);
      return null;
    }
  }

  addBlank(pdf, x, y, w, h) {
    if (h <= 0 || w <= 0) return;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(w), Math.ceil(h), 'F');
  }

  async addCommonHeader(pdf, pageNo, contentWidth, height) {
    if (!this.commonHeaderImg) return;
    const { data } = this.commonHeaderImg;
    pdf.addImage(data, 'JPEG', this.baseX, this.baseY, contentWidth, height);
  }

  async addCommonFooter(pdf, pageNo, contentWidth, pageHeight, height) {
    if (!this.commonFooterImg) return;
    const { data } = this.commonFooterImg;
    const y = pageHeight - this.baseY - height;
    pdf.addImage(data, 'JPEG', this.baseX, y, contentWidth, height);
  }

  async outputPdf(pdf) {
    this._timeStart('outputPdf(blob+print)');
    try {
      const isAndroid = /android/i.test(navigator.userAgent);
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);

      if (isAndroid) {
        window.open(url, '_blank');
      } else {
        printJS(url);
      }
      this._timeEnd('outputPdf(blob+print)');
      return { success: true };
    } catch (error) {
      console.error(error);
      this._timeEnd('outputPdf(blob+print)');
      return { success: false, error };
    }
  }
}
