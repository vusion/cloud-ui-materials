import Component from '../index';

export default {
  id: 'el-tabs-blocks',
  title: '组件列表/YtElTabs/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基础示例',
  render: () => ({
    template: `<el-tabs>         <el-tab-pane><template #label><el-text text="标签一"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>         <el-tab-pane><template #label><el-text text="标签二"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>         <el-tab-pane><template #label><el-text text="标签三"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>       </el-tabs>`,
  }),
};

export const Block2 = {
  name: '使用数据源',
  render: () => ({
    template: `<el-tabs :dataSource="[{}]"></el-tabs>`,
  }),
};
