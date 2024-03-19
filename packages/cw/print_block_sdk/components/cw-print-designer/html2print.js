import jsPDF from "jspdf"
import html2canvas from 'html2canvas'
import printJS from "print-js"

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
      throw new TypeError("element配置应为HTMLElement");
    }
    console.log("[ param ] >", param);

    this._stores = {};

    this.element = element;
    // 缩放比例
    this.contentWidth = param.contentWidth || 550;
    this.fileName = "导出的pdf文件";
    this.baseX = param.baseX;
    this.baseY = param.baseY || 0;
    this.format = param.format || "a4"; 

    this.header = param.header;
    this.footer = param.footer;

    this.contentWidth = param.pagerWidth - 2 * this.baseX;
    this.contentHeight = param.pagerHeight - 2 * this.baseY;

    this.direction = param.direction || "v"; // 默认竖向,l横向
    this.pagerWidth = param.pagerWidth;
    this.pagerHeight = param.pagerHeight;
    this.itemClass = 'print-view-split';

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
  async toCanvas(element, width) {
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
      }
    });
    // 获取canvas转化后的宽度
    const canvasWidth = canvas.width;
    // 获取canvas转化后的高度
    const canvasHeight = canvas.height;
    // 高度转化为PDF的高度
    const height = (width / canvasWidth) * canvasHeight;
    // 转化成图片Data
    const canvasData = canvas.toDataURL("image/jpeg", 1.0);
    // 释放canvas
    canvas = null;
    return { width, height, data: canvasData };
  }

  /**
   * 生成打印文件，并调用打印机接口
   * @returns {Promise} 返回一个promise
   */
  async print() {
    // jsPDF实例
    const pdf = new jsPDF({
      unit: "pt", // mm,pt,in,cm
      format: this.format,
      orientation: this.pagerWidth > this.pagerHeight ? "l" : "p",
    });

    this.pdf = pdf;
    let pdfFooterHeight = 0;
    let pdfHeaderHeight = 0;
    // 每一页的分页坐标， PDF高度， 初始值为根元素距离顶部的距离
    this.elementTop = this.getElementTop(this.element)

    // 元素在网页页面的宽度
    const elementWidth = this.element.offsetWidth;

    // PDF内容宽度 和 在HTML中宽度 的比， 用于将 元素在网页的高度 转化为 PDF内容内的高度， 将 元素距离网页顶部的高度  转化为 距离Canvas顶部的高度
    const rate = this.contentWidth / elementWidth;
    this.rate = rate;

    // 距离PDF 页眉和页脚的间距， 留白留空
    let baseY = this.baseY;
     // 距离PDF左边的距离，/ 2 表示居中 ,,预留空间给左边,  右边，也就是左右页边距
     let baseX = this.baseX;

    // 页脚元素 经过转换后在PDF页面的高度
    if (this.footer) {
      pdfFooterHeight = (await this.toCanvas(this.footer, this.contentWidth))
        .height;
      this.pdfFooterHeight = pdfFooterHeight;
    }

    // 页眉元素 经过转换后在PDF的高度
    if (this.header) {
      pdfHeaderHeight = (await this.toCanvas(this.header, this.contentWidth))
        .height;
      this.pdfHeaderHeight = pdfHeaderHeight;
    }

    // 一页的高度， 转换宽度为一页元素的宽度
    const { width, height, data } = await this.toCanvas(
      this.element,
      this.contentWidth
    );

    this.height = height;
    // 除去页头、页眉、还有内容与两者之间的间距后 每页内容的实际高度
    const originalPageHeight = this.pagerHeight - pdfFooterHeight - pdfHeaderHeight - 2 * baseY;
    this.originalPageHeight = originalPageHeight;

    // 每一页的分页坐标， PDF高度， 初始值为根元素距离顶部的距离
    this.pages = [rate * this.getElementTop(this.element)]; // 要从0开始

    // 深度遍历节点的方法
    this.traversingNodes(this.element.childNodes);
    // 对pages进行一个值的修正，因为pages生成是根据根元素来的，根元素并不是我们实际要打印的元素，而是element，
    // 所以要把它修正，让其值是以真实的打印元素顶部节点为准
    const newPages = this.pages.map((item) => item - this.pages[0]);

    const pages = this.pages;

    // 根据分页位置 开始分页生成pdf
    for (let i = 0; i < newPages.length; ++i) {
      // 页眉高度
      let pdfHeaderH = pdfHeaderHeight;
      // 页脚高度
      let pdfFooterH = pdfFooterHeight;

      // 根据分页位置新增图片，要排除页眉和顶部留白
      this.addImage(
        baseX,
        baseY + pdfHeaderH - newPages[i],
        pdf,
        data,
        width,
        height
      );
      // 将 顶部 与 页眉之间留空留白的部分进行遮白处理
      this.addBlank(0, 0, this.pagerWidth, baseY, pdf);
      // 将 页脚 与 底部之间留空留白的部分进行遮白处理
      this.addBlank(0, this.pagerHeight - baseY, this.pagerWidth, baseY, pdf);

      // 对于除最后一页外，对 内容 的多余部分进行遮白处理
      if (i < newPages.length - 1) {
        // 获取当前页面需要的内容部分高度
        const imageHeight = newPages[i + 1] - newPages[i];
        // 对多余的内容部分进行遮白
        this.addBlank(
          0,
          imageHeight + pdfHeaderH +  baseY,
          this.pagerWidth,
          this.pagerHeight - imageHeight - baseY,
          pdf
        );
      }

      // 添加页眉
      await this.addHeader(i + 1, this.header, pdf, this.contentWidth);

      // 添加页脚
      await this.addFooter(
        pages.length,
        i + 1,
        this.footer,
        pdf,
        this.contentWidth
      );

      // 若不是最后一页，则分页
      if (i !== newPages.length - 1) {
        // 增加分页
        pdf.addPage();
      }
    }

    try {
      const result = await this.printFile(pdf);
      return {
        positionData: this.positionData,
        pdfResult: result,
      };
    } catch (error) {
      console.error("生成pdf出错", error);
      throw new Error(error);
    }
  }

  printFile(pdf) {
    const data = pdf.output("blob");
    const blobUrl = URL.createObjectURL(data);
    const result = new File([data], this.fileName, {
      type: "application/pdf",
      lastModified: Date.now(),
    });
    printJS(blobUrl);
    return result
  }
  /**
   * 遍历正常的元素节点
   * @param {HTMLElement} nodes - 当前要遍历的节点数组
   * @returns
   */
  traversingNodes(nodes) {
    for (const element of nodes) {
      const one = element;
      // 深度终点
      const isItem = one.classList && one.classList.contains(this.itemClass)
      // 对需要处理分页的元素，计算是否跨界，若跨界，则直接将顶部位置作为分页位置，进行分页，且子元素不需要再进行判断
      const { offsetHeight = 0 } = one;
      // 计算出最终高度
      const offsetTop = this.getElementTop(one);

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
      this.pages.push(
        nowPageTop + this.originalPageHeight
      )
    } else if (top + eHeight - nowPageTop  > this.originalPageHeight && top !== nowPageTop) {
      this.pages.push(top)
    }
  }
  /**
   *  普通元素更新位置
   *  普通元素只需要考虑到是否到达了分页点，即当前距离顶部高度 - 上一个分页点的高度 大于 正常一页的高度，则需要载入分页点
   * @param {Number} top - 当前元素在pdf中距离顶部可视区域高度（经过比例转换)
   * @returns
   */
  updateNormalElPos(top, eleHeight) {
    const latestPageTop = this.pages.length > 0 ? this.pages[this.pages.length - 1] : 0
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
      const rect = element.getBoundingClientRect() || {}
      const topDistance = rect.top;

      return topDistance;
    } 
    return 0
  }

  /**
   * 添加页眉
   * @returns
   */
  async addHeader(pageNo, header, pdf, contentWidth) {
    if (!header || !(header instanceof HTMLElement)) {
      return;
    }

    let pageNoDom = header.querySelector(".print-header-page");
    let pageSizeDom = header.querySelector(".print-header-page-size");
    if (pageNoDom) {
      pageNoDom.innerText = pageNo;
    }

    if (pageSizeDom) {
      pageSizeDom.innerText = this.pages.length;
    }
    if (pageNoDom || !this.__header) {
      // 其他页 页头都是一样的，不需要每次都生成
      this.__header = await this.toCanvas(header, contentWidth);
    }

    const { height, data } = this.__header;
    pdf.addImage(data, "JPEG", this.baseX, this.baseY, contentWidth, height);
  }

  /**
   * 添加页脚
   */
  async addFooter(pageSize, pageNo, footer, pdf, contentWidth) {
    if (!footer || !(footer instanceof HTMLElement)) {
      return;
    }

    // 页码元素，类名这里写死了
    let pageNoDom = footer.querySelector(".print-footer-page");
    let pageSizeDom = footer.querySelector(".print-footer-page-size");
    if (pageNoDom) {
      pageNoDom.innerText = pageNo;
    }

    if (pageSizeDom) {
      pageSizeDom.innerText = pageSize;
    }

    // 如果设置了页码的才需要每次重新生成cavan
    if (pageNoDom || !this.__footer) {
      this.__footer = await this.toCanvas(footer, contentWidth);
    }

    const { height, data } = this.__footer;
    // 高度位置计算:当前页面高度 - 页脚在pdf中的高度
    pdf.addImage(
      data,
      "JPEG",
      this.baseX,
      this.pagerHeight - height - this.baseY,
      contentWidth,
      height
    );
  }

  // 截取图片
  addImage(_x, _y, pdf, data, width, height) {
    pdf.addImage(data, "JPEG", _x, _y, width, height);
  }

  /**
   * 添加空白遮挡
   */
  addBlank(x, y, width, height, pdf) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(width), Math.ceil(height), "F");
  }
}
