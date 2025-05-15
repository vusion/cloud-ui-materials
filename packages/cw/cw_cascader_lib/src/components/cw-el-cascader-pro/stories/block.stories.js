import Component from '../index';

export default {
  id: 'cw-el-cascader-pro-blocks',
  title: '组件列表/CwElCascaderPro/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础示例',
  render: () => ({
    template: `<cw-el-cascader-pro></cw-el-cascader-pro>`,
  }),
};
