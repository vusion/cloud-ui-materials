import Component from '../index';

export default {
  id: 'resizable-columns-examples',
  title: '组件列表/ResizableColumns/示例',
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
    template: `
    <resizable-columns v-bind="$props">
      <template #left>
        <div style="background-color: #f0f0f0; ">左侧内容</div>
      </template>
      <template #right>
        <div style="background-color: #f0f0f0; ">右侧内容</div>
      </template>
    </resizable-columns>`,
  }),
  args: {
    text: 'Hello world',
  },
};
