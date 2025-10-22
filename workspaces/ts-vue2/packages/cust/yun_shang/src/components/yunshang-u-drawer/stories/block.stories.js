import Component from '../index';

export default {
  id: 'yunshang-u-drawer-blocks',
  title: '组件列表/YunshangUDrawer/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<yunshang-u-drawer>
<template #title>
<u-text text="标题"></u-text>
</template>
<template #body>
<u-text>内容</u-text>
</template>
<template #foot>
<u-linear-layout justify="start">
<u-button color="primary">确 定</u-button>
<u-button>取 消</u-button>
</u-linear-layout>
</template>
</yunshang-u-drawer>`,
  }),
};
