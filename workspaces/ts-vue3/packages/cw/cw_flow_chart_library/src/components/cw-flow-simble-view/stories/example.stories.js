import Component from '../index';

export default {
  id: 'cw-flow-simble-view-examples',
  title: '组件列表/CwFlowSimbleView/示例',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    components: {
      'cw-flow-simble-view': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template:
      '<div style="padding:16px;height:90vh"><cw-flow-simble-view v-bind="args"></cw-flow-simble-view></div>',
  }),
  args: {
    value: '',
  },
};
