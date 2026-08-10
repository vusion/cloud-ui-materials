<template>
  <div>
    <div style="margin-bottom: 8px;">
      value: {{ value }}
    </div>
    <yt-el-tree-select-pro
      :value.sync="value"
      :data-source="load"
      :lazy="true"
      has-children-field="hasChildren"
      value-field="value"
      text-field="label"
      children-field="children"
      clearable
      placeholder="请选择（懒加载）"
      style="width: 320px;"
    />
  </div>
</template>

<script>
const mockRequest = (data, timeout = 300) => new Promise((resolve) => {
  setTimeout(() => resolve(data), timeout);
});

export default {
  data() {
    return {
      value: undefined,
    };
  },
  methods: {
    async load(params = {}) {
      const { node } = params;

      // 根节点
      if (!node) {
        return mockRequest([
          { value: '1', label: '部门 A', hasChildren: true },
          { value: '2', label: '部门 B', hasChildren: true },
          { value: '3', label: '叶子节点 C', hasChildren: false },
        ]);
      }

      // 一级子节点
      if (node.value === '1') {
        return mockRequest([
          { value: '1.1', label: '小组 A-1', hasChildren: true },
          { value: '1.2', label: '小组 A-2', hasChildren: false },
        ]);
      }

      if (node.value === '2') {
        return mockRequest([
          { value: '2.1', label: '小组 B-1', hasChildren: false },
          { value: '2.2', label: '小组 B-2', hasChildren: false },
        ]);
      }

      // 二级子节点
      if (node.value === '1.1') {
        return mockRequest([
          { value: '1.1.1', label: '成员 A-1-1', hasChildren: false },
          { value: '1.1.2', label: '成员 A-1-2', hasChildren: false },
        ]);
      }

      return mockRequest([]);
    },
  },
};
</script>
