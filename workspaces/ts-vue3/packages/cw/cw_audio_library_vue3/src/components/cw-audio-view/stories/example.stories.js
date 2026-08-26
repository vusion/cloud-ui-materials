import Component from '../index';

export default {
  id: 'cw-audio-view-examples',
  title: '组件列表/CwAudioView/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-audio-view': Component,
    },
    template: '<cw-audio-view src="http://music.163.com/song/media/outer/url?id=317151.mp3" ref="audio"></cw-audio-view>',
  }),
};
