import Component from '../index';

export default {
  id: 'ex-u-image-blocks',
  title: '组件列表/ExUImage/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '适应',
  render: () => ({
    template: `<ex-u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="contain"></ex-u-image>`,
  }),
};

export const Block2 = {
  name: '适应（图片小于父元素时以原尺寸展示）',
  render: () => ({
    template: `<ex-u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="scale-down"></ex-u-image>`,
  }),
};

export const Block3 = {
  name: '原尺寸',
  render: () => ({
    template: `<ex-u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="none"></ex-u-image>`,
  }),
};

export const Block4 = {
  name: '拉伸',
  render: () => ({
    template: `<ex-u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="fill"></ex-u-image>`,
  }),
};

export const Block5 = {
  name: '填充',
  render: () => ({
    template: `<ex-u-image src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg" fit="cover"></ex-u-image>`,
  }),
};
