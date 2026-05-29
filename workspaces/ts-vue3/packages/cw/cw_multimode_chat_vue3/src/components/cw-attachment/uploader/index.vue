<template>
  <div :class="$style.root">
    <UploadDragger
      v-if="type === 'dragger'"
      ref="uploadRef"
      name="file"
      :show-upload-list="false"
      :headers="headerData"
      :action="actionUrl"
      :accept="accept"
      :data="reqData"
      :multiple="multiple"
      :before-upload="onBeforeUpload"
      :max-count="maxCount"
      :with-credentials="withCredentials"
      @change="handleChange"
    >
      <div :class="$style.icon">
        <img :src="UploadSvg" alt="" />
      </div>
      <div>点击或直接拖拽文件到此处上传</div>
      <div>
        <span
          >最多{{ maxCount }}个<span v-if="maxSizeText">，每个{{ maxSizeText }}</span>，</span
        ><span>支持{{ acceptText }}</span>
      </div>
    </UploadDragger>
    <Upload
      v-else
      ref="uploadRef"
      name="file"
      :show-upload-list="false"
      :headers="headerData"
      :action="actionUrl"
      :accept="accept"
      :data="reqData"
      :multiple="multiple"
      :before-upload="onBeforeUpload"
      :max-count="maxCount"
      :with-credentials="withCredentials"
      @change="handleChange"
    >
      <Button shape="round">继续上传</Button>
    </Upload>
  </div>
</template>

<script lang="ts">
import { Button, Upload, UploadDragger } from 'ant-design-vue';
import UploadSvg from '../assets/upload.svg';
import { getAcceptText, getSizeLimitText, getSizeForFile, isAcceptValid } from '../util.ts';
import uploadMixin from './uploader.mixin.js';

type FileItem = { status?: string; response?: unknown; uid?: string; name?: string; [k: string]: unknown };

export default {
  name: 'cw-uploader',
  inheritAttrs: false,
  components: {
    Upload,
    UploadDragger,
    Button,
  },
  mixins: [uploadMixin],
  props: {
    type: { type: String, default: 'normal' },
    maxCount: { type: Number, default: 10 },
    maxSize: { type: [String, Number], default: Infinity },
    accept: String,
    headers: { type: Object, default: () => ({}) },
    url: { type: String, default: '' },
    data: { type: Object, default: () => ({}) },
    ttl: Boolean,
    ttlValue: Number,
    access: String,
    viaOriginURL: Boolean,
    multiple: { type: Boolean, default: true },
    fileListLength: { type: Number, default: 0 },
    urlField: String,
    action: String,
  },
  emits: ['change'],
  data() {
    return {
      UploadSvg,
    };
  },
  computed: {
    acceptText() {
      return getAcceptText(this.accept, Infinity);
    },
    maxSizeText() {
      return getSizeLimitText(this.maxSize as string | number);
    },
  },
  methods: {
    handleChange(fileData: { file: FileItem; fileList: FileItem[] }) {
      if (fileData.file && fileData.file.status !== undefined) {
        this.$emit('change', {
          file: Object.assign(fileData.file, this.formatResponse(fileData.file.response, fileData.file)),
          fileList: fileData.fileList,
        });
      }
    },
    onBeforeUpload(file: File, fileList: File[]) {
      if (
        this.maxCount !== undefined &&
        this.maxCount !== null &&
        (this.maxCount as number) !== Infinity &&
        this.fileListLength + fileList.length > (this.maxCount as number)
      ) {
        (this as unknown as { $toast?: { error: (m: string) => void } }).$toast?.error(`最多上传${this.maxCount}个`);
        return false;
      }
      const maxSize = getSizeForFile(this.maxSize as string | number);
      if (maxSize !== undefined) {
        if (file.size > maxSize) {
          (this as unknown as { $toast?: { error: (m: string) => void } }).$toast?.error(
            `上传文件大小不超过${this.maxSizeText}`
          );
          return false;
        }
      }
      if (this.accept && !isAcceptValid(this.accept, file)) {
        (this as unknown as { $toast?: { error: (m: string) => void } }).$toast?.error(`仅支持${this.acceptText}`);
        return false;
      }
      return true;
    },
    openFileDialog() {
      const root = (this.$refs.uploadRef as { $el?: HTMLElement } | undefined)?.$el;
      const inputEl = root?.querySelector?.('input[type="file"]') as HTMLInputElement | null;
      inputEl?.click();
    },
    manualUploadFiles(files: FileList | File[]) {
      const arr = Array.from(files);
      const validFiles = arr.filter((file) => this.onBeforeUpload(file, arr) !== false);
      if (!validFiles.length) return;
      const root = (this.$refs.uploadRef as { $el?: HTMLElement } | undefined)?.$el;
      const inputEl = root?.querySelector?.('input[type="file"]') as HTMLInputElement | null;
      if (!inputEl) return;
      try {
        const dt = new DataTransfer();
        validFiles.forEach((f) => dt.items.add(f));
        inputEl.files = dt.files;
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
      } catch {
        /* DataTransfer 不可用时忽略 */
      }
    },
  },
};
</script>

<style module>
.root :global(.ant-upload-drag) {
  background-color: transparent;
  border: none;
  line-height: 24px;
  color: #333;
}
.root :global(.ant-upload-drag.ant-upload-drag-hover) {
  border: none;
  border-radius: 16px;
}
.root .icon {
  margin-bottom: 13px;
}
</style>
