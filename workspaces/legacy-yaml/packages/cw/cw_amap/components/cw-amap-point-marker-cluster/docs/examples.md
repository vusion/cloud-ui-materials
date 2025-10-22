### 基本用法

```vue
<template>
    <div>
        <u-button @click="updatePosition">click</u-button>
        <cw-amap-point-marker-cluster
            :dataSource="points"
            @click="handleItemClick"
            :center="['116.441504', '40.031386']"
            :customPointOptions="customPointOptions"
            ref="a"
        >
            <template #item="current">
                {{
                    current.item.textContent || current.item.clusterData.length
                }}
            </template>
        </cw-amap-point-marker-cluster>
    </div>
</template>

<script>
export default {
    data() {
        return {
            points: [],
            reverse: false,
        };
    },
    methods: {
        updatePosition() {
            this.points = async () => {
                let mockData = this.$refs.a.getMockData();
                console.log(
                    '%c [ mockData ]-24',
                    'font-size:13px; background:pink; color:#bf2c9f;',
                    mockData
                );
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
        handleItemClick(...args) {
            console.log(
                '%c [ args ]-32',
                'font-size:13px; background:pink; color:#bf2c9f;',
                args
            );
        },
        customPointOptions(tmp) {
            const { count } = tmp;
            if (count === 1) {
                tmp.result = {
                    style: {
                        backgroundColor: 'red',
                        opacity: '0.4',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                        width: '100px',
                        height: '30px',
                    },
                };
            } else {
                tmp.result = {};
            }
        },
    },
};
</script>
```
