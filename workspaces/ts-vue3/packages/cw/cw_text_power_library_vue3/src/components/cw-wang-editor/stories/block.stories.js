import Component from '../index.vue';

export default {
  id: 'cw-wang-editor-blocks',
  title: '组件列表/CwWangEditor/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-wang-editor scroll></cw-wang-editor>',
  }),
};
