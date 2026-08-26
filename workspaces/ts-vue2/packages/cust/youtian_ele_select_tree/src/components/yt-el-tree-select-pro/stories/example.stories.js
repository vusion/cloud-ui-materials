import Component from '../index';
import LazyDemo from '../demos/lazy.vue';
import OnlySelectLeafDemo from '../demos/only-select-leaf.vue';

const LAZY_API = '/api/lcplogics/loadDashboardElselectpro5';

async function loadDashboardElselectpro5(params = {}) {
  const { node, id } = params;
  // dogfood 逻辑入参是 id（父节点 id）；组件展开时会按 valueField 附带 id
  const parentId = id ?? node?.entity1?.id;
  const body = parentId == null ? {} : { id: String(parentId) };

  const res = await fetch(LAZY_API, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=UTF-8',
      DomainName: 'xgjcs',
      'LCAP-FRONTEND': 'pc',
      TimeZone: 'Asia/Shanghai',
      'X-Requested-With': 'XMLHttpRequest',
      'lcap-calllogic-uuid': '/dashboard/0',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`loadDashboardElselectpro5 failed: ${res.status}`);
  }

  const json = await res.json();
  return Array.isArray(json?.Data) ? json.Data : [];
}

export default {
  id: 'el-tree-select-pro-examples',
  title: '组件列表/YtElTreeSelectPro/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Default = {
  name: '基础示例',
  render: () => ({
    data() {
      return {
        data: [
          {
            entityForSel: {
              id: 1,
              name: '测试1',
              fid: 0,
            },
          },
          {
            entityForSel: {
              id: 2,
              name: '测试2',
              fid: 0,
            },
          },
          {
            entityForSel: {
              id: 3,
              name: '测试1.1',
              fid: 1,
            },
          },
          {
            entityForSel: {
              id: 4,
              name: '测试1.2',
              fid: 1,
            },
          },
          {
            entityForSel: {
              id: 5,
              name: '测试2.1',
              fid: 2,
            },
          },
        ],
      };
    },
    template: `<el-tree-select-pro
      :dataSource="data"
      parentField="entityForSel.fid"
      valueField="entityForSel.id"
      textField="entityForSel.name"
    />`,
  }),
};

export const Lazy = {
  name: '懒加载',
  render: () => LazyDemo,
};

export const LazyRealApi = {
  name: '懒加载（真实接口）',
  render: () => ({
    data() {
      return {
        value: undefined,
        load: loadDashboardElselectpro5,
      };
    },
    template: `<div>
      <div style="margin-bottom: 8px;">value: {{ value }}</div>
      <el-tree-select-pro
        :value.sync="value"
        :data-source="load"
        :lazy="true"
        has-children-field="entity1.hasChildren"
        value-field="entity1.id"
        text-field="entity1.name"
        children-field="children"
        clearable
        placeholder="请选择（真实接口懒加载）"
        style="width: 320px;"
      />
    </div>`,
  }),
};

export const OnlySelectLeaf = {
  name: '只能选中最后层级',
  render: () => OnlySelectLeafDemo,
};
