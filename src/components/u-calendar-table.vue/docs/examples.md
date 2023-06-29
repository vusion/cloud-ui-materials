### 基本用法

```vue
<template>
  <u-calendar-table
    first-title="姓名"
    first-field="${parent.name} (${parent.age}) [${parent.home}]"
    :data-source-parent="dateSourceParent"
    :data-source="dateSource"
    parent-key="parent.name"
    child-key="child.name"
    start-key="child.startTime"
    first-width="160"
    width="88"
  >
    <template #default="current">
      <p v-if="current.item.child && current.item.child.count">
        Count: {{ current.item.child.count }}
      </p>
      <p v-if="current.item.child && current.item.child.name">
        Name: {{ current.item.child.name }}
      </p>
    </template>
  </u-calendar-table>
</template>
<script>
export default {
  data() {
    return {
      dateSourceParent: {
        content: [
          { parent: { name: "张三", age: 17, home: "浙江" } },
          { parent: { name: "李四", age: 18, home: "浙江" } },
          { parent: { name: "王五", age: 19, home: "浙江" } },
          { parent: { name: "阿大", age: 20, home: "浙江" } },
          { parent: { name: "阿二", age: 21, home: "浙江" } },
        ],
        number: 1,
        size: 20,
        totalElements: 5,
        totalPages: 1,
      },
      dateSource: {
        content: [
          { child: { name: "张三", count: 3, startTime: "2021-10-14" } },
          { child: { name: "李四", count: 4, startTime: "2021-10-01" } },
          { child: { name: "王五", count: 5, startTime: "2021-10-02" } },
          { child: { name: "阿大", count: 1, startTime: "2021-10-03" } },
          { child: { name: "阿二", count: 2, startTime: "2021-10-04" } },
          { child: { name: "张三", count: 3, startTime: "2021-10-01" } },
          { child: { name: "李四", count: 4, startTime: "2021-10-04" } },
          { child: { name: "张三", count: 8, startTime: "2021-10-13" } },
          { child: { name: "王五", count: 5, startTime: "2021-10-01" } },
          { child: { name: "张三", count: 9, startTime: "2021-10-12" } },
          { child: { name: "李四", count: 4, startTime: "2021-10-05" } },
        ],
        number: 1,
        size: 20,
        totalElements: 11,
        totalPages: 1,
      },
    };
  },
  methods: {},
};
</script>
```
