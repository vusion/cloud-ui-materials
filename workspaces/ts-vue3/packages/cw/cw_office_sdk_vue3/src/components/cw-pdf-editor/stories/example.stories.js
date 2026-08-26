import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-pdf-editor-examples',
  title: '组件列表/CwPdfEditor/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    setup() {
      const editor = ref(null);
      function savePdf() {
        editor.value?.savePDF('test');
      }
      return { editor, savePdf };
    },
    template: `
      <cw-pdf-editor ref="editor">
        <el-button @click="savePdf">保存pdf</el-button>
      </cw-pdf-editor>
    `,
  }),
};
