import { ref } from 'vue';
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
      const value = ref(args.value);
      return {
        args,
        value,
      };
    },
    template: `
    <div>
    <fdddf-colorpicker v-bind="args" v-model:value="value"></fdddf-colorpicker>
    <div>当前值：{{ value }}</div>
    </div>
    `,
  }),
  args: {
    value: '#ff0000',
    label: 'ColorPicker',
    hidePalette: false,
    withoutInput: true,
  },
};
