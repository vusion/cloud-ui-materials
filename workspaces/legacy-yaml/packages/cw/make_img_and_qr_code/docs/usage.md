# 依赖库：make_img_and_qr_code

## 库介绍
`make_img_and_qr_code` 是一套专为 Codewave 低代码平台设计的组件库。它提供了强大的图形生成能力，允许开发者在应用中轻松集成条形码生成、二维码生成以及将网页元素转换为图片的功能，适用于电子票据、物流标签、分享海报等多种业务场景。

## 组件列表
- **cw-barcode-view（条形码）**: 根据指定内容生成不同格式的条形码图形。
- **cw-mk-img-view（生成图片）**: 将组件槽位内的元素内容渲染并导出为图片。
- **cw-qrcode-view（二维码组件）**: 生成可自定义颜色、背景及中心 Logo 的二维码。

## 逻辑列表
暂无逻辑列表信息。

## API 说明

### 1. cw-barcode-view (条形码)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | string | 123456 | 生成条形码的内容 |
| lineColor | string | '#000' | 条形码的颜色 |
| height | string | 40 | 条形码的高度 |
| displayValue | boolean | true | 是否在条形码下方显示原始内容文字 |
| format | string | code128 | 条形码的编码类型（如 code128 等） |
| fontOptions | string | - | 字体样式，可选值：bold (加粗), '' (正常) |
| renderType | string | canvas | 渲染方式，可选值：canvas, svg |

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| load | 条形码加载完成时触发的事件 |

#### 方法 (Methods)
暂无组件方法。

---

### 2. cw-mk-img-view (生成图片)

#### 属性 (Attributes)
暂无组件属性。

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| preRun | 生成图片动作执行前触发的事件 |

#### 方法 (Methods)
| 名称 | 说明 |
| --- | --- |
| run | 执行生成图片的操作 |

#### 插槽 (Slots)
| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置需要被转换成图片的元素内容 |

---

### 3. cw-qrcode-view (二维码组件)

#### 属性 (Attributes)
| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | string | 生成二维码的内容 | 二维码所代表的内容字符串 |
| src | image | - | 二维码中心显示的图片（Logo）地址 |
| bgColor | string | - | 二维码的背景颜色 |
| codeColor | string | - | 二维码码点的颜色 |

#### 事件 (Events)
| 名称 | 说明 |
| --- | --- |
| load | 二维码组件加载完成时触发的事件 |

#### 方法 (Methods)
暂无组件方法。