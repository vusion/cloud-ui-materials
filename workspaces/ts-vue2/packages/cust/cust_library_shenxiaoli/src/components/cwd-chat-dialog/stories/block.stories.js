import Component from '../index';

export default {
  id: 'cwd-chat-dialog-blocks',
  title: '组件列表/CwdChatDialog/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: '<cwd-chat-dialog></cwd-chat-dialog>',
  }),
};