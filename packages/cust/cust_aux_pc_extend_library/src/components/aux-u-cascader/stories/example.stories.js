import Component from '../index';
import ExampleDemo1 from '../demos/examples/ExamplesDemo1.vue';

export default {
  id: 'aux-u-cascader-examples',
  title: '组件列表/AuxUCascader/示例',
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
    template: '<aux-u-cascader v-bind="$props"></aux-u-cascader>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Example2 = {
  name: '样例1',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo />',
  }),
};
