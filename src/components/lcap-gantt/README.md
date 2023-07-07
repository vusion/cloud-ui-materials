<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapGantt 甘特图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Methods](#methods)

**Chart**

请在这里添加描述

## 示例
### 基本用法

```html
<lcap-gantt :data-source="[
        { id: 1, text1: '项目 #1', start: '2023-04-20 00:00', end: '2023-04-24 00:00', duration: 4, progress: 0.6, open: true, head: '赵一', state: 'default', color: '#5692f0', iconUrl: '' },
        { id: 2, text1: '规划', start: '2023-04-20 00:00', end: '2023-04-24 00:00', duration: 3, progress: 0.8, parent: 1, head: '钱二', state: 'finished', color: '#5692f0', iconUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d177d0536094224a3132392c8a83c0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?' },
        { id: 3, text1: '实施', start: '2023-04-24 00:00', end: '2023-04-28 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished', color: '#84bd54' },
        { id: 4, text1: '复盘', start: '2023-04-28 00:00', end: '2023-05-3 00:00', duration: 3, progress: 0.1, parent: 1, head: '李四', state: 'canceled', color: '#da645d' },
    ]"
            :ganttTableConfig="[
            {'labelField':'项目名称','nameField':'text1', showTooltip: true, width: '100'},
            {'labelField':'负责人','nameField':'head', showTooltip: true, width: '100'},
            {'labelField':'开始日期','nameField':'start', showTooltip: true, width: '150'}
            ]"
            parent-field="parent"
            start-field="start"
            duration-field="duration"
            progress-field="progress"
            text-field="text1"
            color-field="color"
            id-field="id"
            icon-field="iconUrl"
            :jumpWeekend="false"
            :showFunctionBar="true"
            skins="default"
            ganttEndDate="2023-07-19 20:07:41"
            style="--gantt-table-header-font-size:15px;
                --gantt-table-scale-color: green;
                --gantt-table-scale-font-size: 12px;
                --gantt-table-header-font-color:red; 
                --gantt-table-header-text-align: center;
                --gantt-table-background-color-striped: #f5f5f5;
               --gantt-table-background-color-hover: #f5f5f5;
               --gantt-table-cell-color: #000;
                --gantt-table-header-font-weight: bold;
                
"
>
</lcap-gantt>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| ganttTableConfig | Array\<Item\> |  |  | 配置甘特图左侧表格 |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 甘特图的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema |  |  | 集合类型每一元素的数据类型 |
| text-field | string |  | `''` | 设置泳道图文本字段，用于显示泳道图上的文本 |
| start-field | string |  | `''` | 设置泳道图开始日期字段 |
| end-field | string |  | `''` | 设置泳道图结束日期字段，和持续时间字段二选一，同时设置以结束日期字段为准 |
| duration-field | string |  | `''` | 设置泳道图持续时间字段，和结束日期字段二选一，同时设置以结束日期字段为准 |
| progress-field | string |  | `''` | 设置泳道图进度字段，以小数形式计算，如0.5表示50% |
| id-field | string |  | `''` | 设置泳道图值字段，用于设置泳道图的层级关系，父级字段值指向值字段具体值以构成层级关系 |
| parent-field | string |  | `''` | 设置泳道图父级字段，用于设置泳道图的层级关系，父级字段值指向值字段具体值以构成层级关系 |
| color-field | string |  | `''` | 设置泳道图数据颜色字段，支持hex、英文名称格式 |
| icon-field | string |  | `''` | 设置数据列表图标字段，仅会在文本字段上生效，支持配置png,jpg格式的图片链接 |
| showToday | boolean |  | `true` | 设置是否显示今日标记线 |
| jumpWeekend | boolean |  | `false` | 设置是否跳过周末，仅适用于配置持续时间字段时生效 |
| showFunctionBar | boolean |  | `false` | 设置是否显示默认功能栏 |
| taskView | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'day'` | 切换日期视图 |
| ganttStartDate | string |  | `''` | 设置甘特图开始显示的日期 |
| ganttEndDate | string |  | `''` | 设置甘特图结束显示的日期 |

Methods

#### load()

重新加载甘特图

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### changeToday()

立刻定位到今日标记线

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

