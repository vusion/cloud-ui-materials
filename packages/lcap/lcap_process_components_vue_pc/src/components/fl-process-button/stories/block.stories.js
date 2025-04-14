import Component from '../index';

export default {
  id: 'fl-process-button-blocks',
  title: '组件列表/FlProcessButton/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<fl-process-button auto-gen-process-block="fl-process-button"></fl-process-button>',
  }),
};
