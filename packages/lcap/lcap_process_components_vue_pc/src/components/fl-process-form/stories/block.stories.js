import Component from '../index';

export default {
  id: 'fl-process-form-blocks',
  title: '组件列表/FlProcessForm/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<u-form id="dynamicRenderContainer" processPrefix="tempPlaceholder" auto-gen-process-block="fl-process-form">
        <u-form-item required layout="center">
          <template #label>
            <u-text text="名称"></u-text>
          </template>
          <u-input placeholder="由字母、数字和中划线组成"></u-input>
        </u-form-item>
        <u-form-item required layout="center">
          <template #label><u-text text="类型"></u-text></template>
          <u-radios>
              <u-radio label="A"><template #item><u-text text="类型 A"></u-text></template></u-radio>
              <u-radio label="B"><template #item><u-text text="类型 B"></u-text></template></u-radio>
          </u-radios>
        </u-form-item>
        <u-form-item layout="center">
          <u-button color="primary">立即创建</u-button>
        </u-form-item>
      </u-form>`,
  }),
};
