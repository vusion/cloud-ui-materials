<template>
  <div :class="$style.root">
    <component :is="tagName"
      ref="antUploader"
      name="file"
      :showUploadList="false"
      :headers="headerData"
      :action="actionUrl"
      :accept="accept"
      :data="reqData"
      :multiple="multiple"
      :beforeUpload="onBeforeUpload"
      :maxCount="maxCount"
      :withCredentials="withCredentials"
      @change="handleChange">
      <template v-if="type === 'dragger'">
        <div :class="$style.icon">
          <img :src="UploadSvg"/>
        </div>
        <div>点击或直接拖拽文件到此处上传</div>
        <div><span>最多{{ maxCount }}个<span v-if="maxSizeText">，每个{{ maxSizeText }}</span>，</span><span>支持{{ acceptText }}</span></div>
      </template>
      <template v-else>
        <a-button shape="round">继续上传</a-button>
      </template>
    </component>
  </div>
</template>

<script>
import Button from 'ant-design-vue/lib/button';
import Upload from 'ant-design-vue/lib/upload';
import Icon from 'ant-design-vue/lib/icon';
import UploadSvg from '../assets/upload.svg';
import { getAcceptText, getSizeLimitText, getSizeForFile, isAcceptValid} from '../util.ts';
import uploadMixin from './uploader.mixin.js';

export default {
  name: 'cw-uploader',
  inheritAttrs: false,
  components: {
    'a-upload-dragger': Upload.Dragger,
    'a-upload': Upload,
    'a-icon': Icon,
    'a-button': Button,
  },
  mixins: [uploadMixin],
  props: {
    type: { type: String, default: 'normal', },
    maxCount: { type: Number, default: 10,},
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
  },
  computed: {
    tagName() {
      return this.type === 'dragger' ? 'a-upload-dragger' : 'a-upload';
    },
    acceptText() {
      return getAcceptText(this.accept, Infinity);
    },
    maxSizeText() {
      return getSizeLimitText(this.maxSize);
    },
  },
  data() {
    return {
        UploadSvg,
    }
  },
  methods: {
    handleChange(fileData) {
      if (fileData.file && fileData.file.status !== undefined) {
        this.$emit('change', {
          file: Object.assign(fileData.file, this.formatResponse(fileData.file.response, fileData.file)),
          fileList: fileData.fileList,
        });
      }
    },
    onBeforeUpload(file, fileList) {
      if (this.maxCount !== undefined && this.maxCount !== null && this.maxCount !== Infinity && this.fileListLength + fileList.length > this.maxCount) {
        this.$toast && this.$toast.error(`最多上传${this.maxCount}个`);
        return false;
      }
      const maxSize = getSizeForFile(this.maxSize);
      if (maxSize !== undefined) {
        if(file.size > maxSize) {
          this.$toast && this.$toast.error(`上传文件大小不超过${this.maxSizeText}`);
          return false;
        }
      }
      if (this.accept && !isAcceptValid(this.accept, file)) {
        this.$toast && this.$toast.error(`仅支持${this.acceptText}`);
        return false;
      }
    },
    manualUploadFiles(files) {
      const validFiles = Array.from(files).filter(file => this.onBeforeUpload(file, files) !== false);
      const uploadBtnEl = this.$el.querySelector('[class="ant-upload ant-upload-btn"]');
      if (uploadBtnEl && uploadBtnEl.__vue__ && uploadBtnEl.__vue__.uploadFiles) {
        uploadBtnEl.__vue__.uploadFiles(validFiles);
      }
    }
  }
};
</script>

<style module>
.root div[class="ant-upload ant-upload-drag"] {
    background-color: transparent;
    border: none;
    line-height: 24px;
    color: #333;
}
.root div[class="ant-upload ant-upload-drag ant-upload-drag-hover"] {
  border: none;
  border-radius: 16px;
}
.root .icon {
  margin-bottom: 13px;
}
</style>
