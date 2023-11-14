<template>
  <Editor
    class="editos"
    :locale="zhHans"
    :value="value"
    :plugins="plugins"
    @change="handleChange"
  />
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
  name: "editor",
  components: { Editor },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return { plugins, zhHans };
  },
  mounted() {
    const sourceEl = document.querySelector("[bytemd-tippy-path='5']");
    if (sourceEl) {
      sourceEl.style.display = "none";
    }
  },
  methods: {
    handleChange(v) {
      this.value = v;
    },
  },
};
</script>

<style lang="less">
@import url("https://github.githubassets.com/assets/gist-embed-0e0c6f2f7e3d8e7be9a1f48f29b3809a.css");
@import url("https://github.githubassets.com/assets/github-4e4d0c7d0a258ed9790e39798cad24c0.css");
@import url("https://github.githubassets.com/assets/github-markdown-34d7e31e8f9ac8f3e0e3b8c3e5f8c1f2.css");
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
