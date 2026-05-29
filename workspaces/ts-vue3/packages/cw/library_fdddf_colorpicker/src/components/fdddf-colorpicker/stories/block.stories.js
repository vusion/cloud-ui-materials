import Component from '../index';

export default {
  id: 'fdddf-colorpicker-blocks',
  title: '组件列表/FdddfColorpicker/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    components: {
      'fdddf-colorpicker': Component,
    },
    template: '<fdddf-colorpicker value="#ff0000"></fdddf-colorpicker>',
  }),
};
