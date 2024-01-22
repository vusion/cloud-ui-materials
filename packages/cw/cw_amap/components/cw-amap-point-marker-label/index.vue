<template>
    <div :class="$style.root">
        <div
            v-if="!inDesigner && !loadingError"
            style="width: 100%; height: 100%">
            <div :class="$style.container" ref="amap"></div>
            <div
                v-if="hasInfoWindow && selectedPoint && $scopedSlots.item"
                ref="infoWindow"
                :class="$style.infoWindow">
                <div :class="$style.infoWindowContent">
                    <slot name="item" :item="selectedPoint"></slot>
                    <a
                        :class="$style.infoWindowClose"
                        @click="clearSelectedItem">
                        x
                    </a>
                </div>
                <div
                    ref="infoWindowArrow"
                    :class="$style.infoWindowArrow"></div>
            </div>
        </div>
        <div v-if="loadingError" :class="$style.containertip">
            地图不可用，请前往「应用配置」页面「自定义参数配置」，配置key和密钥。如果您已经配置Key，请发布预览后重新刷新页面。
        </div>
        <img
            v-if="inDesigner"
            :src="mapPNG"
            style="width: 100%; height: 100%; object-fit: cover" />
        <div
            v-if="inDesigner && hasInfoWindow"
            style="
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 10;
            ">
            <div s-empty="true" vusion-slot-name="item">
                <slot name="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { getAMapInstance } from '../../utils/getAMapInstance';
import { createMapMarkerStore } from '../../utils/createMapMarkerStore';
import supportDatasource from '../../mixins/support.datasource';
import infoWindow from '../../mixins/infowindow';
import mapPNG from '../../assets/map.png';
import { mockData } from './mockData';

export default {
    name: 'cw-amap-point-marker-label',
    mixins: [supportDatasource, infoWindow()],
    props: {
        center: {
            type: Array,
            default: () => [120.190941, 30.18635],
        },
        needMoveAnimate: {
            type: Boolean,
            default: () => true,
        },
        moveDuration: {
            type: Number,
            default: () => 100,
        },
        customPointOptions: {
            type: [Function, Object],
            default: () => ({}),
        },
        collision: {
            type: Boolean,
            default: () => true,
        },
        allowCollision: {
            type: Boolean,
            default: () => true,
        },
    },

    data() {
        return {
            loadingError: null,
            mapPNG,
        };
    },
    computed: {
        inDesigner() {
            // return true;
            return this.$env.VUE_APP_DESIGNER;
        },
    },

    mounted() {
        if (this.inDesigner) return;
        this.initAMap();
    },

    watch: {
        'currentDataSource.data'() {
            this.clearSelectedItem();
            if (this.pointStore) {
                this.pointStore.update(this.currentDataSource.data);
            }
        },
        center() {
            if (this.mapInstance) this.mapInstance.setCenter(this.center);
        },
    },

    methods: {
        initAMap() {
            getAMapInstance(true).then(
                async (AMap) => {
                    this.AMap = AMap;
                    this.mapInstance = new AMap.Map(this.$refs.amap, {
                        center: this.center,
                        zoom: 13,
                        resizeEnable: true,
                        // zoom: 9,
                        // viewMode: '3D',
                        // center: [116.12, 40.11],
                        // mapStyle: 'amap://styles/whitesmoke',
                        // showLabel: false,
                        // showIndoorMap: false,
                    });
                    await new Promise((res) => {
                        this.mapInstance.on('complete', res);
                    });
                    this.$emit('maploaded', {
                        AMap,
                        mapInstance: this.mapInstance,
                    });
                    this.labelLayerInstance = new AMap.LabelsLayer({
                        zIndex: 1000,
                        collision: this.collision,
                        allowCollision: this.allowCollision,
                    });
                    this.mapInstance.add(this.labelLayerInstance);
                    this.pointStore = createMapMarkerStore({
                        onMarkClick: (e) => {
                            const extData = e.target.getExtData();
                            this.$emit('click', {
                                ...e,
                                extData,
                            });
                            this.moveMarker(extData.position, extData);
                        },
                        getMarkerInstance: (p) => this.getMarkerInstance(p),
                        fieldMaps: {
                            id: this.idField,
                            textContent: this.textContentField,
                            position: this.positionField,
                        },
                        customPointOptions: this.customPointOptions,
                        moveDuration: this.needMoveAnimate
                            ? this.moveDuration
                            : 0,
                        batchInsert: (arr) => this.labelLayerInstance.add(arr),
                    });
                    if (this.currentDataSource.data) {
                        this.pointStore.init(this.currentDataSource.data);
                    }
                },
                (e) => {
                    this.loadingError = e.message;
                }
            );
        },

        getMarkerInstance(point) {
            const AMap = this.AMap;
            const { id, ...others } = point;
            const marker = new AMap.LabelMarker({
                ...others,
                name: id,
            });
            return marker;
        },

        clearSelectedItem() {
            this.selectedPoint = null;
            this.selectedPointDiv = null;
        },

        getInner() {
            return {
                mapInstance: this.mapInstance,
                AMap: this.AMap,
                pointStore: this.pointStore,
            };
        },

        getMockData() {
            return mockData.slice(0, 300);
        },
    },
};
</script>

<style module>
.root {
    width: 100%;
    height: 500px;
    min-width: 100px;
    position: relative;
}

.container {
    width: 100%;
    height: 100%;
}

.containertip {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
    color: #fff;
}

.infoWindow {
    position: absolute;
    z-index: 121;
    display: block;
    pointer-events: auto;
    /* overflow: auto; */
}

.infoWindowContent {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    text-align: left;
    background: #fff;
    line-height: 1.4;
    padding: 10px 18px 10px 10px;
}

.infoWindowClose {
    position: absolute;
    right: 0px;
    top: 0px;
    color: #c3c3c3;
    text-decoration: none;
    font: 700 16px/14px Tahoma, Verdana, sans-serif;
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.infoWindowArrow {
    position: absolute;
    width: 8px;
    height: 8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}

.infoWindowArrow[placement='top'] {
    border-top: 8px solid #fff;
}
.infoWindowArrow[placement='bottom'] {
    border-bottom: 8px solid #fff;
    top: 0;
    transform: translateY(-100%);
}

.circleMarker {
    border-radius: 99999px;
    border: 1px solid;
    background: red;
    opacity: 0.4;
}

.root div[s-empty]:empty {
    position: relative;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    text-align: left;
    background: #fff;
    line-height: 1.4;
    padding: 10px 18px 10px 10px;
    text-align: center;
    width: 30%;
    height: 30%;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
}

.root div[s-empty]:empty::before {
    content: '+';
    font-size: 20px;
    line-height: 12px;
    display: inline-block;
    margin-bottom: 2px;
}
</style>
