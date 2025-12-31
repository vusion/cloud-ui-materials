import ExSteps from '../index';
import ExStepItem from '../item';

export default {
  id: 'ex-van-steps-blocks',
  title: '组件列表/ExVanSteps/内置区块',
  component: { ExSteps, ExStepItem},
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础用法',
  render: () => ({
    template: `<ex-van-steps>
<ex-van-step-item>买家下单</ex-van-step-item>
<ex-van-step-item>商家接单</ex-van-step-item>
<ex-van-step-item>买家提货</ex-van-step-item>
<ex-van-step-item>交易完成</ex-van-step-item>
<template #item="current">
<ex-van-step-item
vusion-disabled-cut
vusion-disabled-copy
>步骤名</ex-van-step-item>
</template>
</ex-van-steps>`,
  }),
};
