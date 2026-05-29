import Component from '../index';

export default {
  id: 'cw-calendar-table-blocks',
  title: '组件列表/CwCalendarTable/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-calendar-table': Component,
    },
    template: '<cw-calendar-table first-title="姓名"></cw-calendar-table>',
  }),
};
