### 基本用法

``` html
<cx-countup :end="100" loop :delay="3000" style="color:red" :duration="500"></cx-countup>
```

#### 分组 (1,000 vs 1000)
``` html
<cx-countup :end="1000" is-group></cx-countup>
```

#### 前缀，后缀
``` html
<cx-countup :end="100" prefix="$" suffix="美元"></cx-countup>
```

#### 小数
``` html
<cx-countup :end="100" :decimals="2"></cx-countup>
```

#### 动画函数
``` html
<cx-countup :end="100" is-easing></cx-countup>
```

#### 渐变时间(时间单位是秒)
``` html
<cx-countup :end="100" :duration="3"></cx-countup>
```

#### 转换单位简化数据
``` html
<cx-countup :end="4567890" simplify></cx-countup>
```

### 方法
```vue
<template>
    <u-form>
    <u-form-item label="演示效果">
        <u-linear-layout>
        <cx-countup ref="countup" :start="start" :end="end" :is-easing="isEasing" :duration="duration"></cx-countup>
        <u-button style="vertical-align: bottom;" color="primary" @click="show">开启渐变</u-button>
        <u-button style="vertical-align: bottom;" @click="reset">重置</u-button>
         <u-button style="vertical-align: bottom;" @click="pause">{{ `${isPause?'恢复':'暂停'}` }}</u-button>
        </u-linear-layout>
    </u-form-item>
    <u-form-item label="结束值">
        <u-input v-model.number="end"></u-input>
    </u-form-item>
    <!-- 不支持动态改变属性 -->
    <!-- <u-form-item label="渐变时间">
        <u-input v-model.number="duration"></u-input>
    </u-form-item>
    <u-form-item label="启用动画函数">
        <u-capsules :value.sync="isEasing">
            <u-capsule :value="false">false</u-capsule>
            <u-capsule :value="true">true</u-capsule>
        </u-capsules>
    </u-form-item> -->
    </u-form>
</template>
<script>
export default{
    data() {
        return {
            start: 0,
            end: 100,
            duration: 2,
            isEasing: true,
            isPause: false,
        };
    },
    methods: {
        show() {
            // if (this.autoStart)
                this.$refs.countup.update(this.end)
            // else
            //   this.autoStart = true;
        },
        reset() {
            this.$refs.countup.reset();
        },
        pause() {
            this.isPause = !this.isPause;
            this.$refs.countup.pauseResume();
        }
    },
};
</script>
```

### 渐变结束回调函数
```vue
<template>
    <u-linear-layout>
        <cx-countup :end="100" :auto-start="autoStart" :end-callback="end"></cx-countup>
        <u-button style="vertical-align: bottom;" color="primary" @click="start">autoStart</u-button>
    </u-linear-layout>
</template>
<script>
export default{
    data() {
        return {
            autoStart: false,
        };
    },
    methods: {
        start() {
            this.autoStart = true;
        },
        end() {
            console.log('渐变结束');
        },
    },
};
</script>
```
