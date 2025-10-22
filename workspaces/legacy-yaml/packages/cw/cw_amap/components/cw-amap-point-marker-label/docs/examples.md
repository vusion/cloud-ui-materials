### 基本用法

```vue
<template>
    <div>
        <u-button @click="updatePosition">click</u-button>
        <cw-amap-point-marker-label
            :dataSource="points"
            :center="['116.441504', '40.031386']"
            @click="handleItemClick"
            :customPointOptions="customPointOptions"
            ref="a"
        >
            <template #item="current">sdfds</template>
        </cw-amap-point-marker-label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            points: [],
            reverse: false,
            customPointOptions: {
                icon: {
                    type: 'image',
                    image:
                        'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                    size: [6, 9],
                    anchor: 'bottom-center',
                },
                text: {
                    fontSize: 12,
                    fontWeight: 'normal',
                    fillColor: '#fff',
                    padding: '2, 5',
                    backgroundColor: 'rgb(246,137,38)',
                    borderColor: '#fff',
                    borderWidth: 1,
                },
            },
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
                    textContent: idx + '',
                }));
            };
        },
        handleItemClick(...args) {},
    },
};
</script>
```
