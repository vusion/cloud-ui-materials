import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

export default {
  id: 'cw-amap-new-point-marker-label-examples',
  title: '组件列表/CwAmapNewPointMarkerLabel/示例',
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
    template: '<cw-amap-new-point-marker-label v-bind="$props"></cw-amap-new-point-marker-label>',
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