import Component from '../index';

export default {
  id: 'ex-u-table-view-examples',
  title: '组件列表/ExUTableView/示例',
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
    template: '<ex-u-table-view v-bind="$props"></ex-u-table-view>',
  }),
  args: {
    text: 'Hello world',
  },
};
