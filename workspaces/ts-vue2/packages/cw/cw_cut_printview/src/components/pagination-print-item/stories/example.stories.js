import Component from '../index';

export default {
  id: 'pagination-print-item-examples',
  title: '组件列表/PaginationPrintItem/示例',
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
    template: '<pagination-print-item v-bind="$props"></pagination-print-item>',
  }),
  args: {
    text: 'Hello world',
  },
};
