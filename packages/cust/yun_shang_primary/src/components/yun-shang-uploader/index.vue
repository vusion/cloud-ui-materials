<template>
  <div :class="$style.root">
    <a-upload
      :customRequest="handleCustomRequest"
      :before-upload="beforeUpload"
      :show-upload-list="showFileList"
      :accept="acceptMime"
      :file-list="fileList"
      :remove="handleRemove"
      @change="handleChange"
    >
      <!-- <a-button :loading="uploading"> <a-icon type="upload" /> 点击上传 </a-button> -->
      <slot></slot>
    </a-upload>
  </div>
</template>

<script>
import nosUploader from './utils/nosUploader';
import { getWavAudioDetail } from './utils/audioUtils';
import { message } from 'ant-design-vue';
import Antd from 'ant-design-vue/lib/index'; // 引入 CommonJS 版本
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue';
import axios from 'axios';
Vue.use(Antd);

export default {
  name: 'yun-shang-uploader',
  props: {
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
  },
  data() {
    return {
      uploading: false,
      isOnlineSG: false,
      fileList: [],
      curRecord: {},
    };
  },
  methods: {
    async getUploadToken(fileName) {
      const res = await axios.get('/api/deepvox/console/nos/token', {
        params: { fileName },
      });
      console.log('获取token', res);
      return res.data.token;
    },

    async beforeUpload(file) {
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
          {
            FILE_NOT_SUPPORT: '不支持的文件格式',
            UPLOAD_FAILED: '上传失败',
            IMAGE_MAX_SIZE_LIMIT_NUM: '图片不能超过 ${value}',
            ATTACHMENT_MAX_SIZE_LIMIT_NUM: '文件不能超过 ${value}',
          }
        );

        // === WAV 校验开始 ===
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType === 'wav') {
          const { sampleRate, bitPerSample, numberOfChannels, duration } = await getWavAudioDetail({ url: this.curRecord.url });
          Object.assign(this.curRecord, { duration });
          if (sampleRate !== 8000 || bitPerSample !== 16 || numberOfChannels !== 1) {
            message.error('录音文件采样率需为8000Hz、位深16bit、单声道');
            this.curRecord.error = '录音文件采样率需为8000Hz、位深16bit、单声道';
            return false;
          }
        }
        // === WAV 校验结束 ===
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
          message.error('上传失败');
          options.onError(this.curRecord.error);
          this.$emit('error', this.curRecord);
        } else {
          message.success('上传成功');
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
      this.fileList = fileList;
    },
  },
};
</script>

<style module>
.root {
}
</style>
