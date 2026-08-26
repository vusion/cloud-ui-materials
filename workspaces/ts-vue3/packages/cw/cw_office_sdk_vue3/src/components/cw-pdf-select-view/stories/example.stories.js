import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-pdf-select-view-examples',
  title: '组件列表/CwPdfSelectView/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    setup() {
      const pdfRef = ref(null);
      return {
        pdfRef,
        getSelected: () => console.log(pdfRef.value?.getSelected()),
        uploadFile: () => pdfRef.value?.uploadFile(),
      };
    },
    template: `
      <div>
        <el-button @click="getSelected">获取选择的列表</el-button>
        <el-button @click="uploadFile">上传修改后的pdf</el-button>
        <cw-pdf-select-view
          ref="pdfRef"
          value="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
        ></cw-pdf-select-view>
      </div>
    `,
  }),
};
