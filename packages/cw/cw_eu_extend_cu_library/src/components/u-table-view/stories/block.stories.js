import Component from '../index';

export default {
  id: 'u-table-view-blocks',
  title: '组件列表/UTableView/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '普通数据表格',
  render: () => ({
    template: `<u-table-view :pagination="true" :pageSize="20" :pageNumber="1"></u-table-view>`,
  }),
};
