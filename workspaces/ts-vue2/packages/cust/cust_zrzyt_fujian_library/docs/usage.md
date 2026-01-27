# 福建自然资源厅依赖库 (cust_zrzyt_fujian_library)

福建自然资源厅依赖库，旨在提供一套符合业务规范的通用组件与逻辑，目前主要包含基于 Lodop 插件的打印增强组件。

## 组件列表
- **lodop-print (打印组件)**: 集成了 Lodop 打印控件的功能，允许用户通过配置边距、宽高和模式，实现网页内容的打印预览、直接打印、打印设计等操作。

## 逻辑列表
暂无逻辑内容。

## API 说明

### lodop-print (打印组件)

#### 属性 (Attrs)
| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| title | nasl.core.String | '打印' | 打印任务的标题 |
| mode | Enum | 'preview' | 选择打印的模式，可选值：打印预览(preview)、直接打印(direct)、选择打印机(select)、打印维护(maintain)、打印设计(design) |
| intTop | String \| Decimal \| Integer | 0 | 打印区域距离页面顶部的距离 |
| intLeft | String \| Decimal \| Integer | 0 | 打印区域距离页面左侧的距离 |
| intWidth | nasl.core.String | '100%' | 打印区域的宽度 |
| intHeight | nasl.core.String | '100%' | 打印区域的高度 |

#### 事件 (Events)
暂无组件事件。

#### 方法 (Methods)
| 方法名 | 说明 |
| :--- | :--- |
| print() | 触发打印动作，根据配置的模式（mode）执行相应的打印逻辑 |