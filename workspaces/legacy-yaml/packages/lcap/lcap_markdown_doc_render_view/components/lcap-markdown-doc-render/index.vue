<template>
  <div class="markdown-root">
    <div :class="{ 'content': true, 'pinned': pinned }" ref="content">
      <div class="theme-default-content" v-html="html" @click="onTapMarkdown"></div>
    </div>

    <div class="anchor-wrap" :style="anchorStyle">
      <div class="foldIcon" v-if="tocData && tocData.length">
        <div v-tooltip.top="pinned ? '隐藏目录' : '显示目录'" style="display: inline-block" @click="pinToc()"
          :class="['iconItem', pinned ? 'show' : 'hide']">
        </div>

        <div v-tooltip.top="toggle ? '全部收起' : '全部展开'" style="display: inline-block; margin-left: 10px"
          @click="toggleAll()" :class="['iconItem', toggle ? 'fold' : 'unfold']" v-show="pinned">
        </div>
      </div>

      <u-tree-view ref="treeView" class="toc" :data="tocData" expand-trigger="click-expander" v-show="pinned"
        @toggle="handleToggleToc">
        <div slot="text" slot-scope="{ node }" :class="[curTocItem.value === node.slug ? 'active' : '', 'tocItem']"
          @click="handleTocSelected(node)">
          <a>{{ node.title }}</a>
          <!-- <a :href="`#${node.slug}`">{{ node.title }}</a> -->
        </div>
      </u-tree-view>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import anchorPlugin from 'markdown-it-anchor';
import tocPlugin from 'markdown-it-table-of-contents'
import emojiPlugin from 'markdown-it-emoji'
import debounce from 'lodash.debounce'

// import mediumZoom from 'medium-zoom'
import Zooming from 'zooming'

import slugify from './utils/slugify'
import parseHeaders from './utils/parseHeaders'
import extractHeaders from './utils/extractHeaders'

import highlight from './lib/highlight';
const highlightLinesPlugin = require('./lib/highlightLines')
const preWrapperPlugin = require('./lib/preWrapper')
const lineNumbersPlugin = require('./lib/lineNumbers')

import './theme.less';

const md = new MarkdownIt({
  html: true,
  //   linkify: true,
  typographer: true,
  breaks: true,
  highlight,
});

// 添加我们自定义的链接规则
// md.linkify.add('inner-link:', {
//   validate: /^\.\.?\//,
//   normalize: match => {
//     console.log('match', match);
//     match.url = `https://example.com/${match.url}`;
//   },
// });

md.use(anchorPlugin, {
  slugify,
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#'
})

md.use(highlightLinesPlugin)
md.use(preWrapperPlugin)
md.use(lineNumbersPlugin)

md.use(emojiPlugin)

md.use(tocPlugin, {
  slugify,
  includeLevel: [2, 3],
  format: parseHeaders
})

let scrollListener = undefined;
let clickFlag = false;
let lastTocItem = undefined;

