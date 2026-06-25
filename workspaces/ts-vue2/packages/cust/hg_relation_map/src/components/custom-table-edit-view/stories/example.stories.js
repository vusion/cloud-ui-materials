import Component from '../index';

export default {
  id: 'custom-table-eidt-view-examples',
  title: '组件列表/CustomTableEidtView/示例',
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
    template: '<custom-table-eidt-view v-bind="$props"></custom-table-eidt-view>',
  }),
  args: {
  editable:true,
  columns:[
    { key: 'name', title: '名称', placeholder: '$name' },
    { key: 'title', title: '标题', placeholder: '$title' },
    { key: 'price', title: '价格', placeholder: '$price' }
  ],
  rows:[
    { name: '商品1', title: '标题1', price: 100 },
    { name: '商品2', title: '标题2', price: 200 },
    { name: '商品3', title: '标题3', price: 300 }
  ],
  footer:[
    { key: 'name-foot', label: '合计' },
    { key: 'title-foot', label: '' },
    { key: 'price-foot', type: 'sum', field: 'price' } // 对应 $sum(price)
  ],
  },
};
