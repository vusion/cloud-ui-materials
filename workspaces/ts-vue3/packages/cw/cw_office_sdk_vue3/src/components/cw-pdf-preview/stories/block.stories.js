import Component from '../index.vue';

export default {
  id: 'cw-pdf-preview-blocks',
  title: '组件列表/CwPdfPreview/内置区块',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<div style="height: 300px">
      <cw-pdf-preview value="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"></cw-pdf-preview>
    </div>`,
  }),
};
