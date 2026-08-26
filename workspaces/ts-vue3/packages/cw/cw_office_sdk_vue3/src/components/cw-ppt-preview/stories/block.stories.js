import Component from '../index.vue';

export default {
  id: 'cw-ppt-preview-blocks',
  title: '组件列表/CwPptPreview/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-ppt-preview></cw-ppt-preview>',
  }),
};
