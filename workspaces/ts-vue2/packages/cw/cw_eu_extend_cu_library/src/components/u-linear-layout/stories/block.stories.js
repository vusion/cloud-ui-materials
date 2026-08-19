import Component from '../index';

export default {
  id: 'u-linear-layout-blocks',
  title: '组件列表/ULinearLayout/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '单行排布',
  render: () => ({
    template: `<u-linear-layout direction="horizontal" :wrap="true">
</u-linear-layout>`,
  }),
};

export const Block2 = {
  name: '多行排布',
  render: () => ({
    template: `<u-linear-layout direction="vertical" :wrap="true">
<u-linear-layout :wrap="true">
</u-linear-layout>
<u-linear-layout :wrap="true">
</u-linear-layout>
</u-linear-layout>`,
  }),
};

export const Block3 = {
  name: '两端排布',
  render: () => ({
    template: `<u-linear-layout justify="space-between" :wrap="true">
<u-linear-layout :wrap="true">
</u-linear-layout>
<u-linear-layout :wrap="true">
</u-linear-layout>
</u-linear-layout>`,
  }),
};
