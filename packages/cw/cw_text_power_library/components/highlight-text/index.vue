<template>
  <div @click="$emit('click', link)">
    <div class="highlight-container">
      <div class="highlight-content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HighlightText",
  props: {
    content: {
      default: "",
      type: String,
    },
    text: {
      default: "",
      type: String,
    },
    link: {
      default: "",
      type: String,
    },
  },
  mounted() {
    const style = document.createElement("style");

    // 设置 CSS 块的内容
    style.innerHTML = `
    ::highlight(search-results-${this._uid}) {
      color: #337eff;
      text-decoration: underline;
    }
  `;

    // 将 style 标签插入到 head 元素中
    document.head.appendChild(style);

    this.$on("hook:beforeDestroy", () => {
      document.head.removeChild(style);
    });
    this.setHighlight();
  },
  updated() {
    this.setHighlight();
  },
  methods: {
    setHighlight() {
      const article = this.$el;

      // 创建 createTreeWalker 迭代器，用于遍历文本节点，保存到一个数组
      const treeWalker = document.createTreeWalker(
        article,
        NodeFilter.SHOW_TEXT
      );
      const allTextNodes = [];
      let currentNode = treeWalker.nextNode();
      while (currentNode) {
        allTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
      }
      console.log("allTextNodes", allTextNodes);
      // 清除上个高亮
      // CSS.highlights.clear();

      // 为空判断
      const str = this.text;
      if (!str) {
        return;
      }

      // 查找所有文本节点是否包含搜索词
      const ranges = allTextNodes
        .map((el) => {
          return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
          const indices = [];
          let startPos = 0;
          while (startPos < text.length) {
            const index = text.indexOf(str, startPos);
            if (index === -1) break;
            indices.push(index);
            startPos = index + str.length;
          }

          // 根据搜索词的位置创建选区
          return indices.map((index) => {
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + str.length);
            return range;
          });
        });

      // 创建高亮对象
      const searchResultsHighlight = new Highlight(...ranges.flat());
      // 注册高亮
      CSS.highlights.set(`search-results-${this._uid}`, searchResultsHighlight);
    },
  },
};
</script>

<style>
.highlight-container {
  padding: 8px;
}
.highlight-container:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
}
.highlight-content {
  color: rgb(83, 87, 106);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
