import Component from '../index';

export default {
  id: 'cw-typed-view-examples',
  title: '组件列表/CwTypedView/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template:
      '<cw-typed-view style="width:100px;" v-bind="$props"></cw-typed-view>',
  }),
  args: {
    value: 'fdafaslfjafldajfldsajfldajlfdjaslfjdl',
    showCursor: true,
  },
};
