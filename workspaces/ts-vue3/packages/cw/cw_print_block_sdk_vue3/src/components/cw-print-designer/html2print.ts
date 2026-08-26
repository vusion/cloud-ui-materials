import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import printJS from 'print-js';

interface Html2PdfParam {
  contentWidth?: number;
  baseX?: number;
  baseY?: number;
  format?: string | number[];
  header?: HTMLElement;
  footer?: HTMLElement;
  direction?: string;
  pagerWidth?: number;
  pagerHeight?: number;
  pagerInFooter?: string;
}

export default class Html2Pdf {
  _stores: Record<string, unknown>;
  element: HTMLElement;
  contentWidth: number;
  fileName: string;
  baseX: number;
  baseY: number;
  format: string | number[];
  header?: HTMLElement;
  footer?: HTMLElement;
  contentHeight: number;
  direction: string;
  pagerWidth: number;
  pagerHeight: number;
  itemClass: string;
  pdfFooterHeight: number;
  pdfHeaderHeight: number;
  pdf: jsPDF | null;
  rate: number;
  pages: number[];
  elementTop: number;
  preNode: unknown;
  positionData: Record<string, unknown>;
  height?: number;
  originalPageHeight?: number;
  __header?: { width: number; height: number; data: string };
  __footer?: { width: number; height: number; data: string };

