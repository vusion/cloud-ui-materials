import Component from '../index';

export default {
  id: 'antv-table-view-examples',
  title: '组件列表/AntvTableView/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'antv-table-view': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: '<antv-table-view v-bind="args"></antv-table-view>',
  }),
  args: {
    hierarchyType: 'gird',
    width: 800,
    height: 400,
    cellWidth: 120,
    cellHeight: 36,
    fields: {
      rows: ['province', 'city'],
      columns: ['type', 'sub_type'],
      values: ['number'],
    },
    meta: [{ field: 'number', name: '数量' }],
    dataSource: [
      { province: '浙江', city: '杭州', type: 'A', sub_type: 'A1', number: 12 },
      { province: '浙江', city: '宁波', type: 'B', sub_type: 'B1', number: 6 },
    ],
  },
};
