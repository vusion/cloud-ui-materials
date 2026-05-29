<template>
  <div
    :class="[$style.root, border ? $style.border : '', shadow ? $style.boxshadow : '']"
    @click="onClickRoot"
  >
    <template v-if="supportAttachment">
      <f-collapse-transition>
        <div v-show="showAttachment" :class="$style.attachwrap">
          <cw-attachment
            ref="attachmentRef"
            :file-list="currentFileList"
            v-bind="{ ...$props, ...$attrs }"
            @filechange="onFileChange"
            @click-header="showAttachment = false"
          />
        </div>
      </f-collapse-transition>
      <f-collapse-transition>
        <div
          v-if="!showAttachment && currentFileList.length"
          :class="[$style.attachwrap, $style.attachwrapactive]"
          @click="showAttachment = true"
        >
          附件 {{ currentFileList.length }}
        </div>
      </f-collapse-transition>
    </template>
    <div
      ref="contentRef"
      :class="[
        $style.cnt,
        supportAttachment && (showAttachment || currentFileList.length) ? $style.topborder : '',
      ]"
    >
      <a-textarea
        ref="inputRef"
        :value="currentInputValue"
        :auto-size="autosize"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @press-enter="onInternalKeyPress"
        @compositionstart="onInternalCompositionStart"
        @compositionend="onInternalCompositionEnd"
        @keydown="onKeyDown"
        @paste="onInternalPaste"
        @change="onInternalChange"
      />
    </div>
    <div ref="footerRef" :class="$style.footer">
      <div :class="$style.extra">
        <div v-if="supportExtra">
          <slot />
        </div>
      </div>
      <div ref="actionsRef" :class="$style.actions">
        <span
          v-if="supportAttachment"
          ref="attachiconRef"
          :class="[$style.attachmenticon, showAttachment ? $style.attachmentopen : '']"
          @click.stop="showAttachment = !showAttachment"
        >
          <PaperClipOutlined />
        </span>
        <a-button
          v-if="!readonly"
          type="primary"
          :shape="submitBtnShape"
          :disabled="sendBtnDisabled"
          :class="$style.btn"
          :data-invalid="sendBtnInvalid || undefined"
          @click="onClickSubmit"
        >
          <img :src="sendBtnIcon" :class="[loading ? $style.btnloading : '']" alt="" />
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Input } from 'ant-design-vue';
import { PaperClipOutlined } from '@ant-design/icons-vue';
import type { PropType } from 'vue';
import CWAttachment from '../cw-attachment/index.vue';
import FCollapseTransition from './transition.vue';
import PlaneSvg from './assets/plane.svg';
import ArrowupSvg from './assets/arrowup.svg';
import LoadingSvg from './assets/loading.svg';

const { TextArea: ATextarea } = Input;

type FileItem = Record<string, unknown> & { uid?: string; url?: string; name?: string; status?: string };

