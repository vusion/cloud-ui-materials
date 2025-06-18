import Component from '../index';

export default {
  id: 'cw-amap-new-poi-examples',
  title: '组件列表/CwAmapNewPoi/示例',
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
    template: '<cw-amap-new-poi v-bind="$props"></cw-amap-new-poi>',
  }),
  args: {
    text: 'Hello world',
  },
};
