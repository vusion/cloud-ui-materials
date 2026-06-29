import Component from '../index';

export default {
  id: 'byte-markdown-editor-examples',
  title: '组件列表/ByteMarkdownEditor/示例',
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
    components: {
      'byte-markdown-editor': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: '<byte-markdown-editor v-bind="args"></byte-markdown-editor>',
  }),
  args: {
    text: 'Hello world',
    'data-nodepath':'12341243',
    style:{
      backgroundColor: 'red',
    },
  },
};
