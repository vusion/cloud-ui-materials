import Component from '../index';

export default {
  id: 'aux-van-pickerson-blocks',
  title: '组件列表/AuxVanPickerson/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础用法',
  render: () => ({
    template: `<aux-van-pickerson title="标题" :showToolbar="true" :optionIsSlot="false" :pageSize="50">
<template #title>
<van-text text="标题"></van-text>
</template>
<template #pannel-title>
<van-text text="标题"></van-text>
</template>
<template #picker-top>
<van-picker-action-slot targetMethod="cancel">
<van-iconv name="left-arrow" icotype="only"></van-iconv>
</van-picker-action-slot>
<van-picker-action-slot targetMethod="confirm"></van-picker-action-slot>
</template>
<template #picker-bottom>
<van-picker-action-slot targetMethod="cancel">
<van-button
type="info_secondary"
size="normal"
text="取消"
squareroud="round"
></van-button>
</van-picker-action-slot>
<van-picker-action-slot targetMethod="confirm">
<van-button
type="info"
size="normal"
text="确认"
squareroud="round"
></van-button>
</van-picker-action-slot>
</template>
</aux-van-pickerson>`,
  }),
};
