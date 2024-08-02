import Component from '../index';
import test from '../test.md?raw';

export default {
  id: 'byte-markdown-preview-examples',
  title: '组件列表/ByteMarkdownPreview/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<byte-markdown-preview v-bind="$props"></byte-markdown-preview>',
  }),
  args: {
    text: test
  },
};
