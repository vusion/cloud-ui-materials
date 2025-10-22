import Component from '../index';

export default {
  id: 'ow-process-my-process-blocks',
  title: '组件列表/OwProcessMyProcess/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<ow-process-my-process auto-gen-process-block="ow-process-my-process"></ow-process-my-process>',
  }),
};
