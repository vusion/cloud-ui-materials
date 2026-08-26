import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'cw-signature-view-examples',
  title: '组件列表/CwSignatureView/示例',
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
      'cw-signature-view': Component,
    },
    setup() {
      const signature = ref(null);
      const image = ref('');

      function clearSignature() {
        signature.value?.clearSignature();
      }

      function generateSignature() {
        image.value = signature.value?.getSignature() ?? '';
      }

      async function rotateSignature() {
        const rotatedImage = await signature.value?.rotateSignature(270);
        image.value = rotatedImage ?? '';
      }

      return {
        signature,
        image,
        clearSignature,
        generateSignature,
        rotateSignature,
      };
    },
    template: `
      <div>
        <cw-signature-view ref="signature"></cw-signature-view>
        <el-button type="primary" @click="clearSignature">clear</el-button>
        <el-button type="primary" @click="generateSignature">generate</el-button>
        <el-button type="primary" @click="rotateSignature">rotate</el-button>
        <el-image v-if="image" :src="image" fit="scale-down" style="max-width: 400px;"></el-image>
      </div>
    `,
  }),
};
