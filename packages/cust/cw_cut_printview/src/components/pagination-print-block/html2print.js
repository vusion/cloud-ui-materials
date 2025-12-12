import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import printJS from 'print-js';

/**
 * 生成print文件
 * @param {Object} param
 * @param {HTMLElement} param.element - 需要转换的dom根节点
 * @param {string} [param.direction='v'] - 纸张方向，h横向，v竖向
 * @param {number} param.baseX - pdf页内容距页面左边的高度，默认居中显示，为(pager宽度 - contentWidth) / 2)
 * @param {number} param.baseY - pdf页内容距页面上边的高度，默认 15px
 * @param {HTMLElement} param.header - 页眉dom元素
 * @param {HTMLElement} param.footer - 页脚dom元素
 * @param {string} [param.format='a4'] - pdf格式
 * @returns {Promise}
 */

export default class Html2Pdf {
  constructor(element, param = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element配置应为HTMLElement');
    }
    console.log('[ param ] >', param);

    this._stores = {};

    this.element = element;
    // 缩放比例
    this.contentWidth = param.contentWidth || 550;
    this.fileName = '导出的pdf文件';
    this.baseX = param.baseX;
    this.baseY = param.baseY || 0;
    this.format = param.format || 'a4';

    this.header = param.header;
    this.footer = param.footer;

    this.contentWidth = param.pagerWidth - 2 * this.baseX;
    this.contentHeight = param.pagerHeight - 2 * this.baseY;

    this.direction = param.direction || 'v'; // 默认竖向,l横向
    this.pagerWidth = param.pagerWidth;
    this.pagerHeight = param.pagerHeight;
    this.itemClass = 'print-view-split';
    // 分页符类名
    this.splitClass = 'print-view-split-line';
    // 横向分页符类名
    this.splitLandscapeClass = 'print-view-split-landscape';

    // 页眉页脚高度
    this.pdfFooterHeight = 0;
    this.pdfHeaderHeight = 0;

