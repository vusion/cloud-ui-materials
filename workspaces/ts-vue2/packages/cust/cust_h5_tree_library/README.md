# CwdTreeSelect - H5 树形选择器组件

适用于 H5 端的树形结构选择组件，支持单选、多选、搜索、清除等功能，可灵活配置字段映射，支持自定义插槽。

## 📦 安装

```bash
npm install
```

## 🚀 快速开始

### 基础用法

```vue
<template>
  <cwd-tree-select
    v-model="selectedValue"
    :data-source="treeData"
    placeholder="请选择"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      treeData: [
        { id: '1', name: '前端开发', parentId: null },
        { id: '1-1', name: 'Vue.js', parentId: '1' },
        { id: '1-2', name: 'React', parentId: '1' },
        { id: '2', name: '后端开发', parentId: null },
        { id: '2-1', name: 'Node.js', parentId: '2' },
      ]
    };
  }
};
</script>
```

## ✨ 功能特性

- ✅ **单选/多选模式** - 支持单选和多选两种模式
- ✅ **树形结构** - 自动构建树形层级结构，支持展开/收起
- ✅ **搜索功能** - 支持关键词搜索过滤节点
- ✅ **字段映射** - 灵活配置值字段、文本字段、父节点字段
- ✅ **父子关联** - 多选模式下支持父子节点选中状态关联
- ✅ **自定义插槽** - 支持自定义头部、底部、空状态、加载状态等
- ✅ **智能定位** - 自动判断弹出方向，支持挂载到 body
- ✅ **清除功能** - 支持一键清除已选项
- ✅ **标签显示** - 多选模式下支持标签展示，可配置最多显示数量

## 📖 API 文档

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `value` | 当前选中的值（单选时为单个值，多选时为数组） | `String \| Number \| Array` | `null` |
| `dataSource` | 数据源，可以是数组、对象或返回 Promise 的函数 | `Array \| Object \| Function` | `[]` |
| `valueField` | 值字段映射函数，用于获取节点的唯一标识 | `Function` | `null` |
| `textField` | 文本字段映射函数，用于获取节点的显示文本 | `Function` | `null` |
| `parentIdField` | 父节点字段映射函数，用于获取父节点标识 | `Function` | `null` |
| `placeholder` | 输入框占位符 | `String` | `'请选择'` |
| `multiple` | 是否支持多选 | `Boolean` | `false` |
| `searchable` | 是否支持搜索 | `Boolean` | `true` |
| `clearable` | 是否显示清除按钮 | `Boolean` | `true` |
| `disabled` | 是否禁用 | `Boolean` | `false` |
| `checkRelation` | 多选模式下，父子节点选中状态是否关联 | `Boolean` | `false` |
| `height` | 组件输入框的高度（px） | `Number` | `44` |
| `dropdownHeight` | 下拉面板的最大高度（px） | `Number` | `300` |
| `appendToBody` | 是否将弹出层挂载到 body 元素下 | `Boolean` | `false` |
| `placement` | 下拉面板的弹出方向：`'auto'` \| `'bottom'` \| `'top'` | `String` | `'auto'` |
| `maxTagCount` | 多选模式下最多显示的标签数量 | `Number` | `3` |

### Methods

通过 ref 调用组件方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| `clear()` | 清空所有已选择的项 | - |
| `expandAll()` | 展开树的所有节点 | - |
| `collapseAll()` | 收起树的所有节点 | - |
| `reload()` | 重新加载数据源 | - |

**示例：**

```vue
<template>
  <cwd-tree-select ref="treeSelect" :data-source="treeData" />
  <button @click="handleExpandAll">展开所有</button>
  <button @click="handleClear">清空选择</button>
</template>

<script>
export default {
  methods: {
    handleExpandAll() {
      this.$refs.treeSelect.expandAll();
    },
    handleClear() {
      this.$refs.treeSelect.clear();
    }
  }
};
</script>
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `input` | 选中值改变时触发（用于 v-model） | `value: String \| Number \| Array` |
| `change` | 选中值改变时触发 | `{ value, values, item, items }` |
| `single-select` | 单选模式下选中值改变时触发 | `{ value, item }` |
| `multiple-select` | 多选模式下选中值改变时触发 | `{ values, items }` |
| `expand` | 节点展开状态改变时触发 | `{ expanded, node, expandedNodes }` |
| `search` | 搜索内容改变时触发 | `{ query }` |
| `clear` | 点击清除按钮时触发 | `null` |

**示例：**

```vue
<template>
  <cwd-tree-select
    v-model="selectedValue"
    :data-source="treeData"
    @change="handleChange"
    @expand="handleExpand"
    @search="handleSearch"
  />
</template>

<script>
export default {
  methods: {
    handleChange(event) {
      console.log('选中值:', event.value);
      console.log('选中项:', event.item);
    },
    handleExpand(event) {
      console.log('节点展开:', event.expanded);
      console.log('展开的节点:', event.node);
    },
    handleSearch(event) {
      console.log('搜索关键词:', event.query);
    }
  }
};
</script>
```

### Slots

| 插槽名 | 说明 |
|--------|------|
| `default` | 自定义下拉面板内容，可以完全替代默认的树结构 |
| `header` | 下拉面板头部内容 |
| `footer` | 下拉面板底部内容 |
| `empty` | 空状态内容 |
| `loading` | 加载状态内容 |

**示例：**

```vue
<template>
  <cwd-tree-select :data-source="treeData">
    <!-- 自定义头部 -->
    <template #header>
      <div style="padding: 12px; background: #f8f9fa;">
        <h4>请选择部门</h4>
      </div>
    </template>
    
    <!-- 自定义底部 -->
    <template #footer>
      <div style="padding: 12px; text-align: center;">
        <button @click="selectAll">全选</button>
        <button @click="clearAll">清空</button>
      </div>
    </template>
    
    <!-- 自定义空状态 -->
    <template #empty>
      <div style="padding: 40px; text-align: center;">
        <p>暂无数据</p>
      </div>
    </template>
  </cwd-tree-select>
