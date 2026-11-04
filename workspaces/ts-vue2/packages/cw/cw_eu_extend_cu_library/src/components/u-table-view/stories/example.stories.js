import Component from '../index';
import ExampleDemo1 from '../demos/ExampleDemo1.vue';
import ExampleDemo2 from '../demos/ExampleDemo2.vue';
import ExampleDemo3 from '../demos/ExampleDemo3.vue';
import ExampleDemo4 from '../demos/ExampleDemo4.vue';
import ExampleDemo5 from '../demos/ExampleDemo5.vue';
import ExampleDemo6 from '../demos/ExampleDemo6.vue';
import ExampleDemo54 from '../demos/cases/CasesDemo54.vue';
import ExampleDemo55 from '../demos/cases/CasesDemo55.vue';

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
  name: 'excel 粘贴（函数数据源 + 分页 + 总条数）',
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

export const Example5 = {
  name: 'excel 单元格类型 + 动态列显隐',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo5,
    },
    template: '<example-demo />',
  }),
};

export const Example6 = {
  name: 'excel 单元格类型（保留原组件 + 剪贴板）',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo4,
    },
    template: '<example-demo />',
  }),
};

export const Example7 = {
  name: 'checkbox 联动列显隐 + excel 粘贴',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo6,
    },
    template: '<example-demo />',
  }),
};

export const Example8 = {
  name: '隐藏列后自动合并（auto-row-span）不漂移',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo54,
    },
    template: '<example-demo />',
  }),
};

export const Example9 = {
  name: '隐藏列后数据级 rowSpan 配置合并不错位',
  render: () => ({
    components: {
      ExampleDemo: ExampleDemo55,
    },
    template: '<example-demo />',
  }),
};
