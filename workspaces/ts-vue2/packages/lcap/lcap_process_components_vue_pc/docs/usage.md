# lcap_process_components_vue_pc 流程2.0Vue前端组件依赖库（PC端）

## 依赖库介绍
该依赖库是专为流程 2.0 设计的 Vue 前端组件集合（PC端），旨在提供一套标准化的流程业务组件。它涵盖了从流程发起、审批、任务管理到流程轨迹追踪的全链路功能，帮助开发者在 PC 端应用中快速集成高性能、低耦合的流程管理能力。

## 组件列表
- **fl-process-button (流程按钮)**: 提供流程相关的操作按钮容器，支持自定义操作内容的嵌入。
- **fl-process-form (流程表单)**: 流程业务表单容器，用于展示或输入与当前流程节点相关的业务数据。
- **fl-process-graph (流程图)**: 可视化流程图组件，支持展示流程定义轨迹及当前执行状态。
- **fl-process-info (流程信息)**: 流程基本信息的展示组件，包含流程标题、发起信息等内容。
- **fl-process-my-process (我的流程)**: 个人流程中心组件，用于管理和查看用户发起的各类流程。
- **fl-process-record (流程记录)**: 流程审批历史记录组件，提供清晰的审批路径追踪。
- **fl-process-task-box (任务箱)**: 统一的任务管理容器，集成待办、已办等任务视图。

## API 说明

### fl-process-button 流程按钮
#### 属性 (Attrs)
暂无属性配置，该组件主要通过插槽进行内容扩展。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于插入自定义流程操作按钮或其他内容。

### fl-process-form 流程表单
#### 属性 (Attrs)
暂无属性配置。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于嵌入具体的业务表单组件或内容。

### fl-process-graph 流程图
#### 属性 (Attrs)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| dataSource | nasl.collection.List<T> | - | 数据源。展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。 |
| dataSchema | nasl.collection.List<T> | - | 数据类型。数据源返回的数据结构的类型，由数据源推导得到，无需手动填写。 |
| initialZoom | nasl.core.String | - | 初始缩放比。控制流程图加载时的初始显示比例。 |
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| :--- | :--- | :--- |
| reload | - | 清除缓存并重新加载流程图数据。 |

### fl-process-info 流程信息
#### 属性 (Attrs)
暂无属性配置。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于插入自定义流程摘要或信息内容。

### fl-process-my-process 我的流程
#### 属性 (Attrs)
暂无属性配置。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于自定义流程列表视图的内容。

### fl-process-record 流程记录
#### 属性 (Attrs)
暂无属性配置。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于自定义审批记录的展示样式。

### fl-process-task-box 任务箱
#### 属性 (Attrs)
暂无属性配置。
#### 事件 (Events)
暂无事件监听配置。
#### 方法 (Methods)
暂无可用实例方法。
#### 插槽 (Slots)
- **slotDefault**: 默认插槽。用于在任务箱内插入自定义视图或控件。