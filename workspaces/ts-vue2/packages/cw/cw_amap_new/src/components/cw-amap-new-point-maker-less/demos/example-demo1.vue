### 基本用法 ```vue
<template>
  <div>
    <u-button @click="updatePosition">click</u-button>
    <div>{{ points }}</div>
    <cw-amap-new-point-maker-less :dataSource="points" :center="[120.181156, 30.182047]"></cw-amap-new-point-maker-less>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: [
        {
          id: 0,
          position: [120.181156, 30.182047],
          textContent: '123',
        },
        {
          id: 1,
          position: [120.215317, 30.189466],
          radius: 30,
          type: 'circle',
          textContent: 'hello world',
          // text: 'hello world',
        },
      ],
    };
  },
  watch: {
    points() {},
  },
  methods: {
    updatePosition() {
      // this.points[0].position = [120.215317, 30.189466];
      // this.points[1].position = [120.261322, 30.198813];
      this.points = async () => {
        console.log('%c [ async ]-52', 'font-size:13px; background:pink; color:#bf2c9f;');
        return [
          {
            id: 0,
            position: [120.215317, 30.189466],
          },
          {
            id: 1,
            position: [120.261322, 30.198813],
            radius: 30,
            type: 'circle',
            // text: 'hello world',
          },
        ];
      };
      // this.points = [
      //     {
      //         id: 0,
      //         position: [120.215317, 30.189466],
      //     },
      //     {
      //         id: 1,
      //         position: [120.261322, 30.198813],
      //         radius: 3,
      //         type: 'circle',
      //         // text: 'hello world',
      //     },
      // ];
      // this.points[1].type = 'circle';
    },
    handleItemClick(...args) {
      console.log('%c [ args ]-32', 'font-size:13px; background:pink; color:#bf2c9f;', args);
    },
  },
};
</script>
```
