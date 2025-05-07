import Component from '../index';

export default {
  id: 'schedule-table-examples',
  title: '组件列表/ScheduleTable/示例',
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
    props: Object.keys(argTypes),
    template: '<schedule-table v-bind="$props"></schedule-table>',
  }),
  args: {
    "year": 2025,
    "month": 5,
    "names": ["阿狸", "提莫", "盖伦"],
    "nightShiftValue": "夜班",
    "restAfterNightShiftValue": "休息",
    "holidayColor": "#ff9800",
    "holidays": {
      "2025-05-01": "劳动节",
      "2025-05-05": "法定节假日"
    },
    "options": [
      { "label": "白班", "value": "白班", "color": "#000", "background": "#fff" },
      { "label": "夜班", "value": "夜班", "color": "white", "background": "#f44336" },
      { "label": "休息", "value": "休息", "color": "#388e3c", "background": "#e0f2f1" }
    ],
    "value": [
      ["白班", "夜班", "休息", "", "", "", ""],
      ["夜班", "休息", "", "", "", "", ""],
      ["", "", "", "", "", "", ""]
    ]
  },
};
