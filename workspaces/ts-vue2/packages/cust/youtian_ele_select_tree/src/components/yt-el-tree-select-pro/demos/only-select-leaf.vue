<template>
  <div>
    <div style="margin-bottom: 8px;">
      <div>value: {{ value }}</div>
      <label>
        <input v-model="onlySelectLeaf" type="checkbox" />
        只能选中最后层级
      </label>
      <label style="margin-left: 12px;">
        <input v-model="expandOnClickNode" type="checkbox" />
        点击父层级名称展开/收起
      </label>
    </div>
    <yt-el-tree-select-pro
      :value.sync="value"
      :data-source="items"
      :only-select-leaf="onlySelectLeaf"
      :expand-on-click-node="expandOnClickNode"
      value-field="value"
      text-field="label"
      children-field="children"
      clearable
      placeholder="请选择"
      style="width: 320px;"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
      onlySelectLeaf: true,
      expandOnClickNode: true,
      items: [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                { value: '1.1.1', label: '1.1.1' },
                { value: '1.1.2', label: '1.1.2' },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                { value: '1.2.1', label: '1.2.1' },
                { value: '1.2.2', label: '1.2.2' },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            { value: '2.1', label: '2.1' },
            { value: '2.2', label: '2.2' },
          ],
        },
      ],
    };
  },
};
</script>
