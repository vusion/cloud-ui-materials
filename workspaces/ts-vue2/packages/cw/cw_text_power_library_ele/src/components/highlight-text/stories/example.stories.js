import Component from '../index';

export default {
  id: 'highlight-text-examples',
  title: '组件列表/HighlightText/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<highlight-text v-bind="$props"></highlight-text>',
  }),
  args: {
    content: '这是一段需要高亮展示的文本内容',
    text: '高亮',
    link: 'demo-link',
  },
};
