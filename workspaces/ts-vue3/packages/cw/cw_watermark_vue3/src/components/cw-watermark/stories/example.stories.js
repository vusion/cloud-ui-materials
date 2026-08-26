import Component from '../index';

export default {
  id: 'cw-watermark-examples',
  title: '组件列表/CwWatermark/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    template: `<cw-watermark type="image" src="https://picsum.photos/id/237/200/200.jpg" :opacity="1"></cw-watermark>`,
  }),
};
