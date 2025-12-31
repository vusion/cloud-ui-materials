import Component from '../index';

export default {
  id: 'json-monaco-editor-examples',
  title: '组件列表/JsonMonacoEditor/示例',
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
    template: '<json-monaco-editor v-bind="$props"></json-monaco-editor>',
  }),
  args: {
    value: '{}',
    attrThreshold: 10,
    placeholder: '{"Requestld":"2daf22fc-9218-47f0-a5f4-ac6be4","Code":200,"Message":"succeed","Data":[{"id":2473278792300288,"customerName":"test","createdTime":"2022-11-01T05:46:51.000Z","isUpdate":false}]}',
  },
};
