import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-xlsx-preview-examples',
  title: '组件列表/CwXlsxPreview/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    setup() {
      const file = ref(undefined);
      function handleClick() {
        if (!file.value) {
          file.value =
            'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx';
        } else {
          file.value = undefined;
        }
      }
      return { file, handleClick };
    },
    template: `
      <div>
        <el-button @click="handleClick">click</el-button>
        <cw-xlsx-preview :value="file"></cw-xlsx-preview>
      </div>
    `,
  }),
};