</template>
```

## 📝 使用示例

### 单选模式

```vue
<template>
  <cwd-tree-select
    v-model="selectedValue"
    :data-source="treeData"
    placeholder="请选择一个选项"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      treeData: [
        { id: '1', name: '前端开发', parentId: null },
        { id: '1-1', name: 'Vue.js', parentId: '1' },
        { id: '1-2', name: 'React', parentId: '1' },
      ]
    };
  }
};
</script>
```

### 多选模式

```vue
<template>
  <cwd-tree-select
    v-model="selectedValues"
    :data-source="treeData"
    :multiple="true"
    :max-tag-count="3"
    placeholder="请选择多个选项"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedValues: [],
      treeData: [
        { id: '1', name: '前端开发', parentId: null },
        { id: '1-1', name: 'Vue.js', parentId: '1' },
        { id: '1-2', name: 'React', parentId: '1' },
      ]
    };
  }
};
</script>
```

### 父子节点关联

```vue
<template>
  <cwd-tree-select
    v-model="selectedValues"
    :data-source="treeData"
    :multiple="true"
    :check-relation="true"
    placeholder="选择父节点会自动选中子节点"
  />
</template>
```

### 异步数据加载

```vue
<template>
  <cwd-tree-select
    v-model="selectedValue"
    :data-source="loadData"
    placeholder="加载中..."
  />
</template>

<script>
export default {
  methods: {
    async loadData() {
      // 返回 Promise
      const response = await fetch('/api/tree-data');
      const result = await response.json();
      return result.data || result.list || result;
    }
  }
};
</script>
```

### 自定义字段映射

```vue
<template>
  <cwd-tree-select
    v-model="selectedValue"
    :data-source="treeData"
    :value-field="(item) => item.deptId"
    :text-field="(item) => item.deptName"
    :parent-id-field="(item) => item.parentDeptId"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedValue: null,
      treeData: [
        { deptId: '1', deptName: '技术部', parentDeptId: null },
        { deptId: '1-1', deptName: '前端组', parentDeptId: '1' },
        { deptId: '1-2', deptName: '后端组', parentDeptId: '1' },
      ]
    };
  }
};
</script>
```

### 挂载到 body

```vue
<template>
  <div style="overflow: hidden; height: 200px;">
    <cwd-tree-select
      v-model="selectedValue"
      :data-source="treeData"
      :append-to-body="true"
      placeholder="解决容器遮挡问题"
    />
  </div>
</template>
```

## ⚙️ 字段映射配置指南

组件支持自动检测常用字段名，但如果您的数据结构使用了非标准字段名，需要手动配置字段映射。

### 自动检测的字段优先级

**值字段（valueField）优先级：**
1. `deptId`
2. `id`
3. `value`
4. `key`
5. `code`
6. `uuid`
7. `itemId`
8. `_id`

**文本字段（textField）优先级：**
1. `name`
2. `title`
3. `text`
4. `label`
5. `caption`
6. `displayName`

**父节点字段（parentIdField）优先级：**
1. `parentDeptId`
2. `parentId`
3. `parent_id`
4. `pid`
5. `parentKey`

### 配置步骤（低代码平台）

1. **值字段配置**：在属性面板中找到"值字段"，选择数据项中的唯一标识字段（如 `deptId`）
2. **文本字段配置**：在属性面板中找到"文本字段"，选择数据项中的显示文本字段（如 `name`）
3. **父节点字段配置**（关键！）：在属性面板中找到"父节点字段"，选择数据项中的父节点标识字段（如 `parentDeptId`）

### 常见问题

**Q: 组件只显示平铺列表，没有树形层级结构？**

A: 请检查是否配置了 `parentIdField` 字段。如果没有配置父节点字段，组件无法构建树形结构。

**Q: 数据格式是嵌套对象，如何处理？**

A: 组件会自动提取嵌套对象中的数据。如果自动提取失败，请确保数据源返回的是数组格式，或使用函数形式的数据源进行处理。

**Q: 如何判断根节点？**

A: 根节点的父节点字段值应为 `null`、`undefined` 或空字符串 `''`。

## 🎨 样式自定义

组件使用 CSS Modules，可以通过覆盖样式类来自定义外观：

```vue
<style>
/* 自定义输入框样式 */
.cwd-tree-select :global(.input) {
  border-color: #007bff;
  border-radius: 8px;
}

/* 自定义下拉面板样式 */
.cwd-tree-select :global(.dropdown) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
```

## 📋 数据格式要求

### 标准格式

```javascript
[
  { id: '1', name: '节点1', parentId: null },
  { id: '1-1', name: '子节点1', parentId: '1' },
  { id: '1-2', name: '子节点2', parentId: '1' },
]
```

### 支持的数据源格式

1. **数组格式**：直接传入数组
   ```javascript
   dataSource: [{ id: '1', name: '节点1' }]
   ```

2. **对象格式**：包含 `list` 或 `data` 属性的对象
   ```javascript
   dataSource: { list: [{ id: '1', name: '节点1' }] }
   dataSource: { data: [{ id: '1', name: '节点1' }] }
   ```

3. **函数格式**：返回 Promise 的异步函数
   ```javascript
   dataSource: async () => {
     const res = await fetch('/api/data');
     return res.json();
   }
   ```

## 🔧 开发

```bash
# 启动开发服务器
npm start
# 或
npm run dev

# 构建
npm run build

# 运行测试
npm test
```

## 📄 License

ISC
