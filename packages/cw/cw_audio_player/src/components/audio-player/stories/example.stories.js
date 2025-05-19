import Component from '../index';

export default {
  id: 'audio-player-examples',
  title: '组件列表/AudioPlayer/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<audio-player v-bind="$props"></audio-player>',
  }),
  args: {
    src: 'https://cdn.pixabay.com/audio/2025/04/16/audio_b64de0d495.mp3'
  },
};
