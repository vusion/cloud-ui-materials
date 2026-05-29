import Component from '../index';

export default {
  id: 'cw-flow-simble-view-blocks',
  title: '组件列表/CwFlowSimbleView/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-flow-simble-view': Component,
    },
    template: '<cw-flow-simble-view></cw-flow-simble-view>',
  }),
};
