<template>
  <div :class="[$style.root, border ? $style.border : '', shadow ? $style.boxshadow : '']" @click="onClickRoot">
    <template v-if="supportAttachment">
      <f-collapse-transition>
        <div :class="$style.attachwrap" v-show="showAttachment">
          <cw-attachment
            :fileList="currentFileList"
            v-bind="[$attrs, $props]"
            @filechange="onFileChange"
            @click-header="showAttachment = false"
            ref="attachmentRef"
          ></cw-attachment>
        </div>
      </f-collapse-transition>
      <f-collapse-transition>
        <div :class="[$style.attachwrap, $style.attachwrapactive]" v-if="!showAttachment && currentFileList.length" @click="showAttachment = true">
          附件 {{ currentFileList.length }}
        </div>
      </f-collapse-transition>
    </template>
    <div :class="[$style.cnt, supportAttachment && (showAttachment || currentFileList.length) ? $style.topborder : '']" ref="contentRef">
      <a-textarea
        ref="inputRef"
        :autosize="autosize"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :value="currentInputValue"
        :max-length="maxlength"
        @pressEnter="onInternalKeyPress"
        @compositionstart="onInternalCompositionStart"
        @compositionend="onInternalCompositionEnd"
        @keydown="onKeyDown"
        @paste="onInternalPaste"
        @change="onInternalChange"
      />
    </div>
    <div :class="$style.footer" ref="footerRef">
      <div :class="$style.extra">
        <div v-if="supportExtra">
          <slot></slot>
        </div>
      </div>
      <div :class="$style.actions" ref="actionsRef">
        <a-icon
          v-if="supportAttachment"
          type="paper-clip"
          :class="$style.attachmenticon"
          @click="showAttachment = !showAttachment"
          :opend="showAttachment"
          ref="attachiconRef"
        />
        <a-button v-if="!readonly" type="primary" :shape="submitBtnShape" :disabled="sendBtnDisabled" :class="$style.btn" :invalid="sendBtnInvalid" @click="onClickSubmit">
          <img :src="sendBtnIcon" :class="[loading?$style.btnloading:'']"/>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon, Input, Tooltip } from 'ant-design-vue';
import CWAttachment from '../cw-attachment';
import FCollapseTransition from './transition';
import PlaneSvg from './assets/plane.svg';
import ArrowupSvg from './assets/arrowup.svg';
import LoadingSvg from './assets/loading.svg';

