<template>
  <div class="root">
    <h3>表单设计器：</h3>
    <cw-form-designer ref="formDesigner" />
    <div>
      <el-button type="primary" @click="getFormJSON">同步JSON渲染器</el-button>
      <el-button type="success" @click="getFormTemplate">同步模版渲染器</el-button>
      <el-button type="warning" @click="getFormEntity">获取表单数据结构</el-button>
    </div>

    <div class="case-container">
      <div class="case-item">
        <h3>case1: JSON渲染器：</h3>
        <div>
          <el-button type="primary" @click="validateFormJSON">校验</el-button>
          <el-button type="success" @click="getFormDataFormJSON">获取表单数据</el-button>
        </div>
        <cw-form-json-render ref="formJsonRender" :initJSON="formJSON" />
      </div>
      <div class="case-item">
        <h3>case2: 模版渲染器：</h3>
        <div>
          <el-button type="primary" @click="validateFormTemplate">校验</el-button>
          <el-button type="success" @click="getFormDataFormTemplate">获取表单数据</el-button>
        </div>
        <cw-form-template-render ref="formTemplateRender" :initLayout="formTemplate" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamplesDemo1',
  data() {
    return {
      formJSON: '',
      formTemplate: '',
      formEntity: '',
    };
  },
  methods: {
    getFormJSON() {
      this.formJSON = this.$refs.formDesigner.getFormJSON();
    },
    getFormTemplate() {
      this.formTemplate = this.$refs.formDesigner.getFormTemplate();
    },
    getFormEntity() {
      this.formEntity = this.$refs.formDesigner.getFormEntity();
      console.log('表单数据结构', this.formEntity);
    },
    async validateFormJSON() {
      const valid = await this.$refs.formJsonRender.validate();
      console.log('JSON渲染器-校验结果', valid);
    },
    async getFormDataFormJSON() {
      const formData = await this.$refs.formJsonRender.getFormData();
      console.log('JSON渲染器-表单数据', formData);
    },
    async validateFormTemplate() {
      const valid = await this.$refs.formTemplateRender.validate();
      console.log('模版渲染器-校验结果', valid);
    },
    async getFormDataFormTemplate() {
      const formData = await this.$refs.formTemplateRender.getFormData();
      console.log('模版渲染器-表单数据', formData);
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.case-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.case-item {
  flex: 1;
}
</style>
