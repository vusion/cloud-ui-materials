import Component from '../index';
import ExampleDemo1 from '../demos/examples/ExamplesDemo1.vue';

export default {
  id: 'dragable-designer-examples',
  title: '组件列表/DragableDesigner/示例',
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
    template: '<dragable-designer v-bind="$props"></dragable-designer>',
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