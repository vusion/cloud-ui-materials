<template>
  <div :class="{ [$style.root]: true, [$style.border]: !readOnly }" ref="root">
    <toolbar ref="toolbar" style="border-bottom: 1px solid #ccc" :editor="editor" :default-config="toolbarConfig"
      :mode="mode" v-show="!readOnly"></toolbar>
    <!-- v-viewer下所有图片能够进行放大操作 -->
    <div v-viewer="{ movable: false, zIndex: 8000 }" style="position: relative">
      <editor ref="editor" class="cw-wangeditor-content" :style="rootStyle" v-model="currentValue" :default-config="editorConfig" :mode="mode"
        @onCreated="onCreated" @onChange="onChange" @onFocus="onFocus" @onBlur="onBlur" @customPaste="customPaste">
      </editor>
      <u-button size="mini" @click="docxParse()" :style="{
        position: 'absolute',
        bottom: '4px',
        right: '4px',
        color: '#337ae5',
        display: showDocxButton ? 'block' : 'none',
      }">
        上传并解析docx
      </u-button>
    </div>
    <input type="file" :value="null" accept=".docx" style="display: none" ref="docxInput" />
  </div>
</template>
<script>
import { MField } from '../../widgets/m-field';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-vue2';
import { Boot, SlateTransforms } from '@wangeditor-next/editor';
import { h } from 'snabbdom';
import '@wangeditor-next/editor/dist/css/style.css';
import 'viewerjs/dist/viewer.css';
import whiteListOption from '../../utils/whiteListTag';
import Viewer from 'v-viewer';
import Vue from 'vue';
import xss from 'xss';
import { imageTypes, videoTypes } from './constant';
import { processHTML } from './processHTML.js';
import { parser } from './slateToDocx';
import { parser as docxParser } from './docxToSlate';
import { saveAs } from 'file-saver';
import {
  Packer,
  Paragraph,
  TextRun,
  Document,
  LevelFormat,
  convertInchesToTwip,
  AlignmentType,
} from 'docx';
import JSZip from 'jszip';

// 自定义 video 渲染，支持根据 elemNode.width / elemNode.height 设置尺寸
const customVideoRenderConf = {
  type: 'video',
  renderElem(elemNode, children, editor) {
    const {
      src = '',
      poster = '',
      width = 'auto',
      height = 'auto',
      style = {},
      textAlign = 'center',
    } = elemNode;

    const videoStyle = { ...style };
    if (width && width !== 'auto') {
      videoStyle.width = width;
    }
    if (height && height !== 'auto') {
      videoStyle.height = height;
    }

    return h(
      'div',
      {
        style: { textAlign },
        attrs: {
          class: 'w-e-textarea-video-container',
        },
      },
      [
        h('video', {
          attrs: {
            src,
            controls: true,
            poster,
          },
          style: videoStyle,
        }),
      ],
    );
  },
};

let customVideoRenderRegistered = false;
if (!customVideoRenderRegistered) {
  Boot.registerModule({
    renderElems: [customVideoRenderConf],
  });
  customVideoRenderRegistered = true;
}
const myxss = new xss.FilterXSS({ whiteList: whiteListOption });
Vue.use(Viewer);

