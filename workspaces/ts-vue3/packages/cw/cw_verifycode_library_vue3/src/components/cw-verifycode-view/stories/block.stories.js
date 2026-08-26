import Component from '../index.vue';

export default {
  id: 'cw-verifycode-view-blocks',
  title: '组件列表/CwVerifycodeView/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-verifycode-view></cw-verifycode-view>',
  }),
};