export default {
  name: 'cw-sender',
  components: {
    'a-textarea': ATextarea,
    'a-button': Button,
    PaperClipOutlined,
    'cw-attachment': CWAttachment,
    'f-collapse-transition': FCollapseTransition,
  },
  inheritAttrs: false,
  props: {
    value: String,
    fileList: { type: Array as PropType<FileItem[]>, default: () => [] },
    placeholder: { type: String, default: '请输入' },
    autosize: {
      type: Object as PropType<{ minRows?: number; maxRows?: number }>,
      default: () => ({
        minRows: 2,
        maxRows: 9,
      }),
    },
    border: { type: Boolean, default: true },
    shadow: { type: Boolean, default: true },
    submitType: { type: String, default: 'enter' },
    submitBtnShape: { type: String as PropType<'circle' | 'round' | 'default'>, default: 'circle' },
    submitBtnIcon: { type: String, default: 'arrowup' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    supportAttachment: { type: Boolean, default: true },
    supportExtra: { type: Boolean, default: false },
    maxlength: Number,
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
    url: String,
    action: String,
  },
  emits: ['submit', 'cancel', 'change', 'filechange', 'update:value', 'update:fileList', 'sync:state'],
  data() {
    return {
      showAttachment: false,
      isComposition: false,
      currentInputValue: this.value,
      currentFileList: [...(this.fileList as FileItem[])],
      PlaneSvg,
      ArrowupSvg,
      LoadingSvg,
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
      return (
        (this.currentFileList as FileItem[]).some(
          (item) => item.status !== undefined && item.status !== 'done' && item.status !== 'success'
        ) || this.loading
      );
    },
  },
  watch: {
    value(val: string | undefined) {
      this.currentInputValue = val;
    },
    fileList() {
      this.mergeFileList();
    },
  },
  methods: {
    onClickSubmit() {
      if (this.loading) {
        this.$emit('cancel');
        return;
      }
      if (this.sendBtnInvalid) {
        return;
      }
      this.triggerSend();
    },
    onInternalKeyPress(e: KeyboardEvent) {
      const canSubmit = e.key === 'Enter' && !this.isComposition;
      if (this.submitType === 'enter') {
        if (canSubmit && !e.shiftKey) {
          e.preventDefault();
          this.triggerSend();
        }
      } else if (this.submitType === 'shiftEnter') {
        if (canSubmit && e.shiftKey) {
          e.preventDefault();
          this.triggerSend();
        }
      }
    },
    onInternalCompositionStart() {
      this.isComposition = true;
    },
    onInternalCompositionEnd() {
      this.isComposition = false;
    },
    triggerSend() {
      if (this.loading) {
        return;
      }
      if (this.getFileStatus(this.currentFileList as FileItem[], 'error')) {
        (this as unknown as { $toast?: { error: (m: string) => void } }).$toast?.error('请先删除上传异常的附件');
        return;
      }
      if (this.getFileStatus(this.currentFileList as FileItem[], 'uploading')) {
        (this as unknown as { $toast?: { show: (m: string) => void } }).$toast?.show('附件上传中');
        return;
      }
      const values = this.toEventValue();
      if (this.supportAttachment) {
        if (!values.content && values.fileList.length === 0) {
          (this as unknown as { $toast?: { show: (m: string) => void } }).$toast?.show('对不起，不能发送空消息');
          return;
        }
      } else if (!values.content) {
        (this as unknown as { $toast?: { show: (m: string) => void } }).$toast?.show('对不起，不能发送空消息');
        return;
      }
      this.$emit('submit', values);
    },
    toEventValue() {
      return {
        content: this.currentInputValue,
        fileList: this.supportAttachment ? this.filterFileList(this.currentFileList as FileItem[]) : [],
      };
    },
    onInternalChange(e: Event) {
      const target = e.target as HTMLTextAreaElement;
      if (this.currentInputValue === target.value) return;
      this.currentInputValue = target.value;
      this.emitUpdateValue();
      this.$emit('change', this.currentInputValue);
    },
    onInternalPaste(e: ClipboardEvent) {
      const files = e.clipboardData?.files;
      if (files?.[0] && this.supportAttachment) {
        e.preventDefault();
        (this.$refs.attachmentRef as { manualUploadFiles: (f: FileList | File[]) => void })?.manualUploadFiles(files);
        this.showAttachment = true;
      }
    },
    onKeyDown(_e: KeyboardEvent) {},
    onFileChange(fileList: FileItem[]) {
      this.currentFileList = fileList;
      this.emitUpdateFileList();
      this.$emit('filechange', this.currentFileList);
    },
    emitUpdateValue() {
      this.$emit('update:value', this.currentInputValue);
      this.$emit('sync:state', 'value', this.currentInputValue);
    },
    emitUpdateFileList() {
      const fileList = this.filterFileList(this.currentFileList as FileItem[]);
      this.$emit('update:fileList', fileList);
      this.$emit('sync:state', 'fileList', fileList);
    },
    getFileStatus(fileList: FileItem[], status: string) {
      return fileList.some((item) => item.status === status);
    },
    filterFileList(fileList: FileItem[]) {
      return fileList.filter((item) => item.status !== 'error' && item.status !== 'uploading');
    },
    clear() {
      this.currentInputValue = '';
      this.currentFileList = [];
    },
    mergeFileList() {
      const fileList = this.fileList as FileItem[];
      let newFileList = [...(this.currentFileList as FileItem[])];
      if (!fileList.length) {
        newFileList = (this.currentFileList as FileItem[]).filter(
          (item) => item.status !== 'done' && item.status !== 'success'
        );
        this.currentFileList = newFileList;
        return;
      }
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const index = newFileList.findIndex(
          (item) =>
            (item.uid && item.uid === file.uid) ||
            (item.url && item.url === file.url) ||
            (item.name && item.name === file.name)
        );
        if (index !== -1) {
          Object.assign(newFileList[index], file);
        } else {
          newFileList.push({ ...file });
        }
      }
      this.currentFileList = newFileList;
      this.$emit('sync:state', 'fileList', this.filterFileList(this.currentFileList as FileItem[]));
    },
    onClickRoot(e: MouseEvent) {
      const contentRef = this.$refs.contentRef as HTMLElement | undefined;
      const footerRef = this.$refs.footerRef as HTMLElement | undefined;
      const attachiconRef = this.$refs.attachiconRef as HTMLElement | undefined;
      const target = e.target as Node;
      if (
        contentRef?.contains(target) ||
        (footerRef?.contains(target) && attachiconRef && !attachiconRef.contains(target))
      ) {
        const input = this.$refs.inputRef as { focus?: () => void } | undefined;
        input?.focus?.();
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
  --cw-sender-icon-background-regular-hover: rgba(0, 0, 0, 0.05);
  --cw-sender-icon-color-regular-hover: #333;
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
.cnt :global([class^='ant-input']) {
  border: none;
  background-color: transparent;
  resize: none;
}
.cnt :global([class^='ant-input']:focus) {
  box-shadow: none;
}
.cnt :global([class^='ant-input'][disabled]) {
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 6px;
  transition: color 0.2s, background 0.2s;
}
.attachmenticon:hover {
  background-color: var(--cw-sender-icon-background-regular-hover);
  color: var(--cw-sender-icon-color-regular-hover);
}
.attachmentopen {
  color: var(--cw-sender-text-color-active);
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
.topborder {
  border-top: 1px solid var(--cw-sender-border-color);
  border-radius: 16px;
}
.actions :global([class*='ant-btn-primary']) {
  padding: 0 3px !important;
}
.actions :global([class*='ant-btn-round']) {
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
.btn[data-invalid],
.btn[data-invalid]:hover,
.btn[data-invalid]:focus {
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
