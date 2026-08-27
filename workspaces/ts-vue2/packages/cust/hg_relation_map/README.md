## cw-input-area-view 与 changeStrByMap 配合指引

### 1. 能力概览
- `cw-input-area-view` 是一个基于 `contentEditable` 封装的可视化输入组件，支持在文本里插入 `<wise>` 等标记节点，用于占位动态变量或操作符。
- `changeStrByMap` 是配套的字符串解析逻辑，可将组件中产出的原始 HTML 字符串按照映射表替换为真实值，并解析内联 `if(...)` 判定。
- 两者结合，可在业务编排中实现“所见即所得”的表达式编辑与最终展示/计算的解耦。

### 2. 组件使用说明
- **引用方式**：在 NASL 低代码环境或 Vue 工程中引入 `cw-input-area-view` 组件并渲染。
- **关键属性**
  - `value: string` 初始内容或外部同步内容，支持 `v-model`/`sync` 双向绑定。
  - `titleMap: Array<{ name: string; value: string }>` 或 JSON 字符串版本的映射表，用于标记项与实际值之间的对应关系。
  - `placeholder: string` 空态提示文案，组件内部通过 `:empty:before` 自动展示，避免空内容时用户无从下手。
  - `disabled: boolean` 置为 `true` 时组件进入只读态：关闭 `contentEditable`、阻断插入逻辑，并在样式上灰显提示。
- **事件回调**：组件会通过 `update:value` / `input` / `change` 事件抛出当前编辑后的原始 HTML 字符串，可直接传给后续逻辑。
- **样式约束**：`<wise>` 节点在组件内会被渲染为不可编辑的高亮标签，适合承载变量占位符；如需扩展额外类型（例如 `<operator>`），可参照现有样式。

### 3. changeStrByMap 解析逻辑
- **函数签名**：`changeStrByMap(str, titleMap)`
  - `str`：来自组件输出的字符串，内部可能包含 `<wise id="...">` 标签和 `<br>` 换行。
  - `titleMap`：与组件传入一致，支持数组或 JSON 字符串（函数内部会自动 `JSON.parse`）。
- **核心转换**
  - 将 `<wise id="xxx">占位</wise>` 替换为映射表 `xxx` 对应的 `value`。
  - 解析 `if(条件,真值,假值)` 模式，内部支持 `==`, `!=`, `>`, `<`, `>=`, `<=` 六种运算符；当条件成立返回真值，否则返回假值。
  - 统一去除 `<br>` 标签，生成易读的最终文本。
- **返回值**：转换后的纯文本/字符串结果，可直接用于展示或后续计算。

### 4. 组合示例
```typescript
const titleMap = [
  { name: 'wise_user', value: '张三' },
  { name: 'wise_city', value: '杭州' },
];

// 组件内编辑得到的字符串（简化示例）
const raw = `<wise id="wise_user">用户</wise>来自<wise id="wise_city">城市</wise>，if(1>0,'欢迎','拒绝')`;

const result = changeStrByMap(raw, titleMap);
// result => "张三来自杭州，欢迎"
```
在页面中绑定：
1. 将 `titleMap` 作为属性传入 `cw-input-area-view`，保证下拉/插入的标记与映射一致。
2. 监听组件的 `change` 或 `update:value`，获取最新的 `raw` 字符串。
3. 调用 `changeStrByMap(raw, titleMap)` 获得最终展示文本，并按需存储或发往后端。

### 5. 最佳实践 & 注意事项
- 映射表中的 `name` 应与 `<wise id="xxx">` 中的 `id` 完全一致，避免解析失败。
- 若需要在条件表达式中传递字符串常量，请保持引号，例如 `if(status=='enable','启用','停用')`。
- `titleMap` 若以字符串形式存储，需确保是合法的 JSON；解析失败会引发异常。
- `changeStrByMap` 会对 `null` / `NULL` 字符串特殊处理，并允许数字字符串自动转换为数值进行比较。
- 建议在提交前对组件输出与解析结果做单元测试，确保复杂表达式行为符合预期。

