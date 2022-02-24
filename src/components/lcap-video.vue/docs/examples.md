### 基本用法

``` vue
<template>
  <lcap-video :src="src" width="500" @start="onStart" @play="onPlay"></lcap-video>
</template>

<script>
export default {
    data() {
        return {
            src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        }
    },
    methods: {
        onStart() {
            console.log('播放开始时');
        },
        onPlay() {
            console.log('继续播放时');
        },
    },
}
</script>
```
