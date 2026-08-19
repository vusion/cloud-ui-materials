import Component from '../index';

export default {
  id: 'u-link-blocks',
  title: '组件列表/ULink/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '普通链接',
  render: () => ({
    template: `<u-link text="普通链接"></u-link>`,
  }),
};

export const Block2 = {
  name: '成功链接',
  render: () => ({
    template: `<u-link color="success" text="成功链接"></u-link>`,
  }),
};

export const Block3 = {
  name: '警告链接',
  render: () => ({
    template: `<u-link color="warning" text="警告链接"></u-link>`,
  }),
};

export const Block4 = {
  name: '危险链接',
  render: () => ({
    template: `<u-link color="danger" text="危险链接"></u-link>`,
  }),
};

export const Block5 = {
  name: '禁用链接',
  render: () => ({
    template: `<u-link disabled text="禁用链接"></u-link>`,
  }),
};
