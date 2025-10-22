### 基本用法

```vue
<template>
    <div>
        <u-button @click="updatePosition">click</u-button>
        <cw-amap-point-marker-more
            :dataSource="points"
            @click="handleItemClick"
            :customPointOptions="customPointOptions"
            ref="a"
        >
            <template #item="current">sdfds</template>
        </cw-amap-point-marker-more>
    </div>
</template>

<script>
export default {
    data() {
        return {
            points: [],
            reverse: false,
            customPointOptions: [
                {
                    url:
                        'https://a.amap.com/jsapi_demos/static/images/mass0.png', //图标地址
                    anchor: [6, 6], //图标显示位置偏移量，基准点为图标左上角
                    size: [11, 11], //图标的尺寸
                    zIndex: 3, //每种样式图标的叠加顺序，数字越大越靠前
                },
                {
                    url:
                        'https://a.amap.com/jsapi_demos/static/images/mass1.png',
                    anchor: [4, 4],
                    size: [7, 7],
                    zIndex: 2,
                },
            ],
        };
    },
    methods: {
        updatePosition() {
            this.points = async () => {
                let mockData = this.$refs.a.getMockData();
                if (this.reverse) {
                    this.reverse = false;
                    mockData = mockData.reverse();
                } else {
                    this.reverse = true;
                }
                return mockData.map((position, idx) => ({
                    id: idx,
                    position,
                    style: idx % 2,
                }));
            };
        },
        handleItemClick(...args) {},
    },
};
</script>
```
