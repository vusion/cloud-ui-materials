import Component from '../index.vue';

export default {
  id: 'highlight-text-blocks',
  title: '组件列表/HighlightText/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<highlight-text></highlight-text>',
  }),
};
