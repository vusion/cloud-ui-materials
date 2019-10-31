# UNumberPortlet 数字窗格

这里是数字窗格的基本描述。

## 示例
### 基本用法

``` html
<u-number-portlet title="服务数" :value="20"></u-number-portlet>
```

### 单位

``` html
<u-number-portlet title="公有云" :value="20" unit="%"></u-number-portlet>
```

### 对齐

``` html
<u-number-portlet title="公有云" :value="20" unit="%" alignment="center"
    style="width: 300px"></u-number-portlet>
```

### 布局

``` vue
<template>
<u-grid-layout>
    <u-grid-layout-row :repeat="3">
        <u-grid-layout-column>
            <u-number-portlet title="服务数" :value="20"></u-number-portlet>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-number-portlet title="实例数" :value="30"></u-number-portlet>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-number-portlet title="请求数" :value="20"></u-number-portlet>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
</template>
```

### 颜色

``` vue
<template>
<u-grid-layout>
    <u-grid-layout-row :repeat="4">
        <u-grid-layout-column>
            <u-number-portlet title="服务数" :value="20" color="primary"></u-number-portlet>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-number-portlet title="实例数" :value="30" color="success"></u-number-portlet>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-number-portlet title="请求数" :value="20" color="warning"></u-number-portlet>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-number-portlet title="错误数" :value="20" color="error"></u-number-portlet>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
</template>
```

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| value | Number |  | 数值 |
| title | String | | 标题 |
| alignment | String | `'left'` | `'left'``'center'``'right'` |
| unit | String | | 单位 |
| color | String | | 颜色 |
