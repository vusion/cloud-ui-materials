### 基本用法

```vue
<template>
    <div>
        <cust-yixin-live-broadcast
            :src="flag ? src1 : src2"
            :autoplay="false"
        ></cust-yixin-live-broadcast>

        <u-button @click="flag = !flag">click</u-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            src1:
                'http://pull5ed809e4.live.126.net/live/39f47e1700f44cca9319cf6178b5b9c6/playlist.m3u8?playSecret=626196ef106ba65b74fa0a1f0cb8232b&playTime=1713775611',
            src2: undefined,
        };
    },

    mounted() {
        // setTimeout(() => {
        //     console.log('🚀 ~ file: examples.md:27 ~ setTimeout ~ setTimeout:');
        //     this.flag = !this.flag;
        // }, 0);
    },
};
</script>
```
