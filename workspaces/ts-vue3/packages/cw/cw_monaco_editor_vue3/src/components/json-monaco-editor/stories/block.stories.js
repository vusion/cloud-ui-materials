import Component from '../index';

export default {
  id: 'json-monaco-editor-blocks',
  title: '组件列表/JsonMonacoEditor/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template:
      '<div style="width: 800px;"><json-monaco-editor style="width: 100%; --cw-style-height: 340px; --cw-style-width: 100%;"></json-monaco-editor></div>',
  }),
};