    this.pdf = null;
    this.rate = 1; // 缩放比率
    this.pages = []; // 当前分页数据
    this.elementTop = 0; // 根元素距离可视区域高度
    this.preNode = null; // 记录遍历时候上一个节点
    this.positionData = {}; // 计算位置保存的对象
  }

  /**
   * 将元素转化为canvas元素
   * @param {HTMLElement} element - 当前要转换的元素
   * @param {width} width - 内容宽度
   * @returns
   */
  async toCanvas(element, width, isLandscape = false) {
    // canvas元素
    let canvas = await html2canvas(element, {
      allowTaint: true, // 允许渲染跨域图片
      scale: 1, // 增加清晰度
      useCORS: true, // 允许跨域
      logging: true,
      ignoreElements: (e) => {
        if (e.contains(element) || element.contains(e) || e.tagName === 'STYLE' || e.tagName === 'LINK' || e.tagName === 'HEAD') {
          return false;
        }

        return true;
      },
      onclone: isLandscape
        ? (clonedDoc, clonedElement) => {
            // 使用ID精确定位，而不是不稳定的 querySelector('div')
            const landscapeContent = clonedDoc.getElementById(clonedElement.id);
            if (landscapeContent) {
              const landscapeWidth = this.pagerHeight - 2 * this.baseY; // 旋转后，宽度对应页面高度
              landscapeContent.style.width = `${landscapeWidth}pt`;
            }
          }
        : null,
    });
    // 获取canvas转化后的宽度
    const canvasWidth = canvas.width;
    // 获取canvas转化后的高度
    const canvasHeight = canvas.height;
    // 高度转化为PDF的高度
    const height = (width / canvasWidth) * canvasHeight;
    // 转化成图片Data
    const canvasData = canvas.toDataURL('image/jpeg', 1.0);
    // 释放canvas
    canvas = null;
    return { width, height, data: canvasData };
  }

  /**
   * 生成打印文件，并调用打印机接口
   * @returns {Promise} 返回一个promise
   */
  async print() {
    try {
      // jsPDF实例
      const pdf = new jsPDF({
        unit: 'pt',
        format: this.format,
        orientation: 'p', // 始终以竖向开始
      });
      this.pdf = pdf;

      // 计算页眉页脚高度
      if (this.header) {
        this.pdfHeaderHeight = (await this.toCanvas(this.header, this.contentWidth)).height;
      }
      if (this.footer) {
        this.pdfFooterHeight = (await this.toCanvas(this.footer, this.contentWidth)).height;
      }

      // 1. 将内容分块
      const sections = [];
      let currentSection = { orientation: 'p', nodes: [] };
      this.element.childNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains(this.splitLandscapeClass)) {
          // 保存之前的竖向块
          if (currentSection.nodes.length > 0) {
            sections.push(currentSection);
          }
          // 添加横向块
          sections.push({ orientation: 'l', nodes: [node] });
          // 开始新的竖向块
          currentSection = { orientation: 'p', nodes: [] };
        } else if (node.nodeType === 1 && node.classList.contains(this.splitClass)) {
          // 普通分页符，也视为一个独立的块来处理
          if (currentSection.nodes.length > 0) {
            sections.push(currentSection);
          }
          sections.push({ orientation: 'p', nodes: [node], isSplit: true });
          currentSection = { orientation: 'p', nodes: [] };
        } else {
          // 只添加元素节点或非空的文本节点，过滤掉纯空白的文本节点
          const isElementNode = node.nodeType === 1;
          const isNonEmptyTextNode = node.nodeType === 3 && node.textContent.trim() !== '';
          if (isElementNode || isNonEmptyTextNode) currentSection.nodes.push(node);
        }
      });
      if (currentSection.nodes.length > 0) {
        sections.push(currentSection);
      }

      let pageCount = 0;
      const allPages = []; // [{ canvas, orientation, pages: [y-offsets] }]

      // 2. 对每个块进行canvas转换和分页计算
      for (const section of sections) {
        if (section.isSplit) {
          // 对于强制分页符，我们只需要确保它能触发分页
          const lastBlock = allPages[allPages.length - 1];
          if (lastBlock) {
            lastBlock.forcePageBreak = true;
          }
          continue;
        }

        // 安全检查：如果区块没有任何有效节点，则跳过
        if (section.nodes.length === 0) {
          continue;
        }

        const isLandscape = section.orientation === 'l';
        const contentWidth = isLandscape ? this.pagerHeight - 2 * this.baseX : this.contentWidth;

        // 创建一个唯一的ID，用于在 onclone 中精确定位
        const wrapperId = `print-wrapper-${Date.now()}-${Math.random()}`;
        const wrapper = document.createElement('div');
        wrapper.id = wrapperId;
        section.nodes.forEach((node) => wrapper.appendChild(node.cloneNode(true)));

        // 将 wrapper 临时附加到 DOM 中一个不可见的位置
        // 这可以提高 html2canvas 的稳定性和准确性
        wrapper.style.position = 'fixed';
        wrapper.style.left = '-10000px';
        wrapper.style.top = '-10000px';

        // 【新增代码】关键修复：强制限制 wrapper 的宽度，防止内容塌缩
        // 使用 pt 单位，使其与 PDF 内容区域等宽，保证排版一致
        wrapper.style.width = `${contentWidth}pt`; 
        // 建议加上这个，防止背景透明变黑
        wrapper.style.backgroundColor = '#ffffff';
        document.body.appendChild(wrapper);

        const canvas = await this.toCanvas(wrapper, contentWidth, isLandscape);

        // 渲染完成后，从 DOM 中移除
        document.body.removeChild(wrapper);

        // 对于横向内容，分页高度是页面宽度
        const pageContentHeight = isLandscape
          ? this.pagerWidth - 2 * this.baseX
          : this.pagerHeight - this.pdfHeaderHeight - this.pdfFooterHeight - 2 * this.baseY;

        const pages = [0];
        let currentY = 0;
        while (currentY + pageContentHeight < canvas.height - 10) {
          currentY += pageContentHeight;
          pages.push(currentY);
        }
        allPages.push({ canvas, orientation: section.orientation, pages });
        pageCount += pages.length;
      }

      // 3. 渲染PDF
