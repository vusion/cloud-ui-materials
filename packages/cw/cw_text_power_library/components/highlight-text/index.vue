<template>
  <div @click="$emit('click', link)">
    <div class="highlight-container">
      <div class="highlight-content" ref="content" :style="highlightContentStyle">{{ content }}</div>
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
    highlightColor: {
      default: "#337eff",
      type: String,
    },
    contentColor: {
      default: "rgb(83, 87, 106)",
      type: String,
    },
  },
  mounted() {
    const style = document.createElement("style");

    // 设置 CSS 块的内容
    style.innerHTML = `
    ::highlight(search-results-${this._uid}) {
      color: ${this.highlightColor};
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
  computed: {
    highlightContentStyle() {
      return {
        color: this.contentColor,
      };
    },
  },
  methods: {
    setHighlight() {
      const article = this.$refs.content;

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

      // 清除当前组件的高亮
      CSS.highlights.delete(`search-results-${this._uid}`);

      // 为空判断
      const str = this.text;
      if (!str) {
        return;
      }

      // 查找所有文本节点是否包含搜索词中的字符
      const ranges = allTextNodes
        .map((el) => {
          return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
          const indices = [];
          for (let char of str.toLowerCase()) {
            let startPos = 0;
            while (startPos < text.length) {
              const index = text.indexOf(char, startPos);
              if (index === -1) break;
              indices.push(index);
              startPos = index + 1;
            }
          }

          // 根据搜索词的位置创建选区
          return indices.map((index) => {
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + 1);
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
  cursor: pointer;
}
.highlight-content {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>