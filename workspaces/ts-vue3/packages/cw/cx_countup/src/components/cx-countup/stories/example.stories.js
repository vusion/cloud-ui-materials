import Component from '../index';

export default {
  id: 'cx-countup-examples',
  title: '组件列表/CxCountup/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'cx-countup': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template:
      '<p style="font-size:28px"><cx-countup v-bind="args"></cx-countup></p>',
  }),
  args: {
    start: 0,
    end: 2026,
    duration: 2,
    loop: false,
    delay: 1,
    isGroup: true,
  },
};
