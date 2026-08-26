import Component from '../index.vue';

export default {
  id: 'cw-pdf-preview-examples',
  title: '组件列表/CwPdfPreview/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    template: '<cw-pdf-preview value="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"></cw-pdf-preview>',
  }),
};
