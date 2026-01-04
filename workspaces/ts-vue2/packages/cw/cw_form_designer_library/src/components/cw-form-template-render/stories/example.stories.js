import Component from '../index';
import ExampleDemo1 from '../demos/ExamplesDemo1.vue';
import ExampleDemo2 from '../demos/ExamplesDemo2.vue';

export default {
  id: 'cw-form-template-render-examples',
  title: '组件列表/CwFormTemplateRender/示例',
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
    template: '<cw-form-template-render v-bind="$props"></cw-form-template-render>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Example2 = {
  name: '验证+获取数据',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo />',
  }),
};

export const Example3 = {
  name: '数据权限',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo />',
  }),
};
