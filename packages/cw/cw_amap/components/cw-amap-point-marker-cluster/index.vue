<template>
    <div :class="$style.root">
        <div
            v-if="!inDesigner && !loadingError"
            style="width: 100%; height: 100%"
        >
            <div :class="$style.container" ref="amap"></div>
            <div
                v-if="hasInfoWindow && selectedPoint && $scopedSlots.item"
                ref="infoWindow"
                :class="$style.infoWindow"
            >
                <div :class="$style.infoWindowContent">
                    <slot name="item" :item="selectedPoint"></slot>
                    <a
                        :class="$style.infoWindowClose"
                        @click="clearSelectedItem"
                    >
                        x
                    </a>
                </div>
                <div
                    ref="infoWindowArrow"
                    :class="$style.infoWindowArrow"
                ></div>
            </div>
        </div>
        <div v-if="loadingError" :class="$style.containertip">
            地图不可用，请前往「应用配置」页面「自定义参数配置」，配置key和密钥。如果您已经配置Key，请发布预览后重新刷新页面。
        </div>
        <img
            v-if="inDesigner"
            :src="mapPNG"
            style="width: 100%; height: 100%; object-fit: cover"
        />
        <div
            v-if="inDesigner && hasInfoWindow"
            style="
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 10;
            "
        >
            <div s-empty="true" vusion-slot-name="item">
                <slot name="item"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { getAMapInstance } from '../../utils/getAMapInstance';
import supportDatasource from '../../mixins/support.datasource';
import infowindow from '../../mixins/infowindow';
import mapPNG from '../../assets/map.png';
import get from 'lodash.get';
import merge from 'lodash.merge';

import { mockData } from '../cw-amap-point-marker-label/mockData';

export default {
    name: 'cw-amap-point-marker-cluster',
    mixins: [supportDatasource, infowindow({ listenZoom: false })],
    props: {
        center: {
            type: Array,
            default: () => [120.190941, 30.18635],
        },
        customPointOptions: {
            type: [Array, Function],
        },
        gridSize: {
            type: Number,
            default: () => 60,
        },
    },

    data() {
        return {
            loadingError: null,
            selectedPoint: null,
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
            if (this.clusterInstance)
                this.clusterInstance.setData(this.fieldMap());
        },
        gridSize() {
            if (this.clusterInstance)
                this.clusterInstance.setGridSize(this.gridSize);
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
                    this.clusterInstance = new AMap.MarkerCluster(
                        this.mapInstance,
                        this.fieldMap(),
                        {
                            gridSize: this.gridSize,
                            renderClusterMarker: this.renderMarker.bind(this),
                            renderMarker: this.renderMarker.bind(this),
                        }
                    );
                    this.clusterInstance.on('click', (e) => {
                        const clusterData = e.clusterData;
                        const marker = e.marker;
                        if (clusterData.length > 1) {
                            this.moveMarker(marker.getPosition(), {
                                clusterData,
                            });
                            this.$emit('click', {
                                clusterData,
                            });
                        } else {
                            const extData = marker.getExtData();
                            this.moveMarker(marker.getPosition(), extData);
                            this.$emit('click', extData);
                        }
                    });
                },
                (e) => {
                    this.loadingError = e.message;
                }
            );
        },

        fieldMap() {
            const temp = (this.currentDataSource.data || []).map((point) => {
                const fieldMapResult = Object.entries({
                    lnglat: this.positionField,
                    weight: this.weightField,
                    textContent: this.textContentField,
                }).reduce(
                    (acc, [key, value]) => ({
                        ...acc,
                        [key]: get(point, value),
                    }),
                    {}
                );
                return { ...point, ...fieldMapResult };
            });
            return temp;
        },

        getInner() {
            return {
                mapInstance: this.mapInstance,
                AMap: this.AMap,
            };
        },

        getMockData() {
            return mockData;
        },

        renderMarker(context) {
            const AMap = this.AMap;
            const { marker, count = 1, clusterData, data } = context;
            const div = document.createElement('div');
            const textContent =
                count > 1 ? `合计:${count}` : data[0].textContent;
            let customOptions = this.customPointOptions;
            if (typeof customOptions === 'function') {
                let ans = {
                    result: customOptions,
                    point: marker,
                    count,
                    clusterData,
                    data: data && data[0],
                };
                customOptions(ans); // 由于ide定义的逻辑都是异步函数，但customPointOptions一定要是同步方法，故这里使用另外的方法获取返回值
                customOptions = ans.result;
            }
            const options = merge(
                {
                    textContent,
                    style: {
                        backgroundColor: 'rgba(29,78,216,0.4)',
                        borderRadius: '99999px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                        width: count > 1 ? '60px' : '30px',
                        height: count > 1 ? '60px' : '30px',
                    },
                    size: count > 1 ? [60, 60] : [30, 30],
                },
                customOptions
            );
            Object.assign(div.style, options.style);
            div.innerText = options.textContent;
            const size = options.size || [0, 0];
            if (count === 1) {
                marker.setExtData(data[0]);
            }

            marker.setContent(div);
            marker.setOffset(new AMap.Pixel(-size[0] / 2, -size[1] / 2));
        },
    },
};
</script>

<style module>
.root {
    width: 100%;
    height: 500px;
    position: relative;
    min-width: 100px;
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
