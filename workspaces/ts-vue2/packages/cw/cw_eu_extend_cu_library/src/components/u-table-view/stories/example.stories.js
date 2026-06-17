import Component from '../index';
import ExampleDemo1 from '../demos/ExampleDemo1.vue';
import ExampleDemo2 from '../demos/ExampleDemo2.vue';
import ExampleDemo3 from '../demos/ExampleDemo3.vue';

export default {
  id: 'u-table-view-examples',
  title: '组件列表/UTableView/示例',
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
    template: '<u-table-view v-bind="$props"></u-table-view>',
  }),
  args: {
    text: 'Hello world',
  },
};

export const Example2 = {
  name: 'excel 粘贴（分页未满可扩行至 pageSize）',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo1,
    },
    template: '<example-demo />',
  }),
};

export const Example3 = {
  name: 'excel 粘贴（非分页扩行）',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo2,
    },
    template: '<example-demo />',
  }),
};

export const Example4 = {
  name: 'excel 粘贴（虚拟滚动）',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo3,
    },
    template: '<example-demo />',
  }),
};
