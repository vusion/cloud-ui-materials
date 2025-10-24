<template>
    <a-upload
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      action="/upload"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar-uploader-img" alt="avatar" />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
      </div>
      <a-icon v-if="imageUrl" type="close-circle" class="close-icon" @click.stop="handleClose" />
    </a-upload>
  </template>
  <script>

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  export default {
    data() {
      return {
        loading: false,
        imageUrl: '',
      };
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      fileList: {
        type: Array,
        default: () => [],
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (val) {
            this.imageUrl = val;
          } else {
            this.imageUrl = '';
          }
        }
      }
    },
    methods: {
      handleChange(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
          this.$emit('change', info.file.response.filePath);
        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      handleClose(){
        this.$emit('change', '');
      }
    },
  };
  </script>
  <style>
  .avatar-uploader {
    position: relative;
    width: 60px !important;
  }
  .avatar-uploader > .ant-upload-select-picture-card {
    width: 12px !important;
    height: 12px !important;
    margin-bottom: 0;
  }

  .ant-upload-select-picture-card i {
    font-size: 12px;
    color: #999;
    width: 21px;
  }

  .ant-upload.ant-upload-select-picture-card{
    margin-bottom: 0px;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    color: #666;
  }

  .avatar-uploader-img {
    width: 21px !important;
    height: 21px;
    min-width: 21px;
  }

  .ant-upload.ant-upload-select-picture-card > .ant-upload{
    padding: 4px !important;
  }

  .ant-upload.ant-upload-select-picture-card{
    margin-bottom: 0px !important;
  }
  .u-article__1qHStZ5W img{
    max-width: unset !important;
  }

  .close-icon{
    position: absolute;
    right: 0;
    top: 0;
    color: #999;
  }
  </style>

  