import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-verifycode-view-examples',
  title: '组件列表/CwVerifycodeView/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    setup() {
      const inputValue = ref('');
      const verifycodeRef = ref(null);
      const validateResult = ref(null);

      function handleValidate() {
        const isValid = verifycodeRef.value?.validate();
        validateResult.value = isValid ?? false;
        console.log(inputValue.value, isValid);
      }

      function handleRefresh() {
        verifycodeRef.value?.refresh();
        validateResult.value = null;
      }

      return {
        inputValue,
        verifycodeRef,
        validateResult,
        handleValidate,
        handleRefresh,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <cw-verifycode-view
          type="blend"
          style="width: 200px; height: 40px;"
          v-model:value="inputValue"
          ref="verifycodeRef"
        />
        <input v-model="inputValue" placeholder="请输入验证码" clearable />
        <div style="display: flex; gap: 8px;">
          <el-button type="primary" @click="handleValidate">验证</el-button>
          <el-button @click="handleRefresh">刷新</el-button>
        </div>
        <p
          v-if="validateResult !== null"
          style="margin: 0; font-size: 14px; color: var(--el-text-color-regular);"
        >
          验证结果：{{ validateResult ? '正确' : '错误' }}
        </p>
      </div>
    `,
  }),
};
