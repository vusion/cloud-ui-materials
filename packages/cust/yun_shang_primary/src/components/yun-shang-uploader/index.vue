<template>
  <div class="yunshang-uploader-cw-root">
    <a-upload
      :customRequest="handleCustomRequest"
      :before-upload="beforeUpload"
      :show-upload-list="false"
      :accept="acceptMime"
      :file-list="fileList"
      :remove="handleRemove"
      @change="handleChange"
    >
      <slot></slot>
      <div><slot name="error"></slot></div>
    </a-upload>

    <ul class="custom-file-list">
      <li
        v-for="file in fileList"
        :key="file.uid"
        class="custom-file-item"
        @mouseenter="file.hover = true"
        @mouseleave="file.hover = false"
        :class="{ hovered: file.hover }"
      >
        <i-ico :name="prefixIcon" icotype="only" class="prefix-icon"> </i-ico>
        <a class="file-name" :href="file.url" target="_blank" rel="noopener noreferrer" :download="file.name">
          {{ file.name }}
        </a>
        <i-ico :name="removeIcon" icotype="only" class="remove-icon" @click="handleRemove(file)"> </i-ico>
      </li>
    </ul>
  </div>
</template>

<script>
import nosUploader from './utils/nosUploader';
import { getWavAudioDetail, getAudioDetail } from './utils/audioUtils';
import Upload from 'ant-design-vue/lib/upload';
import 'ant-design-vue/lib/upload/style/index.css';
import axios from 'axios';

export default {
  name: 'yun-shang-uploader',
  components: { AUpload: Upload },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    allowedExtensions: {
      type: Array,
      default: () => ['wav'],
    },
    acceptTypes: {
      type: Array,
      default: () => ['image', 'other'],
    },
    imageMaxSize: {
      type: Number,
      default: 2,
    },
    attachmentMaxSize: {
      type: Number,
      default: 10,
    },
    acceptMime: {
      type: String,
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    prefixIcon: {
      type: String,
      default: '',
    },
    removeIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      uploading: false,
      isOnlineSG: false,
      fileList: this.value || [], // 初始传入的已上传文件
      curRecord: {},
    };
  },
  watch: {
    value(newVal) {
      this.fileList = [...newVal].filter((file) => file); // 仅显示成功文件
    },
  },
  methods: {
    async getUploadToken(fileName) {
      const res = await axios.get('/api/deepvox/console/nos/token', {
        params: { fileName },
      });
      return res.data.token;
    },

    async beforeUpload(file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!this.allowedExtensions.includes(ext)) {
        this.curRecord = { error: `不支持的文件类型: .${ext}` };
        this.$emit('error', this.curRecord);
        return false;
      }
      this.uploading = true;
      try {
        this.curRecord = await nosUploader.start(
          file,
          {
            acceptTypes: this.acceptTypes,
            imageMaxSize: this.imageMaxSize,
            attachmentMaxSize: this.attachmentMaxSize,
            isOnlineSG: this.isOnlineSG,
          },
          this,
          {
            FILE_NOT_SUPPORT: '不支持的文件格式',
            UPLOAD_FAILED: '上传失败',
            IMAGE_MAX_SIZE_LIMIT_NUM: '图片不能超过 ${value}',
            ATTACHMENT_MAX_SIZE_LIMIT_NUM: '文件不能超过 ${value}',
          }
        );

        // 解析音频信息统一用 getAudioDetail
        const { format } = await getAudioDetail({ url: this.curRecord.url });
        if (format) {
          const { sampleRate, bitsPerSample, numberOfChannels, duration } = format;
          duration && Object.assign(this.curRecord, { duration });

          const fileType = file.name.split('.').pop().toLowerCase();
          // === WAV 校验开始 ===
          if (fileType === 'wav') {
            if (sampleRate !== 8000 || bitsPerSample !== 16 || numberOfChannels !== 1) {
              this.curRecord.error = '录音文件采样率需为8000Hz、位深16bit、单声道';
              this.$emit('error', this.curRecord);
              return false;
            }
          }
          // === WAV 校验结束 ===
        }
      } catch (err) {
        this.curRecord = { error: err };
        console.error('[NosUpload]', err);
      } finally {
        this.uploading = false;
      }
      return false;
    },
    handleCustomRequest(options) {
      // 上传逻辑是迁移的，已完成上传，且回调太多，所以直接用 setTimeout 模拟自定义上传，触发成功或失败
      setTimeout(() => {
        if (this.curRecord.error) {
          options.file.error = true;
          options.onError(this.curRecord.error);
          // this.$emit('error', this.curRecord);
        } else {
          options.onSuccess(this.curRecord);
          this.$emit('success', this.curRecord);
        }
        this.curRecord = {};
      }, 600);
    },
    handleRemove(file) {
      this.$emit('remove', file);
    },
    handleChange({ fileList }) {
      this.fileList = fileList.filter((file) => file.url); // 仅显示成功文件
    },
  },
};
</script>

<style>
.yunshang-uploader-cw-root {
  height: 100px;
  width: 1000px;
}
.yunshang-uploader-cw-root .ant-upload-list-item-error {
  display: none;
}
.custom-file-list {
  list-style: none;
  padding: 0;
  margin: 8px 0;
}
.custom-file-item {
  display: flex;
  align-items: center;
  padding: 4px 0;
}
.custom-file-item:hover {
  background-color: #f2f3f5;
}
.prefix-icon {
  width: 14px;
  height: 14px;
  margin: 4px 8px 4px 4px;
}

.prefix-icon [class^='i-ico_iconwrap___'] svg {
  width: 14px;
  height: 14px;
  font-size: 14px;
}

.remove-icon [class^='i-ico_iconwrap___'] svg {
  width: 14px;
  height: 14px;
  font-size: 14px;
}

.file-name {
  flex: 1;
  font-size: 14px;
  line-height: 1;
  color: rgba(51, 126, 255, 1); /* 让链接看起来像链接 */
  text-decoration: underline;
  cursor: pointer;
  text-decoration: none;
}

.remove-icon {
  width: 14px;
  height: 14px;
  margin: 4px 4px 4px 8px;
  cursor: pointer;
  display: none;
}

.custom-file-item:hover .remove-icon {
  display: inline-block;
}

.yunshang-uploader-cw-root [class^='i-ico_iconwrap___'] {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
