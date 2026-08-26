import Component from '../index.vue';

export default {
  id: 'cw-doc-preview-examples',
  title: '组件列表/CwDocPreview/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    template:
      '<cw-doc-preview value="https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx"></cw-doc-preview>',
  }),
};
