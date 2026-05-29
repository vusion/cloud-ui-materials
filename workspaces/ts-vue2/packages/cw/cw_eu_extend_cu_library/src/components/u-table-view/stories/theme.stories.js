import Component from '../index';

export default {
  id: 'u-table-view-theme',
  title: '样式例子/UTableView/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '配置列',
  render: () => ({
    template: `<u-table-view :configurable="true" :pagination="true" :pageSize="20" :pageNumber="1" :line="true"
        :dataSource='${JSON.stringify([
      {
        id: 0,
        name: '苹果',
        class: '水果',
        price: 5,
        place: '山东',
        code: '100000',
      },
      {
        id: 2,
        name: '香蕉',
        class: '水果',
        price: 5,
        place: '山东',
        code: '100001',
        disabled: true
      },
      {
        id: 3,
        name: '苹果',
        class: '水果',
        price: 5,
        place: '山东',
        code: '100000',
      },
      {
        id: 4,
        name: '香蕉',
        class: '水果',
        price: 5,
        place: '山东',
        code: '100001',
      },
    ])}'
        :striped="true">
                <template #config-columns >
            <u-table-view-column-config  >
              <template #title  >
                <i-ico   name="setting"  >
                  <u-text  text="展示列1"></u-text>
                </i-ico>
              </template>
            </u-table-view-column-config>
          </template>
      <u-table-view-column field="name" thtextalign="right" type="checkbox">
        <template #title >
           选择
        </template>
      </u-table-view-column>
      <u-table-view-column field="name" thtextalign="right">
        <template #title >
            名称
        </template>
      </u-table-view-column>
        <u-table-view-column field="class" tdtextalign="right">
        <template #title >
            分类
        </template>
      </u-table-view-column>
       <u-table-view-column field="price">
        <template #title >
            价格
        </template>
      </u-table-view-column>
      <u-table-view-column field="place">
        <template #title >
            产地
        </template>
      </u-table-view-column>
      <u-table-view-column field="code">
        <template #title >
            物码
        </template>
      </u-table-view-column>
    </u-table-view>`,
  }),
};