export default {
  name: 'cw-sender',
  components: {
    'a-button': Button,
    'a-icon': Icon,
    'a-textarea': Input.TextArea,
    'a-tooltip': Tooltip,
    'cw-attachment': CWAttachment,
    'f-collapse-transition': FCollapseTransition,
  },
  props: {
    value: String, // 输入框的值
    fileList: { type: Array, default: () => [] },
    placeholder: { type: String, default: '请输入' },
    autosize: {
      type: Object,
      default: () => ({
        minRows: 2,
        maxRows: 9,
      }),
    },
    border: { type: Boolean, default: true },
    shadow: { type: Boolean, default: true },
    submitType: { type: String, default: 'enter' },
    submitBtnShape: { type: String, default: 'circle' },
    submitBtnIcon: { type: String, default: 'arrowup' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    supportAttachment: { type: Boolean, default: true },
    supportExtra: { type: Boolean, default: false },
    maxlength: Number,
    // 与上传相关的属性
    maxCount: { type: Number, default: 10 },
    maxSize: { type: [String, Number], default: Infinity },
    accept: String,
    headers: { type: Object, default: () => ({}) },
    urlField: String,
    data: { type: Object, default: () => ({}) },
    ttl: Boolean,
    ttlValue: Number,
    access: String,
    viaOriginURL: Boolean,
    withCredentials: { type: Boolean, default: false },
  },
  data() {
    return {
      showAttachment: false,
      isComposition: false,
      currentInputValue: this.value,
      currentFileList: this.fileList,
      PlaneSvg,
      ArrowupSvg,
      LoadingSvg,
      showAttachmentInfo: true,
    };
  },
  computed: {
    sendBtnIcon() {
      return this.loading ? LoadingSvg : this.submitBtnIcon === 'plane' ? PlaneSvg : ArrowupSvg;
    },
    sendBtnDisabled() {
      return this.disabled;
    },
    sendBtnInvalid() {
      return this.currentFileList.some(item => item.status!==undefined && item.status !== 'done' && item.status !== 'success') || this.loading;
    }
  },
  watch: {
    value(val) {
      this.currentInputValue = val;
    },
    fileList(val) {
      this.mergeFileList();
    },
  },
  methods: {
    onClickSubmit() {
      if (this.loading) {
        this.$emit('cancel');
        return;
      }
      if (this.currentBtnDisabled) {
        return;
      }
      this.triggerSend();
    },
    onCancel() {},
    onInternalKeyPress(e) {
      const canSubmit = e.key === 'Enter' && !this.isComposition;
      switch (this.submitType) {
        case 'enter':
          if (canSubmit && !e.shiftKey) {
            e.preventDefault();
            this.triggerSend();
          }
          break;

        case 'shiftEnter':
          if (canSubmit && e.shiftKey) {
            e.preventDefault();
            this.triggerSend();
          }
          break;
      }
    },
    onInternalCompositionStart(e) {
      this.isComposition = true;
    },
    onInternalCompositionEnd(e) {
      this.isComposition = false;
    },
    triggerSend() {
      if (this.loading) {
        return;
      }
      if (this.getFileStatus(this.currentFileList, 'error')) {
        this.$toast && this.$toast.error('请先删除上传异常的附件');
        return;
      }
      if (this.getFileStatus(this.currentFileList, 'uploading')) {
        this.$toast && this.$toast.show('附件上传中');
        return;
      }
      const values = this.toEventValue();
      if(this.supportAttachment) {
        if (!values.content && values.fileList.length === 0) {
          this.$toast && this.$toast.show('对不起，不能发送空消息');
          return;
        }
      } else if (!values.content) {
        this.$toast && this.$toast.show('对不起，不能发送空消息');
        return;
      }
      this.$emit('submit', values);
    },
    toEventValue() {
      const data = {
        content: this.currentInputValue,
        fileList: this.supportAttachment ? this.filterFileList(this.currentFileList) : [],
      };
      return data;
    },
    onInternalChange(e) {
      if (this.currentInputValue === e.target.value)
        return;
      this.currentInputValue = e.target.value;
      this.emitUpdateValue();
      this.$emit('change', this.currentInputValue);
    },
    // 粘贴文件夹到输入框
    onInternalPaste(e) {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files[0] && this.supportAttachment) {
        e.preventDefault();
        this.$refs.attachmentRef.manualUploadFiles(e.clipboardData.files);
        this.showAttachment = true;
      }
    },
    onKeyDown(e) {},
    onFileChange(fileList) {
      this.currentFileList = fileList;
      this.emitUpdateFileList();
      this.$emit('filechange', this.currentFileList);
    },
    emitUpdateValue() {
      this.$emit('update:value', this.currentInputValue);
      this.$emit('sync:state', 'value', this.currentInputValue);
    },
    emitUpdateFileList() {
      const fileList = this.filterFileList(this.currentFileList);
      this.$emit('update:fileList',  fileList);
      this.$emit('sync:state', 'fileList', fileList);
    },
    getFileStatus(fileList, status) {
      return fileList.some((item) => item.status === status);
    },
    filterFileList(fileList) {
      return fileList.filter((item) => item.status !== 'error' && item.status !== 'uploading');
    },
    clear() {
      this.currentInputValue = '';
      this.currentFileList = [];
    },
    /**
     * 合并fileList，保持列表中的上传中、error的文件
     */
    mergeFileList() {
      const fileList = this.fileList;
      let newFileList = [...this.currentFileList];
      if(!fileList.length) {
        newFileList = this.currentFileList.filter((item) => item.status !== 'done' && item.status !== 'success');
        this.currentFileList = newFileList;
        return;
      }
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const index = newFileList.findIndex((item) => (item.uid && item.uid === file.uid)|| (item.url && item.url === file.url) || (item.name && item.name === file.name));
        if (index !== -1) {
          Object.assign(newFileList[index], file);
        } else {
          newFileList.push(file);
        }
      }
      this.currentFileList = newFileList;
      this.$emit('sync:state', 'fileList', this.filterFileList(this.currentFileList));
    },
    // 点击热区进行focus
    onClickRoot(e) {
      if(this.$refs.contentRef.contains(e.target)
        || (this.$refs.footerRef.contains(e.target) && (this.$refs.attachiconRef && !this.$refs.attachiconRef.$el.contains(e.target)))) {
        this.$refs.inputRef.focus();
      }
    },
  },
};
</script>
<style module>
:root {
  --cw-sender-border-color: #e5e5e5;
  --cw-sender-box-shadow-color: #0000000a;
  --cw-sender-text-color-active: #337eff;
  --cw-sender-background-color: #fff;
  --cw-sender-button-background-primary: #337eff;
  --cw-sender-button-border-color-primary: #337eff;
  --cw-sender-button-background-primary-hover: #5c98ff;
  --cw-sender-button-border-color-primary-hover: #5c98ff;
  --cw-sender-icon-background-regular: transparent;
  --cw-sender-icon-color-regular: #333;
  --cw-sender-icon-background-regular-hover: rgba(0,0,0,.05);
}
.root {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px;
  min-width: 340px;
  background-color: var(--cw-sender-background-color);
}
.border {
  border: 1px solid var(--cw-sender-border-color);
}
.boxshadow {
  box-shadow: 0px 4px 16px 0px var(--cw-sender-box-shadow-color);
}
.cnt {
  flex: 1;
  padding: 12px 12px 0 12px;
}
.cnt [class^='ant-input'] {
  border: none;
  background-color: transparent;
  resize: none;
}
.cnt [class^='ant-input']:focus {
  box-shadow: none;
}
.cnt [class^='ant-input'][disabled] {
  background-color: transparent;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 12px;
}
.attachmenticon {
  cursor: pointer;
  font-size: 20px;
  background-color: var(--cw-sender-icon-background-regular);
  border-radius: 4px;
  color: var(--cw-sender-icon-color-regular);
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  padding: 6px;
  transition: color .2s, background .2s;
}
.attachmenticon:hover {
  background-color: var(--cw-sender-icon-background-regular-hover);
  color: var(--cw-sender-icon-color-regular-hover);
}

