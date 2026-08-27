import Component from '../index';

export default {
  id: 'cw-input-area-view-examples',
  title: '组件列表/CwInputAreaView/示例',
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
    template: `<div><div>{{value}}</div> <div @click="handleChangeValue">展示</div> <div @click="handleClick1">f</div><div @click="handleClick">b</div><cw-input-area-view :value.sync="value" ref="myInput" v-bind="$props"></cw-input-area-view></div>`,
    methods: {
      handleClick(){
        this.$refs['myInput'].handleClick('b','wise')
      },
      handleClick1(){
        this.$refs['myInput'].handleClick('f','wise')
      },
      handleChangeValue(){
        this.$refs['myInput'].handleChangeValue([{name:"f",value:"999"},{name:"b",value:"888"}])
      }
    },
  }),
  args: {
    disabled:false,
    value: '',
    titleMap:{
      f:{comment:'【$是否展示】'},
      b:{comment:"【你好】"},
    }
  },
};
