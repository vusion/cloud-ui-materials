import Component from '../index';

export default {
  id: 'cw-bubble-list-blocks',
  title: '组件列表/CwBubbleList/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

// export const Default = {
//   name: '基本用法',
//   render: () => ({
//     template: '<cw-bubble-list></cw-bubble-list>',
//   }),
// };

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<cw-bubble-list><template #leftBubble="current"><cw-bubble placement="start"></cw-bubble></template><template #rightBubble="current"><cw-bubble placement="end"></cw-bubble></template></cw-bubble-list>`,
  }),
};
