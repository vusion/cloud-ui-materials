export const initLayout = `<template>
<u-linear-layout :ref="\`uLinearLayout1\`" type="root" gap="none" style="height:100%;background:#fff;">
  <u-form :ref="\`form_1\`" formTemplateRenderRef layout="inline-flex" :repeat="2" labelLayout="inline" bindEntity="Form_1qrk3a" style="padding:16px;">
    <u-form-item :ref="\`form_item_1\`" :required="true" layout="center" :rules="[{validate: 'required',message: '必填哦',trigger: 'input+blur',required: true}]">
      <template :ref="\`template_1\`" #label>
        <u-text :ref="\`text_1\`" text="名称"></u-text>
      </template>
      <u-input :ref="\`input_1\`" placeholder="由字母、数字和中划线组成" :value.sync="Form_1qrk3a.property1"></u-input>
    </u-form-item>
    <u-form-item :ref="\`form_item_2\`" :required="true" layout="center" :rules="[{validate: 'required',message: '类型不能为空哦',trigger: 'input+blur',required: true}]">
      <template :ref="\`template_2\`" #label>
        <u-text :ref="\`text_2\`" text="类型"></u-text>
      </template>
      <u-radios :ref="\`radios_1\`" :value.sync="Form_1qrk3a.property2">
        <u-radio :ref="\`radio_1\`" label="A">
          <template :ref="\`template_3\`" #item>
            <u-text :ref="\`text_3\`" text="类型 A"></u-text>
          </template>
        </u-radio>
        <u-radio :ref="\`radio_2\`" label="B">
          <template :ref="\`template_4\`" #item>
            <u-text :ref="\`text_4\`" text="类型 B"></u-text>
          </template>
        </u-radio>
        <template :ref="\`template_5\`" #item="current"></template>
      </u-radios>
    </u-form-item>
  </u-form>
</u-linear-layout>
</template>
<script>
export default {
  name: "form_designer",
  props: { 
    initData: { 
      type: Object,
    }
  },
  data(){
    const initData = this.$props.initData || {};
    return {
      currentData: initData,
      Form_1qrk3a: initData?.Form_1qrk3a || {}
    }
  },
  mounted(){
    // console.log('mounted', this.currentData)
  }
};
</script>`;
