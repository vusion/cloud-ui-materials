<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapGantt 甘特图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**Chart**

请在这里添加描述

## 示例
### 基本用法

```html
<lcap-gantt :data-source="[
        { id: 1, text1: '项目 #1', start: '2023-04-20 00:00', duration: 9, progress: 0.6, open: true, head: '赵一', state: 'default', color: '#5692f0', iconUrl: '' },
        { id: 2, text1: '规划', start: '2023-04-20 00:00', duration: 3, progress: 0.8, parent: 1, head: '钱二', state: 'finished', color: '#5692f0', iconUrl: 'http://ceph.lcap.hadev.163yun.com/lowcode-static/user/defaulttenant/1686301210678_%E5%8A%A0%E6%B2%B9.jpg' },
        { id: 3, text1: '实施', start: '2023-04-24 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished', color: '#84bd54' },
        { id: 4, text1: '复盘', start: '2023-04-28 00:00', duration: 3, progress: 0.1, parent: 1, head: '李四', state: 'canceled', color: '#da645d' },
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
            skins="default"
            style="--gantt-table-header-font-size:12px;
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
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 甘特图的数据源，数据集对象或者返回数据集的逻辑 |
| data-schema | schema |  |  | 集合类型每一元素的数据类型 |
| text-field | string |  | `''` | 设置泳道图文本字段 |
| start-field | string |  | `''` | 设置泳道图开始日期字段 |
| duration-field | string |  | `''` | 设置泳道图持续时间字段 |
| progress-field | string |  | `''` | 设置泳道图进度字段 |
| id-field | string |  | `''` | 设置泳道图id字段 |
| parent-field | string |  | `''` | 设置泳道图父级字段 |
| color-field | string |  | `''` | 设置泳道图数据颜色字段 |
| icon-field | string |  | `''` | 设置数据列表图标字段，仅支持png,jpg类型的图片链接 |
| ganttTableConfig | Array\<Item\> |  |  | 配置甘特图表格相 |
| taskView | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'d'` | 切换日期视图 |
| showToday | boolean |  | `true` | 设置显示今日标记线 |
| skins | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'default'` | 设置甘特图皮肤 |

### Events

#### @taskClick

任务点击时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | Object | 任务详情 |

#### @scaleClick

刻度点击时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | string | 点击时间 |

Methods

#### load()

重新加载甘特图

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### changeToday()

定位到今日标记线

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

