<template>
  <div>
    <Editor
      class="editos"
      :locale="zhHans"
      :value="value"
      :plugins="plugins"
      @change="onChange"
    />
  </div>
</template>

<script>
import "bytemd/dist/index.min.css";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import zhHansGfm from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import zhHansMath from "@bytemd/plugin-math/locales/zh_Hans.json";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaId from "@bytemd/plugin-mermaid/dist/index.js";
import zhHansMermaid from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import { Editor } from "@bytemd/vue";
import zhHans from "bytemd/locales/zh_Hans.json";
import codeCopy from "../../plugins/copyCode";
const plugins = [
  gfm({
    locale: zhHansGfm,
  }),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  math({
    locale: zhHansMath,
  }),
  mediumZoom(),
  mermaId({
    locale: zhHansMermaid,
  }),
  codeCopy({
    copyText: "复制代码",
    copySuccess(text) {
      console.log("复制成功", text);
    },
  }),
];

export default {
  name: "markdown",
  components: { Editor },
  props: {
    value: {
      type: String,
      default: () => "",
    },
    mode: {
      type: String,
      default: "editor",
    },
  },
  data() {
    return {
      plugins: plugins,
      zhHans: zhHans,
    };
  },
  mounted() {
    // inherit style
    const mdEl = this.$el.querySelector(".bytemd");
    this.$nextTick(() => {
      mdEl.style = this.$el.style.cssText;
    });
    // disable event trigger when design mode
    if (this.$env.VUE_APP_DESIGNER) {
      mdEl.classList.add("event-disabled");
    }
    // hide github
    const sourceEl = this.$el.querySelector("[bytemd-tippy-path='5']");
    if (sourceEl) {
      sourceEl.style.display = "none";
    }
    // viewer mode should hide some items
    if (this.mode === "viewer") {
      let statusEl = this.$el.querySelector(".bytemd-status");
      let toolbarLeftEl = this.$el.querySelector(".bytemd-toolbar-left");

      statusEl.style.display = "none";
      toolbarLeftEl.style.display = "none";
      for (let i = 1; i < 4; i++) {
        const toolRightEl = this.$el.querySelector(
          `.bytemd-tippy-right[bytemd-tippy-path='${i}']`
        );
        console.log("toolRightEl", toolRightEl);
        this.$nextTick(() => {
          toolRightEl.style.display = "none";
        });
      }

      let previewEl = this.$el.querySelector(".bytemd-preview");
      let editorEl = this.$el.querySelector(".bytemd-editor");
      let sidebarEl = this.$el.querySelector(".bytemd-sidebar");
      previewEl.style.width = "100%";
      editorEl.style.display = "none";
      let previewBody = this.$el.querySelector(".markdown-body");
      previewBody.style = 'width: 100%; margin:unset;'
      // 创建一个 MutationObserver 实例
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            // 类名发生变化
            editorEl.style.display = "none";
            if (mutation.target.classList.contains("bytemd-hidden")) {
              previewEl.style.width = "100%";
            } else {
              previewEl.style.width = "calc(100% - 280px)";
            }
          }
        }
      });

      // 配置观察选项
      const observerOptions = {
        attributes: true, // 监听属性变化
        attributeFilter: ["class"], // 仅监听类名的变化
      };

      // 开始观察目标元素
      observer.observe(sidebarEl, observerOptions);
      this.$on("hook:beforeDestroy", () => {
        observer.disconnect();
      });
    }
  },
  methods: {
    onChange(value) {
      console.log("value", value);
      this.$emit("change", value);
      this.$emit("update:value", value);
    },
  },
};
</script>

<style lang="less">
.event-disabled {
  pointer-events: none;
}
.markdown-body {
  pre {
    position: relative;
    &:hover {
      .operate-btn {
        position: absolute;
        top: 2px;
        right: 2px;
        display: inline-flex;
        padding: 5px;
        .lang-btn {
          background-color: white;
          margin-right: 5px;
          padding: 2px;
        }
        .copy-btn {
          &.copy-success {
            background-color: aquamarine;
          }
          background-color: white;
          padding: 2px;
          display: inline-flex;
          cursor: pointer;
        }
      }
    }
    .operate-btn {
      position: absolute;
      top: 2px;
      right: 2px;
      padding: 5px;
      .copy-btn {
        display: none;
      }
      .lang-btn {
        background-color: white;
        margin-right: 5px;
        padding: 2px;
      }
    }
  }
}
.bytemd-fullscreen.bytemd {
  z-index: 1000;
}
</style>
