import Component from '../index.vue';

export default {
  id: 'cw-pdf-editor-blocks',
  title: '组件列表/CwPdfEditor/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `
      <cw-pdf-editor></cw-pdf-editor>
    `,
  }),
};