export default {
  name: 'lcap-markdown-doc-render',
  props: {
    text: {
      type: String,
      default: ''
    },
    scrollContainer: {
      type: String,
      default: 'window'
    },
    outlinePositionTop: {
      type: Number,
      default: 200
    },
    outlinePositionRight: {
      type: Number,
      default: 0
    }
  },
  components: {
    //    'tree-view': TreeView,
  },
  data: () => ({
    value: '',
    html: '',
    headers: [],
    tocData: undefined,
    curTocItem: {
      value: undefined,
    },

    toggle: true,
    pinned: true,

    headersTop: {}
  }),
  computed: {
    anchorStyle() {
      let style = {};
      style.position = 'fixed';
      style.top = this.outlinePositionTop + 'px'
      style.right = this.outlinePositionRight + 'px'

      return style;
    }
  },
  watch: {
    text(val) {
      this.renderMarkdown(val)
    },
    // html(val) {
    //     console.log(val);
    // }
  },
  created() {
    this.zoomInstance = new Zooming({
      customSize: '100%',
      enableGrab: false,
    })
  },
  mounted() {
    this.scrollWraper = document
    this.renderMarkdown(this.text);
  },
  updated() {
    const selector = '.theme-default-content img'

    this.zoomInstance.listen(selector);

    // if (!this.mediumZoomInstance) {
    //     this.mediumZoomInstance = mediumZoom(selector)
    // } else {
    //     this.mediumZoomInstance.detach()
    //     this.mediumZoomInstance.attach(selector)
    // }
  },
  beforeDestroy() {
    this.scrollWraper.removeEventListener('scroll', scrollListener)
  },
  activated() {

  },
  methods: {
    renderMarkdown(text) {
      window.scrollTo(0, 0)

      let htmlString = md.render(text)
      const headers = extractHeaders(text, ['h2', 'h3', 'h4', 'h5'], md)
      // 处理a签
      // 创建DOM解析器对象
      const parser = new DOMParser();

      // 解析HTML字符串为DOM元素
      const doc = parser.parseFromString(htmlString, "text/html");

      // 获取所有a标签
      const links = doc.getElementsByTagName("a");

      // 遍历所有a标签，替换href属性为点击事件
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");

        // 跳转链接
        if (!/^#/.test(href)) {
          link.removeAttribute("href");
          link.setAttribute("_href", href)
        } else { // 内部锚点
          link.removeAttribute("href");
          link.setAttribute("slug", href.replace(/^#/, ''))
        }
      }

      // 将修改后的DOM元素转换回HTML字符串
      const modifiedHtmlString = doc.documentElement.outerHTML;

      this.tocData = this.getTocData(headers) || [];
      this.html = modifiedHtmlString
      this.headers = headers

      this.$nextTick(() => {
        this.$refs.treeView.toggleAll(true);
        this.initialTocListener();
      })

      if (process.env.NODE_ENV !== 'production') {
        console.log('tocData', this.tocData);
      }
    },
    getTocData(headers, rootLevel = 2, maxLevel = 5) {
      const result = [];

      for (let i = 0; i !== headers.length;) {
        const nextRootOffset = headers
          .slice(i + 1)
          .findIndex((h) => h.level === rootLevel);
        const nextRootIndex = nextRootOffset === -1 ? headers.length : nextRootOffset + i + 1;
        const item = headers[i];
        item.label = item.title;

        if (item.level >= rootLevel && item.level <= maxLevel) {
          const childHeaders = headers.slice(i + 1, nextRootIndex);
          const children = rootLevel < maxLevel && childHeaders.length > 0
            ? this.getTocData(childHeaders, rootLevel + 1)
            : null;
          result.push(Object.assign(Object.assign({}, item), { children }));
        }

        i = nextRootIndex;
      }

      return result;
    },
    handleTocSelected(node) {
      // 阻止锚点定位时所触发的滚动事件
      clickFlag = true;

      this.curTocItem.value = node.slug;

      const targetElement = document.getElementById(node.slug);
      if (!targetElement) {
        // 降级方案：使用原来的计算方法
        this.initHeadersTopDistance();
        if (this.headersTop[node.slug] !== undefined) {
          window.scrollTo({
            top: Math.max(0, this.headersTop[node.slug] - this.outlinePositionTop),
            behavior: 'smooth'
          });
        }
        setTimeout(() => {
          clickFlag = false;
        }, 1000);
        return;
      }

      // 第一步：先快速跳转到目标位置附近（触发懒加载图片开始加载）
      const initialRect = targetElement.getBoundingClientRect();
      const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const initialTargetPosition = initialRect.top + initialScrollTop - this.outlinePositionTop;

      // 先跳转到大致位置（不等待，立即跳转）
      window.scrollTo({
        top: Math.max(0, initialTargetPosition),
        behavior: 'auto' // 使用 auto 快速跳转，不等待动画
      });

      // 第二步：等待目标位置附近的懒加载图片加载完成
      this.waitForLazyImagesNearTarget(targetElement).then(() => {
        // 使用 requestAnimationFrame 确保 DOM 已更新
        requestAnimationFrame(() => {
          // 重新计算准确位置（此时懒加载图片已加载，页面高度已更新）
          const rect = targetElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - this.outlinePositionTop;

          // 精确调整到目标位置（使用平滑滚动）
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        });
      });

      setTimeout(() => {
        clickFlag = false;
      }, 1500);
    },
    handleToggleToc(node) {
      const headers = document.querySelectorAll(".markdown-root .content h2, .markdown-root .content h3, .markdown-root .content h4, .markdown-root .content h5");
      const tocList = document.querySelectorAll(".tocItem");
      // 折叠时高亮父目录部分，展开式高亮对应显示的子目录部分
      if (node.expanded) {
        this.curTocItem.value = lastTocItem;
      } else {
        let activeTocItem;
        let curTocIndex = 0;
        this.$nextTick(() => {
          headers.forEach((item, index) => {
            if (item && item.id === this.curTocItem.value) {
              activeTocItem = tocList[index];
              curTocIndex = index;
            }
          });
          if (activeTocItem) {
            curTocIndex = getParentTocIndex(activeTocItem, curTocIndex, tocList);
            lastTocItem = this.curTocItem.value;
            this.curTocItem.value = headers[curTocIndex].id;
          }
        })
      }
    },
    initialTocListener() {
      this.scrollWraper.removeEventListener("scroll", scrollListener);
      scrollListener = this.getActiveTocItem(this.curTocItem);
      if (this.headers.length > 0) {
        this.curTocItem.value = this.getTocData(this.headers)[0].slug;
      }
    },

    getActiveTocItem(ref) {
      let resFun
      let curHeight;
      let activeTocItem;

      this.scrollWraper.addEventListener("scroll", (resFun = debounce(() => {
        let curTocIndex = 0;
        if (clickFlag) return;
        curHeight = document.documentElement.scrollTop;
        curHeight += this.outlinePositionTop;
        console.log('scroll');
        const headers = document.querySelectorAll(".markdown-root .content h2, .markdown-root .content h3, .markdown-root .content h4, .markdown-root .content h5");
        const tocList = document.querySelectorAll(".tocItem");

        // 判断当前滚动的高度是否大于前一个节点的高度,小于后一个节点的高度
        if (this.getElementTopDistance(headers[0]) > curHeight) {
          ref.value = headers[0].id;
          activeTocItem = tocList[0];
          curTocIndex = 0;
        } else if (this.getElementTopDistance(headers[headers.length - 1]) < curHeight) {
          ref.value = headers[headers.length - 1].id;
          activeTocItem = tocList[headers.length - 1];
          curTocIndex = headers.length - 1;
        } else {
          for (let i = 0; i < headers.length; i++) {
            if (this.getElementTopDistance(headers[i]) < curHeight && this.getElementTopDistance(headers[i + 1]) > curHeight) {
              ref.value = headers[i].id;
              activeTocItem = tocList[i];
              curTocIndex = i;
              break;
            }
          }
        }
        // 循环判断当前activeTocItem是否在可视区域内,不在的话高亮父目录节点
        if (activeTocItem) {
          curTocIndex = getParentTocIndex(activeTocItem, curTocIndex, tocList);
          ref.value = headers[curTocIndex].id;
        }
        lastTocItem = ref.value;
        if (activeTocItem) {
          activeTocItem.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
      }, 100)))
      return resFun
    },
    pinToc() {
      this.pinned = !this.pinned;
    },
    toggleAll() {
      this.toggle = !this.toggle;
      this.$refs.treeView.toggleAll(this.toggle);
    },

    onTapMarkdown(e) {
      const { tagName } = e.target;

      if (!['A'].includes(tagName)) return;


      const _href = e.target.getAttribute("_href") // link
      const slug = e.target.getAttribute("slug") // hash

      if (_href) {
        console.log('link:', decodeURIComponent(_href));
        this.$emit('link', decodeURIComponent(_href))
      } else if (slug) {
        this.handleTocSelected({ slug: decodeURIComponent(slug).toLowerCase() })
      }
    },
    getElementTopDistance(element) {
      if (!element) return 0;

      // 使用 getBoundingClientRect 获取更准确的位置
      // 结合当前滚动位置计算绝对位置
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
    },

    initHeadersTopDistance() {
      let map = {}
      const headers = document.querySelectorAll(".markdown-root .content h2, .markdown-root .content h3, .markdown-root .content h4, .markdown-root .content h5");
      for (let i = 0; i < headers.length; i++) {
        const element = headers[i];
        map[element.id] = this.getElementTopDistance(element)
      }

      this.headersTop = map;
    },

    // 等待目标位置附近的懒加载图片加载完成
    waitForLazyImagesNearTarget(targetElement) {
      return new Promise((resolve) => {
        // 获取目标元素的位置信息
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetTop = targetRect.top + scrollTop;

        // 定义需要预加载的区域范围（目标位置上下各 3000px，确保覆盖足够范围）
        const preloadRange = 3000;
        const rangeTop = Math.max(0, targetTop - preloadRange);
        const rangeBottom = targetTop + preloadRange;

        // 获取所有图片
        const allImages = document.querySelectorAll('.theme-default-content img');
        const imagesInRange = [];

        // 筛选出目标位置附近的图片并触发懒加载
        allImages.forEach((img) => {
          const imgRect = img.getBoundingClientRect();
          const imgTop = imgRect.top + scrollTop;

          // 检查图片是否在预加载范围内
          if (imgTop >= rangeTop && imgTop <= rangeBottom) {
            imagesInRange.push(img);

            // 强制触发懒加载图片的加载
            this.triggerLazyImageLoad(img);
          }
        });

        if (imagesInRange.length === 0) {
          // 没有图片需要等待，直接 resolve
          requestAnimationFrame(() => {
            resolve();
          });
          return;
        }

        let loadedCount = 0;
        const totalImages = imagesInRange.length;
        let resolved = false;

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= totalImages && !resolved) {
            resolved = true;
            // 等待一帧确保布局已更新
            requestAnimationFrame(() => {
              resolve();
            });
          }
        };

        imagesInRange.forEach((img) => {
          if (img.complete && img.naturalHeight !== 0) {
            // 图片已加载
            checkComplete();
          } else {
            // 监听图片加载事件
            img.addEventListener('load', checkComplete, { once: true });
            img.addEventListener('error', checkComplete, { once: true });
          }
        });

        // 设置超时，避免某些图片一直不加载导致卡死
        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }, 2000);
      });
    },

    // 触发懒加载图片的加载
    triggerLazyImageLoad(img) {
      // 方法1: 处理 loading="lazy" 属性
      if (img.loading === 'lazy') {
        img.loading = 'eager';
      }

      // 方法2: 处理 data-src 属性（常见的懒加载库使用方式）
      const dataSrc = img.dataset.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
      if (dataSrc && (!img.src || img.src === '' || img.src.includes('data:image'))) {
        img.src = dataSrc;
        // 移除 data-src 属性，避免重复加载
        if (img.dataset.src) {
          delete img.dataset.src;
        }
        img.removeAttribute('data-src');
        img.removeAttribute('data-lazy-src');
      }

      // 方法3: 处理 srcset 懒加载
      const dataSrcset = img.dataset.srcset || img.getAttribute('data-srcset');
      if (dataSrcset && (!img.srcset || img.srcset === '')) {
        img.srcset = dataSrcset;
        if (img.dataset.srcset) {
          delete img.dataset.srcset;
        }
        img.removeAttribute('data-srcset');
      }

      // 方法4: 如果图片在可视区域内但还没加载，强制触发
      const imgRect = img.getBoundingClientRect();
      if (imgRect.top < window.innerHeight + 1000 && imgRect.bottom > -1000) {
        // 通过临时修改 src 触发加载（如果图片还没有 src）
        if (!img.src || img.src === '' || img.src.includes('placeholder')) {
          // 尝试从其他属性获取真实图片地址
          const realSrc = dataSrc || img.getAttribute('data-original') || img.getAttribute('data-url');
          if (realSrc) {
            img.src = realSrc;
          }
        }

        // 触发 Intersection Observer（如果存在）
        // 通过临时移除和添加元素来触发观察器
        if (img.parentNode) {
          const parent = img.parentNode;
          const nextSibling = img.nextSibling;
          parent.removeChild(img);
          parent.insertBefore(img, nextSibling);
        }
      }
    },
    // 页面滚动时给地址栏加hash
    setActiveHash() {
      const sidebarLinks = [].slice.call(document.querySelectorAll('.sidebar-link'))
      const anchors = [].slice.call(document.querySelectorAll('.header-anchor'))
        .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))

      const scrollTop = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      )

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      )

      const bottomY = window.innerHeight + scrollTop

      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        const nextAnchor = anchors[i + 1]

        const isActive = i === 0 && scrollTop === 0
          || (scrollTop >= anchor.parentElement.offsetTop + 10
            && (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

        const routeHash = decodeURIComponent(this.$route.hash)
        if (isActive && routeHash !== decodeURIComponent(anchor.hash)) {
          const activeAnchor = anchor
          // check if anchor is at the bottom of the page to keep $route.hash consistent
          if (bottomY === scrollHeight) {
            for (let j = i + 1; j < anchors.length; j++) {
              if (routeHash === decodeURIComponent(anchors[j].hash)) {
                return
              }
            }
          }
          this.$vuepress.$set('disableScrollBehavior', true)
          this.$router.replace(decodeURIComponent(activeAnchor.hash), () => {
            // execute after scrollBehavior handler.
            this.$nextTick(() => {
              this.$vuepress.$set('disableScrollBehavior', false)
            })
          })
          return
        }
      }
    }
  },
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
function getParentTocIndex(activeTocItem, curTocIndex, tocList) {
  let activeTocItemBottom = activeTocItem.scrollTop + activeTocItem.offsetHeight || 0;
  if (curTocIndex === 0) {
    return curTocIndex;
  }
  while (activeTocItemBottom === 0) {
    curTocIndex--;
    activeTocItem = tocList[curTocIndex];
    activeTocItemBottom = activeTocItem.scrollTop + activeTocItem.offsetHeight;
    if (curTocIndex < 0) {
      break;
    }
  }
  return curTocIndex;
}
</script>

