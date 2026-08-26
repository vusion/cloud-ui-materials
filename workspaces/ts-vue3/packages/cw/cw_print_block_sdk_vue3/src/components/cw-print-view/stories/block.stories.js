import Component from '../index.vue';

export default {
  id: 'cw-print-view-blocks',
  title: '组件列表/CwPrintView/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-print-view></cw-print-view>',
  }),
};
