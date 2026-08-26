import Component from '../index.vue';

export default {
  id: 'cw-xlsx-preview-blocks',
  title: '组件列表/CwXlsxPreview/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-xlsx-preview></cw-xlsx-preview>',
  }),
};
