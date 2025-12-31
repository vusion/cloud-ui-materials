import Component from '../index';

export default {
  id: 'model-preview-examples',
  title: '组件列表/ModelPreview/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const DataSource = {
  name: '基础示例',
  render: () => ({
    template: `
      <model-preview url="https://threejs.org/examples/#webgl_animation_keyframes"></model-preview>
    `,
  }),
};
