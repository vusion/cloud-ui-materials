import Component from '../index';

export default {
  id: 'aux-van-cascader-blocks',
  title: '组件列表/AuxVanCascader/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础用法',
  render: () => ({
    template: `<aux-van-cascader
title="请选择"
:treeDisplay="true"
><template #title>标题</template></aux-van-cascader>`,
  }),
};
