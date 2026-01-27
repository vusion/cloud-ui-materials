# lucky_wheel 抽奖大转盘

本依赖库提供与「抽奖大转盘」相关的组件与逻辑，可在 Codewave 低代码平台中引用。该库旨在帮助开发者快速实现具有高度自定义外观和交互能力的转盘抽奖功能。

## 包含组件
- **wheel (抽奖大转盘)**: 提供转盘视觉展示、点击交互及转动动画效果的核心组件。

## 包含逻辑
- 暂无。本版本目前通过组件属性与事件完成核心交互。

## API 说明

### wheel (抽奖大转盘)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| prizes | array | [] | 奖品数据源，只支持变量。包含文字、图片、背景等配置。 |
| buttons | array | [] | 最中心的抽奖按钮配置，只支持变量。可设置半径、背景、图片及文字。 |
| borderColor | string | '' | 转盘最外圈的颜色。 |
| borderPadding | number | 0 | 转盘最外圈颜色的厚度。 |
| borderImg | image | null | 转盘外圈的背景图。 |
| borderImgPadding | number | 0 | 转盘外圈背景图的厚度。 |
| borderImgWidth | string | 100% | 转盘外圈背景图的宽度。 |
| borderImgHeight | string | 100% | 转盘外圈背景图的高度。 |
| backgroundImg | image | null | 奖品区背景图。 |
| backgroundImgWidth | string | 100% | 奖品区背景图宽度。 |
| backgroundImgHeight | string | 100% | 奖品区背景图高度。 |
| gutter | number | 10 | 奖品块之间的间隙。 |
| readonly | boolean | false | 状态属性：只读。正常显示，但禁止点击交互。 |

#### 事件 (Events)
| 名称 | 标题 | 说明 | 参数 |
| :--- | :--- | :--- | :--- |
| start | start | 抽奖按钮点击时触发，通常在此处请求后端接口获取中奖结果。 | - |
| end | end | 抽奖转动结束时触发。 | event (string): 携带的相关参数 |

#### 方法 (Methods)
| 名称 | 标题 | 说明 | 参数 |
| :--- | :--- | :--- | :--- |
| stop | stop | 获取到后端抽奖结果后调用，使转盘从高速转动状态缓慢停止。 | index (number): 传入被抽中奖品的索引 |