import Component from '../index';

export default {
  id: 'ow-process-button-blocks',
  title: '组件列表/OwProcessButton/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<ow-process-button auto-gen-process-block="ow-process-button"></ow-process-button>',
  }),
};
