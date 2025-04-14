import Component from '../index';

export default {
  id: 'fl-process-button-examples',
  title: '组件列表/FlProcessButton/示例',
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
    template: '<fl-process-button v-bind="$props"></fl-process-button>',
  }),
  args: {
    text: 'Hello world',
  },
};
