import Component from '../index.vue';

export default {
  id: 'cw-dragable-list-blocks',
  title: '组件列表/CwDragableList/内置区块',
  component: Component,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `<cw-dragable-list>
    <template #default="current">
         <el-space size="small">+</el-space>
    </template>
</cw-dragable-list>`,
  }),
};
