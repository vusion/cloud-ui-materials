<template>
  <div>
    <a-upload-dragger
      ref="myupload"
      name="file"
      :multiple="true"
      action="/upload"
      @change="handleChange"
      :value="fileList"
      :file-list="fileList"
      v-bind="[$attrs, $props]"
      v-on="$listeners"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="cloud-upload" />
      </p>
      <p class="ant-upload-text">
        点击或拖拽文件到这个区域上传
      </p>
    </a-upload-dragger>
    <a v-if="uploadTemplate && fileList.length === 0" target="_blank" :href="uploadTemplate">下载模版</a>
  </div>
</template>

<script>
export default {
  name: 'cw-antd-upload',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    uploadTemplate: {
      type: String,
    },
  },
  data() {
    return {
      fileList: [],
      defaultFileList: [],
    };
  },
  watch: {
    uploadTemplate: {
      handler(value) {
        console.log(value);
      },
    },
    value: {
      handler(value) {
        if (typeof value === 'string') {
          const arr1 = value.split(',');
          this.fileList = arr1.map((item, index) => {
            const arr = item.split('/');
            const obj = {
              uid: index,
              name: arr[arr.length - 1],
              status: 'done',
              response: { result: item },
              url: item,
            };
            return obj;
          });
          this.fileList = [];
        } else if (Object.prototype.toString.call(value) === '[object Array]') {
          this.fileList = this.value.map((item, index) => {
            const arr = item.split('/');
            const obj = {
              uid: index,
              name: arr[arr.length - 1],
              status: 'done',
              response: { result: item },
              url: item,
            };
            return obj;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.result;
        }
        return file;
      });
      this.fileList = fileList;
      if (status === 'done' || status === 'removed') {
        this.$emit('change', this.fileList.map(item => item.url));
        this.$emit('onChange', this.fileList.map(item => item.url));
      }
    },
  },
};
</script>

<style scoped></style>
