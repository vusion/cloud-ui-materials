import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

export default {
  id: 'reactor-thermal-performance-interface-examples',
  title: '组件列表/ReactorThermalPerformanceInterface/示例',
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
    template: '<reactor-thermal-performance-interface v-bind="$props"></reactor-thermal-performance-interface>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Example2 = {
  name: '基本用法2',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};