<style>
.markdown-root {
  position: relative;
  /* height: 100%; */
  /* width: 100%; */
  /* height: 500px; */
}

.markdown-root .content {
  max-height: 100%;
  padding: 0 0 0 40px;
  /* overflow: scroll; */
  /* padding-right: 365px; */
}

.markdown-root .content.pinned {
  padding-right: 365px;
}

.markdown-root .content ul {
  list-style-type: disc;
}

.markdown-root .content ol {
  list-style-type: decimal;
}

.markdown-root .content ol ul {
  list-style-type: circle;
}

.markdown-root .content ul ul {
  list-style-type: circle;
}

.markdown-root .anchor-wrap {
  position: absolute;
  right: 5px;
  top: 40px;
  width: 320px;
}

.toc::-webkit-scrollbar {
  width: 0
}

.toc[class*=u-tree-view__] {
  border: 0 !important;
  font-size: .9rem !important;
  padding: 0 !important
}

[class*=u-tree-view_node_item] {
  /* border-left: 2px solid #e5e5e5!important; */
  background: transparent !important
}

[class*=u-tree-view_node_item]:has(.active) {
  border-left: 2px solid #337eff !important;
  font-weight: 800 !important
}

[class*=u-tree-view_node_item][selected] {
  background: transparent !important
}

