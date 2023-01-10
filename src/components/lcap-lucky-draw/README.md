<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# LcapLuckyDraw 九宫格抽奖

- [示例](#示例)
    - [基本用法](#基本用法)
    - [控制默认抽奖结果弹窗开启，默认关闭, 回填文本为设置的奖品名称](#控制默认抽奖结果弹窗开启默认关闭-回填文本为设置的奖品名称)
    - [直接传入指定抽奖结果，设置后下方传入的概率无效](#直接传入指定抽奖结果设置后下方传入的概率无效)
    - [通过设置概率控制抽奖结果, 数值可以简单的理解成库存，各项会自动计算占比转化为概率](#通过设置概率控制抽奖结果-数值可以简单的理解成库存各项会自动计算占比转化为概率)
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
    font_color="#FFFFFF"
    font_top_padding="20px"
    font_size="10px"
>
</lcap-lucky-draw>
```

### 控制默认抽奖结果弹窗开启，默认关闭, 回填文本为设置的奖品名称

``` html
<lcap-lucky-draw
    block1_name=""
    block3_name="奖品3"
    block4_name="奖品4"
    block5_name="奖"
    block6_name="奖品6"
    block7_name="奖品7"
    block8_name="奖品8"
    font_color="#FFFFFF"
    font_top_padding="20px"
    font_size="10px"
    :prize_popup=true
>
</lcap-lucky-draw>
```

### 直接传入指定抽奖结果，设置后下方传入的概率无效

``` html
<lcap-lucky-draw
    block1_name="奖品1"
    block2_name="奖品2"
    block3_name="奖品3"
    block4_name="奖品4"
    block5_name="奖品5"
    block6_name="奖品6"
    block7_name="奖品7"
    block8_name="奖品8"
    font_color="#FFFFFF"
    font_top_padding="20px"
    font_size="20px"
    return_prize="奖品4"
>
</lcap-lucky-draw>
```

### 通过设置概率控制抽奖结果, 数值可以简单的理解成库存，各项会自动计算占比转化为概率

``` html
<lcap-lucky-draw
    block1_name="奖品1"
    block2_name="奖品2"
    block3_name="奖品3"
    block4_name="奖品4"
    block5_name="奖品5"
    block6_name="奖品6"
    block7_name="奖品7"
    block8_name="奖品8"
    :block1_chance=10
    :block2_chance=10
    :block3_chance=10
    :block4_chance=10
    :block5_chance=10
    :block6_chance=10
    :block7_chance=10
    :block8_chance=10000
    font_color="#FFFFFF"
    font_top_padding="20px"
    font_size="20px"
>
</lcap-lucky-draw>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| width | string |  | `'375px'` | 设置九宫格宽度 |
| height | string |  | `'375px'` | 设置九宫格高度 |
| return_prize | string |  | `''` | 后端返还的奖品信息，设置后各自的抽奖概率无效 |
| prize_popup | boolean |  | `false` | 是否开启默认中奖弹窗 |
| background_color | string |  | `''` | 设置背景颜色（例：#FFFFFF） |
| start_img | image |  | `''` | 设置抽奖开始按钮图片 |
| font_color | string |  | `''` | 设置所有奖品文字的图片颜色 |
| font_top_padding | string |  | `'60px'` | 设置奖品文字距离顶部的距离（默认：60px） |
| font_size | string |  | `'22px'` | 设置奖品文字距离顶部的距离（默认：22px） |
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

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | any | 返还奖品 |