.attachwrap {
  --collapse-transition-duration: 0.3s;
  transition: var(--collapse-transition-duration) height ease-in-out, var(--collapse-transition-duration) padding-top ease-in-out,
    var(--collapse-transition-duration) padding-bottom ease-in-out;
}
.attachwrapactive {
  color: var(--cw-sender-text-color-active);
  cursor: pointer;
  font-size: 14px;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
}
.border {
  border: 1px solid var(--cw-sender-border-color);
}
.topborder {
  border-top: 1px solid var(--cw-sender-border-color);
  border-radius: 16px;
}
.actions [class*='ant-btn-primary'] {
  padding: 0 3px !important;
}
.actions [class*='ant-btn-round'] {
  padding: 0 19px !important;
}
button.btn {
  background-color: var(--cw-sender-button-background-primary);
  border-color: var(--cw-sender-button-border-color-primary);
}
button.btn:hover {
  background-color: var(--cw-sender-button-background-primary-hover);
  border-color: var(--cw-sender-button-border-color-primary-hover);
}
.btn[disabled],
.btn[invalid],
.btn[invalid]:hover,
.btn[invalid]:focus {
  background-color: var(--cw-sender-text-color-active) !important;
  opacity: 0.5;
}
.btnloading {
  animation: cw-sender-loading-circle 1s linear infinite;
}
.extra {
  flex: 1;
}
@keyframes cw-sender-loading-circle {
  100% {
    transform: rotate(1turn);
  }
}
</style>
