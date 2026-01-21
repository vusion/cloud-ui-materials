import Component from '../index';

export default {
  id: 'abbreviated-list-examples',
  title: '组件列表/AbbreviatedList/示例',
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
    template: `<abbreviated-list v-bind="$props" @more-click="handleMoreClick" @remove="handleRemove">
         <template #item="current">{{current.item}}</template>
    </abbreviated-list>`,
    methods: {
      handleMoreClick(count) {
        console.log('点击了更多按钮，剩余数量:', count);
        alert(`还有 ${count} 个标签未显示`);
      },
      handleRemove(item, index) {
        console.log('移除了标签:', item, index);
      }
    }
  }),
  args: {
    dataSource:()=> [
      '标签1',
      '标签标签',
      '标签12标签',
      '标签标签23标签',
      '标签标签23标签',
      '标签标签23标签',
      '标签标标签',
      '标签A',
      '标签B',
      '标签C',
      '标签D',
      '标签E',
      '标签F',
      '标签G',
      '标签H',
      '标签I',
      '标签J',
      '标签K',
      '标签L',
      '标签M'
    ],
    width: '700px',
    // showCloseIcon: true
  },
};
