import Component from '../index';

export default {
  id: 'fl-process-task-box-blocks',
  title: '组件列表/FlProcessTaskBox/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<fl-process-task-box auto-gen-process-block="fl-process-task-box"></fl-process-task-box>',
  }),
};
