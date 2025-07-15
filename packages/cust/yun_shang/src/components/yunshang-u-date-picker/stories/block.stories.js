import Component from '../index';

export default {
  id: 'yunshang-u-date-picker-blocks',
  title: '组件列表/YunshangUDatePicker/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<yunshang-u-date-picker :emptyValueIsNull="true" value="2018-08-08"></yunshang-u-date-picker>`,
  }),
};
