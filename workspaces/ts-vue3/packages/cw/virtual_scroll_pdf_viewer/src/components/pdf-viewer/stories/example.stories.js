import Component from '../index';

const DEMO_PDF =
  'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

export default {
  id: 'pdf-viewer-examples',
  title: '组件列表/PdfViewer/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'pdf-viewer': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template:
      '<div style="width:100%;height:560px;border:1px solid #eee"><pdf-viewer v-bind="args"></pdf-viewer></div>',
  }),
  args: {
    value: DEMO_PDF,
    enableZoom: false,
  },
};
