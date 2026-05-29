import Component from '../index';
import CwBubble from '../bubble.vue';

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
    components: {
      'cw-bubble-list': Component,
      'cw-bubble': CwBubble,
    },
    template: `<cw-bubble-list>
      <template #leftBubble><cw-bubble placement="start" /></template>
      <template #rightBubble><cw-bubble placement="end" /></template>
    </cw-bubble-list>`,
  }),
};
