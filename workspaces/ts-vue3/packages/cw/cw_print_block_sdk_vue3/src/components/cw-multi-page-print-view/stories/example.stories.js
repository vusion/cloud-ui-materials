import Component from '../index.vue';

export default {
  id: 'cw-multi-page-print-view-examples',
  title: '组件列表/CwMultiPagePrintView/示例',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-multi-page-print-view :isShowPrint="true"></cw-multi-page-print-view>',
  }),
};
