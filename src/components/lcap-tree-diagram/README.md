<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapTreeDiagram 树状结构图

- [LcapTreeDiagram 树状结构图](#lcaptreediagram-树状结构图)
  - [示例](#示例)
    - [基本用法](#基本用法)
  - [API](#api)
    - [Props/Attrs](#propsattrs)
    - [Slots](#slots)
      - [(default)](#default)
    - [Events](#events)
      - [@change](#change)
      - [@click](#click)
      - [@mouseover](#mouseover)
      - [@mouseout](#mouseout)

**Other**

请在这里添加描述

## 示例
### 基本用法

``` html
<lcap-tree-diagram></lcap-tree-diagram>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | number |  | `0` | 需要传入的值 |
| label | string |  | 文本 | 显示文本字段 |

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

#### @click

点击时触发

#### @mouseover

鼠标移入节点

#### @mouseout

鼠标移出节点