let currentPageIndex = 1;
      let isFirstPage = true;

      for (const block of allPages) {
        const isLandscape = block.orientation === 'l';
        
        // 根据当前块的方向，决定页面的宽高
        // 注意：addPage('l') 后，jsPDF 的坐标系也会随之旋转，宽变成了长边
        const currentPageWidth = isLandscape ? this.pagerHeight : this.pagerWidth;
        const currentPageHeight = isLandscape ? this.pagerWidth : this.pagerHeight;

        for (let i = 0; i < block.pages.length; i++) {
          const yOffset = block.pages[i];

          if (!isFirstPage) {
            // [修改点1]：不再写死 'p'，而是使用 block.orientation ('l' 或 'p')
            pdf.addPage(this.format, block.orientation);
          } else {
            isFirstPage = false;
            // 如果第一页就是横向，需要单独处理第一页的初始方向（通常初始化是 'p'）
            // 但 jsPDF 初始化后很难改第一页方向，建议通常保持第一页竖向，或者在 new jsPDF 时就判断
          }

          if (isLandscape) {
             // [修改点2]：既然页面已经是横向(Landscape)了，就不需要旋转图片(-90度)了
             // 直接正常绘制即可。
             // 注意：toCanvas 阶段已经把 width 设置为了 pagerHeight (即A4的长边)，所以这里直接用
             
             // 计算在该页显示的图片高度（处理跨页截断）
             const remainingHeight = block.canvas.height - yOffset;
             // 限制图片绘制高度，防止画出页面
             const drawHeight = Math.min(remainingHeight, currentPageHeight - 2 * this.baseY); 
             
             // 这里的 contentWidth 在前面 loop sections 时已经根据 isLandscape 调整过了
             const imgWidth = isLandscape ? this.pagerHeight - 2 * this.baseX : this.contentWidth;

             pdf.addImage(
              block.canvas.data,
              'JPEG',
              this.baseX, 
              this.baseY + (isLandscape ? 0 : this.pdfHeaderHeight) - yOffset, // 横向页通常不带通用页眉，如有需要可调整
              imgWidth,
              block.canvas.height
            );
          } else {
            // 竖向逻辑保持不变
            pdf.addImage(
                block.canvas.data, 
                'JPEG', 
                this.baseX, 
                this.baseY + this.pdfHeaderHeight - yOffset, 
                this.contentWidth, 
                block.canvas.height
            );
          }

          // --- 遮白逻辑 (Masking) ---
          // 顶部遮白 (Top Mask)
          this.addBlank(0, 0, currentPageWidth, this.baseY, pdf); 
          // 底部遮白 (Bottom Mask)
          this.addBlank(0, currentPageHeight - this.baseY, currentPageWidth, this.baseY, pdf); 

          // 如果是横向页，根据需求决定是否添加页眉页脚
          // 通常横向的大表格页不使用通用页眉，或者需要专门设计的横向页眉
          if (!isLandscape) {
             // 遮盖内容上部和下部多余的部分（针对内容跨页的情况）
            const pageContentHeight = currentPageHeight - this.pdfHeaderHeight - this.pdfFooterHeight - 2 * this.baseY;
            
            // 顶部页眉区域遮白
            this.addBlank(0, this.baseY, currentPageWidth, this.pdfHeaderHeight, pdf);
            // 底部页脚区域遮白
            this.addBlank(0, currentPageHeight - this.baseY - this.pdfFooterHeight, currentPageWidth, this.pdfFooterHeight, pdf);

            // 添加页眉和页脚
            await this.addHeader(currentPageIndex, this.header, pdf, this.contentWidth, pageCount);
            await this.addFooter(pageCount, currentPageIndex, this.footer, pdf, this.contentWidth, false);
          } else {
             // [可选] 如果横向页也需要页脚（例如页码），需要重新计算页脚位置
             // await this.addFooter(pageCount, currentPageIndex, this.footer, pdf, currentPageWidth - 2 * this.baseX, true);
          }

          currentPageIndex++;
        }

        // if (block.forcePageBreak && allPages.indexOf(block) < allPages.length - 1) {
        //    // 处理强制分页符
        //    // 获取下一个块的方向，以便正确添加空白页
        //    const nextBlock = allPages[allPages.indexOf(block) + 1];
        //    const nextOrientation = nextBlock ? nextBlock.orientation : 'p';
        //    pdf.addPage(this.format, nextOrientation);
        //    isFirstPage = false; 
        // }
      }

      let result;
      if (/android/i.test(navigator.userAgent)) {
        // 安卓设备,
        result = this.printNative(pdf);
      } else {
        result = await this.printFile(pdf);
      }
    } catch (error) {
      console.error('生成pdf出错', error);
    }
  }

  printFile(pdf) {
    const data = pdf.output('blob');
    const blobUrl = URL.createObjectURL(data);
    const result = new File([data], this.fileName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });
    printJS(blobUrl);
    return result;
  }

  /**
   * 使用原生方法打印
   */
  printNative(pdf) {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    // 安卓端推荐直接打开新窗口（新标签页）让用户手动打印或保存
    const win = window.open(blobUrl, '_blank');
    if (!win) {
      alert('请允许浏览器弹窗以查看 PDF');
    }

    const result = new File([blob], this.fileName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    return result; // printNative was returning undefined before
  }

  /**
   * 遍历正常的元素节点
   * @param {HTMLElement} nodes - 当前要遍历的节点数组
   * @returns
   */
  // This method is no longer used in the new logic, but kept for potential future use or reference.
  traversingNodes(nodes) {
    for (const element of nodes) {
      const one = element;
      // 深度终点
      const isItem = one.classList && one.classList.contains(this.itemClass);
      // 对需要处理分页的元素，计算是否跨界，若跨界，则直接将顶部位置作为分页位置，进行分页，且子元素不需要再进行判断
      const { offsetHeight = 0 } = one;
      // 计算出最终高度
      const offsetTop = this.getElementTop(one);

      // 如果元素是分页符，则需要分新的页面
      const isSplit = one.classList && one.classList.contains(this.splitClass);
      const isLandscapeSplit = one.classList && one.classList.contains(this.splitLandscapeClass);
      if (isSplit || isLandscapeSplit) {
        // 新增分页点，在元素底部位置添加分页点，使后面的元素另起一页
        const splitBottom = offsetTop + offsetHeight;
        const splitBottomRate = this.rate * splitBottom;

        // 附加额外信息到分页点
        const pageInfo = {
          position: splitBottomRate,
          splitNode: one, // 记录是哪个节点触发的分页
        };
        // 兼容旧的纯数字格式
        pageInfo.valueOf = function () {
          return this.position;
        };

        this.pages.push(pageInfo);
        // 继续处理后面的元素，不return
        continue;
      }
      // dom转换后距离顶部的高度
      // 转换成canvas高度
      const top = this.rate * offsetTop;
      const rateOffsetHeight = this.rate * offsetHeight;

      if (top && rateOffsetHeight) {
        if (isItem) {
          // dom高度转换成生成pdf的实际高度
          // 代码不考虑dom定位、边距、边框等因素，需在slot里自行考虑，如将box-sizing设置为border-box
          this.updateTablePos(rateOffsetHeight, top);
          // one.classList.add("pdf-table-split-tr")
        } else {
          // 遍历子节点
          this.traversingNodes(one.childNodes);
          this.updateNormalElPos(top, rateOffsetHeight);
        }
      }
    }
  }

  // 可能跨页元素位置更新的方法
  // 需要考虑分页元素，则需要考虑两种情况
  // 1. 普通达顶情况，如上
  // 2. 当前距离顶部高度加上元素自身高度 大于 整页高度，则需要载入一个分页点
  updateTablePos(eHeight, top) {
    // 如果高度已经超过当前页，则证明可以分页了
    const nowPageTop = this.pages[this.pages.length - 1];
    if (top - nowPageTop >= this.originalPageHeight) {
      this.pages.push(nowPageTop + this.originalPageHeight);
    } else if (top + eHeight - nowPageTop > this.originalPageHeight && top !== nowPageTop) {
      this.pages.push(top);
    }
  }
  /**
   *  普通元素更新位置
   *  普通元素只需要考虑到是否到达了分页点，即当前距离顶部高度 - 上一个分页点的高度 大于 正常一页的高度，则需要载入分页点
   * @param {Number} top - 当前元素在pdf中距离顶部可视区域高度（经过比例转换)
   * @returns
   */
  updateNormalElPos(top, eleHeight) {
    const latestPageTop = this.pages.length > 0 ? this.pages[this.pages.length - 1] : 0;
    if (top - latestPageTop >= this.originalPageHeight) {
      this.pages.push(latestPageTop + this.originalPageHeight);
    } else if (top + eleHeight - latestPageTop > this.originalPageHeight && top != latestPageTop) {
      this.pages.push(latestPageTop + this.originalPageHeight);
    }
  }
  /**
   * 获取元素距离网页顶部的距离
   */
  getElementTop(element) {
    if (element.getBoundingClientRect) {
      const rect = element.getBoundingClientRect() || {};
      const topDistance = rect.top;

      return topDistance;
    }
    return 0;
  }

  /**
   * 添加页眉
   * @returns
   */
  async addHeader(pageNo, header, pdf, contentWidth, pageSize) {
    if (!header || !(header instanceof HTMLElement)) {
      return;
    }

    let pageNoDom = header.querySelector('.print-header-page');
    let pageSizeDom = header.querySelector('.print-header-page-size');
    const originalPageSizeText = pageSizeDom ? pageSizeDom.innerText : '';

    if (pageNoDom) {
      pageNoDom.innerText = pageNo;
    }
    if (pageSizeDom) {
      pageSizeDom.innerText = pageSize;
    }
    if (pageNo.toString() !== '1' || (pageSizeDom && originalPageSizeText !== pageSize.toString()) || !this.__header) {
      // 其他页 页头都是一样的，不需要每次都生成
      this.__header = await this.toCanvas(header, contentWidth);
    }

    const { height, data } = this.__header;
    pdf.addImage(data, 'JPEG', this.baseX, this.baseY, contentWidth, height);
  }

  /**
   * 添加页脚
   */
  async addFooter(pageSize, pageNo, footer, pdf, contentWidth, isLandscape = false) {
    if (!footer || !(footer instanceof HTMLElement)) {
      return;
    }

    let pageNoDom = footer.querySelector('.print-footer-page');
    let pageSizeDom = footer.querySelector('.print-footer-page-size');
    const originalPageSizeText = pageSizeDom ? pageSizeDom.innerText : '';

    if (pageNoDom) {
      pageNoDom.innerText = pageNo;
    }
    if (pageSizeDom) {
      pageSizeDom.innerText = pageSize;
    }

    // 如果设置了页码或总页数变化，才需要每次重新生成canvas
    if (pageNo.toString() !== '1' || (pageSizeDom && originalPageSizeText !== pageSize.toString()) || !this.__footer) {
      this.__footer = await this.toCanvas(footer, contentWidth);
    }

    const { height, data } = this.__footer;
    const pagerHeight = isLandscape ? this.pagerWidth : this.pagerHeight;
    // 高度位置计算:当前页面高度 - 页脚在pdf中的高度
    pdf.addImage(data, 'JPEG', this.baseX, pagerHeight - height - this.baseY, contentWidth, height);
  }

  // 截取图片
  addImage(_x, _y, pdf, data, width, height) {
    pdf.addImage(data, 'JPEG', _x, _y, width, height);
  }

  /**
   * 添加空白遮挡
   */
  addBlank(x, y, width, height, pdf) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(width), Math.ceil(height), 'F');
  }
}
