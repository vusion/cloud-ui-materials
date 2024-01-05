<template>
  <div :class="{ [$style.root]: true, [$style.border]: !readOnly }" ref="root">
    <toolbar
      ref="toolbar"
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :default-config="toolbarConfig"
      :mode="mode"
      v-show="!readOnly"
    ></toolbar>
    <!-- v-viewer下所有图片能够进行放大操作 -->
    <div v-viewer="{ movable: false, zIndex: 8000 }">
      <editor
        ref="editor"
        :style="rootStyle"
        :value="currentValue"
        :default-config="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
        @onChange="onChange"
        @onFocus="onFocus"
        @onBlur="onBlur"
      ></editor>
    </div>
  </div>
</template>

<script>
import { MField } from "../../widgets/m-field";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import "viewerjs/dist/viewer.css";
import whiteListOption from "../../utils/whiteListTag";
import Viewer from "v-viewer";
import Vue from "vue";
import xss from "xss";
import { imageTypes, videoTypes } from "./constant";
const myxss = new xss.FilterXSS({ whiteList: whiteListOption });
Vue.use(Viewer);

export default {
  name: "cw-wang-editor",
  components: { Editor, Toolbar },
  mixins: [MField],
  props: {
    value: String,
    readOnly: Boolean,
    scroll: { type: Boolean, default: true },
    placeholder: String,
    editorStyle: { type: String, default: "" },
    uploadImgServer: { type: String, default: "" },
    accept: { type: String, default: "*" },
    acceptVideo: { type: String, default: "*" },
  },
  data() {
    const vm = this;
    return {
      currentValue: vm.value,
      editor: null,
      toolbarConfig: {
        excludeKeys: ["fullScreen", "codeBlock", "insertImage"],
      },
      mode: "default", // or 'simple',
      defaultHeight: "",
      editorHeight: {
        height: vm.scroll ? "180px" : null,
        "min-height": vm.scroll ? null : "180px",
      },
    };
  },
  computed: {
    rootStyle() {
      return {
        ...this.editorHeight,
        ...this.parseStyleAttr(this.editorStyle),
      };
    },
    acceptList() {
      return this.accept.split(",");
    },
    acceptEditorList() {
      return this.accept
        .split(",")
        .map((item) => `image/${item.substring(1, item.length)}`);
    },
    acceptVideoList() {
      return this.acceptVideo.split(",");
    },
    acceptVideoEditorList() {
      return this.acceptVideo
        .split(",")
        .map((item) => `video/${item.substring(1, item.length)}`);
    },
    editorConfig() {
      const authorization = this.getCookie("authorization");
      const headers = authorization ? { Authorization: authorization } : {};
      return {
        readOnly: this.readOnly,
        scroll: this.scroll,
        placeholder: this.placeholder,
        autoFocus: false,
        MENU_CONF: {
          uploadImage: {
            server:
              this.uploadImgServer || "/gateway/lowcode/api/v1/app/upload",
            fieldName: "file",
            maxFileSize: 50 * 1024 * 1024, // 50M
            // 自定义增加 http header
            headers,
            // 自定义插入图片
            onBeforeUpload: (file) => {
              const type = Object.values(file)[0].type.split("/")[1];
              if (
                !this.acceptList.includes("." + type) ||
                !imageTypes.includes(type)
              ) {
                this.$emit("upload-fail", {
                  value: `不支持上传${type}类型的图片文件`,
                });
                return false;
              }
              return file;
            },
            customInsert: (res, insertFn) => {
              const url = res.result;
              // const type = url.split(".").pop();
              // if (
              //   !this.acceptList.includes("." + type) ||
              //   !imageTypes.includes(type)
              // ) {
              //   this.$emit("upload-fail", {
              //     value: `不支持上传${type}类型的图片文件`,
              //   });
              //   return false;
              // }
              insertFn(url);
            },
            meta: {
              viaOriginURL: true,
            },
            allowedFileTypes: this.acceptEditorList,
          },
          uploadVideo: {
            server:
              this.uploadImgServer || "/gateway/lowcode/api/v1/app/upload",
            fieldName: "file",
            maxFileSize: 1000 * 1024 * 1024, // 1000M
            // 自定义增加 http  header
            headers,
            onBeforeUpload: (file) => {
              const type = Object.values(file)[0].type.split("/")[1];
              if (
                !this.acceptVideoList.includes("." + type) ||
                !videoTypes.includes(type)
              ) {
                this.$emit("upload-fail", {
                  value: `不支持上传${type}类型的视频文件`,
                });
                return false;
              }
            },
            // 自定义插入视频
            customInsert(res, insertFn) {
              const url = res.result;
              // const type = url.split(".").pop();
              // if (
              //   !this.acceptVideoList.includes("." + type) ||
              //   !videoTypes.includes(type)
              // ) {
              //   this.$emit("upload-fail", {
              //     value: `不支持上传${type}类型的图片文件`,
              //   });
              //   return false;
              // }
              insertFn(url);
            },
            meta: {
              viaOriginURL: true,
            },
            allowedFileTypes: this.acceptVideoEditorList,
          },
        },
      };
    },
  },
  watch: {
    readOnly(val) {
      val ? this.editor.disable() : this.editor.enable();
    },
    // value: {
    //   handler(v) {
    //     this.currentValue = myxss.process(v);
    //   },
    //   immediate: true,
    // },
  },
  beforeDestroy() {
    const { editor } = this;
    if (editor === null) return;
    // 组件销毁时，及时销毁编辑器
    editor.destroy();
  },
  methods: {
    onCreated(editor) {
      // 一定要用 Object.seal() ，否则会报错
      this.editor = Object.seal(editor);
      let height = this.$refs.root.style.height;
      setTimeout(() => {
        if (height) {
          const toolHeight =
            this.$refs.toolbar.$el.getBoundingClientRect().height;
          height = this.removePX(height);
          this.editorHeight.height = height - toolHeight - 2 + "px";
          // 部分场景在编辑器内，删除高度会导致页面反复重新渲染，所以在编辑器下不删除高度
          if (!this.$env.VUE_APP_DESIGNER) {
            this.$refs.root.style.removeProperty("height");
          }
        }
        this.defaultHeight = this.editorHeight.height || "";
        if (!this.scroll) {
          this.setHeight();
        }
      });
    },
    onChange(editor) {
      // 添加min-height时，container容器小于editor编辑器高度，click事件需精确触发，体验较差。所以当container容器大于editor编辑器高度时再添加min-height属性
      if (!this.scroll) {
        this.setHeight();
      }
      // 内容为空时不重复赋值，防止表单错误校验
      if (editor.isEmpty() && !this.currentValue && this.currentValue !== 0)
        return;
      const value = editor.isEmpty() ? "" : editor.getHtml();
      const currentValue = myxss.process(value);
      this.$emit("update:value", currentValue);
      this.$emit("change", { value: currentValue, editor });
      this.$emit("input", currentValue);
    },
    onFocus(editor) {
      this.$emit("focus", { value: this.currentValue, editor });
    },
    onBlur(editor) {
      this.$emit("blur", { value: this.currentValue, editor });
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    parseStyleAttr(styleStr) {
      const styleObj = styleStr.split(/;/gim).reduce((obj, item) => {
        const arrs = item.trim().split(/:/gim);
        if (arrs.length > 1) {
          obj[arrs[0].trim()] = arrs[1].trim();
        }
        return obj;
      }, {});

      return styleObj;
    },
    removePX(str) {
      return str.substring(0, str.length - 2);
    },
    setHeight() {
      const textareaNode = this.$refs.editor.$el.querySelector(
        "[data-slate-editor]"
      );
      const currentheight = textareaNode.getBoundingClientRect().height;
      const height = this.editorHeight.height || "";
      if (height && currentheight > this.removePX(height)) {
        this.editorHeight["min-height"] = this.editorHeight.height;
        this.editorHeight.height = null;
      } else if (currentheight <= this.removePX(this.defaultHeight)) {
        this.editorHeight.height = this.defaultHeight;
      }
    },
  },
};
</script>

<style module>
.root {
  z-index: 1000;
}

.border {
  border: 1px solid #ccc;
}
</style>
