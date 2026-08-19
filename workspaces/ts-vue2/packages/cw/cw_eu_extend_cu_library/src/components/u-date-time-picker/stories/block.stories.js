import Component from '../index';

export default {
  id: 'u-date-time-picker-blocks',
  title: '组件列表/UDateTimePicker/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<u-date-time-picker :emptyValueIsNull="true" value="2018-08-08" converter="json"></u-date-time-picker>`,
  }),
};
