<template>
  <div class="game-html-reader">
    <template v-if="loading">
      <div class="skeleton-wrapper" ref="skeletonWrapper">
        <!-- <PuSkeleton height="180px" width="100%" class="skeleton-block" />
        <PuSkeleton height="20px" width="60%" class="skeleton-block" />
        <PuSkeleton height="18px" width="40%" class="skeleton-block" />
        <PuSkeleton v-for="i in skeletonLines" :key="i" height="14px" width="100%" class="skeleton-block" /> -->
      </div>
    </template>
    <template v-else>
      <div ref="shadowRootMount"></div>
    </template>
  </div>
</template>

<script>
import { Skeleton as PuSkeleton } from 'vue-loading-skeleton';

export default {
  name: 'game-html-reader',
  components: { PuSkeleton },
  props: {
    dhTarget: {
      type: String,
      default() {
        const isDev = import.meta.env.MODE === 'development';
        return isDev ? 'http://127.0.0.1:8898/fetch?target=https://xy2.163.com/zt/nopub/20250320/32808_1220509.html' : '';
      },
    },
    defaultContent: {
      type: Array,
      default: () => [],
    },
    pStyle: [String, Object],
    h1Style: [String, Object],
    h2Style: [String, Object],
    h3Style: [String, Object],
    spanStyle: [String, Object],
    liStyle: [String, Object],
    strongStyle: [String, Object],
    imgStyle: [String, Object],
    highlightStyle: [String, Object],
    segmentTag: {
      type: String,
      default: 'h2',
    },
    startTagIndex: {
      type: Number,
      // default: 0,
    },
    endTagIndex: {
      type: Number,
      // default: 2,
    },
    enableSegment: {
      type: Boolean,
      default: true,
    },
    customCss: {
      type: String,
      default: '',
    },
    verticalTableSplit: {
      type: Boolean,
      default: false,
    },
    hideEmptyVerticalTables: {
      type: Boolean,
      default: false,
    },
    tableMaxWidth: {
      type: String,
      default: 'unset',
    },
  },
  data() {
    return {
      loading: true,
      rawHtml: '',
      skeletonLines: 6,
    };
  },
  mounted() {
    this.estimateSkeletonLines();
    this.fetchHtml();
  },
  methods: {
    applyTableLayoutStyle(table) {
      if (!(table instanceof HTMLElement)) return;

      if (this.tableMaxWidth) {
        table.style.maxWidth = this.tableMaxWidth;
      }
    },
    removeEmptyVisualRowsAndTable(tableEl) {
      if (!this.hideEmptyVerticalTables) return;

      const rows = Array.from(tableEl.querySelectorAll('tr'));

      rows.forEach((tr) => {
        if (tr.getAttribute('data-auto-inserted') === 'true') return; // 跳过 spacer 行

        const tds = Array.from(tr.querySelectorAll('td'));
        const allEmpty =
          tds.length > 0 &&
          tds.every((td) => {
            const text = td.textContent?.replace(/\s|\u00A0/g, '').trim();
            const bg = window.getComputedStyle(td).backgroundColor?.toLowerCase();
            const isEmpty = !text;
            const isWhite = !bg || bg === 'rgb(255, 255, 255)' || bg === 'white' || bg === 'transparent';
            return isEmpty && isWhite;
          });

        if (allEmpty) {
          tr.remove();
        }
      });

      // 如果只剩下 spacer 行，就干掉整个表格
      const remainingRows = Array.from(tableEl.querySelectorAll('tr')).filter((tr) => tr.getAttribute('data-auto-inserted') !== 'true');
      if (!remainingRows.length) {
        tableEl.remove();
      }
    },
    transformVisualBlocksToVerticalRows(tableEl) {
      const allTrs = Array.from(tableEl.querySelectorAll('tbody > tr'));
      if (!allTrs.length) return;

      const tdMatrix = allTrs.map((tr) => Array.from(tr.children));
      const blocks = [];
      const groupSize = 4;
      const maxColCount = Math.max(...tdMatrix.map((row) => row.length));
      const visualBlockCount = Math.ceil(maxColCount / groupSize);

      for (let blockIndex = 0; blockIndex < visualBlockCount; blockIndex++) {
        const currentBlock = [];
        for (let rowIndex = 0; rowIndex < tdMatrix.length; rowIndex++) {
          const groupStart = blockIndex * groupSize;
          const group = tdMatrix[rowIndex].slice(groupStart, groupStart + 3);
          currentBlock.push(group);
        }
        blocks.push(currentBlock);
      }

      // ↓ 清空 tbody 开始构建新结构
      const tbody = tableEl.querySelector('tbody');
      tbody.innerHTML = '';

      blocks.forEach((block) => {
        block.forEach((group) => {
          const tr = document.createElement('tr');
          group.forEach((td) => {
            tr.appendChild(td.cloneNode(true));
          });
          tbody.appendChild(tr);
        });

        const spacer = document.createElement('tr');
        const spacerTd = document.createElement('td');
        spacerTd.colSpan = 99;
        spacerTd.innerHTML = '&nbsp;';
        spacerTd.style.height = '16px';
        spacerTd.style.border = 'none';
        spacer.setAttribute('data-auto-inserted', 'true');
        spacer.appendChild(spacerTd);
        tbody.appendChild(spacer);
      });
    },
    reloadContent() {
      this.fetchHtml();
    },
    estimateSkeletonLines() {
      this.$nextTick(() => {
        const el = this.$refs.skeletonWrapper;
        if (el && el.offsetHeight > 0) return;
        const container = this.$el;
        const lineHeight = 20;
        const padding = 100;
        const availableHeight = container.offsetHeight || window.innerHeight - padding;
        const estimatedLines = Math.floor(availableHeight / lineHeight);
        this.skeletonLines = Math.max(4, estimatedLines);
      });
    },

    async fetchHtml() {
      this.loading = true;
      try {
        const res = await fetch(this.dhTarget);
        const buffer = await res.arrayBuffer();
        const decoder = new TextDecoder('gbk');
        const html = decoder.decode(buffer);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector('.g_content') || doc.body;

        let extractedHtml = '';

        if (this.enableSegment && this.startTagIndex != null) {
          const tags = Array.from(content.querySelectorAll(this.segmentTag));
          const start = tags[this.startTagIndex];
          const end = this.endTagIndex != null ? tags[this.endTagIndex] : null;

          if (!start) {
            console.warn('找不到 startTagIndex 对应的标签，返回全部');
            extractedHtml = content.innerHTML;
          } else if (this.endTagIndex != null && (!end || this.startTagIndex >= this.endTagIndex)) {
            console.warn('start >= end，或找不到 end 标签，返回 start 后的全部内容');
            const nodes = [];
            let current = start.nextSibling;
            while (current) {
              nodes.push(current);
              current = current.nextSibling;
            }

            const container = document.createElement('div');
            nodes.forEach((n) => container.appendChild(n.cloneNode(true)));
            extractedHtml = container.innerHTML;
          } else {
            const nodes = [];
            let current = start.nextSibling;
            while (current && current !== end) {
              nodes.push(current);
              current = current.nextSibling;
            }

            const container = document.createElement('div');
            nodes.forEach((n) => container.appendChild(n.cloneNode(true)));
            extractedHtml = container.innerHTML;
          }
        } else {
          extractedHtml = content.innerHTML;
        }

        this.rawHtml = extractedHtml;
      } catch (e) {
        console.warn('抓取失败', e);
        this.rawHtml = this.defaultContent.join('');
      } finally {
        this.loading = false;
        requestAnimationFrame(() => {
          if (HTMLElement.prototype.attachShadow) {
            this.mountShadowDOM();
          } else {
            this.mountLightDOM();
          }
        });
      }
    },
    mountShadowDOM() {
      const mount = this.$refs.shadowRootMount;
      if (!mount) return;

      const shadowHost = document.createElement('div');
      const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.innerHTML = this.rawHtml;

      wrapper.querySelectorAll('table').forEach((table) => {
        if (this.verticalTableSplit) {
          this.transformVisualBlocksToVerticalRows(table);
          this.removeEmptyVisualRowsAndTable(table);
        }

        this.applyTableLayoutStyle(table);
      });

      const style = document.createElement('style');
      style.textContent = this.buildScopedCSS();

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(wrapper);
      mount.innerHTML = '';
      mount.appendChild(shadowHost);
    },

    mountLightDOM() {
      const mount = this.$refs.shadowRootMount;
      if (!mount) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'light-dom-wrapper';
      wrapper.innerHTML = this.rawHtml;
      wrapper.querySelectorAll('table').forEach((table) => {
        if (this.verticalTableSplit) {
          this.transformVisualBlocksToVerticalRows(table);
          this.removeEmptyVisualRowsAndTable(table);
        }

        this.applyTableLayoutStyle(table);
      });

      const style = document.createElement('style');
      style.textContent = this.buildScopedCSS('.light-dom-wrapper');

      mount.innerHTML = '';
      mount.appendChild(style);
      mount.appendChild(wrapper);
    },

    buildScopedCSS(scopeSelector = '') {
      const toCSS = (value, forceImportant = false) => {
        const obj = typeof value === 'string' ? this.parseStyle(value) : value || {};
        return Object.entries(obj)
          .map(([k, v]) => {
            const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
            const cssVal = forceImportant ? `${v} !important` : v;
            return `${cssKey}:${cssVal};`;
          })
          .join(' ');
      };

      const wrap = (tag) => (scopeSelector ? `${scopeSelector} ${tag}` : tag);

      return `
        ${wrap('p')} { ${toCSS(this.pStyle)} }
        ${wrap('h1')} { ${toCSS(this.h1Style)} }
        ${wrap('h2')} { ${toCSS(this.h2Style)} }
        ${wrap('h3')} { ${toCSS(this.h3Style)} }
        ${wrap('span')} { ${toCSS(this.spanStyle)} }
        ${wrap('li')} { ${toCSS(this.liStyle)} }
        ${wrap('strong')} { ${toCSS(this.strongStyle)} }
        ${wrap('img')} { ${toCSS(this.imgStyle)} }
        ${wrap('span[style*="color"]')}, ${wrap('strong[style*="color"]')} {
          ${toCSS(this.highlightStyle, true)}
        }
        ${this.customCss}
      `;
    },

    parseStyle(value) {
      if (!value) return {};
      if (typeof value === 'object') return value;

      const obj = {};
      const ruleRegex = /([^:;]+):\s*([^;]+)/g;
      let match;

      while ((match = ruleRegex.exec(value)) !== null) {
        const key = match[1].trim();
        const val = match[2].trim();
        if (key && val) {
          const camelKey = key.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
          obj[camelKey] = val;
        }
      }

      return obj;
    },
  },
};
</script>

<style scoped>
.game-html-reader {
  line-height: 1.6;
  width: 100%;
  box-sizing: border-box;
  word-break: break-word;
  overflow-wrap: break-word;
  min-height: 300px;
}

.skeleton-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 16px 0;
  height: 100%;
}

.skeleton-block {
  display: block;
  margin-bottom: 12px;
  border-radius: 6px;
  width: 100%;
}

/* shadow DOM 下也会生效 */
table {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.light-dom-wrapper[data-table-center] table {
  margin-left: auto;
  margin-right: auto;
}

.light-dom-wrapper[data-table-max-width] table {
  max-width: var(--table-max-width);
}

table tr td {
  vertical-align: middle;
}

table tr td[colspan='99'] {
  background: transparent;
  height: 16px;
}
</style>
