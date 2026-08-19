import Component from '../index';

export default {
  id: 'u-select-blocks',
  title: '组件列表/USelect/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '数据选择框',
  render: () => ({
    template: `<u-select placeholder="请选择" :pagination="true" :pageSize="50" :emptyValueIsNull="true"></u-select>`,
  }),
};
