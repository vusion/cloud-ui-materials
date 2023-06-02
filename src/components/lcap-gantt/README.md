<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapGantt 甘特图

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
    - [Events](#events)

**Chart**

请在这里添加描述

## 示例
### 基本用法

```html
<lcap-gantt :data-source="[
        { id: 1, text: '项目 #1', start_date: '2023-04-20 00:00', duration: 9, progress: 0.6, open: true, head: '赵一', state: 'default' },
        { id: 2, text: '规划', start_date: '2023-04-20 00:00', duration: 3, progress: 0.4, parent: 1, head: '钱二', state: 'finished' },
        { id: 3, text: '实施', start_date: '2023-04-24 00:00', duration: 4, progress: 0.5, parent: 1, head: '孙三', state: 'unfinished' },
        { id: 4, text: '复盘', start_date: '2023-04-28 00:00', duration: 3, progress: 0.6, parent: 1, head: '李四', state: 'canceled' },
    ]" 
            :link-source="[
        { id: 2, source: 2, target: 3, type: '0' },
        { id: 3, source: 3, target: 4, type: '0' },
    ]">
</lcap-gantt>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array\<Item\> \| Function \| object \| DataSource |  |  | 甘特图的数据源，数据集对象或者返回数据集的逻辑 |
| ganttTableConfig | Array\<Item\> |  |  | 配置甘特图表格相 |
| taskView | string | `[object Object]`<br/>`[object Object]`<br/>`[object Object]`<br/>`[object Object]` | `'d'` | 切换日期视图 |
| showToday | boolean |  | `true` | 设置显示今日标记线 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @change

修改时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.param1 | string | 参数1 |
| $event.param2 | number | 参数2 |

