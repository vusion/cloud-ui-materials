# cw_image_library 图片能力依赖库

## 依赖库介绍

cw_image_library 是一个专为 Codewave 低代码平台设计的图片能力增强库。本库旨在提供更灵活、更高性能的图片展示方案，支持响应式加载、渐进式预览以及丰富的布局控制能力，帮助开发者优化应用的视觉体验和加载性能。

## 包含的组件

### 组件
- **cw-reponsive-image (响应式图片)**: 提供渐进式加载功能的图片组件，支持设置缩略图尺寸、桶存储类型及多种填充对齐方式。

## 包含的逻辑

暂无公开逻辑。

## API 说明

### cw-reponsive-image (响应式图片)

#### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| normalSrc | string | 请在这里编写代码 | 原始图片链接 |
| bucket | string | nos | 桶类型，可选值为 nos (网易云存储), obs (华为云存储) |
| thumbnailWidth | number | 200 | 渐进式图片加载时的缩略图宽度 |
| thumbnailHeight | number | 200 | 渐进式图片加载时的缩略图高度 |
| alt | string | 请在这里编写代码 | 图片加载失败时显示的文案 |
| fit | string | contain | 填充方式，可选值：contain (适应)、scale-down (适应-小图原尺寸)、none (原尺寸)、fill (拉伸)、cover (填充) |
| horizontalCenter | string | center | 水平对齐方式，可选值：left (左对齐)、center (居中对齐)、right (右对齐) |
| verticalCenter | string | center | 垂直对齐方式，可选值：top (顶部对齐)、center (居中对齐)、bottom (底部对齐) |

#### 事件 (Events)

| 名称 | 说明 |
| --- | --- |
| click | 在元素上按下并释放任意鼠标按钮时触发 |
| mouseenter | 鼠标移入元素时触发 |
| mouseleave | 鼠标移出元素时触发 |

#### 方法 (Methods)

暂无公开方法。