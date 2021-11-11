<template>
<el-amap
    ref="map"
    vid="amapVue"
    :plugin="plugin"
    :events="events"
    :class="$style.root"
    :style="rootStyle"
>
    <el-amap-polyline
        v-if="showPolyline"
        :path="polylinePath"
        :stroke-color="polylineColor"
        :stroke-weight="polylineWeight"
        :events="polylineEvents"
        stroke-style="solid"
    ></el-amap-polyline>
    <el-amap-marker
        v-for="marker in markers"
        :events="marker.events"
        :icon="marker.icon"
        :position="marker.position"
        :vid="marker.key"
        :key="marker.key"
    ></el-amap-marker>
    <el-amap-circle
        v-for="(circle, index) in circles"
        :center="circle.center"
        :radius="circle.radius"
        :fill-opacity="circle.fillOpacity"
        :fill-color="circle.fillColor"
        :stroke-color="circle.strokeColor"
        :stroke-weight="circle.strokeWeight || 1"
        :events="circleEvents"
        :key="circle.key || index"
        :vid="circle.key || `circle${index}`"
    ></el-amap-circle>
    <el-amap-info-window
        :position="[116.369934,39.92034]"
        :visible="true"
        :events="infoWindowEvents"
    >
        <u-button color="primary">测试一下</u-button>
    </el-amap-info-window>
</el-amap>
</template>

<script>
import VueAMap from 'vue-amap';
import DirMarker from './icons/dir-marker.png';

export default {
    name: 'lcap-amap',
    props: {
        aKey: String,
        width: {
            type: [String, Number],
            default: 600,
        },
        height: {
            type: [String, Number],
            default: 600,
        },
        center: Array,
        // 比例尺
        scale: {
            type: Boolean,
            default: true,
        },
        // 工具条
        toolBar: {
            type: Boolean,
            default: true,
        },
        // 折线点集合
        polylinePoints: {
            type: Array,
            default: () => [],
        },
        // 折线颜色
        polylineColor: {
            type: String,
            default: '#3366FF',
        },
        // 折线粗细
        polylineWeight: {
            type: Number,
            default: 3,
        },
        // 圆形
        circles: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            map: null,
            events: {
                init: (map) => { this.map = map; },
                click: (e) => {
                    console.log('map is clicked!!!', e.lnglat.toString());
                },
            },
            // 控件
            controlMap: {
                scale: null,
                toolBar: null,
            },
            plugin: [{
                pName: 'Scale',
                visible: this.scale,
                events: { init: (scaleControl) => {
                    this.controlMap.scale = scaleControl;
                } },
            }, {
                pName: 'ToolBar',
                visible: this.toolBar,
                events: { init: (toolBarControl) => {
                    this.controlMap.toolBar = toolBarControl;
                } },
            }],
            // 折线
            polyline: null,
            polylineEvents: { init: (polyline) => {
                this.polyline = polyline;
                this.map.setFitView();
                const { polylinePoints } = this;
                const markers = [];
                if (polylinePoints.length) {
                    markers.push({
                        key: 'start',
                        icon: new AMap.Icon({
                            size: new AMap.Size(25, 34), // 图标尺寸
                            image: DirMarker, // 图标的取图地址
                            imageSize: new AMap.Size(135, 40), // 图标所用图片大小
                            imageOffset: new AMap.Pixel(-9, -3), // 图标取图偏移量
                        }),
                        position: polylinePoints[0],
                        events: {},
                    });
                    if (polylinePoints.length > 1) {
                        markers.push({
                            key: 'end',
                            icon: new AMap.Icon({
                                size: new AMap.Size(25, 34),
                                image: DirMarker,
                                imageSize: new AMap.Size(135, 40),
                                imageOffset: new AMap.Pixel(-95, -3),
                            }),
                            position: polylinePoints[polylinePoints.length - 1],
                            events: {},
                        });
                    }
                    this.markers = markers;
                }
            } },
            markers: [],
            // 圆形
            circleEvents: {},
            // 信息窗体
            infoWindow: null,
            infoWindowEvents: {},
        };
    },
    computed: {
        rootStyle() {
            const { width, height } = this;
            return {
                width: this.getValidWidth(width),
                height: this.getValidWidth(height),
            };
        },
        polylinePath() {
            // polyline 组件会修改元数据，深拷贝一份
            const { polylinePoints } = this;
            return polylinePoints && polylinePoints.length ? JSON.parse(JSON.stringify(polylinePoints)) : [];
        },
        showPolyline() {
            const { polylinePath } = this;
            return polylinePath && polylinePath.length;
        },
    },
    watch: {
        scale(val) {
            const { controlMap } = this;
            if (!controlMap.scale)
                return;
            controlMap.scale[val ? 'show' : 'hide']();
        },
        toolBar(val) {
            const { controlMap } = this;
            if (!controlMap.toolBar)
                return;
            controlMap.toolBar[val ? 'show' : 'hide']();
        },
    },
    created() {
        VueAMap.initAMapApiLoader({
            key: this.aKey || '3d6c6a67779d1a3a74528df975294aa4', // 申请好的Web端开发者Key，首次调用 load 时必填
            plugin: ['Scale', 'OverView', 'ToolBar'],
        });
    },
    methods: {
        getValidWidth(width) {
            return typeof width === 'string' && (width.includes('%') || width.includes('px') || width.includes('rem')) ? width : `${width}px`;
        },
        markerClick(e) {
            if (!this.map || !this.infoWindow)
                return;
            this.infoWindow.setContent(e.target.content);
            this.infoWindow.open(this.map, e.target.getPosition());
        },
    },
};
</script>

<style module>
.root {}
</style>
