<template>
  <div>
    <cw-form-json-render
      ref="formJsonRender"
      :initJSON="initJSON"
      :initData="initData"
      @renderSuccess="onRenderSuccess"
      @renderFailed="onRenderFailed"
    ></cw-form-json-render>
    <div>
      <button @click="validate">验证</button>
    </div>
    <div>
      <button @click="getFormData">获取表单数据</button>
    </div>
  </div>
</template>

<script>
import { initLayout } from '@/components/cw-form-designer/config';
export default {
  name: 'ExamplesDemo1',
  data() {
    return {
      initJSON: initLayout,
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
      const valid = await this.$refs.formJsonRender.validate('submit', false);
      console.log('validate', valid);
    },
    async getFormData() {
      const formData = await this.$refs.formJsonRender.getFormData();
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
