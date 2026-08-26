import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'large-file-split-uploader-examples',
  title: '组件列表/LargeFileSplitUploader/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      'large-file-split-uploader': Component,
    },
    setup() {
      const file = ref('');
      return { file };
    },
    template: `
      <large-file-split-uploader
        v-model:value="file"
        url="/gateway/lowcode/api/v1/app/upload"
      >
        <el-button type="primary">Upload</el-button>
      </large-file-split-uploader>
    `,
  }),
};
