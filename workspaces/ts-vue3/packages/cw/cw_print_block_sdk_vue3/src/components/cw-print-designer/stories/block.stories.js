import Component from '../index.vue';

export default {
  id: 'cw-print-designer-blocks',
  title: '组件列表/CwPrintDesigner/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-print-designer></cw-print-designer>',
  }),
};
