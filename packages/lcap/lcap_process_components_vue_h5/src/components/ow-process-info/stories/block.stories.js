import Component from '../index';

export default {
  id: 'ow-process-info-blocks',
  title: '组件列表/OwProcessInfo/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<ow-process-info auto-gen-process-block="ow-process-info"></ow-process-info>',
  }),
};
