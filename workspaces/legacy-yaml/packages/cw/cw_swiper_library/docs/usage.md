# cw_swiper_library 依赖库使用文档

## 依赖库介绍

本依赖库提供与「轮播图依赖库」相关的组件与逻辑，可在 Codewave 低代码平台中引用。

## 包含的组件和逻辑列表

### 组件

- **basic-swiper**：基础轮播图
- **cover-flow**：立体轮播图
- **fade-swiper**：渐入渐出轮播图
- **gallery**：画廊
- **zoom-swiper**：zoom轮播图

## 组件与逻辑功能说明

### basic-swiper

基础轮播图。可在页面中通过该组件实现对应展示或交互。

### cover-flow

立体轮播图。可在页面中通过该组件实现对应展示或交互。

### fade-swiper

渐入渐出轮播图。可在页面中通过该组件实现对应展示或交互。

### gallery

画廊。可在页面中通过该组件实现对应展示或交互。

### zoom-swiper

zoom轮播图。可在页面中通过该组件实现对应展示或交互。

## API 说明

### basic-swiper

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data-source | Array<Item> \| Function \| object \| DataSource | [{}, {}, {}] | 数据源 |
| data-schema | schema | - | 数据类型 |
| spaceBetween | number | 0 | spaceBetween |
| slidesPerView | number | 5 | 画布展示图片数量 |
| delay | number | 2500 | autoplay延迟时间 |
| duration | number | 300 | 动画持续时间 |
| direction | string | horizontal | 垂直 |
| height | number | 300 | 高度 |
| effect | string | ease-in-out | 步幅移出 |
| prevStyle | string | - | 导航左按钮样式 |
| nextStyle | string | - | 导航右按钮样式 |

#### 事件

- **onSwiperItemClick**（点击轮播图item）：点击轮播图item
  - `item`（string）：改变的值

### cover-flow

#### 原始 API 定义

```yaml
- name: cover-flow
  title: 立体轮播图
  type: pc
  belong: component
  labels: [Runtime]
  attrs:
    - name: imgWidth
      type: number
      default: 200
      description: 每张图片的宽度
      title: 每张图片的宽度
    - name: imgHeight
      type: number
      default: 200
      description: 每张图片的高度
      title: 每张图片的高度
    - name: dataSource
      title: 数据源
      type: array
      default: ''
      description: '用于展示coverflow的数据源，形如Array<{text: string, url: string}>'

```

请以上述定义为准，在平台内查看具体属性、事件、方法说明。

### fade-swiper

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | array | - | 数据源 |
| delay | number | 3000 | 延迟时间 |
| duration | number | 300 | 动画持续时间 |
| height | number | 300 | 高度 |

#### 事件

- **onSwiperChange**（轮播图变化）：轮播图变化时
  - `$event`（number）：当前激活的index

#### 方法

- **slideNext**

### gallery

#### 原始 API 定义

```yaml
- name: gallery
  title: 画廊
  type: pc
  belong: component
  labels: [Runtime]
  attrs:
    - name: grid
      type: number
      default: 2
      description: 行数
      title: 行数
    - name: spaceBetween
      type: number
      default: 0
      description: 图片间距
      title: 图片间距
    - name: imgWidth
      type: number
      default: 240
      description: 图片宽度
      title: 图片宽度
    - name: imgHeight
      type: number
      default: 196
      description: 图片高度
      title: 图片高度
    - name: slidesPerView
      type: number
      default: 5
      description: 画布展示图片数量
      title: 画布展示图片数量
    - name: delay
      type: number
      default: 2500
      description: autoplay延迟时间
      title: autoplay延迟时间
    - name: dataSource
      title: 数据源
      type: array
      default: ''
      description: '用于展示gallery的数据源，形如Array<{link: string, url: string}>'

```

请以上述定义为准，在平台内查看具体属性、事件、方法说明。

### zoom-swiper

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | array | - | 数据源 |
| imgWidth | number | 240 | 图片宽度 |
| imgHeight | number | 196 | 图片高度 |
| spaceBetween | number | 0 | spaceBetween |
| delay | number | 3000 | 延迟时间 |
| duration | number | 300 | 动画持续时间 |
| height | number | 300 | 高度 |
| scale | number | 0.8 | 缩小比例 |
| effect | string | ease-in-out | 步幅移出 |

#### 事件

- **onSwiperItemClick**（点击轮播图item）：点击轮播图item
  - `item`（string）：改变的值

