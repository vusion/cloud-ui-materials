import Component from '../index';

export default {
  id: 'cw-amap-new-point-marker-three-dim-blocks',
  title: '组件列表/CwAmapNewPointMarkerThreeDim/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-amap-new-point-marker-three-dim></cw-amap-new-point-marker-three-dim>',
  }),
};
