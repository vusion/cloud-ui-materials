import Component from '../index';

export default {
  id: 'u-number-input-blocks',
  title: '组件列表/UNumberInput/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<u-number-input :decimalPlacesOmitZero="true"></u-number-input>`,
  }),
};

export const Block2 = {
  name: '按钮样式',
  render: () => ({
    template: `<u-number-input :decimalPlacesOmitZero="true" buttonDisplay="bothEnds"></u-number-input>`,
  }),
};