export default {
  name: 'cw-wangeditor-next',
  components: { Editor, Toolbar },
  mixins: [MField],
  props: {
    value: String,
    readOnly: Boolean,
    scroll: { type: Boolean, default: true },
    placeholder: String,
    editorStyle: { type: String, default: '' },
    uploadImgServer: { type: String, default: '' },
    accept: { type: String, default: '.png,.jpg,.jpeg,.webp' },
    acceptVideo: {
      type: String,
      default: '.mp4,.avi,.mov,.wmv,.mkv,.flv,.mpeg,.rmvb,.3gp,.webm',
    },
    showDocxButton: {
      type: Boolean,
      default: false,
    },
    urlField: {
      type: String,
      default: 'filePath',
    },
  },
  data() {
    const vm = this;
    return {
      currentValue: myxss.process(vm.value),
      editor: null,
      toolbarConfig: {
        excludeKeys: ['fullScreen', 'codeBlock', 'insertImage'],
      },
      mode: 'default', // or 'simple',
      defaultHeight: '',
      editorHeight: {
        height: vm.scroll ? '180px' : null,
        'min-height': vm.scroll ? null : '180px',
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
      return this.accept.split(',');
    },
    acceptEditorList() {
      return this.accept
        .split(',')
        .map((item) => `image/${item.substring(1, item.length)}`);
    },
    acceptVideoList() {
      return this.acceptVideo.split(',');
    },
    acceptVideoEditorList() {
      return this.acceptVideo
        .split(',')
        .map((item) => `video/${item.substring(1, item.length)}`);
    },
    editorConfig() {
      const authorization = this.getCookie('authorization');
      const headers = authorization
        ? { Authorization: authorization }
        : {};
      const MENU_CONF = {};
      Object.assign(
        MENU_CONF,
        {
          uploadImage: this.accept
            ? {
              server:
                this.uploadImgServer ||
                '/gateway/lowcode/api/v1/app/upload',
              fieldName: 'file',
              maxFileSize: 50 * 1024 * 1024, // 50M
              // 自定义增加 http header
              headers,
              // 自定义插入图片
              onBeforeUpload: (file) => {
                const type =
                  Object.values(file)[0].type.split('/')[1];
                if (
                  !this.acceptList.includes('.' + type) ||
                  !imageTypes.includes(type)
                ) {
                  this.$emit('upload-fail', {
                    value: `不支持上传${type}类型的图片文件`,
                  });
                  return false;
                }
                return file;
              },
              customInsert: (res, insertFn) => {
                const url = res[this.urlField];
                insertFn(url);
              },
              meta: {
                viaOriginURL: true,
              },
              allowedFileTypes: this.acceptEditorList,
              disable: true,
            }
            : null,
        },
        {
          uploadVideo: {
            server: this.acceptVideo
              ? this.uploadImgServer ||
              '/gateway/lowcode/api/v1/app/upload'
              : null,
            fieldName: 'file',
            maxFileSize: 1000 * 1024 * 1024, // 1000M
            // 自定义增加 http  header
            headers,
            onBeforeUpload: (file) => {
              const type =
                Object.values(file)[0].type.split('/')[1];
              if (
                !this.acceptVideoList.includes('.' + type) ||
                !videoTypes.includes(type)
              ) {
                this.$emit('upload-fail', {
                  value: `不支持上传${type}类型的视频文件`,
                });
                return false;
              }
            },
            // 自定义插入视频
            customInsert(res, insertFn) {
              const url = res.filePath;
              insertFn(url);
            },
            meta: {
              viaOriginURL: true,
            },
            allowedFileTypes: this.acceptVideoEditorList,
          },
        }
      );
      return {
        readOnly: this.readOnly,
        scroll: this.scroll,
        placeholder: this.placeholder,
        autoFocus: false,
        MENU_CONF,
      };
    },
  },
  watch: {
    readOnly(val) {
      val ? this.editor.disable() : this.editor.enable();
    },
    value(value) {
      if (value !== this.currentValue) {
        this.currentValue = myxss.process(value);
      }
    },
    currentValue(value) {
      this.$emit('update:value', value);
    },
  },
  beforeDestroy() {
    const { editor } = this;
    if (editor === null) return;
    // 组件销毁时，及时销毁编辑器
    editor.destroy();
  },
  methods: {
    async docxParse(file) {
      if (!file) {
        file = await new Promise((res) => {
          const fileInput = this.$refs.docxInput;
          const fn = (e) => {
            fileInput.removeEventListener('input', fn);
            fileInput.removeEventListener('cancel', cancelFn);
            res(e.target.files[0]);
            e.target.value = null;
          };
          const cancelFn = () => {
            res(null);
            fileInput.removeEventListener('input', fn);
            fileInput.removeEventListener('cancel', cancelFn);
          };
          fileInput.addEventListener('cancel', cancelFn);
          fileInput.addEventListener('input', fn);
          fileInput.click();
        });
      }
      if (!file) return;

      const nodes = await docxParser(
        file,
        this.customUplodeForPasteImage.bind(this),
      );
      const editor = this.editor;
      SlateTransforms.insertNodes(editor, nodes, {
        at: [editor.children.length],
      });
      return nodes;
    },
    async exportToBlob(result = {}) {
      const children = this.editor.children;
      const tmp = children.map((n) => parser(n, this.editor));
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: tmp,
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      result.value = blob;
      return blob;
    },
    async exportToDocx(filename) {
      const blob = await this.exportToBlob();
      await saveAs(blob, filename || 'example.docx');
    },
    async exportToDocxXml(result = {}) {
      const blob = await this.exportToBlob();
      const zip = await JSZip.loadAsync(blob);
      const str = await zip.file('word/document.xml').async('string');
      const domparser = new DOMParser();
      const xml = domparser.parseFromString(str, 'text/xml');
      const serializer = new XMLSerializer();
      const xmlstr = Array.from(xml.children[0].children[0].children)
        .map(serializer.serializeToString.bind(serializer))
        .join('');
      result.value = xmlstr;
      return xmlstr;
    },
    async customUplodeForPasteImage(dataURL) {
      let blob = dataURL;
      if (typeof dataURL === 'string') {
        const [typeStr, baseStr] = dataURL.split(';');
        const type = typeStr.split(':')[1];
        const base64 = baseStr.split(',')[1];
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type });
      }

      const formData = new FormData();
      formData.append('file', blob);

      const authorization = this.getCookie('authorization');
      const headers = authorization ? { Authorization: authorization } : {};

      const url = await fetch(
        this.uploadImgServer || '/gateway/lowcode/api/v1/app/upload',
        {
          method: 'POST',
          headers,
          body: formData,
        },
      )
        .then((res) => res.json())
        .then((v) => v.filePath)
        .catch(() => '');
      return url;
    },
    customPaste(editor, event) {
      const fragment = event.clipboardData.getData(
        'application/x-slate-fragment',
      );
      if (fragment) return true;
      const html = event.clipboardData.getData('text/html');
      if (html) {
        processHTML(html, async (x) => {
          return this.customUplodeForPasteImage(x);
        }).then((domBody) => {
          const str = new XMLSerializer().serializeToString(domBody);
          editor.dangerouslyInsertHtml(str);
        });
        event.preventDefault();
        return false;
      }
      return true;
    },
    onCreated(editor) {
      this.editor = Object.seal(editor);
      let height = this.$refs.root.style.height;
      setTimeout(() => {
        if (height) {
          const toolHeight =
            this.$refs.toolbar.$el.getBoundingClientRect().height;
          height = this.removePX(height);
          this.editorHeight.height = `${height - toolHeight - 2}px`;
          if (!this.$env.VUE_APP_DESIGNER) {
            this.$refs.root.style.removeProperty('height');
          }
        }
        this.defaultHeight = this.editorHeight.height || '';
        // if (!this.scroll) {
        //   this.setHeight();
        // }
      });
    },
    onChange(editor) {
      // if (!this.scroll) {
      //   this.setHeight();
      // }
      if (
        editor.isEmpty() &&
        !this.currentValue &&
        this.currentValue !== 0
      )
        return;
      const value = editor.isEmpty() ? '' : editor.getHtml();
      const currentValue = myxss.process(value);
      this.$emit('change', { value: currentValue, editor });
      this.$emit('input', currentValue);
    },
    onFocus(editor) {
      this.$emit('focus', { value: this.currentValue, editor });
      if (!this.accept) {
        this.$nextTick(() => {
          this.$el
            .querySelector('[data-menu-key="group-image"]')
            .parentNode.classList.add('no-accept-disabled');
        });
      }
      if (!this.acceptVideo) {
        this.$nextTick(() => {
          this.$el
            .querySelector('[data-menu-key="group-video"]')
            .parentNode.classList.add('no-accept-disabled');
        });
      }
    },
    onBlur(editor) {
      this.$emit('blur', { value: this.currentValue, editor });
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return '';
    },
    parseStyleAttr(styleStr) {
      const styleObj = styleStr.split(/;/gim).reduce((obj, item) => {
        const arrs = item.trim().split(/:/gim);
        if (arrs.length > 1) {
          // eslint-disable-next-line no-param-reassign
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
        '[data-slate-editor]',
      );
      const currentheight = textareaNode.getBoundingClientRect().height;
      const height = this.editorHeight.height || '';
      if (height && currentheight > this.removePX(height)) {
        this.editorHeight['min-height'] = this.editorHeight.height;
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
  position: relative;
}

.border {
  border: 1px solid #e5e5e5;
}

</style>

<style>
.cw-wangeditor-content  .w-e-image-container[style*="width: 100%"] {
  display: block !important;
}
</style>
