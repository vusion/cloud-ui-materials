<template>
  <div>
    <template v-if="currentFileList.length">
      <div :class="$style.wrap" @click="onClickHeader">
        <div>附件 {{ currentFileList.length }}</div>
        <div>
          <Button
            v-if="!readonly"
            shape="round"
            :class="[$style.btn, btnInvalid ? $style.btnInvalid : '']"
            :disabled="disabled"
            @click.stop="onClickUpload"
          >
            继续上传
          </Button>
        </div>
      </div>
      <CwFileList
        :list="currentFileList"
        :disabled="disabled"
        :readonly="readonly"
        @remove="onRemove"
      />
    </template>
    <CwUploader
      v-show="!currentFileList.length"
      ref="uploader"
      type="dragger"
      :file-list-length="currentFileList.length"
      v-bind="mergedBind"
      @change="onFileChange"
    />
  </div>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue';
import type { PropType } from 'vue';
import CwFileList from './fileList/index.vue';
import CwUploader from './uploader/index.vue';

type FileItem = Record<string, unknown> & { uid?: string; url?: string; name?: string };

export default {
  name: 'cw-attachment',
  inheritAttrs: false,
  components: {
    Button,
    CwFileList,
    CwUploader,
  },
  props: {
    percent: { type: Number, default: 10 },
    fileList: { type: Array as PropType<FileItem[]>, default: () => [] },
    maxCount: { type: Number, default: 10 },
    maxSize: { type: [String, Number], default: Infinity },
    accept: String,
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    headers: { type: Object, default: () => ({}) },
    url: { type: String, default: '' },
    data: { type: Object, default: () => ({}) },
    ttl: Boolean,
    ttlValue: Number,
    access: String,
    viaOriginURL: Boolean,
    withCredentials: { type: Boolean, default: false },
    multiple: { type: Boolean, default: true },
    urlField: String,
  },
  emits: ['filechange', 'click-header'],
  data() {
    return {
      currentFileList: this.setCurrentFileList(this.fileList as FileItem[]),
    };
  },
  computed: {
    btnInvalid() {
      return this.currentFileList.length >= this.maxCount;
    },
    mergedBind() {
      return { ...this.$attrs, ...this.$props };
    },
  },
  watch: {
    fileList(val: FileItem[]) {
      this.currentFileList = this.setCurrentFileList(val);
    },
  },
  methods: {
    onFileChange(fileData: { file: FileItem; fileList: unknown }) {
      const currentFile = fileData.file;
      const list = [...this.currentFileList];
      const index = list.findIndex((item) => item.uid === currentFile.uid);
      if (index !== -1) {
        list[index] = currentFile;
      } else {
        list.push(currentFile);
      }
      this.currentFileList = list;
      this.$emit('filechange', this.currentFileList);
    },
    onRemove(item: FileItem) {
      const index = this.currentFileList.findIndex(
        (citem) =>
          (citem.uid && citem.uid === item.uid) ||
          (citem.url && citem.url === item.url) ||
          (citem.name && citem.name === item.name)
      );
      if (index !== -1) {
        this.currentFileList.splice(index, 1);
      }
      this.$emit('filechange', [...this.currentFileList]);
    },
    setCurrentFileList(fileList: FileItem[]) {
      return fileList.map((item) => ({ ...item }));
    },
    onClickUpload() {
      if (this.currentFileList.length >= this.maxCount) {
        (this as unknown as { $toast?: { show: (m: string) => void } }).$toast?.show(`最多上传${this.maxCount}个`);
        return;
      }
      const uploader = this.$refs.uploader as InstanceType<typeof CwUploader> | undefined;
      uploader?.openFileDialog?.();
    },
    onClickHeader() {
      this.$emit('click-header');
    },
    manualUploadFiles(files: FileList | File[]) {
      (this.$refs.uploader as InstanceType<typeof CwUploader> | undefined)?.manualUploadFiles(files);
    },
  },
};
</script>

<style module>
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px 0 16px;
  cursor: pointer;
  font-size: 14px;
}
button.btn:hover,
button.btn:focus {
  color: var(--cw-sender-button-border-color-primary);
  border-color: var(--cw-sender-button-border-color-primary);
}
.btnInvalid,
.btnInvalid:hover,
.btnInvalid:focus {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}
</style>
