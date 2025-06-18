### 基本用法

```vue
<template>
    <div>
        <u-button @click="updatePosition">click</u-button>
        <cw-amap-new-point-marker-three-dim
            :dataSource="realPoints"
            :center="center"
            :value.sync="id"
            idField="name"
            textContentField="name"
        >
            <template #item="current">{{ current.item.name }}</template>
        </cw-amap-new-point-marker-three-dim>
    </div>
</template>

<script>
export default {
    data() {
        const tmp = [
            {
                position: [116.59008979797363, 39.90058428630659],
                name: '远洋一方润园',
                price: 65000,
                count: 92,
                type: 'blue',
            },
            {
                position: [116.59378051757811, 39.89704498575387],
                name: '远洋一方溪语苑',
                price: 65000,
                count: 52,
                type: 'blue',
            },
            {
                position: [116.59366250038148, 39.90657598772839],
                name: '东会新村',
                price: 49000,
                count: 53,
                type: 'yellow',
            },
            {
                position: [116.60161256790161, 39.91717540663561],
                name: '北京新天地（东区）',
                price: 62000,
                count: 639,
                type: 'blue',
            },
            {
                position: [116.59092664718628, 39.913423004886894],
                name: '京通苑阳光华苑',
                price: 48000,
                count: 651,
                type: 'yellow',
            },
            {
                position: [116.59223556518555, 39.92263906258135],
                name: '龙湖长楹天街',
                price: 76000,
                count: 12,
                type: 'blue',
            },
            {
                position: [116.58066987991333, 39.92166814352715],
                name: '柏林爱乐',
                price: 62000,
                count: 471,
                type: 'blue',
            },
            {
                position: [116.5806484222412, 39.91766912840225],
                name: '汇鸿家园',
                price: 58000,
                count: 65,
                type: 'yellow',
            },
            {
                position: [116.5688467025757, 39.91737289576941],
                name: '三间房南里',
                price: 53000,
                count: 45,
                type: 'yellow',
            },
            {
                position: [116.57416820526123, 39.9034814381334],
                name: '康惠园三号院',
                price: 48000,
                count: 95,
                type: 'yellow',
            },
            {
                position: [116.60126924514769, 39.89893812274133],
                name: '东一时区小区',
                price: 54000,
                count: 199,
                type: 'yellow',
            },
            {
                position: [116.60905838012695, 39.90331683051646],
                name: '八里桥南院',
                price: 44000,
                count: 2,
                type: 'yellow',
            },
            {
                position: [116.62437915802002, 39.9101312551376],
                name: '西马庄园',
                price: 36000,
                count: 102,
                type: 'yellow',
            },
            {
                position: [116.60266399383545, 39.929747745342944],
                name: '保利嘉园1号院',
                price: 53000,
                count: 125,
                type: 'yellow',
            },
            {
                position: [116.56524181365967, 39.92691752490338],
                name: '朝青知筑',
                price: 80000,
                count: 36,
                type: 'blue',
            },
            {
                position: [116.54335498809814, 39.903678966751734],
                name: '北花园小区1号院',
                price: 50000,
                count: 2,
                type: 'yellow',
            },
            {
                position: [116.54949188232422, 39.921421297504764],
                name: '瑞和国际',
                price: 49000,
                count: 74,
                type: 'yellow',
            },
            {
                position: [116.63712501525877, 39.92444921388591],
                name: '天赐良园（东区）',
                price: 49000,
                count: 51,
                type: 'yellow',
            },
        ];
        return {
            id: null,
            realPoints: tmp.slice(0),
            totals: tmp,
            center: [116.59008979797363, 39.90058428630659],
        };
    },
    watch: {
        points() {},
    },
    methods: {
        updatePosition() {
            this.id = '瑞和国际';
            // this.realPoints = [];
        },
        handleItemClick(...args) {
            console.log(
                '%c [ args ]-32',
                'font-size:13px; background:pink; color:#bf2c9f;',
                args
            );
        },
    },
};
</script>
```
