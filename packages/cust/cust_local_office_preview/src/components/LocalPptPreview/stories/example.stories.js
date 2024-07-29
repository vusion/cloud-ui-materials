import Component from '../index';

export default {
  id: 'local-ppt-preview-examples',
  title: '组件列表/LocalPptPreview/示例',
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
    template: '<local-ppt-preview v-bind="$props"></local-ppt-preview>',
  }),
  args: {
    text: 'Hello world',
  },
};
