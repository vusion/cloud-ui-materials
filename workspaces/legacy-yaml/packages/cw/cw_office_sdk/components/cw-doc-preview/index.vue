<template>
    <div ref="container" class="doc-preview-container">
      <div class="doc-preview-content" ref="docPreviewContent">
        <div>{{ emptyText }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { renderAsync } from 'docx-preview';
  import panzoom from 'panzoom';
  
  export default {
    name: 'cw-doc-preview',
    props: {
      emptyText: {
        type: String,
        default: '文件加载中'
      },
      panZoom: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '请在这里编写代码',
      },
      ignoreHeight: {
        type: Boolean,
        default: false,
      },
      ignoreWidth: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      value: {
        handler: function (val) {
          this.getData(val);
        },
      },
    },
    data() {
      return {
        docxOptions: {
          className: 'kaimo-docx',
          inWrapper: true,
          ignoreWidth: this.ignoreWidth,
          ignoreHeight: this.ignoreHeight,
          ignoreFonts: false,
          breakPages: true,
          // false：尊重 Word 写入的 <w:lastRenderedPageBreak/>，分页更接近 Word 实际页数
          ignoreLastRenderedPageBreak: false,
          experimental: false,
          trimXmlDeclaration: true,
          useBase64URL: false,
          useMathMLPolyfill: false,
          showChanges: false,
          debug: false,
        },
        htmlData: '',
      };
    },
    mounted() {
      this.getData(this.value.trim());
      this.updateScale();
      window.addEventListener('resize', this.updateScale);
  
      if (!this.$env.VUE_APP_DESIGNER && this.panZoom) {
        this.$nextTick(() => {
          const element = this.$refs.container;
          panzoom(element, {
            maxZoom: this.maxScale,
            minZoom: this.minScale,
            bounds: true,
            boundsPadding: 0.1,
          });
        });
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScale);
    },
    methods: {
      async getData(url) {
        if (typeof url === 'string') {
          let buf = await fetch(url).then((r) => r.arrayBuffer());
          this.docxRender(buf);
        }
      },
      docxRender(buffer) {
        let bodyContainer = this.$refs['docPreviewContent'];
  
        renderAsync(
          buffer,
          bodyContainer,
          null,
          this.docxOptions
        ).then((res) => {
          console.log('res---->', res);
          // docx-preview 不会按纸张高度做软分页；超出页高的内容会撑高单页
          this.reflowOverflowPages(bodyContainer);
          // docx-preview 会复用页脚中 PAGE/NUMPAGES 的缓存静态结果，导致每页页码相同
          this.fixPageNumbers(bodyContainer);
          this.updateScale();
        });
      },
      /**
       * 按纸张高度拆分溢出页，使预览页数更接近 Word（依赖 DOM 测量，无法 100% 对齐排版引擎）
       */
      reflowOverflowPages(container) {
        if (!container || this.ignoreHeight) return;
        const className = this.docxOptions.className || 'docx';
        const wrapper = container.querySelector(`.${className}-wrapper`) || container;
        let guard = 0;
        let i = 0;

        while (i < wrapper.children.length && guard < 200) {
          guard += 1;
          const section = wrapper.children[i];
          if (!section || !section.classList || !section.classList.contains(className)) {
            i += 1;
            continue;
          }

          const pageHeight = this.cssLengthToPx(section.style.minHeight || section.style.height);
          if (!pageHeight) {
            i += 1;
            continue;
          }

          section.style.height = `${pageHeight}px`;
          section.style.minHeight = `${pageHeight}px`;
          section.style.overflow = 'hidden';
          section.style.boxSizing = 'border-box';

          const article = section.querySelector('article');
          const available = this.getArticleAvailableHeight(section, pageHeight);
          // 允许少量溢出，避免因测量误差把标题等短段落拆成「空页」
          const overflowTolerance = 24;
          if (!article || available <= 0 || article.scrollHeight <= available + overflowTolerance) {
            i += 1;
            continue;
          }

          const overflowNodes = this.extractOverflowNodes(article, available);
          if (!overflowNodes.length) {
            // 单块无法再拆（如超高单元格），恢复为可撑开，避免裁切内容
            section.style.height = '';
            i += 1;
            continue;
          }

          const nextSection = this.createContinuedSection(section, overflowNodes);
          section.after(nextSection);
          // 当前页可能仍溢出，继续处理同一页
        }
      },
      cssLengthToPx(value) {
        if (!value) return 0;
        const num = parseFloat(value);
        if (Number.isNaN(num)) return 0;
        if (String(value).endsWith('pt')) return (num * 96) / 72;
        return num;
      },
      getOuterHeight(el) {
        const style = window.getComputedStyle(el);
        return (
          el.offsetHeight +
          (parseFloat(style.marginTop) || 0) +
          (parseFloat(style.marginBottom) || 0)
        );
      },
      getArticleAvailableHeight(section, pageHeight) {
        const style = window.getComputedStyle(section);
        const paddingY =
          (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);
        const header = section.querySelector('header');
        const footer = section.querySelector('footer');
        const headerH = header ? header.offsetHeight : 0;
        const footerH = footer ? footer.offsetHeight : 0;
        return Math.max(0, pageHeight - paddingY - headerH - footerH);
      },
      extractOverflowNodes(article, available) {
        const children = Array.from(article.children);
        if (!children.length) return [];

        let used = 0;
        for (let idx = 0; idx < children.length; idx += 1) {
          const child = children[idx];
          const height = this.getOuterHeight(child);

          if (used === 0 && child.tagName === 'TABLE' && height > available) {
            const overflowTable = this.splitTableByHeight(child, available);
            if (!overflowTable) {
              // 尝试拆分超高单元格内的块级内容
              const overflowFromCell = this.splitOversizedTableRow(child, available);
              if (!overflowFromCell) return [];
              return [overflowFromCell, ...children.slice(idx + 1)];
            }
            return [overflowTable, ...children.slice(idx + 1)];
          }

          if (used + height <= available) {
            used += height;
            continue;
          }

          if (child.tagName === 'TABLE' && used < available) {
            const room = available - used;
            const overflowTable = this.splitTableByHeight(child, room);
            if (overflowTable) {
              return [overflowTable, ...children.slice(idx + 1)];
            }
            const overflowFromCell = this.splitOversizedTableRow(child, room);
            if (overflowFromCell) {
              return [overflowFromCell, ...children.slice(idx + 1)];
            }
          }

          // 至少保留一个子节点在当前页，避免空页死循环
          if (idx === 0) return [];
          // 非表格场景：避免当前页只剩极矮标题
          if (used < 80) return [];
          return children.slice(idx);
        }
        return [];
      },
      splitTableByHeight(table, available) {
        const rows = Array.from(table.rows || []);
        if (rows.length <= 1) return null;

        let used = 0;
        let splitAt = rows.length;
        for (let i = 0; i < rows.length; i += 1) {
          const rowHeight = this.getOuterHeight(rows[i]);
          if (used + rowHeight > available && i > 0) {
            splitAt = i;
            break;
          }
          used += rowHeight;
        }
        if (splitAt >= rows.length) return null;

        const nextTable = table.cloneNode(false);
        const colgroup = table.querySelector('colgroup');
        if (colgroup) nextTable.appendChild(colgroup.cloneNode(true));

        rows.slice(splitAt).forEach((row) => {
          nextTable.appendChild(row);
        });
        return nextTable;
      },
      /**
       * 单行超高时，把单元格内放不下的块级子节点挪到下一页的续表中
       */
      splitOversizedTableRow(table, available) {
        const rows = Array.from(table.rows || []);
        if (!rows.length) return null;

        let usedBefore = 0;
        let targetRow = null;
        for (let i = 0; i < rows.length; i += 1) {
          const rowHeight = this.getOuterHeight(rows[i]);
          if (usedBefore + rowHeight > available) {
            targetRow = rows[i];
            break;
          }
          usedBefore += rowHeight;
        }
        if (!targetRow) return null;

        const roomInRow = Math.max(40, available - usedBefore);
        const cells = Array.from(targetRow.cells || []);
        if (!cells.length) return null;

        let tallestCell = cells[0];
        let tallestContent = 0;
        cells.forEach((cell) => {
          // 同行单元格会被撑成同一高度，需按内部真实内容高度判断
          const contentH = Array.from(cell.children).reduce(
            (sum, child) => sum + child.offsetHeight,
            0
          );
          if (contentH > tallestContent) {
            tallestContent = contentH;
            tallestCell = cell;
          }
        });

        // 先按块级子节点拆；若仍是单段超高，再按文本拆段
        const cellChildren = Array.from(tallestCell.children);
        let splitAt = -1;
        let overflowParagraph = null;

        if (cellChildren.length > 1) {
          let usedInCell = 0;
          splitAt = cellChildren.length;
          for (let i = 0; i < cellChildren.length; i += 1) {
            const child = cellChildren[i];
            const h = this.getOuterHeight(child);
            if (usedInCell + h <= roomInRow) {
              usedInCell += h;
              continue;
            }
            // 当前块放不下：优先拆分超高段落，否则整块挪到下一页
            if (child.tagName === 'P') {
              overflowParagraph = this.splitParagraphByHeight(
                child,
                Math.max(40, roomInRow - usedInCell)
              );
              if (overflowParagraph) {
                splitAt = i + 1;
                break;
              }
            }
            if (i === 0) return null;
            splitAt = i;
            break;
          }
          if (splitAt >= cellChildren.length && !overflowParagraph) return null;
        } else if (cellChildren.length === 1 && cellChildren[0].tagName === 'P') {
          overflowParagraph = this.splitParagraphByHeight(cellChildren[0], roomInRow);
          if (!overflowParagraph) return null;
          splitAt = 1;
        } else {
          return null;
        }

        const nextTable = table.cloneNode(false);
        const colgroup = table.querySelector('colgroup');
        if (colgroup) nextTable.appendChild(colgroup.cloneNode(true));

        const nextRow = targetRow.cloneNode(true);
        const nextCells = Array.from(nextRow.cells || []);
        cells.forEach((cell, cellIdx) => {
          const nextCell = nextCells[cellIdx];
          if (!nextCell) return;
          nextCell.innerHTML = '';

          if (cell === tallestCell) {
            if (overflowParagraph) nextCell.appendChild(overflowParagraph);
            Array.from(cell.children)
              .slice(splitAt)
              .forEach((node) => nextCell.appendChild(node));
          } else {
            // 同行其它单元格：整行续到下一页时复制剩余结构，避免错位
            Array.from(cell.children)
              .slice(splitAt)
              .forEach((node) => nextCell.appendChild(node.cloneNode(true)));
          }
        });
        nextTable.appendChild(nextRow);

        const rowIndex = rows.indexOf(targetRow);
        rows.slice(rowIndex + 1).forEach((row) => nextTable.appendChild(row));

        return nextTable;
      },
      /**
       * 按可视高度拆分超高段落文本（近似 Word 的段内分页）
       */
      splitParagraphByHeight(paragraph, available) {
        const original = paragraph.textContent || '';
        if (!original || paragraph.offsetHeight <= available) return null;

        let lo = 1;
        let hi = original.length;
        let best = 0;
        while (lo <= hi) {
          const mid = (lo + hi) >> 1;
          paragraph.textContent = original.slice(0, mid);
          if (paragraph.offsetHeight <= available) {
            best = mid;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }

        if (best <= 0 || best >= original.length) {
          paragraph.textContent = original;
          return null;
        }

        // 尽量在标点/空白处断开，避免把词从中间切断
        let breakAt = best;
        const lookBack = original.slice(Math.max(0, best - 30), best);
        const punct = lookBack.match(/.*[。！？；;!?\s]/);
        if (punct) {
          breakAt = best - lookBack.length + punct[0].length;
        }
        if (breakAt <= 0 || breakAt >= original.length) breakAt = best;

        paragraph.textContent = original.slice(0, breakAt);
        const nextParagraph = paragraph.cloneNode(false);
        nextParagraph.textContent = original.slice(breakAt);
        return nextParagraph;
      },
      createContinuedSection(sourceSection, nodes) {
        const nextSection = sourceSection.cloneNode(false);
        nextSection.style.cssText = sourceSection.style.cssText;

        const header = sourceSection.querySelector('header');
        if (header) nextSection.appendChild(header.cloneNode(true));

        const article = document.createElement('article');
        nodes.forEach((node) => article.appendChild(node));
        nextSection.appendChild(article);

        const footer = sourceSection.querySelector('footer');
        if (footer) nextSection.appendChild(footer.cloneNode(true));

        return nextSection;
      },
      /**
       * 按实际分页修正页眉/页脚中的页码字段（如「第 X 页 共 Y 页」「Page X of Y」）
       */
      fixPageNumbers(container) {
        if (!container) return;
        const className = this.docxOptions.className || 'docx';
        const sections = Array.from(container.querySelectorAll(`section.${className}`));
        const total = sections.length;
        if (!total) return;

        sections.forEach((section, index) => {
          const pageNum = index + 1;
          section.querySelectorAll('header, footer').forEach((el) => {
            this.replacePageNumberInElement(el, pageNum, total);
          });
        });
      },
      replacePageNumberInElement(el, pageNum, total) {
        const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
        if (!text) return;

        // 中文常见：第 X 页 共 Y 页
        if (/第\s*\d+\s*页\s*共\s*\d+\s*页/.test(text)) {
          const numberSpans = Array.from(el.querySelectorAll('span')).filter((span) =>
            /^\d+$/.test((span.textContent || '').trim())
          );
          if (numberSpans.length >= 2) {
            numberSpans[0].textContent = String(pageNum);
            numberSpans[1].textContent = String(total);
            return;
          }
          el.innerHTML = el.innerHTML.replace(
            /(第\s*)\d+(\s*页\s*共\s*)\d+(\s*页)/,
            `$1${pageNum}$2${total}$3`
          );
          return;
        }

        // 英文常见：Page X of Y
        if (/page\s*\d+\s*of\s*\d+/i.test(text)) {
          const numberSpans = Array.from(el.querySelectorAll('span')).filter((span) =>
            /^\d+$/.test((span.textContent || '').trim())
          );
          if (numberSpans.length >= 2) {
            numberSpans[0].textContent = String(pageNum);
            numberSpans[1].textContent = String(total);
            return;
          }
          el.innerHTML = el.innerHTML.replace(
            /(page\s*)\d+(\s*of\s*)\d+/i,
            `$1${pageNum}$2${total}`
          );
        }
      },
      updateScale() {
        const container = this.$refs.container;
        const content = this.$refs.docPreviewContent;
  
        if (container && content) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const contentWidth = content.scrollWidth;
          const contentHeight = content.scrollHeight;
  
          const scaleX = containerWidth / contentWidth;
          const scaleY = containerHeight / contentHeight;
  
          const scale = Math.min(scaleX, scaleY);
  
          content.style.transform = `scale(${scale})`;
          content.style.transformOrigin = 'top left';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .doc-preview-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .doc-preview-content {
    transform-origin: top left;
  }
  </style>

<style>
.kaimo-docx-wrapper {
    padding: 0 !important;
    display: block !important;
    background-color: transparent !important;
}
</style>