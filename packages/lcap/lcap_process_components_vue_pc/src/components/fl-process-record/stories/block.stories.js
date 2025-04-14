import Component from '../index';

export default {
  id: 'fl-process-record-blocks',
  title: '组件列表/FlProcessRecord/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Demo0 = {
  name: '流程记录表格',
  render: () => ({
    template: '<fl-process-record auto-gen-process-block="fl-process-record-table"></fl-process-record>',
  }),
};

export const Demo1 = {
  name: '流程记录时间线',
  render: () => ({
    template: '<fl-process-record auto-gen-process-block="fl-process-record-timeline"></fl-process-record>',
  }),
};
