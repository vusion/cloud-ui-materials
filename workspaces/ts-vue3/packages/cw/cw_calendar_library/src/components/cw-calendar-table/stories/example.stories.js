import Component from '../index';

export default {
  id: 'cw-calendar-table-examples',
  title: '组件列表/CwCalendarTable/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const StaticData = {
  name: '静态数据',
  render: () => ({
    components: {
      'cw-calendar-table': Component,
    },
    setup() {
      const data = [
        {
          firstValue: '张三',
          parent: { name: '张三' },
          children: [{ startTime: '2026-05-02', endTime: '2026-05-04', title: '事项 A' }],
        },
      ];
      return { data };
    },
    template: `
      <cw-calendar-table
        first-title="姓名"
        min-date="2026-01-01"
        max-date="2026-12-31"
        start-key="startTime"
        end-key="endTime"
        :data="data"
      >
        <template #default="{ item }">
          <span>{{ item.title || '—' }}</span>
        </template>
      </cw-calendar-table>
    `,
  }),
};
