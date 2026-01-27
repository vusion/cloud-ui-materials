# formula_design_library

## 依赖库介绍

「公式设计依赖库」是专为 Codewave 低代码平台打造的公式编辑与解析工具库。本依赖库提供了可视化公式设计的核心 UI 组件以及配套的后端/前端解析逻辑，旨在帮助开发者快速实现复杂的计算规则配置、逻辑判断设定以及公式与字符串/结果之间的相互转换，适用于财务计算、业务流程判定等多种场景。

## 包含的组件与逻辑列表

### 组件
- **计算公式组件 (calculation-formula-design-view)**：用于展示和编辑数学计算类型的公式。
- **判断公式组件 (judgement-formula-design-view)**：用于展示和编辑逻辑判断类型的公式。

### 逻辑
- **公式转化成结果 (formulaToResult)**：将公式配置信息解析并执行，返回计算或判断的结果。
- **公式转字符串 (formulaToString)**：将公式的结构化数据转换为可读性强的字符串描述。

## API 说明

### 组件：计算公式组件 (calculation-formula-design-view)

#### 属性 (Attributes)
| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 公式内容，支持双向同步 (sync) |
| customMapList | string | - | 自定义变量列表 |

#### 事件 (Events)
暂无内置事件说明。

#### 方法 (Methods)
暂无公开方法说明。

---

### 组件：判断公式组件 (judgement-formula-design-view)

#### 属性 (Attributes)
| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| value | string | - | 公式内容，支持双向同步 (sync) |

#### 事件 (Events)
暂无内置事件说明。

#### 方法 (Methods)
暂无公开方法说明。

---

### 逻辑：公式转化成结果 (formulaToResult)

- **功能说明**：接收公式内容并进行逻辑运算或数值计算，输出最终的执行结果。

### 逻辑：公式转字符串 (formulaToString)

- **功能说明**：将复杂的公式对象或内部格式转化为用户易于理解的文本字符串。