import Component from '../index.vue';

export default {
  id: 'cw-doc-preview-blocks',
  title: '组件列表/CwDocPreview/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-doc-preview></cw-doc-preview>',
  }),
};
