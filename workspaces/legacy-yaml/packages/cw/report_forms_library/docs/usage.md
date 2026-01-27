# report_forms_library 报表依赖库

## 简介

本依赖库提供与「报表依赖库」相关的组件与逻辑，旨在为用户提供便捷的有数报表集成能力，可在 Codewave 低代码平台中直接引用，实现报表数据的可视化展示与配置管理。

## 包含组件

- **cw-you-data-view (有数报表)**：用于在页面中嵌入网易有数报表，支持多种缩放模式、导航样式及工具栏自定义配置。

## 包含逻辑

- 暂无逻辑：本版本暂未包含独立的逻辑函数。

## API 说明

### cw-you-data-view (有数报表)

#### 属性 (Attributes)

| 名称 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| src | string | '' | 报表地址 |
| scale | string | '100' | 有数缩放配置。可选值：'100' (缩放100%)、'width' (自适应宽度)、'screen' (自适应窗口) |
| bottomBarPos | string | 'bottom' | 有数底部栏位置配置。可选值：'bottom' (底部栏放在底部)、'top' (底部栏放在顶部) |
| hideProgressBar | boolean | true | 有数顶部进度条隐藏配置 |
| hidePageBar | boolean | true | 有数底部工具栏隐藏配置 |
| hideScaleBar | boolean | true | 有数缩放栏隐藏配置 |
| hideTitle | boolean | true | 有数顶部标题栏隐藏配置 |
| hidePrivate | boolean | true | 有数私有文件夹隐藏配置 |
| hidePublic | boolean | true | 有数公共文件夹隐藏配置 |
| side | boolean | false | 有数侧边栏配置 |
| toolbar | array | ["export", "refresh", "print"] | 有数功能键配置。可选子项：'export' (导出)、'refresh' (刷新)、'print' (打印) |
| mode | string | 'normal' | 有数底部导航条显示方式配置。可选值：'simple' (箭头切换)、'normal' (tab 页切换) |

#### 事件 (Events)

| 名称 | 说明 |
| :--- | :--- |
| load | 报表内容加载完成后触发 |

#### 方法 (Methods)

暂无公开方法：该组件目前未提供外部可调用的方法。