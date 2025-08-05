import Component from '../index';

export default {
  id: 'ex-i-ico-blocks',
  title: '组件列表/ExIIco/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '组合图标-上下',
  render: () => ({
    template: `<ex-i-ico name="default">
<u-text>图标</u-text>
</ex-i-ico>`,
  }),
};

export const Block2 = {
  name: '组合图标-左右',
  render: () => ({
    template: `<ex-i-ico name="default" icotype="left">
<u-text>图标</u-text>
</ex-i-ico>`,
  }),
};

export const Block3 = {
  name: '仅图标',
  render: () => ({
    template: `<ex-i-ico name="default" icotype="only">
<u-text>图标</u-text>
</ex-i-ico>`,
  }),
};
