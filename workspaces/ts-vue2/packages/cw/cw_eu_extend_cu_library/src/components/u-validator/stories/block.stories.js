import Component from '../index';

export default {
  id: 'u-validator-blocks',
  title: '组件列表/UValidator/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<u-validator label="用户名"></u-validator>`,
  }),
};
