import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-ppt-preview-examples',
  title: '组件列表/CwPptPreview/示例',
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
            'https://umi-template-1259308927.cos.ap-shanghai.myqcloud.com/Presentation1.pptx';
        } else {
          file.value = undefined;
        }
      }
      return { file, handleClick };
    },
    template: `
      <div>
        <el-button @click="handleClick">click</el-button>
        <cw-ppt-preview :value="file"></cw-ppt-preview>
      </div>
    `,
  }),
};
