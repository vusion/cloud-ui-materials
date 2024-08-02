<template>
  <div>
    <Editor class="editos" :locale="zhHans" :value="value" :plugins="plugins" @change="onChange"
      :uploadImages="uploadImage" />
  </div>
</template>

<script>
import axios from 'axios'
import cookie from 'js-cookie'
/**
 * 插件
 */
import 'bytemd/dist/index.css'
import { Editor } from '@bytemd/vue'
import zhHans from "bytemd/locales/zh_Hans.json";
import breaks from '@bytemd/plugin-breaks'
import mediumZoom from '@bytemd/plugin-medium-zoom'
// 语法解析
import gfm from '@bytemd/plugin-gfm'
// 高亮
import highlight from '@bytemd/plugin-highlight'
// meta信息编辑
import frontmatter from '@bytemd/plugin-frontmatter'
// 数学公式
import math from '@bytemd/plugin-math'
// 流程图
import mermaid from '@bytemd/plugin-mermaid'
// emoji表情
import gemoji from '@bytemd/plugin-gemoji'

const plugins = [
  gfm(),
  highlight(),
  frontmatter(),
  math(),
  mermaid(),
  gemoji(),
  breaks(),
  mediumZoom()
]

export default {
  name: "byte-markdown-editor",
  components: { Editor },
  props: {
    value: {
      type: String,
      default: () => "",
    },
    uploadUrl: {
      type: String,
      default: '/gateway/lowcode/api/v1/app/upload',
    },
  },
  data() {
    return {
      plugins: plugins,
      zhHans: zhHans,
    };
  },
  mounted() {
    if (this.isIDE) {
      mdEl.classList.add("event-disabled");
    }
    // hide github
    const sourceEl = this.$el.querySelector(".bytemd-toolbar-right [bytemd-tippy-path='5']");
    if (sourceEl) {
      sourceEl.style.display = "none";
    }
  },
  methods: {
    async upload(file) {
      const authorization = cookie.get('authorization');
      const headers = authorization
        ? { Authorization: authorization, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

      const formData = new FormData();
      formData.append('file', new File([file], file.name, { type: file.type }));

      try {
        const response = await axios.post(this.uploadUrl, formData, {
          headers,
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    },
    async uploadImage(files) {
      try {
        const uploadPromises = files.map(file => this.upload(file));
        const responses = await Promise.all(uploadPromises);
        return responses.map((res) => ({
          title: res.filePath,
          url: res.filePath,
        }));
      } catch (error) {
        console.error('Error uploading images:', error);
        return [];
      }
    },

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

.event-disabled {
  pointer-events: none;
}
</style>
