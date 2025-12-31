import Component from '../index';

export default {
  id: 'cw-antd-custom-render-view-blocks',
  title: '组件列表/CwAntdCustomRenderView/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-antd-custom-render-view></cw-antd-custom-render-view>',
  }),
};