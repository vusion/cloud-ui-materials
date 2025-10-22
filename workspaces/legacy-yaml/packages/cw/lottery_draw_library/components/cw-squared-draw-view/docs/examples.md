### 基本用法

``` html
<cw-squared-draw-view
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
</cw-squared-draw-view>
```

### 控制默认抽奖结果弹窗开启，默认关闭, 回填文本为设置的奖品名称

``` html
<cw-squared-draw-view
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
</cw-squared-draw-view>
```

### 直接传入指定抽奖结果，设置后下方传入的概率无效

``` html
<cw-squared-draw-view
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
</cw-squared-draw-view>
```

### 通过设置概率控制抽奖结果, 数值可以简单的理解成库存，各项会自动计算占比转化为概率

``` html
<cw-squared-draw-view
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
</cw-squared-draw-view>
```
