import Component from '../index';

export default {
  id: 'ow-process-form-blocks',
  title: '组件列表/OwProcessForm/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<van-form id="dynamicRenderContainer" processPrefix="tempPlaceholder" auto-gen-process-block="ow-process-form">
    <van-field required drole="other">
      <template #title>
        <van-text text="名称"></van-text>
      </template>
      <template #input>
        <van-fieldinput placeholder="请输入" clearable></van-fieldinput>
      </template>
    </van-field>
    <van-field name="radio" drole="other">
      <template #title>
        <van-text text="单选框"></van-text>
      </template>
      <template #input>
        <van-radio-group direction="horizontal" isNew icon="sure">
          <van-radio name="1" icon="sure">
            <van-text text="单选框 1"></van-text>
          </van-radio>
          <van-radio name="2" icon="sure">
            <van-text text="单选框 2"></van-text>
          </van-radio>
          <template #item="current">
            <van-radio vusion-disabled-cut vusion-disabled-copy>van-radio>
          </template>
        </van-radio-group>
      </template>
    </van-field>
  </van-form>`,
  }),
};