  constructor(element: HTMLElement, param: Html2PdfParam = {}) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('element配置应为HTMLElement');
    }
    console.log('[ param ] >', param);

    this._stores = {};

    this.element = element;
    this.contentWidth = param.contentWidth || 550;
    this.fileName = '导出的pdf文件';
    this.baseX = param.baseX ?? 0;
    this.baseY = param.baseY || 0;
    this.format = param.format || 'a4';

    this.header = param.header;
    this.footer = param.footer;

    this.contentWidth = (param.pagerWidth ?? 0) - 2 * this.baseX;
    this.contentHeight = (param.pagerHeight ?? 0) - 2 * this.baseY;

    this.direction = param.direction || 'v';
    this.pagerWidth = param.pagerWidth ?? 0;
    this.pagerHeight = param.pagerHeight ?? 0;
    this.itemClass = 'print-view-split';

    this.pdfFooterHeight = 0;
    this.pdfHeaderHeight = 0;

    this.pdf = null;
    this.rate = 1;
    this.pages = [];
    this.elementTop = 0;
    this.preNode = null;
    this.positionData = {};
  }

  async toCanvas(element: HTMLElement, width: number) {
    let canvas = await html2canvas(element, {
      allowTaint: true,
      scale: 1,
      useCORS: true,
      logging: true,
      ignoreElements: (e) => {
        if (
          e.contains(element) ||
          element.contains(e) ||
          e.tagName === 'STYLE' ||
          e.tagName === 'LINK' ||
          e.tagName === 'HEAD'
        ) {
          return false;
        }

        return true;
      },
    });
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const height = (width / canvasWidth) * canvasHeight;
    const canvasData = canvas.toDataURL('image/jpeg', 1.0);
    canvas = null as unknown as HTMLCanvasElement;
    return { width, height, data: canvasData };
  }

  async print() {
    const pdf = new jsPDF({
      unit: 'pt',
      format: this.format as string,
      orientation: this.pagerWidth > this.pagerHeight ? 'l' : 'p',
    });

    this.pdf = pdf;
    let pdfFooterHeight = 0;
    let pdfHeaderHeight = 0;
    this.elementTop = this.getElementTop(this.element);

    const elementWidth = this.element.offsetWidth;

    const rate = this.contentWidth / elementWidth;
    this.rate = rate;

    const baseY = this.baseY;
    const baseX = this.baseX;

    if (this.footer) {
      pdfFooterHeight = (await this.toCanvas(this.footer, this.contentWidth)).height;
      this.pdfFooterHeight = pdfFooterHeight;
    }

    if (this.header) {
      pdfHeaderHeight = (await this.toCanvas(this.header, this.contentWidth)).height;
      this.pdfHeaderHeight = pdfHeaderHeight;
    }

    const { width, height, data } = await this.toCanvas(this.element, this.contentWidth);

    this.height = height;
    const originalPageHeight =
      this.pagerHeight - pdfFooterHeight - pdfHeaderHeight - 2 * baseY;
    this.originalPageHeight = originalPageHeight;

    this.pages = [rate * this.getElementTop(this.element)];

    this.traversingNodes(this.element.childNodes);
    const newPages = this.pages.map((item) => item - this.pages[0]);

    const pages = this.pages;

    for (let i = 0; i < newPages.length; ++i) {
      const pdfHeaderH = pdfHeaderHeight;
      const pdfFooterH = pdfFooterHeight;

      this.addImage(baseX, baseY + pdfHeaderH - newPages[i], pdf, data, width, height);
      this.addBlank(0, 0, this.pagerWidth, baseY, pdf);
      this.addBlank(0, this.pagerHeight - baseY, this.pagerWidth, baseY, pdf);

      if (i < newPages.length - 1) {
        const imageHeight = newPages[i + 1] - newPages[i];
        this.addBlank(
          0,
          imageHeight + pdfHeaderH + baseY,
          this.pagerWidth,
          this.pagerHeight - imageHeight - baseY,
          pdf,
        );
      }

      await this.addHeader(i + 1, this.header, pdf, this.contentWidth);

      await this.addFooter(pages.length, i + 1, this.footer, pdf, this.contentWidth);

      if (i !== newPages.length - 1) {
        pdf.addPage();
      }
    }

    try {
      let result: File;
      if (/android/i.test(navigator.userAgent)) {
        result = this.printNative(pdf);
      } else {
        result = await this.printFile(pdf);
      }

      return {
        positionData: this.positionData,
        pdfResult: result,
      };
    } catch (error) {
      console.error('生成pdf出错', error);
    }
  }

  printFile(pdf: jsPDF) {
    const data = pdf.output('blob');
    const blobUrl = URL.createObjectURL(data);
    const result = new File([data], this.fileName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });
    printJS(blobUrl);
    return result;
  }

  printNative(pdf: jsPDF) {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    const win = window.open(blobUrl, '_blank');
    if (!win) {
      alert('请允许浏览器弹窗以查看 PDF');
    }

    // @ts-expect-error legacy parity: data is undefined in source
    const result = new File([data], this.fileName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    return result;
  }

  traversingNodes(nodes: NodeListOf<ChildNode>) {
    for (const element of nodes) {
      const one = element as HTMLElement;
      const isItem = one.classList && one.classList.contains(this.itemClass);
      const { offsetHeight = 0 } = one;
      const offsetTop = this.getElementTop(one);

      const top = this.rate * offsetTop;
      const rateOffsetHeight = this.rate * offsetHeight;

      if (top && rateOffsetHeight) {
        if (isItem) {
          this.updateTablePos(rateOffsetHeight, top);
        } else {
          this.traversingNodes(one.childNodes);
          this.updateNormalElPos(top, rateOffsetHeight);
        }
      }
    }
  }

  updateTablePos(eHeight: number, top: number) {
    const nowPageTop = this.pages[this.pages.length - 1];
    if (top - nowPageTop >= (this.originalPageHeight ?? 0)) {
      this.pages.push(nowPageTop + (this.originalPageHeight ?? 0));
    } else if (
      top + eHeight - nowPageTop > (this.originalPageHeight ?? 0) &&
      top !== nowPageTop
    ) {
      this.pages.push(top);
    }
  }

  updateNormalElPos(top: number, eleHeight: number) {
    const latestPageTop = this.pages.length > 0 ? this.pages[this.pages.length - 1] : 0;
    if (top - latestPageTop >= (this.originalPageHeight ?? 0)) {
      this.pages.push(latestPageTop + (this.originalPageHeight ?? 0));
    } else if (
      top + eleHeight - latestPageTop > (this.originalPageHeight ?? 0) &&
      top != latestPageTop
    ) {
      this.pages.push(latestPageTop + (this.originalPageHeight ?? 0));
    }
  }

  getElementTop(element: HTMLElement) {
    if (element.getBoundingClientRect) {
      const rect = element.getBoundingClientRect() || {};
      const topDistance = rect.top;

      return topDistance;
    }
    return 0;
  }

  async addHeader(pageNo: number, header: HTMLElement | undefined, pdf: jsPDF, contentWidth: number) {
    if (!header || !(header instanceof HTMLElement)) {
      return;
    }

    const pageNoDom = header.querySelector('.print-header-page');
    const pageSizeDom = header.querySelector('.print-header-page-size');
    if (pageNoDom) {
      pageNoDom.textContent = String(pageNo);
    }

    if (pageSizeDom) {
      pageSizeDom.textContent = String(this.pages.length);
    }
    if (pageNoDom || !this.__header) {
      this.__header = await this.toCanvas(header, contentWidth);
    }

    const { height, data } = this.__header;
    pdf.addImage(data, 'JPEG', this.baseX, this.baseY, contentWidth, height);
  }

  async addFooter(
    pageSize: number,
    pageNo: number,
    footer: HTMLElement | undefined,
    pdf: jsPDF,
    contentWidth: number,
  ) {
    if (!footer || !(footer instanceof HTMLElement)) {
      return;
    }

    const pageNoDom = footer.querySelector('.print-footer-page');
    const pageSizeDom = footer.querySelector('.print-footer-page-size');
    if (pageNoDom) {
      pageNoDom.textContent = String(pageNo);
    }

    if (pageSizeDom) {
      pageSizeDom.textContent = String(pageSize);
    }

    if (pageNoDom || !this.__footer) {
      this.__footer = await this.toCanvas(footer, contentWidth);
    }

    const { height, data } = this.__footer;
    pdf.addImage(
      data,
      'JPEG',
      this.baseX,
      this.pagerHeight - height - this.baseY,
      contentWidth,
      height,
    );
  }

  addImage(_x: number, _y: number, pdf: jsPDF, data: string, width: number, height: number) {
    pdf.addImage(data, 'JPEG', _x, _y, width, height);
  }

  addBlank(x: number, y: number, width: number, height: number, pdf: jsPDF) {
    pdf.setFillColor(255, 255, 255);
    pdf.rect(x, y, Math.ceil(width), Math.ceil(height), 'F');
  }
}
