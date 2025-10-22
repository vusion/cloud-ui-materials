import Component from '../index';

export default {
  id: 'yunshang-u-list-components-blocks',
  title: '组件列表/YunshangUListComponents/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<yunshang-u-list-components>
<template #default="current">
</template>
</yunshang-u-list-components>`,
  }),
};
