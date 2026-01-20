import Component from '../index';
import ExamplesDemo from '../demos/ExamplesDemo.vue';

export default {
  id: 'gx-u-navbar-multi-examples',
  title: '组件列表/GxUNavbarMulti/示例',
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
    template: '<gx-u-navbar-multi v-bind="$props"></gx-u-navbar-multi>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Demo1 = {
  render: () => ({
    components: {
      DeprecatedDemo: ExamplesDemo,
    },
    template: '<deprecated-demo />',
  }),
};
