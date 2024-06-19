<template>
  <div class="cw-file-upload-view-room">
      <a-upload
        style="flex:1"
        name="file"
        action="/upload"
        @change="handleChange"
        :show-upload-list="false"
        v-bind="[$attrs, $props]"
      >
        <a-button style="width:100%"> <a-icon type="upload" /> 文件上传 </a-button>
      </a-upload>
      <a-input allowClear v-model="currentValue"></a-input>
    </div>
</template>
<script>
export default {
  props:{
    value:{
      type:String
    }
  },
  data() {
    return {
      fileList: [],
      currentValue:''
    };
  },
  mounted(){
    this.currentValue = this.value
  },
  methods: {
    handleChange(info) {
      const status = info.file.status;
      let fileList = [...info.fileList];
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.result;
        }
        return file;
      });
      this.fileList = fileList;
       if( status=== 'done'){
        this.currentValue = info.file.response.result
        this.$emit(
          "change",
         this.currentValue
        );
      }
    },
  },
};
</script>
<style>
.cw-file-upload-view-room{
  display:flex ;
  flex-direction: column;
}

.cw-file-upload-view-room .ant-upload-select-text{
  width:100%
}
</style>
