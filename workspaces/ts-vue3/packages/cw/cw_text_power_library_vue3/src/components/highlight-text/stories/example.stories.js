import Component from '../index.vue';

export default {
  id: 'highlight-text-examples',
  title: '组件列表/HighlightText/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<highlight-text content="高粱玉米小麦水稻" text="玉米"></highlight-text>',
  }),
};
