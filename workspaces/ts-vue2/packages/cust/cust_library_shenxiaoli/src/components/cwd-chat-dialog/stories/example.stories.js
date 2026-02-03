import Component from '../index';

export default {
  id: 'cwd-chat-dialog-examples',
  title: '组件列表/CwdChatDialog/示例',
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
    template: '<cwd-chat-dialog v-bind="$props"></cwd-chat-dialog>',
  }),
  args: {
    title: '胜小利智能对话助手',
    userID: 'demo_user',
    placeholder: '请输入您想了解的问题...',
  },
};

export const Example2 = {
  name: '自定义配置',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<cwd-chat-dialog v-bind="$props"></cwd-chat-dialog>',
  }),
  args: {
    title: '技术支持',
    userID: 'support_user',
    placeholder: '有什么可以帮您的吗？',
    wsUrl: 'ws://10.66.4.216:5002',
  },
};
