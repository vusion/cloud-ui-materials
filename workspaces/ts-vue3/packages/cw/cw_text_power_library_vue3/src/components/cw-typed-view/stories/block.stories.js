import Component from '../index.vue';

export default {
  id: 'cw-typed-view-blocks',
  title: '组件列表/CwTypedView/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-typed-view></cw-typed-view>',
  }),
};
