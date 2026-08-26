import Component from '../index.vue';

export default {
  id: 'cw-print-view-examples',
  title: '组件列表/CwPrintView/示例',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-print-view :isShowPrint="true"></cw-print-view>',
  }),
};
