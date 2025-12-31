import Component from '../index';

export default {
  id: 'ow-process-info-examples',
  title: '组件列表/OwProcessInfo/示例',
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
    template: '<ow-process-info v-bind="$props"></ow-process-info>',
  }),
  args: {
    text: 'Hello world',
  },
};
