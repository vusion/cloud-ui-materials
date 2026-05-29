import Component from '../index';

export default {
  id: 'antv-table-view-blocks',
  title: '组件列表/AntvTableView/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: {
      'antv-table-view': Component,
    },
    template: '<antv-table-view></antv-table-view>',
  }),
};
