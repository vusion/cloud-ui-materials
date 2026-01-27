# h5 步骤条扩展 (cw_ex_h_5_steps)

## 库介绍
cw_ex_h_5_steps 是一款专为 H5 环境设计的步骤条扩展组件库。它提供了增强的步骤条展示与控制功能，用于清晰地展示操作流程中的各个环节，帮助用户了解当前进度及其在整体流程中的位置。该组件库支持数据驱动、自定义图标以及多种交互状态，适用于各类流程引导场景。

## 包含组件
- **ex-van-steps（步骤条）**：步骤条的容器组件，负责管理整体步骤状态、数据源以及流程控制逻辑。
- **ex-van-step（步骤条项）**：步骤条中的具体环节组件，用于定义单个步骤的状态、图标及内容。

## 组件 API 说明

### ex-van-steps (步骤条)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | Integer | 0 | 当前步骤，从 0 开始计数，支持双向绑定 |
| dataSource | List<T> \| { total: Integer; list: List<T> } | - | 展示数据的输入源，可设置为数据集对象或返回数据集的逻辑 |
| dataSchema | T | - | 集合类型每一元素的数据类型 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 设置步骤条方向：横向或垂直 |
| readonly | Boolean | false | 状态属性，正常显示但禁止选择/输入 |
| disabled | Boolean | false | 状态属性，置灰显示且禁止任何交互 |
| lastFinish | Boolean | true | 终点激活情况下是否需要转为完成状态 |
| isFirst | Boolean | - | 逻辑属性，标记是否为第一步 |
| isLast | Boolean | - | 逻辑属性，标记是否为最后一步 |
| data | List<T> | - | 步骤条关联的数据列表 |

#### 事件 (Events)
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| onChangestep | (event: Integer) => void | 切换步骤时触发 |

#### 方法 (Methods)
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| prev | - | 切换到上一步 |
| next | - | 切换到下一步 |
| reload | - | 重新加载数据 |

---

### ex-van-step (步骤条项)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| status | 'wait' \| 'process' \| 'finish' \| 'error' | - | 设置步骤条的状态：等待中、进行中、已完成、错误 |
| icon | String | - | 自定义步骤的图标 |
| readonly | Boolean | false | 状态属性，正常显示但禁止交互 |
| disabled | Boolean | false | 状态属性，置灰显示且禁止交互 |

#### 事件 (Events)
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| onClicktitle | (event: Integer) => void | 点击步骤标题时触发 |
| onClickicon | (event: Integer) => void | 点击步骤图标时触发 |

#### 方法 (Methods)
暂无内置方法。