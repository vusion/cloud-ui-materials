import Component from '../index';

export default {
  id: 'u-radios-blocks',
  title: '组件列表/URadios/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<u-radios>
<template #item="current"></template>
</u-radios>`,
  }),
};
