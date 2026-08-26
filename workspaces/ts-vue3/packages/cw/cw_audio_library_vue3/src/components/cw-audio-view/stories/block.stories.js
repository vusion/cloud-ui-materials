import Component from '../index';

export default {
  id: 'cw-audio-view-blocks',
  title: '组件列表/CwAudioView/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-audio-view></cw-audio-view>',
  }),
};
