# 抽奖依赖库 (lottery_draw_library)

本依赖库（版本 0.1.3）提供与抽奖相关的组件与逻辑，旨在为 Codewave 低代码平台提供高度可配置的抽奖交互能力。通过本库，开发者可以快速集成具有视觉吸引力且逻辑严密的抽奖功能。

## 包含的组件

- **九宫格抽奖 (cw-squared-draw-view)**：提供标准的九宫格布局抽奖界面，支持自定义奖品图片、名称、中奖概率以及整体视觉风格。

## 包含的逻辑

- 暂无逻辑列表：当前版本主要通过组件属性和事件进行交互控制。

## API 说明

### 九宫格抽奖 (cw-squared-draw-view)

用于实现经典的九宫格转盘抽奖功能，支持自定义奖品配置及后端干预模式。

#### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| width | string | 375px | 设置九宫格宽度 |
| height | string | 375px | 设置九宫格高度 |
| return_prize | string | "" | 后端返还的奖品名称，设置后各自的抽奖概率无效 |
| background_color | string | "" | 设置背景颜色（例：#FFFFFF） |
| start_img | image | "" | 设置抽奖开始按钮图片 |
| font_color | string | "" | 设置所有奖品文字的图片颜色 |
| font_top_padding | string | 60px | 设置奖品文字距离顶部的距离（px） |
| font_size | string | 22px | 设置奖品文字字体大小（px） |
| block1_img | image | "" | 设置格子1奖品图片 |
| block1_name | string | "奖品1" | 设置格子1的奖品名字 |
| block1_chance | number | 10 | 设置奖品1的中奖概率 |
| block2_img | image | "" | 设置格子2奖品图片 |
| block2_name | string | "奖品2" | 设置格子2的奖品名字 |
| block2_chance | number | 10 | 设置奖品2的中奖概率 |
| block3_img | image | "" | 设置格子3奖品图片 |
| block3_name | string | "奖品3" | 设置格子3的奖品名字 |
| block3_chance | number | 10 | 设置奖品3的中奖概率 |
| block4_img | image | "" | 设置格子4奖品图片 |
| block4_name | string | "奖品4" | 设置格子4的奖品名字 |
| block4_chance | number | 10 | 设置奖品4的概率 |
| block5_img | image | "" | 设置格子5奖品图片 |
| block5_name | string | "奖品5" | 设置格子5的奖品名字 |
| block5_chance | number | 10 | 设置奖品5的中奖概率 |
| block6_img | image | "" | 设置格子6奖品图片 |
| block6_name | string | "奖品6" | 设置格子6的奖品名字 |
| block6_chance | number | 10 | 设置奖品6的中奖概率 |
| block7_img | image | "" | 设置格子7奖品图片 |
| block7_name | string | "奖品7" | 设置格子7的奖品名字 |
| block7_chance | number | 10 | 设置奖品7的中奖概率 |
| block8_img | image | "" | 设置格子8奖品图片 |
| block8_name | string | "奖品8" | 设置格子8的奖品名字 |
| block8_chance | number | 10 | 设置奖品8的中奖概率 |

#### 事件 (Events)

| 名称 | 说明 |
| :--- | :--- |
| start | 抽奖开始时触发，可用于处理扣除积分等逻辑 |
| end | 抽奖结束时触发，可用于展示中奖结果弹窗 |

#### 方法 (Methods)

暂无公开方法。该组件主要通过属性驱动和事件反馈进行工作。