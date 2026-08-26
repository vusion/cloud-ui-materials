import Component from '../index.vue';

export default {
  id: 'cw-multi-page-print-view-blocks',
  title: '组件列表/CwMultiPagePrintView/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-multi-page-print-view></cw-multi-page-print-view>',
  }),
};
