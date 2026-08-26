import Component from '../index';

export default {
  id: 'cw-audio-record-blocks',
  title: '组件列表/CwAudioRecord/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cw-audio-record></cw-audio-record>',
  }),
};
