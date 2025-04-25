<template>
  <div class="shadow-uploader-wrapper" ref="shadowMount"></div>
</template>

<script>
import nosUploader from './utils/nosUploader';
import { getWavAudioDetail } from './utils/audioUtils';
import Antd from 'ant-design-vue/lib/index';
import Vue from 'vue';
import axios from 'axios';

Vue.use(Antd);

// ✅ 创建上传器的 Vue 子组件
const InnerUploader = {
  name: 'inner-uploader',
  props: {
    value: Array,
    allowedExtensions: Array,
    acceptTypes: Array,
    imageMaxSize: Number,
    attachmentMaxSize: Number,
    acceptMime: String,
    showFileList: Boolean,
  },
  data() {
    return {
      uploading: false,
      isOnlineSG: false,
      fileList: this.value || [],
      curRecord: {},
    };
  },
  watch: {
    value(newVal) {
      this.fileList = [...newVal];
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

        if (ext === 'wav') {
          const { sampleRate, bitPerSample, numberOfChannels, duration } = await getWavAudioDetail({ url: this.curRecord.url });
          Object.assign(this.curRecord, { duration });
          if (sampleRate !== 8000 || bitPerSample !== 16 || numberOfChannels !== 1) {
            this.curRecord.error = '录音文件采样率需为8000Hz、位深16bit、单声道';
            this.$emit('error', this.curRecord);
            return false;
          }
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
      setTimeout(() => {
        if (this.curRecord.error) {
          options.file.error = true;
          options.onError(this.curRecord.error);
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
      this.fileList = fileList.filter((file) => file.url);
    },
  },
  render(h) {
    return h(
      'a-upload',
      {
        props: {
          customRequest: this.handleCustomRequest,
          beforeUpload: this.beforeUpload,
          showUploadList: this.showFileList,
          accept: this.acceptMime,
          fileList: this.fileList,
          remove: this.handleRemove,
        },
        on: {
          change: this.handleChange,
        },
      },
      [this.$scopedSlots.default?.(), h('div', [this.$scopedSlots.error?.()])]
    );
  },
};

export default {
  name: 'yun-shang-uploader-shadow',
  props: {
    value: Array,
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
    acceptMime: String,
    showFileList: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    // 创建 shadow root
    const host = this.$refs.shadowMount;
    const shadowRoot = host.attachShadow({ mode: 'open' });

    // 创建样式 link
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.css';
    shadowRoot.appendChild(styleLink);

    // 创建挂载点
    const mountEl = document.createElement('div');
    shadowRoot.appendChild(mountEl);

    // 创建一个 Vue 实例挂载上传器组件
    new Vue({
      render: (h) =>
        h(InnerUploader, {
          props: {
            value: this.value,
            allowedExtensions: this.allowedExtensions,
            acceptTypes: this.acceptTypes,
            imageMaxSize: this.imageMaxSize,
            attachmentMaxSize: this.attachmentMaxSize,
            acceptMime: this.acceptMime,
            showFileList: this.showFileList,
          },
          on: {
            success: (file) => this.$emit('success', file),
            error: (err) => this.$emit('error', err),
            remove: (file) => this.$emit('remove', file),
          },
          scopedSlots: this.$scopedSlots,
        }),
    }).$mount(mountEl);
  },
};
</script>

<style scoped>
.shadow-uploader-wrapper {
  display: block;
}
</style>
