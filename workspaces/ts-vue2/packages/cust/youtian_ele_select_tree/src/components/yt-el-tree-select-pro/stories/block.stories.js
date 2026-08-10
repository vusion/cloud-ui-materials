import Component from '../index';

export default {
  id: 'yt-el-tree-select-pro-blocks',
  title: '组件列表/YtElTreeSelectPro/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础示例',
  render: () => ({
    template: `<yt-el-tree-select-pro></yt-el-tree-select-pro>`,
  }),
};
