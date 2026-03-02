import Component from '../index';

export default {
  id: 'cw-video-view-examples',
  title: '组件列表/CwVideoView/示例',
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
    components: {
      'cw-video-view': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: '<cw-video-view v-bind="args"></cw-video-view>',
  }),
  args: {
    src: 'https://vjs.zencdn.net/v/oceans.mp4',
    autoplay: false,
    controls: true,
  },
};
