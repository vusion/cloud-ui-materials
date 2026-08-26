import Component from '../index';

export default {
  id: 'cw-watermark-blocks',
  title: '组件列表/CwWatermark/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<cw-watermark type="text" color="red" text="水印" :opacity="0.1"></cw-watermark>`,
  }),
};
