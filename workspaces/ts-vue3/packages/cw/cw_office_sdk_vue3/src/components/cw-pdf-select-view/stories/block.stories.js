import Component from '../index.vue';

export default {
  id: 'cw-pdf-select-view-blocks',
  title: '组件列表/CwPdfSelectView/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-pdf-select-view></cw-pdf-select-view>',
  }),
};
