### 基本用法

``` vue
<template>
  <lcap-video :src="src" width="1200" @start="onStart" @play="onPlay"></lcap-video>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://static-vusion.nos-eastchina1.126.net/tutorial/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%E8%A7%86%E9%A2%91/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B%EF%BC%9AAPI%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97.mp4',
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
### 断点播放

```vue
<template>
  <lcap-video :src="src" width="1200" @start="onStart" @play="onPlay" :breakProgress="progress"></lcap-video>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://static-vusion.nos-eastchina1.126.net/tutorial/%E5%AD%A6%E4%B9%A0%E4%B8%AD%E5%BF%83%E8%A7%86%E9%A2%91/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B/%E4%B8%93%E9%A2%98%E8%AF%BE%E7%A8%8B%EF%BC%9AAPI%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97.mp4',
            progress: '',
        }
    },
    mounted(){
      setTimeout(()=>{this.progress = '50%'}, 2000)
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
