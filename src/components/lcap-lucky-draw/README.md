<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapLuckyDraw 九宫格抽奖

- [示例](#示例)
    - [基本用法](#基本用法)
- [API]()
    - [Props/Attrs](#propsattrs)
    - [Events](#events)

**Other**

九宫格抽奖组价

## 示例
### 基本用法

``` html
<lcap-lucky-draw
    block1_name=""
    block3_name="奖品3"
    block4_name="奖品4"
    block5_name="奖"
    block6_name="奖品6"
    block7_name="奖品7"
    block8_name="奖品8"
>
</lcap-lucky-draw>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| width | string |  | `'375px'` | 设置九宫格宽度 |
| height | string |  | `'375px'` | 设置九宫格高度 |
| start_img | image |  | `''` | 设置抽奖开始按钮图片 |
| block1_img | image |  | `''` | 设置格子1奖品图片 |
| block1_name | string |  | `'奖品1'` | 设置格子1的奖品名字 |
| block1_chance | number |  | `'10'` | 设置奖品1的中奖概率 |
| block2_img | image |  | `''` | 设置格子2奖品图片 |
| block2_name | string |  | `'奖品2'` | 设置格子2的奖品名字 |
| block2_chance | number |  | `'10'` | 设置奖品2的中奖概率 |
| block3_img | image |  | `''` | 设置格子3奖品图片 |
| block3_name | string |  | `'奖品3'` | 设置格子3的奖品名字 |
| block3_chance | number |  | `'10'` | 设置奖品3的中奖概率 |
| block4_img | image |  | `''` | 设置格子4奖品图片 |
| block4_name | string |  | `'奖品4'` | 设置格子4的奖品名字 |
| block4_chance | number |  | `'10'` | 设置奖品4的概率 |
| block5_img | image |  | `''` | 设置格子5奖品图片 |
| block5_name | string |  | `'奖品5'` | 设置格子5的奖品名字 |
| block5_chance | number |  | `'10'` | 设置奖品5的中奖概率 |
| block6_img | image |  | `''` | 设置格子6奖品图片 |
| block6_name | string |  | `'奖品6'` | 设置格子6的奖品名字 |
| block6_chance | number |  | `'10'` | 设置奖品6的中奖概率 |
| block7_img | image |  | `''` | 设置格子7奖品图片 |
| block7_name | string |  | `'奖品7'` | 设置格子7的奖品名字 |
| block7_chance | number |  | `'10'` | 设置奖品7的中奖概率 |
| block8_img | image |  | `''` | 设置格子8奖品图片 |
| block8_name | string |  | `'奖品8'` | 设置格子8的奖品名字 |
| block8_chance | number |  | `'10'` | 设置奖品8的中奖概率 |

### Events

#### @start

抽奖时开始时触发

#### @end

抽奖时结束时触发

