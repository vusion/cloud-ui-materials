import { ref } from 'vue';
import Component from '../index.vue';

export default {
  id: 'cw-dragable-list-examples',
  title: '组件列表/CwDragableList/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-dragable-list': Component,
    },
    setup() {
      const dataSource = ref([1, 2, 3, 4]);
      return { dataSource };
    },
    template: `<cw-dragable-list :dataSource="dataSource">
     <template #default="current">
        <div class="list-group-item-cell">{{ current.item }}</div>
    </template>
</cw-dragable-list>`,
  }),
};
