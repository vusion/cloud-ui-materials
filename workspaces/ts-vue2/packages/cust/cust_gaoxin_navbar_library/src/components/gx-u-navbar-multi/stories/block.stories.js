import Component from '../index';

export default {
  id: 'gx-u-navbar-multi-blocks',
  title: '组件列表/GxUNavbarMulti/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '导航栏',
  render: () => ({
    template: `<gx-u-navbar-multi>
<template #left>
<u-multi-layout-item alignItems="center" style="width: 200px;">
<u-image fit="cover" src="/assets/lcap-logo-light.svg"
style="width: 28px; height: 28px; margin: 16px 14px; --custom-start: auto; vertical-align: middle;"></u-image>
<u-text text="应用名称" size="large" style="--custom-start: auto; vertical-align: middle;"></u-text>
</u-multi-layout-item>
</template>
<gx-u-navbar-item-multi><u-text>导航项1</u-text></gx-u-navbar-item-multi>
<gx-u-navbar-item-multi><u-text>导航项2</u-text></gx-u-navbar-item-multi>
<template #right>
<u-multi-layout-item alignItems="center" justify="end">
<u-dropdown style="margin-right: 10px;">
<template #title>
<u-linear-layout gap="small" v-if="$global.userInfo">
<u-image fit="cover" src="/assets/avatar-default.svg" style="width: 36px; height: 36px; vertical-align: middle;"></u-image>
<span style="display: inline-block; vertical-align: top; margin-left: 10px; margin-right: 10px;">
<u-text :text="$global.userInfo.UserName"></u-text>
</span>
</u-linear-layout>
</template>
<template #default>
<u-dropdown-item><u-text>安全退出</u-text></u-dropdown-item>
</template>
</u-dropdown>
</u-multi-layout-item>
</template>
</gx-u-navbar-multi>`,
  }),
};
