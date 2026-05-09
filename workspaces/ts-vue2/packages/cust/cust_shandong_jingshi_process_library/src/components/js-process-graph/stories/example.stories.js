import Component from '../index';
import ExamplesDemo1 from '../demos/ExamplesDemo1.vue';
import ExamplesDemo2 from '../demos/ExamplesDemo2.vue';

export default {
  id: 'js-process-graph-examples',
  title: '组件列表/JsProcessGraph/示例',
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
    template: '<js-process-graph v-bind="$props"></js-process-graph>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Demo1 = {
  name: 'ExamplesDemo1',
  render: () => ({
    components: {
      ExamplesDemo1,
    },
    template: '<examples-demo1 />',
  }),
};

export const Demo2 = {
  name: 'ExamplesDemo2',
  render: () => ({
    components: {
      ExamplesDemo2,
    },
    template: '<examples-demo2 />',
  }),
};
