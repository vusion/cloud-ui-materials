<template>
  <div>
    <template v-if="currentFileList.length">
      <div :class="$style.wrap" @click="onClickHeader">
        <div>附件 {{ currentFileList.length }}</div>
        <div>
          <a-button v-if="!readonly" shape="round" @click.stop="onClickUpload" :disabled="disabled" :inValid="btnInvalid" :class="$style.btn">继续上传</a-button>
        </div>
      </div>
      <cw-file-list :list="currentFileList" @remove="onRemove" :disabled="disabled" :readonly="readonly"></cw-file-list>
    </template>
    <cw-uploader
      ref="uploader"
      type="dragger"
      :fileListLength="currentFileList.length"
      v-bind="[$attrs, $props]"
      v-show="!currentFileList.length"
      @change="onFileChange"
    ></cw-uploader>
  </div>
</template>

<script>
import CwProcess from './progress';
import FileList from './fileList';
import CwUploader from './uploader/index';
import { Button } from 'ant-design-vue';

export default {
  name: 'cw-progress',
  inheritAttrs: false,
  components: {
    'cw-progress': CwProcess,
    'cw-file-list': FileList,
    'cw-uploader': CwUploader,
    'a-button': Button,
  },
  props: {
    percent: { type: Number, default: 10 },
    fileList: { type: Array, default: () => [] },
    maxCount: { type: Number, default: 10 },
    maxSize: { type: [String, Number], default: Infinity },
    accept: String,
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    console.log(props, ctx);
    return {
      ...ctx.data,
    };
  },
  watch: {
    fileList(val) {
      this.currentFileList = this.setCurrentFileList(val);
    },
  },
  data() {
    return {
      currentFileList: this.setCurrentFileList(this.fileList),
    };
  },
  computed: {
    btnInvalid() {
      return this.currentFileList.length >= this.maxCount;
    },
  },
  methods: {
    onFileChange(fileData) {
      const currentFile = fileData.file;
      const index = this.currentFileList.findIndex((item) => item.uid === currentFile.uid);
      if (index !== -1) {
        this.currentFileList[index] = currentFile;
      } else {
        this.currentFileList.push(currentFile);
      }
      this.$emit('filechange', this.currentFileList);
    },
    onRemove(item) {
      const index = this.currentFileList.findIndex(
        (citem) => (citem.uid && citem.uid === item.uid) || (citem.url && citem.url === item.url) || (citem.name && citem.name === item.name)
      );
      if (index !== -1) {
        this.currentFileList.splice(index, 1);
      }
      this.$emit('filechange', this.currentFileList);
    },
    setCurrentFileList(fileList) {
      return fileList.map((item) => Object.assign({}, item));
    },
    onClickUpload() {
      if (this.currentFileList.length >= this.maxCount) {
        this.$toast && this.$toast.show(`最多上传${this.maxCount}个`);
        return;
      }
      if (this.$refs.uploader) {
        const inputEl = this.$refs.uploader.$el.querySelector('input[type="file"]');
        if (inputEl) {
          inputEl.click();
        }
      }
    },
    onClickHeader() {
      this.$emit('click-header')
    },
    manualUploadFiles(files) {
      if (this.$refs.uploader) {
        this.$refs.uploader.manualUploadFiles(files);
      }
    }
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
.btn[inValid],
.btn[invalid]:hover,
.btn[invalid]:focus {
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}
</style>