[class^=u-tree-view_node_item__][selected] [class^=u-tree-view_node_expander__] {
  color: #999 !important
}

[class*=u-tree-view_node_item]:hover {
  background: #fff !important
}

[class*=u-tree-view_node_text] {
  padding: 0 !important
}

[class*=u-tree-view_node_item__][selected] [class*=u-tree-view_node_text__] {
  color: #2c3e50 !important
}

[class*=u-tree-view_node_expander] {
  position: absolute !important;
  /* top: 4px!important */
}

.toc {
  color: #2c3e50;
  font-weight: 400;
  max-height: 60vh;
  overflow-y: scroll;
}

.toc .active {
  color: #337eff !important
}

.toc a {
  font-weight: inherit;
  font-size: 14px;
  white-space: normal;
  color: currentColor;

  line-height: 2.2em;
}

.toc a:hover {
  color: #337eff
}

.toc .router-link-exact-active {
  color: #337eff !important
}

.foldIcon {
  width: auto;
  cursor: pointer;
  z-index: 100;
}

.foldIcon .iconItem {
  width: 24px;
  height: 24px;

  background-size: contain;
  background-repeat: no-repeat;
}

.foldIcon .iconItem.show {
  background-image: url(./assets/show.png);
}

.foldIcon .iconItem.hide {
  background-image: url(./assets/hide.png);
}

.foldIcon .iconItem.fold {
  background-image: url(./assets/fold.png);
}

.foldIcon .iconItem.unfold {
  background-image: url(./assets/unfold.png);
}
</style>