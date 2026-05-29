import Component from '../index';

export default {
  id: 'fdddf-colorpicker-examples',
  title: '组件列表/FdddfColorpicker/示例',
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
      'fdddf-colorpicker': Component,
    },
    props: Object.keys(argTypes),
    setup() {
      return {
        args,
      };
    },
    template: '<fdddf-colorpicker v-bind="args"></fdddf-colorpicker>',
  }),
  args: {
    value: '#ff0000',
    label: 'ColorPicker',
    hidePalette: false,
    withoutInput: false,
  },
};
