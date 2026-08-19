import Component from '../index';

export default {
  id: 'u-anchor-blocks',
  title: '组件列表/UAnchor/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<u-anchor>
</u-anchor>`,
  }),
};
