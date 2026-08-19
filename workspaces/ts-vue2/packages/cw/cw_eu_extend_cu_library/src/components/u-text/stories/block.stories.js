import Component from '../index';

export default {
  id: 'u-text-blocks',
  title: '组件列表/UText/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '普通文本',
  render: () => ({
    template: `<u-text text="普通文本"></u-text>`,
  }),
};

export const Block2 = {
  name: '小号文本',
  render: () => ({
    template: `<u-text size="small" text="小号文本"></u-text>`,
  }),
};

export const Block3 = {
  name: '大号文本',
  render: () => ({
    template: `<u-text size="large" text="大号文本"></u-text>`,
  }),
};

export const Block4 = {
  name: '主要文本',
  render: () => ({
    template: `<u-text color="primary" text="主要文本"></u-text>`,
  }),
};

export const Block5 = {
  name: '辅助文本',
  render: () => ({
    template: `<u-text color="secondary" text="辅助文本"></u-text>`,
  }),
};

export const Block6 = {
  name: '成功文本',
  render: () => ({
    template: `<u-text color="success" text="成功文本"></u-text>`,
  }),
};

export const Block7 = {
  name: '警告文本',
  render: () => ({
    template: `<u-text color="warning" text="警告文本"></u-text>`,
  }),
};

export const Block8 = {
  name: '错误文本',
  render: () => ({
    template: `<u-text color="error" text="错误文本"></u-text>`,
  }),
};

export const Block9 = {
  name: '禁用文本',
  render: () => ({
    template: `<u-text color="disabled" text="禁用文本"></u-text>`,
  }),
};

export const Block10 = {
  name: '文本过长省略',
  render: () => ({
    template: `<u-text overflow="ellipsis" text="文字过长省略过长省略过长省略过长省略过长省略。"></u-text>`,
  }),
};
