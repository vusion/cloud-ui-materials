### 折线

``` vue
<template>
    <div>
        <lcap-amap
            :polyline-points="polylinePoints"
            :scale="scale"
            :tool-bar="toolBar"
            :circles="circles"
        ></lcap-amap>
        <u-linear-layout>
            <span>比例尺</span>
            <u-switch v-model="scale" width="wide">{{ scale ? 'ON' : 'OFF' }}</u-switch>
        </u-linear-layout>
        <u-linear-layout>
            <span>工具条</span>
            <u-switch v-model="toolBar" width="wide">{{ toolBar ? 'ON' : 'OFF' }}</u-switch>
        </u-linear-layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            scale: false,
            toolBar: false,
            polylinePoints: [
                [116.368904, 39.913423],
                [116.382122, 39.901176],
                [116.387271, 39.912501],
                [116.398258, 39.904600]
            ],
            circles: [
                {
                    center: [116.368131, 39.899996],
                    radius: 300,
                    fillOpacity: 0.5,
                    fillColor: '#3366FF',
                    strokeColor: '#3366FF',
                    strokeWeight: 1,
                },
                {
                    center: [116.391392, 39.900787],
                    radius: 200,
                    fillOpacity: 0.5,
                },
            ],
        };
    },
}
</script>
```
