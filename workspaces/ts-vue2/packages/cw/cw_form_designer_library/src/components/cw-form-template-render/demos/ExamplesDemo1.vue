<template>
  <div>
    <cw-form-template-render
      ref="formTemplateRender"
      :initLayout="initLayout"
      :initData="initData"
      @renderSuccess="onRenderSuccess"
      @renderFailed="onRenderFailed"
    ></cw-form-template-render>
    <div>
      <button @click="validate">验证</button>
    </div>
    <div>
      <button @click="getFormData">获取表单数据</button>
    </div>
  </div>
</template>

<script>
import { initLayout } from './config';
export default {
  name: 'ExamplesDemo1',
  data() {
    return {
      initLayout,
      initData: JSON.stringify({
        Form_1qrk3a: {
          property1: '张三',
          property2: 'A',
        },
      }),
    };
  },
  methods: {
    async validate() {
      const valid = await this.$refs.formTemplateRender.validate('submit', false);
      console.log('validate', valid);
    },
    async getFormData() {
      const formData = await this.$refs.formTemplateRender.getFormData();
      console.log('getFormData', formData);
    },
    onRenderSuccess(event) {
      console.log('onRenderSuccess', event);
    },
    onRenderFailed(event) {
      console.log('onRenderFailed', event);
    },
  },
};
</script>
