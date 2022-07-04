<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapCarousel 文字滚动条

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)
    - [Methods](#methods)

**InfoDisplay**

文字滚动条

## 示例
### 基本用法

``` vue
<template>
    <lcap-carousel
        :data-source="dataList"
        :speed="speed"
        :hoverStop="hoverStop"
        :gap="gap"
        @click="onClick"
    ></lcap-carousel>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      speed: 30,
      hoverStop: true,
      gap: 30,
    }
  },
  mounted() {
    this.dataList = ["第1条数据xxxxxxxxxxx",
      "第2条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第3条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第4条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第5条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第6条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第7条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第8条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第9条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第10条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第11条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "第12条数据xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ];
  },
  methods: {
    onClick(item, index) {
      console.log(item, index);
    },
  }
}
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data-source | Array |  | `[]` | 文本列表 |
| speed | Number |  | `30` | 滚动速度 |
| hoverStop | Boolean |  | `false` | 鼠标悬浮时停止滚动 |
| gap | Number |  | `20` | 间隔,单位px |

### Events

#### @click

点击时触发的事件

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | any | 当前值 |

Methods

#### reload()

清除缓存，重新加载

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

